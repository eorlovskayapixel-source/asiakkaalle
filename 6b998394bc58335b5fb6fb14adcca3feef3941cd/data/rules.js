// data/rules.js
import { Rule } from "../models/Rule.js";
//import { courses } from "./courses.js";

// Empti arrey to hold the rules
export const rules = [];

//-------------------------
// 1. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa]
// ja / tai [Tuentarve = Kaipaan perustietoa yrittäjyydestä ja siitä, mitä se vaatisi minulta],
// Level 1, Minustako yrittäjä, Realistic Business Idea
// -------------------------

// rule 1 -------------------------------
// IF:
// Status = 1 (Tutkinto-opiskelija)
// Kypsyysaste = 1 (Olen kiinnostunut yrittäjyydestä...)
// Tuentarve = 1 (Kaipaan perustietoa yrittäjyydestä...)
//
// → THEN "Minustako yrittäjä, Realistic Business Idea"
const rule1 = new Rule({
  id: 1,
  courseIds: [3, 1],
  levelId: 1,
});
rule1.addPair(1, 1); // q1 id=1, answer id=1
rule1.addPair(2, 1); // q2 id=2, answer id=1
rule1.addPair(3, 1); // q3 id=3, answer id=1

rules.push(rule1);

//-------------------------
// 2. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa]
// ja / tai [Tuentarve =Tarvitsen lisää yrittäjyysosaamista (esim. tuotteistaminen, markkinointi).],
// Level 1, Minustako yrittäjä, Realistic Business Idea, Yrittäjyyden TOP-opinnot
// -------------------------

// rule 2 -------------------------------
// IF:
// Status = 1 (Tutkinto-opiskelija)
// Kypsyysaste = 1 (Olen kiinnostunut yrittäjyydestä...)
// Tuentarve = 2 (Tarvitsen lisää yrittäjyysosaamista...)
// → "Minustako yrittäjä, Realistic Business Idea, Yrittäjyyden TOP-opinnot"
const rule2 = new Rule({
  id: 2,
  courseIds: [3, 1, 5],
  levelId: 1,
});
rule2.addPair(1, 1); // q1
rule2.addPair(2, 1); // q2
rule2.addPair(3, 2); // q3

rules.push(rule2);

//-------------------------
// 3. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa]
// ja / tai [Tuentarve =Tukea yrityksen perustamiseen],
// Level 1, Minustako yrittäjä, Realistic Business Idea, Yrittäjyyden TOP-opinnot
// -------------------------

// rule 3 -------------------------------
// IF:
// Status = 1 (Tutkinto-opiskelija)
// Kypsyysaste = 1 (Olen kiinnostunut yrittäjyydestä...)
// Tuentarve = 2 (Tukea yrityksen perustamiseen)
// → "Minustako yrittäjä, Realistic Business Idea, Yrittäjyyden TOP-opinnot"
const rule3 = new Rule({
  id: 3,
  courseIds: [3, 1, 5],
  levelId: 1,
});

rule3.addPair(1, 1); // q1
rule3.addPair(2, 1); // q2
rule3.addPair(3, 3); // q3

rules.push(rule3);

//-------------------------
// 4. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa]
// ja / tai [Tuentarve =Tarvitsen myyntikanavan tuotteilleni.] - 4 -,
// Taituri-verkkokauppa - 6 -
// -------------------------
const rule4 = new Rule({
  id: 4,
  courseIds: [6],
});
rule4.addPair(1, 1); // q1
rule4.addPair(2, 1); // q2
rule4.addPair(3, 4); // q3

rules.push(rule4);

//-------------------------
// 5. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa]
// ja / tai [Tuentarve = Tarvitsen rahoitusta ja sparrausta.],
// Level 1, Minustako yrittäjä, Realistic Business Idea, Yrittäjyyden TOP-opinnot
// -------------------------

const rule5 = new Rule({
  id: 5,
  courseIds: [3, 1, 5],
  levelId: 1,
});

