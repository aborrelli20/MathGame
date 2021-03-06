$(document).ready(function () {
  var currentQuestion;
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }

  var userNumber = prompt('Enter how high you would like the numbers in your equation to be: ');

  var addition = function () {
    var question = {};
    var num1 = randomNumberGenerator(userNumber);
    var num2 = randomNumberGenerator(userNumber);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  }

  var subtraction = function () {
    var question = {};
    var num1 = randomNumberGenerator(userNumber);
    var num2 = randomNumberGenerator(userNumber);

    if (num1 > num2) {
      question.answer = num1 - num2;
      question.equation = String(num1) + " - " + String(num2);
    } else {
      question.answer = num2 - num1;
      question.equation = String(num2) + " - " + String(num1);
    }
    return question;
  }

  var multiplication = function () {
    var question = {};
    var num1 = randomNumberGenerator(userNumber);
    var num2 = randomNumberGenerator(userNumber);

    question.answer = num1 * num2;
    question.equation = String(num1) + " * " + String(num2);

    return question;
  }

  var division = function () {
    var question = {};
    var num1 = randomNumberGenerator(userNumber);
    var num2 = randomNumberGenerator(userNumber);
    while (num1 % num2 !== 0) {
      num1 = randomNumberGenerator(userNumber);
      num2 = randomNumberGenerator(userNumber);
    }
    if (num1 % num2 === 0) {
      question.answer = num1 / num2;
      question.equation = String(num1) + " / " + String(num2);
    }

    return question;
  }

  var randomQuestionGenerator = function () {
    var questionNum = Math.floor(Math.random() * 4);
    if (questionNum === 0) {
      currentQuestion = addition();
    } else if (questionNum === 1) {
      currentQuestion = subtraction();
    } else if (questionNum === 2) {
      currentQuestion = multiplication();
    } else if (questionNum === 3) {
      currentQuestion = division();
    }
  }



  randomQuestionGenerator();
  $('#equation').text(currentQuestion.equation);

  var timeLeft = 10;
  var interval;
  var score = 0;
  var highScore = 0;

  var askNewQuestion = function () {
    randomQuestionGenerator();
    $('#equation').text(currentQuestion.equation);
  }

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      askNewQuestion();
      $('#user-input').val('');
      updateTimeLeft(+1);
      updateScore(+1);
    }
  }

  $('#user-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  var startGame = function () {
    if (!interval) {
      if (timeLeft === 0) {
        updateTimeLeft(10);
        updateScore(-score);
      }
      interval = setInterval(function () {
        updateTimeLeft(-1);
        if (timeLeft === 0) {
          clearInterval(interval);
          interval = undefined;
        }
      }, 1000);
    }

  }

  var updateTimeLeft = function (amount) {
    timeLeft += amount;
    $('#time-left').text(timeLeft);
  }

  var updateScore = function (amount) {
    score += amount;
    if (score > highScore) {
      highScore = score;
    }
    $('#high-score').text(highScore);
    $('#score').text(score);
  };

});