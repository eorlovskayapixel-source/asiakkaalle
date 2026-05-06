import { Question } from "../models/Question.js";
import { Answer } from "../models/Question.js";

// -------------------------
// Question 1: Status
// -------------------------
const q1 = new Question(
  1,
  "Olen tällä hetkellä:",
  false, // only one option can be selected
  [],
  "radio",
);

q1.addAnswer(new Answer(1, "Tutkinto-opiskelija"));
q1.addAnswer(new Answer(2, "Alumni"));
q1.addAnswer(new Answer(3, "En kumpikaan"));

// -------------------------
// Question 2: Kypsyysaste
// -------------------------
const q2 = new Question(
  2,
  "Mikä seuraavista kuvaa tilannettasi parhaiten?",
  false,
  [],
  "radio",
);

q2.addAnswer(
  new Answer(
    1,
    "Olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa.",
  ),
);

q2.addAnswer(
  new Answer(2, "Minulla on idea, mutta kaipaan apua sen kehittämiseen."),
);

q2.addAnswer(
  new Answer(3, "Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa."),
);

q2.addAnswer(new Answer(4, "Minulla on jo yritys."));

// -------------------------
// Question 3: Tuentarve
// multiple selection allowed
// -------------------------
const q3 = new Question(
  3,
  "Millaiselle tuelle koet tällä hetkellä tarvetta?",
  true, // multipleChoice
  [],
  "checkbox",
);

q3.addAnswer(
  new Answer(
    1,
    "Kaipaan perustietoa yrittäjyydestä ja siitä, mitä se vaatisi minulta.",
  ),
);

q3.addAnswer(
  new Answer(
    2,
    "Tarvitsen lisää yrittäjyysosaamista (esim. tuotteistaminen, markkinointi).",
  ),
);

q3.addAnswer(new Answer(3, "Tukea yrityksen perustamiseen."));
q3.addAnswer(new Answer(4, "Tarvitsen myyntikanavan tuotteilleni."));
q3.addAnswer(new Answer(5, "Tarvitsen rahoitusta ja sparrausta."));
q3.addAnswer(new Answer(6, "Kaipaan vertaistukea."));

// -------------------------
// Question 4: Tutkinto
// -------------------------
const q4 = new Question(
  4,
  "Valitse tutkintosi:",
  false,
  [],
  "select",
  "Valitse tutkinto",
);

q4.setCondition(1, 1);

q4.addAnswer(new Answer(1, "Tradenomi, liiketalous"));
q4.addAnswer(new Answer(2, "Tradenomi, tietojenkäsittely"));
q4.addAnswer(new Answer(3, "International Business"));
q4.addAnswer(new Answer(4, "Sosionomi"));
q4.addAnswer(new Answer(5, "Terveydenhoitaja"));
q4.addAnswer(new Answer(6, "Sairaanhoitaja"));
q4.addAnswer(new Answer(7, "Fysioterapia"));
q4.addAnswer(new Answer(8, "Geronomi"));
q4.addAnswer(new Answer(9, "Toimintaterapeutti"));
q4.addAnswer(new Answer(10, "Metsätalousinsinööri"));
q4.addAnswer(new Answer(11, "Medianomi"));
q4.addAnswer(new Answer(12, "Insinööri, talotekniikka"));
q4.addAnswer(new Answer(13, "Insinööri, rakennustekniikka"));
q4.addAnswer(new Answer(14, "Insinööri, konetekniikka"));
q4.addAnswer(new Answer(15, "Insinööri, energia- ja ympäristötekniikka"));
q4.addAnswer(new Answer(16, "Insinööri, ICT"));
q4.addAnswer(new Answer(17, "Restonomi"));
q4.addAnswer(new Answer(18, "Insinööri, Industrial Management"));
q4.addAnswer(new Answer(19, "Ylempi AMK-tutkinto"));

// -------------------------
// Export all questions
// -------------------------
export const questions = [q1, q4, q2, q3];
