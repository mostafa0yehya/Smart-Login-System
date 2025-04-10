var form = document.querySelector(".login-form");
var email = document.querySelector(".login-form #email");
var password = document.querySelector(".login-form #password");
var submitLogin = document.querySelector(".login-form button");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var user = { email: email.value, password: password.value };

  if (checkUserExists(user)) {

    window.location.href = "./user.html";
  } else {
    errorAlert("Invalid email or password");
  }
});

function checkUserExists(user) {
  var users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {
      if (
        users[i].email === user.email &&
        users[i].password === user.password
      ) {
        console.log(users[i]);

        localStorage.setItem("name", users[i].userName);
        return true;
      }
    }
  } else {
    console.log("noo users exists");
  }

  return false;
}
function errorAlert(message) {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: `${message}`,
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}
