export class QuestionRenderer {
  constructor({
    formElement,
    questions,
    getQuestionText,
    getAnswerTexts,
    getPlaceholderText,
    onChange = null,
    onSubmit = null,
  }) {
    this.formElement = formElement; // HTML-elementti, johon kysymyslomake renderöidään
    this.questions = questions; // Kysymysobjektien lista, jotka määrittelevät lomakkeen rakenteen ja sisällön
    this.getQuestionText = getQuestionText; // Funktio, joka palauttaa kysymystekstin kysymyksen ID:n perusteella
    this.getAnswerTexts = getAnswerTexts; // Funktio, joka palauttaa vastaustekstit tietyn kysymyksen ID:n perusteella
    this.getPlaceholderText = getPlaceholderText; // Funktio, joka palauttaa paikka-tekstin tietyn kysymyksen ID:n perusteella

    this.onChange = onChange; // Callback-funktio, joka kutsutaan aina, kun käyttäjä muuttaa vastaustaan.
    // Tämän avulla voidaan esimerkiksi päivittää edistymispalkki reaaliajassa.

    this.answersState = {}; // Objekti, joka tallentaa käyttäjän valinnat muodossa { questionId: [answerId1, answerId2, ...] }

    this.parentQuestions = questions.filter((q) => !q.condition); // Kysymykset, joilla ei ole ehtoa, eli jotka näytetään aina
    this.childQuestions = questions.filter((q) => q.condition); // Kysymykset, joilla on ehto, eli jotka näytetään vain tiettyjen vastausten perusteella
    this.onSubmit = onSubmit; // Callback-funktio, joka kutsutaan, kun käyttäjä lähettää lomakkeen. Tämän avulla voidaan kerätä vastaukset ja hakea suositukset.
  }

  /* =========================
     Public API
  ========================= */
  // Tämä metodi renderöi koko kysymyslomakkeen formElementtiin. Se rakentaa lomakkeen rakenteen parent- ja child-kysymysten perusteella,
  // ja asettaa tarvittavat event listenerit lomakkeen elementteihin. Lisäksi se päivittää näkyvyyden child-kysymyksille ehtojen perusteella.
  render() {
    this.formElement.innerHTML = "";

    const orderedQuestions = this.getOrderedQuestions();

    orderedQuestions.forEach((question) => {
      const fieldset = this.renderQuestion(question);
      this.formElement.appendChild(fieldset);
    });
    this.renderButtons();
    this.attachListeners();
    this.updateConditionalQuestions();
  }

  // Tämä metodi renderöi lomakkeen alareunaan submit- ja reset-napit,
  //    ja asettaa niille event listenerit, jotka kutsuvat onSubmit- ja reset-metodeja.
  renderButtons() {
    const submitBtn = document.createElement("button");
    submitBtn.type = "button";
    submitBtn.textContent = "Näytä tulokset";
    submitBtn.classList.add("form-button", "form-button-primary");

    if (this.onSubmit) {
      submitBtn.addEventListener("click", this.onSubmit);
    }

    const resetBtn = document.createElement("button");
    resetBtn.type = "reset";
    resetBtn.textContent = "Tyhjennä lomake";
    resetBtn.classList.add("form-button", "form-button-secondary");

    const wrapper = document.createElement("div");
    wrapper.classList.add("form-buttons");

    wrapper.appendChild(submitBtn);
    wrapper.appendChild(resetBtn);

    this.formElement.appendChild(wrapper);
  }

  // Tämä metodi palauttaa käyttäjän valinnat muodossa [{ questionId: 1, answerId: 2 }, ...],
  // joka voidaan sitten käyttää suositusten hakemiseen.
  getAnswers() {
    const result = [];

    Object.entries(this.answersState).forEach(([questionId, answerIds]) => {
      answerIds.forEach((answerId) => {
        result.push({
          questionId: Number(questionId),
          answerId: Number(answerId),
        });
      });
    });

    return result;
  }
  // Tämä metodi tyhjentää kaikki käyttäjän valinnat ja palauttaa lomakkeen alkuperäiseen tilaan.
  // Se myös päivittää child-kysymysten näkyvyyden ehtojen perusteella.
  reset() {
    this.answersState = {};
    this.updateConditionalQuestions();
    if (this.onChange) this.onChange(this.answersState);// Tyhjennä lomake ja päivitä tila, jotta edistymispalkki ja muut elementit päivittyvät oikein.
  }

