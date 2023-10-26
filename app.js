// >>>> Questions <<<<
var questions = [
  {
    question: "What is a JavaScript constructor function used for?",
    option1: "Defining CSS styles for elements.",
    option2: "Creating and initializing objects.",
    option3: "Managing database connections.",
    option4: "Controlling user interface animations.",
    answer: "Creating and initializing objects.",
  },
  {
    question:
      "Which keyword is used to create a new instance of an object in JavaScript?",
    option1: "this",
    option2: "new",
    option3: "create",
    option4: "instance",
    answer: "new",
  },
  {
    question:
      "What does the 'this' keyword refer to in a constructor function?",
    option1: "The global object (e.g., 'window' in a browser).",
    option2: "The prototype object of the constructor.",
    option3: "The current instance of the object being created.",
    option4: "A reserved keyword with no specific meaning.",
    answer: "The current instance of the object being created.",
  },
  {
    question:
      "What is the purpose of the 'prototype' property in a constructor function?",
    option1: "To define the constructor's name.",
    option2: "To store private data for the object.",
    option3: "To add methods and properties to all instances of the object.",
    option4: "To prevent the object from being modified.",
    answer: "To add methods and properties to all instances of the object.",
  },
  {
    question:
      "How do you access a property of an object created with a constructor function?",
    option1: "Using the 'dot' notation (e.g., obj.property).",
    option2: "By calling a separate function with the property name.",
    option3: "With the 'for...in' loop to iterate through properties.",
    option4: "By using the 'prototype' property of the constructor.",
    answer: "Using the 'dot' notation (e.g., obj.property).",
  },
];

var startBtn = document.querySelector(".startBtn");
var login_form = document.querySelector(".login_form");
var emailPass = document.querySelector(".emailPass");
var animate = document.querySelector("#animate");
var hideBtn = document.querySelector(".hideBtn");
var passIcon = document.querySelector(".showPass");
var userEmail = document.getElementById("uEmail");
var userPass = document.getElementById("uPass");
var infoBox = document.querySelector(".info_box");
var quizStart = document.querySelector(".quiz_container");
var resultbox = document.querySelector(".result_box");
var scoreText = document.querySelector(".score_text");
var inputs = document.querySelector(".inputs");
var links = document.querySelector(".links");
var progressbar = document.getElementById("progressBar");
var form = document.getElementById("form");
var countDown = document.getElementById("timer");
var index = 0; // Question Counting
var score = 0; // User Correct Question Score
var counter; // counter of timer
var timeValue = 15; // timer value

//  >>>> Redirection Login from to Registration form <<<<
var signUp = document.getElementById("signUp");
function singUp() {
  window.location.href = "singUp.html";
}

//  >>>> Registration form <<<<
var singUpName = document.getElementById("sName");
var singUpEmail = document.getElementById("sEmail");
var singUpPass = document.getElementById("sPass");
function submitForm() {
  event.preventDefault();
  var registerUser = {
    name: singUpName.value,
    email: singUpEmail.value,
    password: singUpPass.value,
  };
  localStorage.setItem("registerUser", JSON.stringify(registerUser));
  window.location.href = "./index.html";
}

// >>>> Get data from LocalStorage <<<<
var getUserData = localStorage.getItem("registerUser");
getUserData = JSON.parse(getUserData);

// >>>> Show localStorage Data <<<<
userEmail.addEventListener("click", () => {
  animate.style.display = "block";
});
var remenberPass = document.getElementById("rePass");
var remenberEmail = document.getElementById("reEmail");
var loginTitle = document.querySelector(".title");
function showPopup() {
  emailPass.style.display = "flex";
  hideBtn.style.display = "none";
  inputs.style.display = "none";
  links.style.display = "none";
  loginTitle.style.display = "none";
  remenberEmail.textContent = getUserData.email;
  remenberPass.textContent = getUserData.password;
}
function backToForm() {
  inputs.style.display = "flex";
  links.style.display = "flex";
  emailPass.style.display = "none";
  hideBtn.style.display = "block";
  animate.style.color = "#007bff";
  animate.classList.remove("animate__flash");
}

userPass.addEventListener("click", () => {
  passIcon.style.display = "block";
  console.log("working");
});

// >>>> Login form <<<<
var getEmail = getUserData.email;
var getPass = getUserData.password;
function loginForm() {
  var user = localStorage.getItem("user");
  if (!user) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: true,
    });
    Toast.fire({
      title: "<h2>Welcome!</h2> Please Register Your Account",
    });
  } else {
    if (userEmail.value == getEmail && userPass.value == getPass) {
      infoBox.style.display = "block";
      login_form.style.display = "none";
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    } else {
      // passIcon.style.color = "#007bff";
      // passIcon.style.cursor = "pointer";
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
      });
      Toast.fire({
        icon: "warning",
        title: "<h2>Invalid</h2><h2>ID : Password</h2>",
      });
      setTimeout(function () {
        animate.classList.add("animate__flash");
        animate.style.color = "red";
      }, 2000);
    }
  }
  localStorage.setItem("user", true);
}
// Show Input Field Password
function showPass() {
  if (userPass.type === "password") {
    userPass.type = "text";
    passIcon.innerHTML = "lock_open";
  } else {
    userPass.type = "password";
    passIcon.innerHTML = "lock";
  }
}
// >>>> Quit Quiz <<<<
function quit() {
  location.reload();
}
// >>>> Enter Quiz <<<<
function enterQuiz() {
  infoBox.style.display = "none";
  startBtn.style.display = "block";
}

// >>>> Render Questions <<<<
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
      }
    }
  }
  var percetage = (score / 5) * 100;
  window.addEventListener("blur", () => {
    clearInterval(counter);
    resultbox.style.display = "flex";
    quizStart.style.display = "none";
    if (score === 0) {
      scoreText.innerHTML = `
      <span style="text-align: center; margin: 5px 0; font-size: 22px;">
      You are not a child👶🏻, Don't cheat on exams💻. Shame on you!🖐️<span>
       `;
    } else {
      var progressbar = document.querySelector(".progressBar");
      if (progressbar) {
        progressbar.innerHTML = `
        <p>${percetage}%</p>
        `;
      }
      scoreText.innerHTML = `
      <span>Score: <p>${score}</p>out of<p>${options.length + 1}</p><span>
       `;
    }
  });
  if (!questions[index]) {
    clearInterval(counter);
    resultbox.style.display = "flex";
    quizStart.style.display = "none";

    scoreText.innerHTML = `
   <span>Score: <p>${score}</p>out of<p>${options.length + 1}</p><span>
    `;

    var circularProgress = document.querySelector(".circular-progress"),
      progressValue = document.querySelector(".progress-value");

    var progressStartValue = 0,
      progressEndValue = percetage,
      speed = 25;

    var progress = setInterval(() => {
      progressStartValue++;

      progressValue.textContent = `${progressStartValue}%`;
      circularProgress.style.background = `conic-gradient(var(--primaryColor) ${
        progressStartValue * 3.6
      }deg, #ededed 0deg)`;

      if (progressStartValue == progressEndValue) {
        clearInterval(progress);
      }
    }, speed);
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
// >>>> Timer <<<<
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

// >>>> Start Quiz <<<<
function startQuiz() {
  quizStart.style.display = "block";
  startBtn.style.display = "none";
  renderQuestions();
  document.documentElement.requestFullscreen();
}
// >>>> Restart Quiz <<<<
function restart() {
  login_form.style.display = "none";
  infoBox.style.display = "none";
  startBtn.style.display = "block";
  location.reload();
}
