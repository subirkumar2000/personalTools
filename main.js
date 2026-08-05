const userCode = "a";
const password = "1";

const userCodeInput = document.querySelector("#user-code");
const passwordInput = document.querySelector("#password");
const formStatus = document.querySelector("#form-status");

let isPassVisible = false;

document.querySelector("#show-pass-icon").addEventListener("click", (event) => {
  if (isPassVisible == false) {
    passwordInput.setAttribute("type", "text");
    event.target.classList.toggle("bi-eye-slash-fill");
    isPassVisible = true;
  } else {
    passwordInput.setAttribute("type", "password");
    event.target.classList.remove("bi", "bi-eye-slash-fill");
    isPassVisible = false;
  }
});

document.querySelector("#login-btn").addEventListener("click", loginUser);

passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    loginUser();
  }
});

function loginUser() {
  let isValidInput = false;
  let userCredential = ["", ""];
  for (let i = 0; i < 2; i++) {
    let userInput = document.querySelectorAll("input")[i];
    userCredential[i] = userInput.value.trim();

    if (userCredential[i] == "") {
      userInput.parentElement.classList.add("error");
      formStatus.style.setProperty("--child-color", "#f00");
      formStatus.children[1].textContent =
        "Required field cannot be left blank!";
      isValidInput = false;
    } else {
      userInput.parentElement.classList.remove("error");
      formStatus.style.setProperty("--child-color", "#bebebe");
      formStatus.children[1].textContent = "* denotes a required field!";
      isValidInput = true;
    }
    userCodeInput.focus();
  }

  
  if (isValidInput == true) {
    if (userCredential[0] != userCode && userCredential[1] != password) {
      userCodeInput.parentElement.classList.add("error");
      userCodeInput.value = "";
      userCodeInput.focus();
      passwordInput.parentElement.classList.add("error");
      passwordInput.value = "";
      formStatus.style.setProperty("--child-color", "#f00");
      formStatus.children[1].textContent = "Invalid user credentials!";
    } else {
      userCodeInput.value = "";
      passwordInput.value = "";
      window.location.href = '/catalogue.html'
    }
  }
}
