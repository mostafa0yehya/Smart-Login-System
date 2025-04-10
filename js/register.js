var registerForm = document.querySelector(".register-form");

var signup = document.querySelector("#signup");
var userName = document.querySelector(".register-form .userName");
var email = document.querySelector(".register-form .email");
var password = document.querySelector(".register-form .password");
var userNameError = document.querySelector(".userName-error");
var emailError = document.querySelector(".email-error");
var passwordError = document.querySelector(".password-error");
var nameErrorMessage =
  "Name must only contain letters, spaces, apostrophes, or hyphens.";
var emailErrorMessage = "Please enter a valid email address.";
var passwordErrorMessage =
  "Password must be at least 8 characters long, with at least one uppercase letter, one number, and one special character.";

var regexName = /^[A-Za-z]+([ '-][A-Za-z]+)*$/;
var regexEmail = /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;
var regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

var users = [];
registerForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (
    validateInput(userName, regexName) &&
    validateInput(email, regexEmail) &&
    validateInput(password, regexPassword)
  ) {
    addUser();
  } else {
    errorAlert("Enter Valid Inputs");
  }
  clear();
});
function addUser() {
  var user = {
    userName: userName.value,
    email: email.value,
    password: password.value,
  };
  if (!isUserExists(user.email)) {
    users.push(user);
    successToast();

    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "./login.html";
  } else {
    errorAlert("Email Already Exists!!");
  }
}

function clear() {
  userName.value = null;
  email.value = null;
  password.value = null;
  userName.classList.remove("is-valid", "is-invalid");
  email.classList.remove("is-valid", "is-invalid");
  password.classList.remove("is-valid", "is-invalid");
}
function successToast() {
  Toastify({
    text: "User Created Successfully ",
    duration: 2000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    className: "custom-toast",
  }).showToast();
}

function validateInput(input, regex) {
  if (regex.test(input.value)) {
    input.classList.remove("is-invalid");

    input.classList.add("is-valid");

    return true;
  } else {
    input.classList.remove("is-valid");

    input.classList.add("is-invalid");
    input.classList.remove("d-none");
    return false;
  }
}

userName.addEventListener("input", function () {
  if (!validateInput(userName, regexName)) {
    userNameError.classList.remove("d-none");
    userNameError.innerHTML = nameErrorMessage;
  } else {
    userNameError.classList.add("d-none");
  }
});
email.addEventListener("input", function () {
  if (!validateInput(email, regexEmail)) {
    emailError.classList.remove("d-none");
    emailError.innerHTML = emailErrorMessage;
  } else {
    emailError.classList.add("d-none");
  }
});
password.addEventListener("input", function () {
  if (!validateInput(password, regexPassword)) {
    passwordError.classList.remove("d-none");
    passwordError.innerHTML = passwordErrorMessage;
  } else {
    passwordError.classList.add("d-none");
  }
});

function errorAlert(message) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${message}`,
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}
function isUserExists(email) {
  users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.length > 0) {
    for (var i = 0; i < users.length; i++) {
      if (users[i].email === email) {
        return true;
      }
    }
    return false;
  }
}
