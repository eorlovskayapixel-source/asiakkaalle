import { questions } from "../data/questions.js";
import { QuestionRenderer } from "./modules/questionRenderer.js";

import {
  initLanguage,
  applyTranslations,
  renderHeaderLogos,
  getT,
} from "./modules/language.js";

import {
  updateProgressBar,
  updateRecommendations,
  buildPayload,
} from "./modules/formHandler.js";

import {
  initModalHandler,
  refreshModalTranslations,
} from "./modules/modalHandler.js";

import { initQuestions, refreshQuestionForm } from "./modules/formHandler.js";



document.addEventListener("DOMContentLoaded", () => {
  initQuestions();

  initModalHandler(buildPayload);
//
  initLanguage({
    onLanguageChange: () => {
      refreshModalTranslations();
      refreshQuestionForm();
      renderHeaderLogos();
    },
  });

  applyTranslations();
});
