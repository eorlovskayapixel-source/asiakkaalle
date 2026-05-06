import { getT } from "./language.js";

const openContactModalTop = document.getElementById("openContactModalTop");
const openContactModalResult = document.getElementById(
  "openContactModalResult",
);

const contactModal = document.getElementById("contactModal");
const contactModalOverlay = document.getElementById("contactModalOverlay");
const closeContactModalButton = document.getElementById("closeContactModal");

const contactRequestForm = document.getElementById("contactRequestForm");
const contactRequestStatus = document.getElementById("contactRequestStatus");

const openFeedbackModalButton = document.getElementById("openFeedbackModal");
const feedbackModal = document.getElementById("feedbackModal");
const feedbackModalOverlay = document.getElementById("feedbackModalOverlay");
const closeFeedbackModalButton = document.getElementById("closeFeedbackModal");

const feedbackForm = document.getElementById("feedbackForm");
const feedbackStatus = document.getElementById("feedbackStatus");

const emailModal = document.getElementById("emailModal");
const emailForm = document.getElementById("emailForm");
const emailInput = document.getElementById("emailInput");
const closeEmailModalButton = document.getElementById("closeEmailModal");
const emailModalOverlay = document.getElementById("emailModalOverlay");

let buildPayloadFunction = null;

export function initModalHandler(buildPayload) {
  buildPayloadFunction = buildPayload;

  initContactModal();
  initFeedbackModal();
  initEmailModal();
  initEscapeClose();
}

export function refreshModalTranslations() {
  const t = getT();

  const feedbackModalTitleEl = document.getElementById("feedbackModalTitle");
  if (feedbackModalTitleEl) {
    feedbackModalTitleEl.textContent = t.feedbackModalTitle;
  }

  const feedbackModalIntroEl = document.querySelector(".feedback-modal__intro");
  if (feedbackModalIntroEl) {
    feedbackModalIntroEl.textContent = t.feedbackModalIntro;
  }

  const feedbackRatingLabelEl = document.querySelector(
    ".feedback-modal__field legend",
  );

  if (feedbackRatingLabelEl) {
    feedbackRatingLabelEl.textContent = t.feedbackRatingLabel;
  }

  const feedbackCommentLabelEl = document
    .querySelector("#feedbackComment")
    ?.closest("label")
    ?.querySelector("span");

  if (feedbackCommentLabelEl) {
    feedbackCommentLabelEl.textContent = t.feedbackCommentLabel;
  }

  const feedbackCommentEl = document.getElementById("feedbackComment");
  if (feedbackCommentEl) {
    feedbackCommentEl.placeholder = t.feedbackCommentPlaceholder;
  }

  const feedbackSubmitBtn = document.querySelector(
    "#feedbackForm .form-button-primary",
  );

  if (feedbackSubmitBtn) {
    feedbackSubmitBtn.textContent = t.feedbackSubmitBtn;
  }

  const feedbackResetBtn = document.querySelector(
    "#feedbackForm .form-button-secondary",
  );

  if (feedbackResetBtn) {
    feedbackResetBtn.textContent = t.feedbackResetBtn;
  }

  const contactModalTitleEl = document.getElementById("contactModalTitle");
  if (contactModalTitleEl) {
    contactModalTitleEl.textContent = t.contactModalTitle;
  }

  const contactSubmitBtn = document.querySelector(
    "#contactRequestForm .form-button-primary",
  );

  if (contactSubmitBtn) {
    contactSubmitBtn.textContent = t.contactSubmitBtn;
  }

  const contactResetBtn = document.querySelector(
    "#contactRequestForm .form-button-secondary",
  );

  if (contactResetBtn) {
    contactResetBtn.textContent = t.contactResetBtn;
  }

  const contactEmailLabelEl = document.querySelector(
    'label[class="contact-modal__field"] span',
  );

  if (contactEmailLabelEl) {
    contactEmailLabelEl.textContent = t.contactEmailLabel;
  }

  const contactEmailInput = document.getElementById("contactEmail");
  if (contactEmailInput) {
    contactEmailInput.placeholder = t.contactEmailPlaceholder;
  }

  const contactMessageLabelEl = document.querySelectorAll(
    ".contact-modal__label",
  )[1];

  if (contactMessageLabelEl) {
    contactMessageLabelEl.textContent = t.contactMessageLabel;
  }

  const contactMessageInput = document.getElementById("contactMessage");
  if (contactMessageInput) {
    contactMessageInput.placeholder = t.contactMessagePlaceholder;
  }

  const contactModalIntroEl = document.querySelector(".contact-modal__intro");
  if (contactModalIntroEl) {
    contactModalIntroEl.textContent = t.contactModalIntro;
  }
}

