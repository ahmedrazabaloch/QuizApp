var questions = [
  {
    question: "What HTML tag is used to create an ordered (numbered) list?",
    option1: "ul",
    option2: "li",
    option3: "ol",
    option4: "dl",
    answer: "ol",
  },
  {
    question:
      "In CSS, what property is used to change the text color of an element?",
    option1: "background-color",
    option2: "font-style",
    option3: "color",
    option4: "text-align",
    answer: "color",
  },
  {
    question: "How do you declare a variable in JavaScript?",
    option1: "variable x;",
    option2: "let x;",
    option3: "var x;",
    option4: "Both b and c",
    answer: "Both b and c",
  },
  {
    question:
      "Which HTML element is used to embed external content, such as a video or audio file, on a web page?",
    option1: "iframe",
    option2: "embed",
    option3: "object",
    option4: "video",
    answer: "video",
  },
  {
    question: "What is the box model in CSS?",
    option1: "A model for designing 3D shapes in CSS.",
    option2: "A way to organize content using boxes in HTML.",
    option3:
      "A model that describes how elements are rendered as boxes with content, padding, borders, and margins.",
    option4: "A model for creating rounded corners in CSS.",
    answer:
      "A model that describes how elements are rendered as boxes with content, padding, borders, and margins.",
  },
];

var startBtn = document.querySelector(".startBtn");
var login_form = document.querySelector(".login_form");
var emailPass = login_form.querySelector(".emailPass");
var hideBtn = login_form.querySelector(".hideBtn");
var passIcon = login_form.querySelector(".showPass");
var userEmail = document.getElementById("uEmail");
var userPass = document.getElementById("uPass");
var infoBox = document.querySelector(".info_box");
var quizStart = document.querySelector(".quiz_container");
var resultbox = document.querySelector(".result_box");
var scoreText = document.querySelector(".score_text");
var email = "ahmed@gmail.com";
var pass = "12345";
var countDown = document.getElementById("timer");
var index = 0;
var score = 0;
var counter;
var timeValue = 5;

function showPopup() {
  emailPass.style.display = "flex";
  hideBtn.style.display = "none";
}
function backToForm() {
  emailPass.style.display = "none";
  hideBtn.style.display = "block";
}
function loginForm() {
  if (userEmail.value === email && userPass.value === pass) {
    infoBox.style.display = "block";
    login_form.style.display = "none";
  } else {
    passIcon.style.color = "#007bff";
    alert("wrong password");
  }
}
function quit() {
  location.reload();
}
function enterQuiz() {
  infoBox.style.display = "none";
  startBtn.style.display = "block";
}
function startQuiz() {
  quizStart.style.display = "block";
  startBtn.style.display = "none";
  renderQuestions();
  document.documentElement.requestFullscreen();
}

function restart() {
  location.reload();
  login_form.style.display = "none";
  infoBox.style.display = "none";
  startBtn.style.display = "block";
}

function renderQuestions() {
  var question = document.getElementById("qustionsContainer");
  var options = document.getElementsByName("options");
  var qustionNo = document.getElementById("qustionNo");
  clearInterval(counter);
  startTimer(timeValue);
  for (var i = 0; i < options.length; i++) {
    if (options[i].checked) {
      if (options[i].value === questions[index - 1].answer) {
        score++;
        console.log(score);
      }
    }
  }
  if (!questions[index]) {
    clearInterval(counter);
    resultbox.style.display = "flex";
    quizStart.style.display = "none";
    scoreText.innerHTML = `
   <span>Score: <p>${score}</p>out of<p>${options.length + 1}</p><span>
    `;
    return;
  }
  var questionValue = questions[index];
  question.innerHTML = `
        <div id="qustions">
            <span>1.</span>
            <p>${questionValue.question}</p>
        </div>
        <div class="options_list">
            <label for="options1" class="options"><input type="checkbox" id="options1" name="options" value="${questionValue.option1}">${questionValue.option1}<span class="checkmark"></span></label>
            <label for="options2" class="options"><input type="checkbox" id="options2" name="options" value="${questionValue.option2}">${questionValue.option2}<span class="checkmark"></span></label>
            <label for="options3" class="options"><input type="checkbox" id="options3" name="options" value="${questionValue.option3}">${questionValue.option3}<span class="checkmark"></span></label>
            <label for="options4" class="options"><input type="checkbox" id="options4" name="options" value="${questionValue.option4}">${questionValue.option4}<span class="checkmark"></span></label>
        </div>
  `;
  index++;
  qustionNo.innerHTML = index;
}

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    countDown.textContent = time;
    time--;
    if (time < 0) {
      clearInterval(counter);
      renderQuestions();
    }
  }
}