rule5.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule5.addPair(2, 1); // q2 = Olen kiinnostunut yrittäjyydestä...
rule5.addPair(3, 5); // q3 = Tarvitsen rahoitusta ja sparrausta.

rules.push(rule5);

//-------------------------
// 6. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa]
// ja / tai [Tuentarve = Tarvitsen vertaistukea.],
// Level 1, Minustako yrittäjä, Realistic Business Idea, Yrittäjyyden TOP-opinnot,
// Y-akatemia, JoES, Pohjois-Karjalan Nuoret Yrittäjät
// -------------------------

const rule6 = new Rule({
  id: 6,
  courseIds: [3, 1, 5, 13, 8, 16],
  levelId: 1,
});

rule6.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule6.addPair(2, 1); // q2 = Olen kiinnostunut yrittäjyydestä...
rule6.addPair(3, 6); // q3 = Kaipaan vertaistukea.

rules.push(rule6);

//-------------------------
// 7. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on idea, mutta kaipaan apua sen kehittämiseen.]
// ja [Tuentarve = Kaipaan perustietoa yrittäjyydestä ja siitä, mitä se vaatisi minulta],
// Level 2, Yritysidea kokeiluun, Yrittäjyyden TOP-opinnot
// -------------------------

const rule7 = new Rule({
  id: 7,
  courseIds: [2, 5],
  levelId: 2,
});

rule7.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule7.addPair(2, 2); // q2 = Minulla on idea, mutta kaipaan apua sen kehittämiseen.
rule7.addPair(3, 1); // q3 = Kaipaan perustietoa yrittäjyydestä...

rules.push(rule7);

//-------------------------
// 8. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on idea, mutta kaipaan apua sen kehittämiseen.]
// ja [Tuentarve = Tarvitsen lisää yrittäjyysosaamista (esim. tuotteistaminen, markkinointi)],
// Level 2, Yritysidea kokeiluun, Yrittäjyyden TOP-opinnot
// -------------------------

const rule8 = new Rule({
  id: 8,
  courseIds: [2, 5],
  levelId: 2,
});

rule8.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule8.addPair(2, 2); // q2 = Minulla on idea, mutta kaipaan apua sen kehittämiseen.
rule8.addPair(3, 2); // q3 = Tarvitsen lisää yrittäjyysosaamista...

rules.push(rule8);

//-------------------------
// 9. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on idea, mutta kaipaan apua sen kehittämiseen.]
// ja [Tuentarve = Tukea yrityksen perustamiseen.],
// Level 3, Yritysidea kokeiluun, Yrittäjyyden TOP-opinnot, Draft
// -------------------------

const rule9 = new Rule({
  id: 9,
  courseIds: [2, 5, 7],
  levelId: 3,
});

rule9.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule9.addPair(2, 2); // q2 = Minulla on idea, mutta kaipaan apua sen kehittämiseen.
rule9.addPair(3, 3); // q3 = Tukea yrityksen perustamiseen.

rules.push(rule9);

//-------------------------
// 10. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on idea, mutta kaipaan apua sen kehittämiseen.]
// ja [Tuentarve = Tarvitsen myyntikanavan tuotteilleni],
// Level 3, Taituri.fi-verkkokauppa
// -------------------------

const rule10 = new Rule({
  id: 10,
  courseIds: [6],
  levelId: 3,
});

rule10.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule10.addPair(2, 2); // q2 = Minulla on idea, mutta kaipaan apua sen kehittämiseen.
rule10.addPair(3, 4); // q3 = Tarvitsen myyntikanavan tuotteilleni.

rules.push(rule10);

//-------------------------
// 11. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on idea, mutta kaipaan apua sen kehittämiseen.]
// ja [Tuentarve = Tarvitsen rahoitusta ja sparrausta],
// Level 3, Draft, INVEST Incubator -hautomo-ohjelma
// -------------------------

const rule11 = new Rule({
  id: 11,
  courseIds: [7, 14],
  levelId: 3,
});