function initContactModal() {
  if (openContactModalTop) {
    openContactModalTop.addEventListener("click", openContactModal);
  }

  if (openContactModalResult) {
    openContactModalResult.addEventListener("click", openContactModal);
  }

  if (closeContactModalButton) {
    closeContactModalButton.addEventListener("click", closeContactModal);
  }

  if (contactModalOverlay) {
    contactModalOverlay.addEventListener("click", closeContactModal);
  }

  if (contactRequestForm) {
    contactRequestForm.addEventListener("submit", handleContactRequestSubmit);
    contactRequestForm.addEventListener("reset", handleContactRequestReset);
  }
}

function initFeedbackModal() {
  if (openFeedbackModalButton) {
    openFeedbackModalButton.addEventListener("click", openFeedbackModal);
  }

  if (closeFeedbackModalButton) {
    closeFeedbackModalButton.addEventListener("click", closeFeedbackModal);
  }

  if (feedbackModalOverlay) {
    feedbackModalOverlay.addEventListener("click", closeFeedbackModal);
  }

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", handleFeedbackSubmit);
    feedbackForm.addEventListener("reset", handleFeedbackReset);
  }
}

function initEmailModal() {
  if (closeEmailModalButton) {
    closeEmailModalButton.addEventListener("click", closeEmailModal);
  }

  if (emailModalOverlay) {
    emailModalOverlay.addEventListener("click", closeEmailModal);
  }

  if (!emailForm || !emailInput || !emailModal) {
    return;
  }

  emailForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (!email || typeof buildPayloadFunction !== "function") {
      return;
    }

    const payload = buildPayloadFunction(email);

    console.log("Valmis lähetettäväksi backendiin:", payload);

    emailForm.reset();
    closeEmailModal();
  });
}

function initEscapeClose() {
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    if (contactModal && !contactModal.hidden) {
      closeContactModal();
    }

    if (feedbackModal && !feedbackModal.hidden) {
      closeFeedbackModal();
    }

    if (emailModal && !emailModal.hidden) {
      closeEmailModal();
    }
  });
}

