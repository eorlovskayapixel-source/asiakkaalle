// -------------------------
// Class Course
// The Course class represents a single course that can be recommended
// to the user after they answer all questions.
// Example of a course: "Realistic Business Idea"
// -------------------------
export class Course {
  constructor({ id, title, description = "", link = "" }) {
    this.id = id;
    this.title = title; // Display name of the course shown to the user
    this.description = description; // A brief description of the course content (optional, can be added later)
    this.link = link; // A URL link to the course page or more information (optional, can be added later)
  }

  static fromData(data) {
    return new Course(data);
  }
}