  /* =========================
     Ordering
  ========================= */

  //Rakentaa järjestetyn listan:  parent → sen child-kysymykset
  getOrderedQuestions() {
    const ordered = [];

    this.parentQuestions.forEach((parent) => {
      ordered.push(parent);

      const children = this.childQuestions.filter(
        (child) => child.condition?.questionId === parent.id,
      );

      ordered.push(...children);
    });

    return ordered;
  }

  /* =========================
     Rendering
  ========================= */
  // Tämä metodi renderöi yksittäisen kysymyksen fieldset-elementiksi, joka sisältää kysymystekstin ja vastausvaihtoehdot.
  renderQuestion(question) {
    const fieldset = document.createElement("fieldset");
    fieldset.dataset.questionId = question.id;

    const title = document.createElement("div");
    title.classList.add("question-title");
    title.textContent = this.getQuestionText(question.id);
    fieldset.appendChild(title);

    if (question.type === "select") {
      fieldset.appendChild(this.renderSelect(question));
    } else {
      fieldset.appendChild(this.renderInputs(question));
    }

    return fieldset;
  }
  // Tämä metodi renderöi kysymyksen vastausvaihtoehdot input-elementteinä (radio tai checkbox)
  // ja label-elementteinä, jotka sisältävät vastaustekstin.
  renderInputs(question) {
    const wrapper = document.createElement("div");
    const answerTexts = this.getAnswerTexts(question.id);

    question.answers.forEach((answer, index) => {
      const label = document.createElement("label");

      const input = document.createElement("input");
      input.type = question.type === "checkbox" ? "checkbox" : "radio";
      input.name = `question_${question.id}`;
      input.value = answer.id;

      label.appendChild(input);
      label.appendChild(document.createTextNode(" " + answerTexts[index]));
      wrapper.appendChild(label);
    });

    return wrapper;
  }
  // Tämä metodi renderöi kysymyksen vastausvaihtoehdot select-elementtinä, jossa on option-elementtejä,
  // jotka sisältävät vastaustekstin.
  renderSelect(question) {
    const select = document.createElement("select");
    select.name = `question_${question.id}`;

    select.id = `question_${question.id}`;
    select.classList.add("question-select");

    const placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.hidden = true;
    const translatedPlaceholder = this.getPlaceholderText
    ? this.getPlaceholderText(question.id)
    : null;

    placeholder.textContent = translatedPlaceholder || question.placeholder || "—";
    select.appendChild(placeholder);

    const answerTexts = this.getAnswerTexts(question.id);

    question.answers.forEach((answer, index) => {
      const option = document.createElement("option");
      option.value = answer.id;
      option.textContent = answerTexts[index];
      select.appendChild(option);
    });

    return select;
  }