function openContactModal() {
  if (!contactModal) {
    return;
  }

  contactModal.hidden = false;
  contactModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeContactModal() {
  if (!contactModal) {
    return;
  }

  contactModal.hidden = true;
  contactModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (contactRequestStatus) {
    contactRequestStatus.textContent = "";
    contactRequestStatus.classList.remove("contact-modal__status--error");
    contactRequestStatus.classList.remove("contact-modal__status--success");
  }
}

function openFeedbackModal() {
  if (!feedbackModal) {
    return;
  }

  feedbackModal.hidden = false;
  feedbackModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeFeedbackModal() {
  if (!feedbackModal) {
    return;
  }

  feedbackModal.hidden = true;
  feedbackModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (feedbackStatus) {
    feedbackStatus.textContent = "";
    feedbackStatus.classList.remove("feedback-modal__status--error");
    feedbackStatus.classList.remove("feedback-modal__status--success");
  }
}

export function openEmailModal() {
  if (!emailModal) {
    return;
  }

  emailModal.hidden = false;
  emailModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeEmailModal() {
  if (!emailModal) {
    return;
  }

  emailModal.hidden = true;
  emailModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

async function sendFormDataMock(endpoint, payload) {
  console.log(`Mock sending to ${endpoint}:`, payload);

  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    ok: true,
    status: 200,
    json: async () => ({
      message: "Lähetys onnistui",
    }),
  };
}

async function handleFeedbackSubmit(event) {
  event.preventDefault();

  const formData = new FormData(feedbackForm);
  const rating = formData.get("feedbackRating");
  const comment = formData.get("feedbackComment")?.toString().trim();

  if (!rating) {
    feedbackStatus.textContent =
      "Valitse tähtiarviointi ennen palautteen lähettämistä.";
    feedbackStatus.classList.add("feedback-modal__status--error");
    feedbackStatus.classList.remove("feedback-modal__status--success");
    return;
  }

  const payload = {
    rating,
    comment: comment || "",
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await sendFormDataMock("/api/feedback", payload);

    if (response.status === 200 || response.status === 201) {
      feedbackStatus.textContent = "Palaute lähetettiin onnistuneesti.";
      feedbackStatus.classList.remove("feedback-modal__status--error");
      feedbackStatus.classList.add("feedback-modal__status--success");

      const feedbackCommentField = feedbackForm.querySelector(
        '[name="feedbackComment"]',
      );

      const feedbackRatingFields = feedbackForm.querySelectorAll(
        '[name="feedbackRating"]',
      );

      if (feedbackCommentField) {
        feedbackCommentField.value = "";
      }

      feedbackRatingFields.forEach((field) => {
        field.checked = false;
      });
    } else {
      feedbackStatus.textContent =
        "Palautteen lähetys epäonnistui. Yritä uudelleen.";
      feedbackStatus.classList.add("feedback-modal__status--error");
      feedbackStatus.classList.remove("feedback-modal__status--success");
    }
  } catch (error) {
    console.error("Feedback submit failed:", error);

    feedbackStatus.textContent =
      "Palautteen lähetys epäonnistui. Yritä uudelleen.";
    feedbackStatus.classList.add("feedback-modal__status--error");
    feedbackStatus.classList.remove("feedback-modal__status--success");
  }
}

function handleFeedbackReset() {
  feedbackStatus.textContent = "";
  feedbackStatus.classList.remove("feedback-modal__status--error");
  feedbackStatus.classList.remove("feedback-modal__status--success");
}

async function handleContactRequestSubmit(event) {
  event.preventDefault();

  const formData = new FormData(contactRequestForm);
  const email = formData.get("contactEmail")?.toString().trim();
  const message = formData.get("contactMessage")?.toString().trim();

  if (!email || !message) {
    contactRequestStatus.textContent =
      "Täytä sähköposti ja kommentti ennen lähettämistä.";
    contactRequestStatus.classList.add("contact-modal__status--error");
    contactRequestStatus.classList.remove("contact-modal__status--success");
    return;
  }

  const payload = {
    email,
    message,
    submittedAt: new Date().toISOString(),
  };

  try {
    const response = await sendFormDataMock("/api/contact-request", payload);

    if (response.status === 200 || response.status === 201) {
      contactRequestStatus.textContent =
        "Yhteydenottopyyntö lähetettiin onnistuneesti.";
      contactRequestStatus.classList.remove("contact-modal__status--error");
      contactRequestStatus.classList.add("contact-modal__status--success");

      const emailField = contactRequestForm.querySelector(
        '[name="contactEmail"]',
      );

      const messageField = contactRequestForm.querySelector(
        '[name="contactMessage"]',
      );

      if (emailField) {
        emailField.value = "";
      }

      if (messageField) {
        messageField.value = "";
      }
    } else {
      contactRequestStatus.textContent =
        "Yhteydenottopyynnön lähetys epäonnistui. Yritä uudelleen.";
      contactRequestStatus.classList.add("contact-modal__status--error");
      contactRequestStatus.classList.remove("contact-modal__status--success");
    }
  } catch (error) {
    console.error("Contact request submit failed:", error);

    contactRequestStatus.textContent =
      "Yhteydenottopyynnön lähetys epäonnistui. Yritä uudelleen.";
    contactRequestStatus.classList.add("contact-modal__status--error");
    contactRequestStatus.classList.remove("contact-modal__status--success");
  }
}

function handleContactRequestReset() {
  contactRequestStatus.textContent = "";
  contactRequestStatus.classList.remove("contact-modal__status--error");
  contactRequestStatus.classList.remove("contact-modal__status--success");
}
