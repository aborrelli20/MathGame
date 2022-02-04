$(document).ready(function () {
  var currentQuestion;
  var randomNumberGenerator = function (size) {
    return Math.ceil(Math.random() * size);
  }

  var questionGenerator = function () {
    var question = {};
    var num1 = randomNumberGenerator(10);
    var num2 = randomNumberGenerator(10);

    question.answer = num1 + num2;
    question.equation = String(num1) + " + " + String(num2);

    return question;
  }

  currentQuestion = questionGenerator();
  $('#equation').text(currentQuestion.equation);

  var timeLeft = 10;

  var askNewQuestion = function () {
    currentQuestion = questionGenerator();
    $('#equation').text(currentQuestion.equation);
  }

  var checkAnswer = function (userInput, answer) {
    if (userInput === answer) {
      askNewQuestion();
      $('#user-input').val('');
    }
  }

  $('#user-input').on('keyup', function () {
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });

  var interval = setInterval(function () {
    timeLeft--;
    $('#time-left').text(timeLeft);
    if (timeLeft === 0) {
      clearInterval(interval);
    }
    console.log(timeLeft);
  }, 1000);

});