rule11.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule11.addPair(2, 2); // q2 = Minulla on idea, mutta kaipaan apua sen kehittämiseen.
rule11.addPair(3, 5); // q3 = Tarvitsen rahoitusta ja sparrausta.

rules.push(rule11);

//-------------------------
// 12. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on idea, mutta kaipaan apua sen kehittämiseen.]
// ja [Tuentarve = Kaipaan vertaistukea.],
// Level 3, Draft, Y-akatemia, JoES, Pohjois-Karjalan Nuoret Yrittäjät
// -------------------------

const rule12 = new Rule({
  id: 12,
  courseIds: [7, 13, 8, 16],
  levelId: 3,
});

rule12.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule12.addPair(2, 2); // q2 = Minulla on idea, mutta kaipaan apua sen kehittämiseen.
rule12.addPair(3, 6); // q3 = Kaipaan vertaistukea.

rules.push(rule12);

//-------------------------
// 13. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.]
// ja [Tuentarve = Kaipaan perustietoa yrittäjyydestä ja siitä, mitä se vaatisi minulta],
// Level 2, Yritysidea kokeiluun, Draft
// -------------------------

const rule13 = new Rule({
  id: 13,
  courseIds: [2, 7],
  levelId: 2,
});

rule13.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule13.addPair(2, 3); // q2 = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.
rule13.addPair(3, 1); // q3 = Kaipaan perustietoa yrittäjyydestä...

rules.push(rule13);

//-------------------------
// 14. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.]
// ja [Tuentarve = Tarvitsen lisää yrittäjyysosaamista],
// Level 2, Yritysidea kokeiluun, Draft, Yrittäjyyden TOP-opinnot
// -------------------------

const rule14 = new Rule({
  id: 14,
  courseIds: [2, 7, 5],
  levelId: 2,
});

rule14.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule14.addPair(2, 3); // q2 = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.
rule14.addPair(3, 2); // q3 = Tarvitsen lisää yrittäjyysosaamista...

rules.push(rule14);

//-------------------------
// 15. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.]
// ja [Tuentarve = Tukea yrityksen perustamiseen],
// Level 3, Draft, Yrittäjyyden TOP-opinnot, Yritysneuvonta
// -------------------------

const rule15 = new Rule({
  id: 15,
  courseIds: [7, 5, 15],
  levelId: 3,
});

rule15.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule15.addPair(2, 3); // q2 = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.
rule15.addPair(3, 3); // q3 = Tukea yrityksen perustamiseen.

rules.push(rule15);

//-------------------------
// 16. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.]
// ja [Tuentarve = Tarvitsen myyntikanavan tuotteilleni],
// Level 2, Taituri.fi-verkkokauppa
// -------------------------

const rule16 = new Rule({
  id: 16,
  courseIds: [6],
  levelId: 2,
});

rule16.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule16.addPair(2, 3); // q2 = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.
rule16.addPair(3, 4); // q3 = Tarvitsen myyntikanavan tuotteilleni.

rules.push(rule16);

//-------------------------
// 17. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.]
// ja [Tuentarve = Tarvitsen rahoitusta ja sparrausta.],
// Level 4, Draft, Otsakorven säätiö, Joensuu Startup Fund, Yritysneuvonta
// -------------------------

const rule17 = new Rule({
  id: 17,
  courseIds: [7, 11, 12, 15],
  levelId: 4,
});

rule17.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule17.addPair(2, 3); // q2 = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.
rule17.addPair(3, 5); // q3 = Tarvitsen rahoitusta ja sparrausta.

rules.push(rule17);

//-------------------------
// 18. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.]
// ja [Tuentarve = Kaipaan vertaistukea.],
// Level 3, Draft, JoES
// -------------------------

const rule18 = new Rule({
  id: 18,
  courseIds: [7, 8],
  levelId: 3,
});

rule18.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule18.addPair(2, 3); // q2 = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.
rule18.addPair(3, 6); // q3 = Kaipaan vertaistukea.

rules.push(rule18);

