import questions from './questions.json' assert { type: 'json' }

// Set variables

let questionsArray = Object.keys(questions);
let key = questionsArray[0];
let answerbuttons = $(".answer");
let answerArray = [...answerbuttons];
let answerIndex = 0;
let questionCount = 0;
let correctAnswers = 0;
let numQuestions = questionsArray.length;

// Mouseover Event Handling

$(".answer").on("mouseover", function() {
  $(this).addClass("right-answer")
})

$(".answer").on("mouseout", function() {
  $(this).removeClass("right-answer")
})

// Click Event Handling

$(".start-btn").on("click", function() {
startGame();  
})

$(".answer").on("click", function() {
  $(".answer").prop("disabled", true);
  checkAnswer($(this))
  displayFeedback();
  questionCount++;
})

$(".next-question").on("click", function() {
  $(this).fadeOut(1000);
  moveNextScreen();  
})

// Main control functions

function startGame(load) {
  $(".title").fadeOut(1000);
  $(".intro").fadeOut(1000);
  $(".start-btn").fadeOut(1000);
  loadQuestion();  
}

function moveNextScreen() {
  $(".question").fadeOut(1000);
  $(".answer").fadeOut(1000);
  $(".feedback").fadeOut(1000);
  $(".intro").fadeOut(1000);
  setTimeout(() => {
    $(".answer").css("background-color", "#99D9D9").prop("disabled", false);
    removeFeedbackClass();
    switch (questionCount) {
    case 5:
      updateBtnMsg();
      endGame();
      break;
    case 6:
      resetGame();
      break;
    default:
      loadQuestion(getQuestion());
    }  
  }, 1000)   
}

function endGame () {
  updateBtnMsg();
  $(".intro").text(`Score: ${correctAnswers} of ${numQuestions}`).fadeIn(1000)
  $(".feedback").text("Thanks for playing").fadeIn(1000)
  $(".next-question").fadeIn(1000);
  questionCount++;
}

function resetGame() {
  answerIndex = 0;
  questionCount = 0;
  correctAnswers = 0;
  $(".intro").text("How well do you know Kraken hockey?");
  $(".feedback").text("");
  $(".title").fadeIn(1000);
  $(".intro").fadeIn(1000);
  $(".start-btn").fadeIn(1000);  
}

// Helper functions

function checkAnswer(selectedAnswer) {
  if (selectedAnswer.text() === questions[key].correctAnswer) {
    $(".feedback").addClass("right-answer");
    correctAnswers++;
  }
  else {
    $(".feedback").removeClass("right-answer").addClass("wrong-answer");
  }  
}

function displayFeedback(checkForUpdate) {
  updateBtnMsg();
  $(".answer").css("background-color", "#F9F5F6").prop("disabled", true);
  $(".feedback").fadeIn(1000);
  $(".next-question").fadeIn(1000);  
}

function getAnswers() {
  answerIndex = 0;
  answerArray.forEach(element => {
    $(element).text(questions[key].answers[answerIndex]);
    answerIndex++;
  })  
}

function getQuestion() {
  $(".question").text(questions[key].question)
}

function loadQuestion(question) {
  key = questionsArray[questionCount];
  getQuestion();
  getAnswers();
  $(".feedback").text("Correct answer: " + questions[key].correctAnswer);
  $(".question").delay(1000).text(questions[key].question).fadeIn(1000);
  $(".answer").delay(1000).fadeIn(1000);
}

function removeFeedbackClass () {
  if ($(".feedback").hasClass("wrong-answer")) {
    $(".feedback").removeClass("wrong-answer");
  }
  else if ($(".feedback").hasClass("right-answer")) {
    $(".feedback").removeClass("right-answer")
  }
}

function updateBtnMsg() {
  if (questionCount === 4) {
    $(".next-question").text("Get Score");
  }
  else if (questionCount === 5) {
    $(".next-question").text("Play Again")
  }
}

