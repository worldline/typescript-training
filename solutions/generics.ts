// A generic Quiz System

// A quiz is made of a series of questions. Each question is composed of the question, 
// an optional list of propositions and the expected answer.
// Questions can take the form of free text, multiple choice, true/false, etc.
// Therefore answers can be strings, numbers or booleans

// 1. Define the types Answer and Question. 
// The question propositions shall have the same type as the answer,
// and the question shall by default expect a string as answer.

type Answer = string | number | boolean;

type Question<T extends Answer> = {
    question: string;
    propositions: T[];
    answer: T;
}

// 2. Complete the type annotations for this Quiz class

class Quiz {
    questions: Question<Answer>[];
    answers: Answer[];

    constructor(questions: Question<Answer>[]) {
        this.questions = questions;
        this.answers = [];
    }

    answerQuestion<A extends Answer>(question: Question<A>, answer: A) {
        const index = this.questions.indexOf(question);
        if (index >= 0) {
            this.answers[index] = answer;
        }
    }

    checkAnswer<T extends Answer>(question: Question<T>, answer: T): boolean {
        return question.answer === answer;
    }

    getFinalScore() {
        const nbQuestions = this.questions.length;
        const nbCorrect = this.questions.filter(question => this.checkAnswer(question, question.answer)).length;
        return `${nbCorrect} / ${nbQuestions}`;
    }
}

const quiz = new Quiz([
    {
        question: "What is the main benefit of TypeScript over JavaScript?",
        propositions: ["Dynamic typing", "Static typing", "Faster execution"],
        answer: "Static typing"
    },
    {
        question: "In which year TypeScript has been released publicly?",
        propositions: [2012, 2013, 2014],
        answer: 2012
    },
    {
        question: "Which of the following is a valid way to declare a string variable?",
        propositions: [
            "`let name: String = 'Alice'`",
            "`let name: string = 'Alice'`",
            "`String name = 'Alice'`",
        ],
        answer: "`let name: string = 'Alice'`"
    },
    {
        question: "In TypeScript, you can assign null and undefined to any variable by default without using strict null checks.",
        propositions: [true, false],
        answer: false
    },

    {
        question: "What is the purpose of the 'void' type in TypeScript?",
        propositions: ["To denote absence of type", "To indicate a function doesn't return a value", "Both"],
        answer: "Both"
    },
    {
        question: "What does `B extends A` imply ?",
        propositions: ["A variable of type B also has the type A",
            "A variable of type A also has the type B",
            "Types A and B are the same"],
        answer: "A variable of type B also has the type A"
    }

]);

quiz.answerQuestion(quiz.questions[0], "Static typing");
quiz.answerQuestion(quiz.questions[1], 2012);
quiz.answerQuestion(quiz.questions[2], "`let name: string = 'Alice'`");
quiz.answerQuestion(quiz.questions[3], false);
quiz.answerQuestion(quiz.questions[4], "Both");
quiz.answerQuestion(quiz.questions[5], "A variable of type B also has the type A");

console.log(quiz.getFinalScore()); // 6 / 6