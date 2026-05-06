// Import models
import { Question } from "./models/Question.js";
import { Course } from "./models/Course.js";
import { Rule } from "./models/Rule.js";
import { Level } from "./models/Level.js";

// Import data
import { courses } from "./data/courses.js";
import { questions } from "./data/questions.js";
import { rules } from "./data/rules.js";
import { levels } from "./data/levels.js";

// Export functions
export { findMatchingCourses };

// Example of user answers
const userAnswers = [
  { questionId: 1, answerId: 1 },
  { questionId: 2, answerId: 1 },
  { questionId: 3, answerId: 1 },
  // { questionId: 3, answerId: 4 },
];

// This function takes the user's selected answers and compares them against all defined rules to find matching courses.
function findMatchingCourses(userAnswers) {
  const matchedCoursesIds = [];
  let userLevelId = 0;
  let userLevel = null;
  // iterate through each rule in the rules array
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i]; // take the current rule

    let allMatch = true; // assume the rule matches (until proven otherwise)
    // Now check each pair (questionId + answerId) within the rule
    for (let j = 0; j < rule.rulePairs.length; j++) {
      const pair = rule.rulePairs[j]; // take one pair of conditions from the rule
      let foundMatch = false; // assume no match found yet
      // check if there is a matching answer from the user
      for (let k = 0; k < userAnswers.length; k++) {
        const ans = userAnswers[k]; // take one user answer

        // compare:
        // 1) do the questions match?
        // 2) do the answers match?
        if (
          ans.questionId === pair.questionId &&
          ans.answerId === pair.answerId
        ) {
          foundMatch = true; // match found!
          break;
        }
      }

      // If at least one pair of the rule does not match the user's answers, rule does not match,
      // so we can stop checking this rule and move to the next one.

      if (!foundMatch) {
        allMatch = false;
        break;
      }
    }
    // if all pairs of conditions match and the course of this rule is not yet added to the result, add it

    if (allMatch) {
      if (rule.levelId !== null && userLevelId < rule.levelId) {
        // if the rule has a level defined, check if it's higher than the user's current level and update if necessary
        userLevelId = rule.levelId;
        userLevel = levels.find((level) => level.id === userLevelId);
      }
      // add all courses from this rule to the matched courses list (if not already added)
      for (const course of rule.courseIds) {
        if (!matchedCoursesIds.includes(course)) {
          matchedCoursesIds.push(course);
        }
      }
    }
  }
  // After processing all rules, we have a list of matched course IDs and the user's level (if any).
  const matchedCourses = matchedCoursesIds
    .map((id) => courses.find((c) => c.id === id))
    .filter(Boolean);

  return [matchedCourses, userLevel]; // return the list of all matching courses and the user's level
}
/*
//const result = findMatchingCourses(userAnswers);
let result = rules[0].addCourses([1, 16, 17]);
console.log(result);
console.log(rules[0]);
result = rules[0].removeCourse(16);
console.log(result);
console.log(rules[0]);*/
