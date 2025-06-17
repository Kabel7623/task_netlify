const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "London"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Colorful Style Sheets", "Cascading Style Sheets", "Creative Style Sheets"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter"
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Pepper"],
    answer: "Avocado"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let userName = "";
let userAge = "";

// DOM Elements
const userForm = document.getElementById("user-form");
const usernameInput = document.getElementById("username");
const ageInput = document.getElementById("age");
const startBtn = document.getElementById("start-btn");

const quizSection = document.getElementById("quiz-section");
const welcomeMsg = document.getElementById("welcome-msg");

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

// Start button click
startBtn.addEventListener("click", () => {
  userName = usernameInput.value.trim();
  userAge = ageInput.value.trim();

  if (userName === "" || userAge === "") {
    alert("Please enter both name and age.");
    return;
  }

  userForm.style.display = "none";
  quizSection.style.display = "block";
  welcomeMsg.textContent = `Welcome ${userName} (Age: ${userAge})! Let's start the quiz.`;

  loadQuestion();
});

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  optionsEl.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
    optionsEl.appendChild(button);
  });

  resultEl.textContent = "";
  nextBtn.style.display = "none";
}

function selectAnswer(selectedButton, correctAnswer) {
  const buttons = document.querySelectorAll(".option");
  buttons.forEach(button => {
    button.disabled = true;
    if (button.textContent === correctAnswer) {
      button.classList.add("correct");
    } else if (button === selectedButton && button.textContent !== correctAnswer) {
      button.classList.add("wrong");
    }
  });

  if (selectedButton.textContent === correctAnswer) {
    score++;
    resultEl.textContent = "Correct!";
  } else {
    resultEl.textContent = `Wrong! The correct answer was "${correctAnswer}".`;
  }

  nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showFinalScore();
  }
});

function showFinalScore() {
  questionEl.textContent = `${userName}, you scored ${score} out of ${questions.length}!`;
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  resultEl.textContent = "Quiz Completed!";
}