  /* =========================
     State & Logic
  ========================= */
  // Tämä metodi asettaa event listenerit lomakkeen elementteihin, jotka kuuntelevat käyttäjän muutoksia.
  // Kun käyttäjä muuttaa vastaustaan, se päivittää answersState-objektin ja kutsuu onChange-callbackia, jos se on määritetty.
  attachListeners() {
    this.formElement.addEventListener("change", (e) => {
      const target = e.target;
      const name = target.name;

      if (!name || !name.startsWith("question_")) return;

      const questionId = Number(name.replace("question_", ""));
      this.updateAnswersState(questionId);
      this.updateConditionalQuestions();

      if (this.onChange) {
        this.onChange(this.answersState);
      }
    });
// Lisäksi lomakkeelle asetetaan reset-event listener, joka kutsuu reset-metodia, kun käyttäjä klikkaa "Tyhjennä lomake" -nappia. Tämä varmistaa, että kaikki vastaukset tyhjennetään ja lomake palautetaan alkuperäiseen tilaan.
    this.formElement.addEventListener("reset", () => {
      setTimeout(() => this.reset(), 0);
    });
  }
  // Tämä metodi päivittää answersState-objektin käyttäjän valintojen perusteella. Se hakee kaikki input- tai select-elementit,
  // jotka liittyvät tiettyyn kysymykseen, ja tallentaa niiden valinnat answersStateen muodossa { questionId: [answerId1, answerId2, ...] }.
  updateAnswersState(questionId) {
    const inputs = this.formElement.querySelectorAll(
      `[name="question_${questionId}"]`,
    );

    const values = [];

    inputs.forEach((input) => {
      if (
        (input.type === "checkbox" || input.type === "radio") &&
        input.checked
      ) {
        values.push(Number(input.value));
      }

      if (input.tagName === "SELECT" && input.value !== "") {
        values.push(Number(input.value));
      }
    });

    if (values.length > 0) {
      this.answersState[questionId] = values;
    } else {
      delete this.answersState[questionId];
    }
  }
  // Tämä metodi päivittää child-kysymysten näkyvyyden ehtojen perusteella. Se tarkistaa jokaisen child-kysymyksen
  // condition-objektin ja vertaa sitä answersStateen. Jos ehdot täyttyvät, child-kysymys näytetään; muuten se
  // piilotetaan ja sen vastaukset tyhjennetään.
  updateConditionalQuestions() {
    this.childQuestions.forEach((question) => {
      const fieldset = this.formElement.querySelector(
        `fieldset[data-question-id="${question.id}"]`,
      );

      if (!fieldset) return;

      const visible = this.isConditionMet(question);
      fieldset.style.display = visible ? "" : "none";

      if (!visible) {
        this.clearAnswers(question.id);
      }
    });
  }
  // Tämä metodi tarkistaa, täyttyvätkö child-kysymyksen ehdot answersStateen perustuen.
  // Se hakee condition-objektista questionId:n ja answerIds:n, ja tarkistaa, onko käyttäjä valinnut jonkin
  // iistä answerIds:stä kyseiseen questionId:hen.
  isConditionMet(question) {
    if (!question.condition) return true;

    const { questionId, answerIds } = question.condition;
    const userAnswers = this.answersState[questionId];

    if (!userAnswers) return false;

    return userAnswers.some((id) => answerIds.includes(id));
  }
  // Tämä metodi tyhjentää kysymyksen vastaukset answersState-objektista ja lomakkeen elementeistä.
  // Se hakee kaikki input- tai select-elementit, jotka liittyvät tiettyyn kysymykseen, ja nollaa niiden tilan
  // (esim. uncheckaa checkboxit ja radiot, resetoi selectin).
  clearAnswers(questionId) {
    delete this.answersState[questionId];

    const fields = this.formElement.querySelectorAll(
      `[name="question_${questionId}"]`,
    );

    fields.forEach((field) => {
      if (field.type === "checkbox" || field.type === "radio") {
        field.checked = false;
      }
      if (field.tagName === "SELECT") {
        field.value = "";
      }
    });
  }

  /* =========================
     Validation
  ========================= */
  // Tämä metodi tarkistaa, että kaikki näkyvissä olevat kysymykset on vastattu.
  // Se hakee kaikki näkyvissä olevat kysymykset getVisibleQuestions-metodilla, ja tarkistaa,
  // onko niille tallennettu vastaukset answersStateen.
  // Se palauttaa objektin muodossa { isValid: true/false, invalidQuestions: [...] },
  // jossa isValid kertoo, ovatko kaikki näkyvissä olevat kysymykset vastattu, ja invalidQuestions
  // sisältää listan niistä kysymyksistä, joihin ei ole vastattu.
  validate() {
    const visibleQuestions = this.getVisibleQuestions();

    const invalidQuestions = visibleQuestions.filter((question) => {
      return !this.answersState[question.id];
    });

    return {
      isValid: invalidQuestions.length === 0,
      invalidQuestions,
    };
  }
  // Tämä metodi hakee kaikki näkyvissä olevat kysymykset ehtojen perusteella.
  // Se suodattaa questions-listan ja palauttaa vain ne kysymykset, joiden condition-ehdot täyttyvät answersStateen perustuen.
  getVisibleQuestions() {
    return this.questions.filter((question) => {
      if (!question.condition) return true;

      const { questionId, answerIds } = question.condition;
      const userAnswers = this.answersState[questionId];

      if (!userAnswers) return false;

      return userAnswers.some((id) => answerIds.includes(id));
    });
  }
}
