// -------------------------
// Class Question
// The Question class represents a single question that will be shown
// to the user in the questionnaire. Each question contains its own
// list of Answer objects.
//
// Example:
// Question: "What is your status?"
// Answers:
//   1: "Tutkinto-opiskelija"
//   2: "Alumni"
//   3: "Ei kumpikaan"
// -------------------------

export class Question {
  constructor(
    id,
    text,
    multipleChoice = false,
    answers = [],
    type = "radio",
    placeholder = "",
    condition = null,
    summaryText = null,
  ) {
    this.id = id;
    this.text = text; //The question text displayed to the user (e.g., "What is your status?").
    this.summaryText = summaryText;
    this.multipleChoice = multipleChoice; // Defines whether the user can select more than one answer (true/false).
    this.answers = answers; // An array of Answer objects representing all possible answer options.
    this.type = type; // "radio", "checkbox" tai "select"
    this.placeholder = placeholder; // esim. selectille
    this.condition = condition; // Ehto, joka määrittää, näytetäänkö tämä kysymys.
    // Esimerkiksi: { questionId: 1, answerId: 1 } tarkoittaa, että tämä kysymys näytetään vain,
    // jos käyttäjä on vastannut "Tutkinto-opiskelija" (id=1) kysymykseen "What is your status?" (id=1).
  }

  static fromData(data) {
    const question = new Question(
      data.id,
      data.text,
      data.multipleChoice ?? false,
      [],
      data.type ?? "radio",
      data.placeholder ?? "",
      data.condition
        ? {
            questionId: data.condition.questionId,
            answerIds: [...(data.condition.answerIds ?? [])],
          }
        : null,
      data.summaryText ?? null,
    );

    (data.answers ?? []).forEach((answer) => {
      question.addAnswer(Answer.fromData(answer));
    });

    return question;
  }

  addAnswer(answer) {
    // Adds a new Answer object to the list of possible answers for this question
    this.answers.push(answer);
  }

  // Sets a condition for this question based on the answer to a parent question.
  setCondition(parentQuestionId, requiredAnswerIds) {
    if (parentQuestionId === undefined || parentQuestionId === null) {
      throw new Error("parentQuestionId is required for condition");
    }

    if (
      requiredAnswerIds === undefined ||
      requiredAnswerIds === null ||
      (Array.isArray(requiredAnswerIds) && requiredAnswerIds.length === 0)
    ) {
      throw new Error("requiredAnswerIds must be a value or a non-empty array");
    }

    this.condition = {
      questionId: parentQuestionId,
      answerIds: Array.isArray(requiredAnswerIds) // If requiredAnswerIds is already an array,
        ? requiredAnswerIds // use it as is;
        : [requiredAnswerIds], // otherwise, wrap it in an array
    };
  }
}

// -------------------------
// Class Answer
// The Answer class represents a single answer option for a question.
// Each question contains its own list of Answer objects.
// For the question "What is your status?", one possible answer could be:
//  id: 1,
//  text: "Tutkinto-opiskelija"
// -------------------------
export class Answer {
  constructor(id, text) {
    this.id = id;
    this.text = text; //The visible text that will be shown to the user in the UI
  }

  static fromData(data) {
    return new Answer(data.id, data.text);
  }
}
