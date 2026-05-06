import { translations } from "../../data/translations.js";

let currentLang = "fi";

export function getLang() {
  return currentLang;
}

export function getT() {
  return translations[currentLang];
}


export function initLanguage({ onLanguageChange } = {}) {
  const langBtn = document.getElementById("langToggleBtn");
  if (!langBtn) return;

  langBtn.textContent = getT().langButton;

  langBtn.addEventListener("click", () => {
    currentLang = currentLang === "fi" ? "en" : "fi";
    langBtn.textContent = getT().langButton;
    applyTranslations();
    renderHeaderLogos(); // <-- здесь логично
    if (typeof onLanguageChange === "function") {
      onLanguageChange();
    }
  });
}


export function renderHeaderLogos() {
  const logosWrap = document.getElementById("headerLogos");
  if (!logosWrap) return;

  const logos = getT().headerLogos ?? [];

  logosWrap.innerHTML = "";

  logos.forEach((src) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Partner logo";
    img.className = "header-logo";
    img.loading = "lazy";
    logosWrap.appendChild(img);
  });
}


export function applyTranslations() {
  const t = getT();

  const titleEl = document.querySelector(
    ".recommendation-title:not(#recommendationTitle)",
  );

  if (titleEl) {
    titleEl.textContent = t.pageTitle;
  }

  const introEl = document.querySelector(
    ".recommendation-intro:not(#recommendationIntro)",
  );

  if (introEl) {
    introEl.textContent = t.pageIntro;
  }

  const ctaTitleEl = document.getElementById("contactCtaTopTitle");
  if (ctaTitleEl) {
    ctaTitleEl.textContent = t.ctaTitle;
  }

  const ctaTextEl = ctaTitleEl
    ?.closest(".contact-cta")
    ?.querySelector(".contact-cta__text");

  if (ctaTextEl) {
    ctaTextEl.textContent = t.ctaText;
  }

  const ctaBtnEl = document.getElementById("openContactModalTop");
  if (ctaBtnEl) {
    ctaBtnEl.textContent = t.ctaButton;
  }

  const resultCtaTitleEl = document.getElementById("contactCtaResultTitle");
  if (resultCtaTitleEl) {
    resultCtaTitleEl.textContent = t.resultCtaTitle;
  }

  const resultCtaTextEl = resultCtaTitleEl
    ?.closest(".contact-cta")
    ?.querySelector(".contact-cta__text");

  if (resultCtaTextEl) {
    resultCtaTextEl.textContent = t.resultCtaText;
  }

  const resultCtaBtnEl = document.getElementById("openContactModalResult");
  if (resultCtaBtnEl) {
    resultCtaBtnEl.textContent = t.resultCtaButton;
  }

  const feedbackTitleEl = document.getElementById("feedbackCtaTitle");
  if (feedbackTitleEl) {
    feedbackTitleEl.textContent = t.feedbackTitle;
  }

  const feedbackTextEl = feedbackTitleEl
    ?.closest(".feedback-cta")
    ?.querySelector(".feedback-cta__text");

  if (feedbackTextEl) {
    feedbackTextEl.textContent = t.feedbackText;
  }

  const feedbackBtnEl = document.getElementById("openFeedbackModal");
  if (feedbackBtnEl) {
    feedbackBtnEl.textContent = t.feedbackButton;
  }

  const summaryTitleEl = document.querySelector(".summary-title");
  if (summaryTitleEl) {
    summaryTitleEl.textContent = t.summaryTitle;
  }

  const footerLayout = document.getElementById("footerLayout");

  if (footerLayout) {
    const footerCopyEl = footerLayout.querySelector(".footer-content > p");
    if (footerCopyEl) {
      footerCopyEl.textContent = t.footerCopy;
    }

    const footerLinks = footerLayout.querySelectorAll(".footer-links a");
    if (footerLinks[0]) footerLinks[0].textContent = t.footerPrivacy;
    if (footerLinks[1]) footerLinks[1].textContent = t.footerTerms;
    if (footerLinks[2]) footerLinks[2].textContent = t.footerContact;
  }
}