//-------------------------
// 19. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on jo yritys.]
// ja [Tuentarve = Kaipaan perustietoa yrittäjyydestä ja siitä, mitä se vaatisi minulta],
// Level 2, Yritysidea kokeiluun, Yrittäjyyden TOP-opinnot, Draft
// -------------------------

const rule19 = new Rule({
  id: 19,
  courseIds: [2, 5, 7],
  levelId: 2,
});

rule19.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule19.addPair(2, 4); // q2 = Minulla on jo yritys.
rule19.addPair(3, 1); // q3 = Kaipaan perustietoa yrittäjyydestä...

rules.push(rule19);

//-------------------------
// 20. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on jo yritys.]
// ja [Tuentarve = Tarvitsen lisää yrittäjyysosaamista],
// Level 2, Yritysidea kokeiluun, Draft, Yrittäjyyden TOP-opinnot
// -------------------------

const rule20 = new Rule({
  id: 20,
  courseIds: [2, 7, 5],
  levelId: 2,
});

rule20.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule20.addPair(2, 4); // q2 = Minulla on jo yritys.
rule20.addPair(3, 2); // q3 = Tarvitsen lisää yrittäjyysosaamista...

rules.push(rule20);

//-------------------------
// 21. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on jo yritys.]
// ja [Tuentarve = Tukea yrityksen perustamiseen],
// Level 3, Draft, Yrittäjyyden TOP-opinnot, Yritysneuvonta
// -------------------------

const rule21 = new Rule({
  id: 21,
  courseIds: [7, 5, 15],
  levelId: 3,
});

rule21.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule21.addPair(2, 4); // q2 = Minulla on jo yritys.
rule21.addPair(3, 3); // q3 = Tukea yrityksen perustamiseen.

rules.push(rule21);

//-------------------------
// 22. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on jo yritys.]
// ja [Tuentarve = Tarvitsen myyntikanavan tuotteilleni],
// Level 2, Taituri.fi-verkkokauppa
// -------------------------

const rule22 = new Rule({
  id: 22,
  courseIds: [6],
  levelId: 2,
});

rule22.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule22.addPair(2, 4); // q2 = Minulla on jo yritys.
rule22.addPair(3, 4); // q3 = Tarvitsen myyntikanavan tuotteilleni.

rules.push(rule22);

//-------------------------
// 23. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on jo yritys.]
// ja [Tuentarve = Tarvitsen rahoitusta ja sparrausta.],
// Level 4, Draft, Otsakorven säätiö, Joensuu Startup Fund, Yritysneuvonta
// -------------------------

const rule23 = new Rule({
  id: 23,
  courseIds: [7, 11, 12, 15],
  levelId: 4,
});

rule23.addPair(1, 1); // q1
rule23.addPair(2, 4); // q2
rule23.addPair(3, 5); // q3

rules.push(rule23);

//-------------------------
// 24. Jos [ status = Tutkinto-opiskelija] ja [Kypsyysaste = Minulla on jo yritys.]
// ja [Tuentarve = Kaipaan vertaistukea.],
// Level 3, Draft, JoES
// -------------------------

const rule24 = new Rule({
  id: 24,
  courseIds: [7, 8],
  levelId: 3,
});

rule24.addPair(1, 1); // q1 = Tutkinto-opiskelija
rule24.addPair(2, 4); // q2 = Minulla on jo yritys.
rule24.addPair(3, 6); // q3 = Kaipaan vertaistukea.

rules.push(rule24);

//-------------------------
// 25. Jos [ status = Alumni] ja [Kypsyysaste = Olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa.]
// ja [Tuentarve = mikä tahansa],
// Minustako yrittäjä, Avoin AMK
// -------------------------

const rule25 = new Rule({
  id: 25,
  courseIds: [3, 9],
});

rule25.addPair(1, 2); // q1 = Alumni
rule25.addPair(2, 1); // q2 = Olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa.

// Ei q3-paria, koska tuentarve voi olla mikä tahansa

rules.push(rule25);

