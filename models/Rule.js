// -------------------------
// Class Rule
// The Rule class represents a single recommendation rule in the system.
// Each rule connects a specific Course object with a set of question–answer
// combinations. When the user's selected answers match these pairs,
// the corresponding course should be recommended.
// Example of a rule:
// Rule ID: 1
// Course: "Realistic Business Idea"
//   Question 1: Status -> Answer: "Tutkinto-opiskelija"
//   Question 2: Kypsyysaste -> Answer: "Olen kiinnostunut yrittäjyydestä, mutta minulla ei ole vielä ideaa."
//   Question 3: Tuentarve -> Answer: "Kaipaan perustietoa yrittäjyydestä ja siitä, mitä se vaatisi minulta"
// -------------------------
export class Rule {
  constructor({
    id,
    courseIds = [],
    courses = [],
    rulePairs = [],
    levelId = null,
    courseLookup = null, // Map of courseId to Course object, used for resolving courses when only courseIds are provided
  }) {
    this.id = id;
    this.courseLookup = this.createCourseLookup(courseLookup, courses);
    this.courseIds =
      courseIds.length > 0
        ? [...courseIds]
        : courses.map((course) => course.id);
    this.courses =
      courses.length > 0 ? [...courses] : this.resolveCourses(this.courseIds);
    this.rulePairs = rulePairs.map((pair) => ({
      questionId: pair.questionId,
      answerId: pair.answerId,
    }));
    this.levelId = levelId;
  }

  static fromData(data, courseLookup) {
    return new Rule({
      id: data.id,
      courseIds: data.courseIds ?? [],
      rulePairs: data.rulePairs ?? [],
      levelId: data.levelId ?? null,
      courseLookup,
    });
  }

  createCourseLookup(courseLookup, courses) {
    if (courseLookup instanceof Map) {
      return courseLookup;
    }

    if (Array.isArray(courseLookup)) {
      return new Map(courseLookup.map((course) => [course.id, course]));
    }

    if (Array.isArray(courses) && courses.length > 0) {
      return new Map(courses.map((course) => [course.id, course]));
    }

    return new Map();
  }

  resolveCourses(courseIds) {
    return courseIds
      .map((courseId) => this.courseLookup.get(courseId))
      .filter(Boolean);
  }

  addPair(questionId, answerId) {
    this.rulePairs.push({ questionId, answerId });
  }

  removeCourse(courseId) {
    const index = this.courses.findIndex((course) => course.id === courseId);

    if (index === -1) {
      return false;
    }

    this.courses.splice(index, 1);
    this.courseIds = this.courseIds.filter((id) => id !== courseId);
    return true;
  }

  addCourse(courseId) {
    const course = this.courseLookup.get(courseId);

    if (!course) {
      return false;
    }

    const alreadyExists = this.courses.some(
      (existingCourse) => existingCourse.id === courseId,
    );

    if (alreadyExists) {
      return false;
    }

    this.courses.push(course);
    this.courseIds.push(courseId);
    return true;
  }

  addCourses(courseIds) {
    return courseIds.map((id) => ({
      id,
      added: this.addCourse(id),
    }));
  }
}

//Kurssin poistaminen.
// Täytyy kirjoittaa metodi, joka käy läpi kaikki säännöt,
// löytää poistettavan kurssin ja poistaa sen taulukosta. Mahdollisesti kannattaa
// myös tarkistaa, onko taulukossa enää muita kursseja; jos ei ole, tulee antaa
// varoitus siitä, että tiettyjen vastausten perusteella tietyissä kysymyksissä
// suosituksista puuttuu kursseja.
//Uusien kurssien lisääminen.
// Jos tulee uusi kurssi, tarvitaan metodi, joka ottaa vastaan kurssin ja rulePairs‑taulukon
// taulukon. Metodin pitää käydä läpi kaikki säännöt, löytää vastaavuudet ja lisätä tämä
// kurssi niihin sääntöihin, joihin se kuuluu. Tässä on yksi ongelma: meillä on sääntöjä,
// jotka on luotu ei kolmesta kysymys–vastaus‑parista, vaan kahdesta. Tämä skenaario
// täytyy käsitellä erityisen huolellisesti.
