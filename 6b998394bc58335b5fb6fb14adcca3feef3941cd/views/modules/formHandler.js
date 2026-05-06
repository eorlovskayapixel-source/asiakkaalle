import { questions } from "../../data/questions.js";
import { findMatchingCourses } from "../../index.js";
import { getT } from "./language.js";
import { openEmailModal } from "./modalHandler.js";

import { QuestionRenderer } from "./questionRenderer.js";
//
const formElement = document.getElementById("questionForm");

let renderer;

// Palauttaa käännetyt vastaustekstit tietylle kysymykselle.
// Jos käännöstä ei ole — palauttaa alkuperäisen tekstin questions.js:stä.
function getAnswerTexts(questionId) {
  const t = getT();
  const key = `q${questionId}_a`;
  const question = questions.find((q) => q.id === questionId);

  if (!question) {
    return [];
  }

  return question.answers.map((answer) => {
    const translated = t[key + answer.id];
    return translated ?? answer.text;
  });
}

// Palauttaa käännetyn kysymyksen otsikon.
// Jos käännöstä ei ole — palauttaa alkuperäisen tekstin questions.js:stä.
function getQuestionText(questionId) {
  const t = getT();
  const translated = t[`q${questionId}_text`];
  const question = questions.find((q) => q.id === questionId);

  if (!question) {
    return "";
  }

  return translated ?? question.text;
}

// Käsittelee kyselylomakkeen lähetyksen QuestionRenderer-luokan avulla.
function handleSubmit() {
  const validation = renderer.validate();

  if (!validation.isValid) {
    alert(getT().alertFillAllVisibleQuestions);
    return;
  }

  const userAnswers = renderer.getAnswers();

  sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
  document.getElementById("myBlock").style.display = "block";

  updateRecommendations();
}

// Alustaa kysymyslomakkeen renderöinnin.
export function initQuestions() {
  if (!formElement) {
    console.error("questionForm not found");
    return;
  }

  renderer = new QuestionRenderer({
    formElement,
    questions,
    getQuestionText,
    getAnswerTexts,
    onChange: () => {
      updateProgressBar(renderer);
    },
    onSubmit: handleSubmit,
  });

  renderer.render();
  updateProgressBar(renderer);
}

// Piirtää kysymyslomakkeen uudelleen esimerkiksi kielenvaihdon yhteydessä.
export function refreshQuestionForm() {
  if (!renderer) {
    return;
  }

const scrollPosition = window.scrollY;///////////////////////////////////////////////

  renderer.render();
  updateProgressBar(renderer);

  const myBlock = document.getElementById("myBlock");

  if (myBlock && myBlock.style.display !== "none") {
    updateRecommendations();
  }
  window.scrollTo(0, scrollPosition);
}
/////////////////////////////////////////////////////////////////////
//const formElement = document.getElementById("questionForm");
const progressBar = document.getElementById("progress-bar");

const recommendationTitle = document.getElementById("recommendationTitle");
const recommendationStage = document.getElementById("recommendationStage");
const recommendationIntro = document.getElementById("recommendationIntro");
const recommendationList = document.getElementById("recommendationList");
const summaryList = document.getElementById("summaryList");

const contactCtaResult = document.getElementById("contactCtaResult");
const feedbackCta = document.getElementById("feedbackCta");

// Palauttaa käännetyt vastaustekstit tietylle kysymykselle.
export function attachProgressListeners() {
  if (!formElement) {
    return;
  }

  formElement.querySelectorAll("input, select").forEach((field) => {
    field.addEventListener("change", updateProgressBar);
  });

  formElement.addEventListener("reset", () => {
    window.setTimeout(updateProgressBar, 0);
  });
}

////////////////////////////results block/////////////////////////////

