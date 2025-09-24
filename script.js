// Questions grouped by subjects
const subjects = {
  Geography: [
    {
      question: "What is the capital city of Australia?",
      answers: [
        { text: "Sydney", correct: false },
        { text: "Melbourne", correct: false },
        { text: "Canberra", correct: true },
        { text: "Perth", correct: false }
      ]
    },
    {
      question: "Which is the largest ocean on Earth?",
      answers: [
        { text: "Atlantic Ocean", correct: false },
        { text: "Pacific Ocean", correct: true },
        { text: "Indian Ocean", correct: false },
        { text: "Arctic Ocean", correct: false }
      ]
    }
  ],
  Science: [
    {
      question: "Which gas do plants absorb during photosynthesis?",
      answers: [
        { text: "Oxygen", correct: false },
        { text: "Carbon Dioxide", correct: true },
        { text: "Nitrogen", correct: false },
        { text: "Hydrogen", correct: false }
      ]
    },
    {
      question: "What is the chemical symbol for gold?",
      answers: [
        { text: "Au", correct: true },
        { text: "Ag", correct: false },
        { text: "Gd", correct: false },
        { text: "Go", correct: false }
      ]
    }
  ],
  History: [
    {
      question: "Who was the first President of the United States?",
      answers: [
        { text: "Abraham Lincoln", correct: false },
        { text: "George Washington", correct: true },
        { text: "Thomas Jefferson", correct: false },
        { text: "John Adams", correct: false }
      ]
    },
    {
      question: "In which year did World War II end?",
      answers: [
        { text: "1945", correct: true },
        { text: "1939", correct: false },
        { text: "1918", correct: false },
        { text: "1950", correct: false }
      ]
    }
  ],
  Math: [
    {
      question: "What is the square root of 64?",
      answers: [
        { text: "6", correct: false },
        { text: "8", correct: true },
        { text: "10", correct: false },
        { text: "12", correct: false }
      ]
    },
    {
      question: "Solve: 15 × 3",
      answers: [
        { text: "30", correct: false },
        { text: "35", correct: false },
        { text: "45", correct: true },
        { text: "40", correct: false }
      ]
    }
  ]
};

// DOM Elements
const subjectScreen = document.getElementById("subject-screen");
const subjectButtons = document.getElementById("subject-buttons");
const quizScreen = document.getElementById("quiz-screen");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// State
let currentSubject = null;
let currentQuestionIndex = 0;
let score = 0;

// Show subject selection
function loadSubjects() {
  subjectButtons.innerHTML = "";
  Object.keys(subjects).forEach(sub => {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerHTML = sub;
    button.addEventListener("click", () => startQuiz(sub));
    subjectButtons.appendChild(button);
  });
}

// Start quiz for chosen subject
function startQuiz(subject) {
  currentSubject = subject;
  currentQuestionIndex = 0;
  score = 0;
  subjectScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  nextButton.innerHTML = "Next";
  showQuestion();
}

// Show question
function showQuestion() {
  resetState();
  let currentQuestion = subjects[currentSubject][currentQuestionIndex];
  questionElement.innerHTML = (currentQuestionIndex+1) + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// Reset
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Select answer
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

// Show final score
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${subjects[currentSubject].length}!`;
  nextButton.innerHTML = "Back to Subjects";
  nextButton.style.display = "block";
}

// Next button handler
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < subjects[currentSubject].length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < subjects[currentSubject].length) {
    handleNextButton();
  } else {
    quizScreen.classList.add("hidden");
    subjectScreen.classList.remove("hidden");
    loadSubjects();
  }
});

// Initialize
loadSubjects();