//-------------------------
// 26. Jos [ status = Ei kumpikaan] ja [Kypsyysaste = Olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa.]
// ja [Tuentarve = mikä tahansa],
// Minustako yrittäjä, Avoin AMK
// -------------------------

const rule26 = new Rule({
  id: 26,
  courseIds: [3, 9],
});

rule26.addPair(1, 3); // q1 = Ei kumpikaan
rule26.addPair(2, 1); // q2 = Olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa.

// Ei q3-paria, koska tuentarve voi olla mikä tahansa

rules.push(rule26);

//-------------------------
// 27. Jos [ status = Alumni] ja [Kypsyysaste = Minulla on idea, mutta kaipaan apua sen kehittämiseen.]
// ja [Tuentarve = mikä tahansa],
// Avoin AMK, Draft
// -------------------------

const rule27 = new Rule({
  id: 27,
  courseIds: [9, 7],
});

rule27.addPair(1, 2); // q1 = Alumni
rule27.addPair(2, 2); // q2 = Minulla on idea, mutta kaipaan apua sen kehittämiseen.

// Ei q3-paria, koska tuentarve voi olla mikä tahansa

rules.push(rule27);

//-------------------------
// 28. Jos [ status = Alumni] ja [Kypsyysaste = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.]
// ja [Tuentarve = mikä tahansa],
// Avoin AMK, Draft
// -------------------------

const rule28 = new Rule({
  id: 28,
  courseIds: [9, 7],
});

rule28.addPair(1, 2); // q1 = Alumni
rule28.addPair(2, 3); // q2 = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.

// Ei q3-paria, koska tuentarve voi olla mikä tahansa

rules.push(rule28);

//-------------------------
// 29. Jos [ status = Alumni] ja [Kypsyysaste = Minulla on jo yritys.]
// ja [Tuentarve = mikä tahansa],
// Avoin AMK, Draft
// -------------------------

const rule29 = new Rule({
  id: 29,
  courseIds: [9, 7],
});

rule29.addPair(1, 2); // q1 = Alumni
rule29.addPair(2, 4); // q2 = Minulla on jo yritys.

// Ei q3-paria, koska tuentarve voi olla mikä tahansa

rules.push(rule29);

//-------------------------
// 30. Jos [ status = Ei kumpikaan] ja [Kypsyysaste = Minulla on idea, mutta kaipaan apua sen kehittämiseen.]
// ja [Tuentarve = mikä tahansa],
// Avoin AMK, Draft
// -------------------------

const rule30 = new Rule({
  id: 30,
  courseIds: [9, 7],
});

rule30.addPair(1, 3); // q1 = Ei kumpikaan
rule30.addPair(2, 2); // q2 = Minulla on idea, mutta kaipaan apua sen kehittämiseen.

// Ei q3-paria, koska tuentarve voi olla mikä tahansa

rules.push(rule30);

//-------------------------
// 31. Jos [ status = Ei kumpikaan] ja [Kypsyysaste = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.]
// ja [Tuentarve = mikä tahansa],
// Avoin AMK, Draft
// -------------------------

const rule31 = new Rule({
  id: 31,
  courseIds: [9, 7],
});

rule31.addPair(1, 3); // q1 = Ei kumpikaan
rule31.addPair(2, 3); // q2 = Yrityksen perustaminen on ajankohtaista lähitulevaisuudessa.

// Ei q3-paria, koska tuentarve voi olla mikä tahansa

rules.push(rule31);

//-------------------------
// 32. Jos [ status = Ei kumpikaan] ja [Kypsyysaste = Minulla on jo yritys.]
// ja [Tuentarve = mikä tahansa],
// Avoin AMK, Draft
// -------------------------

const rule32 = new Rule({
  id: 32,
  courseIds: [9, 7],
});

rule32.addPair(1, 3); // q1 = Ei kumpikaan
rule32.addPair(2, 4); // q2 = Minulla on jo yritys.

// Ei q3-paria, koska tuentarve voi olla mikä tahansa

rules.push(rule32);
