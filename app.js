var questions = [
  {
    question: "What HTML tag is used to create an ordered (numbered) list?",
    option1: "&lt;ul&gt;",
    option2: "&lt;li&gt;",
    option3: "&lt;ol&gt;",
    option4: "&lt;dl&gt;",
    answer: "&lt;ol&gt;",
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
    option1: "&lt;iframe&gt;",
    option2: "&lt;embed&gt;",
    option3: "&lt;object&gt;",
    option4: "&lt;video&gt;",
    answer: "&lt;video&gt;",
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

var email = "ahmed@gmail.com";
var pass = "12345";

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
    startBtn.style.display = "block";
    login_form.style.display = "none";
  } else {
    passIcon.style.color = "#007bff";
    alert("wrong password");
  }
}

var countDown = document.getElementById("timer");
var index = 0;
var score = 0;
var counter;

function renderQuestions() {
  var question = document.getElementById("qustionsContainer");
  var options = document.getElementsByName("options");

  for (var i = 0; i < options.length; i++) {
    if (options[i].checked) {
      if (options[i].value === questions[index - 1].answer) {
        score++;
      }
    }
  }
  if (!questions[index]) {
    console.log(score);
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
}

renderQuestions();
startTimer(10);
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    countDown.textContent = time;
    time--;
  }
}
