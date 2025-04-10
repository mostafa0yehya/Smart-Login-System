const userName = localStorage.getItem("name");

const welcomeMessage = document.getElementById("welcomeMessage");
if (userName) {
  welcomeMessage.textContent = `Hello, ${userName}! Glad to see you.`;
} else {
  window.location.href = "./login.html";
}

document.getElementById("logout").addEventListener("click", function () {
  localStorage.removeItem("name");
  window.location.href = "./login.html";
});