// Päivitetään suositukset käyttäjän vastausten perusteella
export function updateRecommendations(shouldScroll = true) {
  const userAnswers = JSON.parse(sessionStorage.getItem("userAnswers"));

  if (!userAnswers || userAnswers.length === 0) {
    alert(getT().alertNoAnswer);
    return;
  }

  const resultData = buildResultData(userAnswers);
  renderResultView(resultData);

    if (shouldScroll) {
  // Scroll to logo band block after showing the results
  const logoBand = document.getElementById("recommendationDivider");

  if (logoBand) {
    logoBand.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}}

// Rakentaa suositusnäkymän datan käyttäjän vastausten perusteella
function buildResultData(userAnswers) {
  const [matchedCourses, userLevel] = findMatchingCourses(userAnswers);

  const t = getT();

  return {
    title: t.resultTitle,
    stageText: userLevel ? t.levelPrefix + userLevel.text : t.levelUndefined,
    introText: t.resultIntro,

    summary: buildSummaryData(userAnswers),

    recommendations: matchedCourses.map((course) => ({
      name: t[`course_${course.id}_title`] || course.title,
      description:
        t[`course_${course.id}_description`] ||
        course.description ||
        t.noDescription,
      linkText: t.readMore,
      url: course.link || "",
    })),
  };
}

// Rakentaa yhteenvedon kaikista niistä kysymyksistä,
// joihin käyttäjä on vastannut.
function buildSummaryData(userAnswers) {
  return questions
    .map((question) => {
      const answersForQuestion = userAnswers.filter(
        (userAnswer) => userAnswer.questionId === question.id,
      );

      if (answersForQuestion.length === 0) {
        return null;
      }

      const answerTexts = getSummaryAnswerTexts(question, answersForQuestion);

      if (answerTexts.length === 0) {
        return null;
      }

      return {
        label: getSummaryQuestionText(question),
        value: answerTexts.join(", "),
      };
    })
    .filter(Boolean);
}

// Palauttaa summaryssa näytettävän kysymystekstin.
// Jos question.summaryText on määritelty, sitä käytetään.
// Muuten käytetään normaalia käännettyä kysymystekstiä.
function getSummaryQuestionText(question) {
  const t = getT();

  return t[`q${question.id}_summaryText`] ?? getQuestionText(question.id);
}

// Palauttaa käyttäjän valitsemien vastausten tekstit tietylle kysymykselle.
function getSummaryAnswerTexts(question, answersForQuestion) {
  const translatedAnswerTexts = getAnswerTexts(question.id);

  return answersForQuestion
    .map((userAnswer) => {
      const answerIndex = question.answers.findIndex(
        (answer) => answer.id === userAnswer.answerId,
      );

      if (answerIndex === -1) {
        return null;
      }

      return translatedAnswerTexts[answerIndex];
    })
    .filter(Boolean);
}

// Renderöi suositusnäkymän otsikon, vaihetekstin ja johdantotekstin
function renderHeader(data) {
  recommendationTitle.textContent = data.title;
  recommendationStage.textContent = data.stageText;
  recommendationIntro.textContent = data.introText;
}

// Luo yhden suosituskortin HTML-rakenteen JavaScriptissä
function createRecommendationCard(recommendation) {
  const card = document.createElement("article");
  card.classList.add("recommendation-card");

  const linkHtml = recommendation.url
    ? `
      <a 
        href="${recommendation.url}" 
        class="recommendation-card-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        ${recommendation.linkText}
      </a>
    `
    : "";

  card.innerHTML = `
    <h3 class="recommendation-card-title">${recommendation.name}</h3>
    <p class="recommendation-card-description">${recommendation.description}</p>
    ${linkHtml}
  `;

  return card;
}

// Renderöi suositukset näkymään. Jos suosituksia ei löydy, näytetään tyhjä tila -viesti.
function renderRecommendations(recommendations) {
  recommendationList.innerHTML = "";

  if (!recommendations || recommendations.length === 0) {
    const t = getT();

    recommendationList.innerHTML = `
      <div class="empty-state">
        <h3 class="empty-state-title">${t.emptyTitle}</h3>
        <p class="empty-state-text">${t.emptyText}</p>
      </div>
    `;

    return;
  }

  // Lisää PDF ja Email -painikkeet suosituslistan yläosaan
  recommendationList.innerHTML = `
    <div class="actions">
      <button class="action-btn" id="pdfBtn" title="Lataa PDF">
        <svg viewBox="0 0 24 24" class="icon">
          <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 1.5V8h4.5" />
          <path d="M8 13h2.5a1.5 1.5 0 0 1 0 3H8z" />
          <path d="M13 13h3" />
          <path d="M13 16h3" />
        </svg>
      </button>

      <button class="action-btn" id="emailBtn" title="Lähetä sähköpostiin">
        <svg viewBox="0 0 24 24" class="icon">
          <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
          <path d="M22 6l-10 7L2 6" />
        </svg>
      </button>
    </div>
  `;

  const pdfBtn = document.getElementById("pdfBtn");
  const emailBtn = document.getElementById("emailBtn");

  if (pdfBtn) {
    pdfBtn.addEventListener("click", handlePdfClick);
  }

  if (emailBtn) {
    emailBtn.addEventListener("click", openEmailModal);
  }

  // Cards are added to the list
  recommendations.forEach((recommendation) => {
    const card = createRecommendationCard(recommendation);
    recommendationList.appendChild(card);
  });
}

// Renderöi käyttäjän valintojen yhteenvedon näkymän alaosaan
function renderSummary(summary) {
  summaryList.innerHTML = "";

  if (!summary || summary.length === 0) {
    return;
  }

  summary.forEach((summaryItem) => {
    const listItem = document.createElement("li");

    const label = document.createElement("strong");
    label.textContent = `${summaryItem.label} `;

    const value = document.createTextNode(summaryItem.value);

    listItem.appendChild(label);
    listItem.appendChild(value);

    summaryList.appendChild(listItem);
  });
}

// Renderöi koko tulosnäkymän ja näyttää lisäksi
// yhteydenotto- ja palautepainikkeet tulosten yhteydessä
function renderResultView(data) {
  renderHeader(data);
  renderRecommendations(data.recommendations);
  renderSummary(data.summary);
  showResultContactCta();
  showResultFeedbackCta();
}

// Näyttää palautepainikkeen vasta silloin,
// kun käyttäjä on saanut suositukset ja voi arvioida työkalua
function showResultFeedbackCta() {
  if (feedbackCta) {
    feedbackCta.hidden = false;
  }
}

// Näyttää tulososion yhteydenottoboksin vasta silloin,
// kun käyttäjälle on muodostettu suositukset
function showResultContactCta() {
  if (contactCtaResult) {
    contactCtaResult.hidden = false;
  }
}

// Rakentaa payloadin, joka lähetetään backendille PDF:n luontia tai emailin lähettämistä varten
export function buildPayload(email = null) {
  const userAnswers = JSON.parse(sessionStorage.getItem("userAnswers"));

  if (!userAnswers) {
    return null;
  }

  const resultData = buildResultData(userAnswers);

  return {
    email,
    title: resultData.title,
    stageText: resultData.stageText,
    summary: resultData.summary,
    recommendations: resultData.recommendations,
  };
}

// Käsitellään PDF-painikkeen klikkaus
function handlePdfClick() {
  const payload = buildPayload();

  if (!payload) {
    alert("Ei dataa PDF:ää varten");
    return;
  }

  console.log("PDF payload:", payload);
}

export function updateProgressBar(renderer) {
  if (!formElement || !progressBar || !renderer) {
    return;
  }

  const visibleQuestions = renderer.getVisibleQuestions();
  console.log(visibleQuestions.length); //
  console.log(renderer); //
  let answered = 0;

  visibleQuestions.forEach((question) => {
    if (question.type === "select") {
      const select = formElement.querySelector(
        `select[name="question_${question.id}"]`,
      );

      if (select && select.value !== "" /*|| select.disabled*/) {
        answered++;
      }

      return;
    }

    const checked = formElement.querySelectorAll(
      `input[name="question_${question.id}"]:checked`,
    );

    // Single choice -> answered if 1 selected
    // Multiple choice -> answered if >= 1 selected
    if (checked.length > 0) {
      answered++;
    }
  });

  const progress = (answered / visibleQuestions.length) * 100;
  progressBar.style.width = `${progress}%`;
}
