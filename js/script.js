window.onload = () => {
  console.log("loaded");
  setTimeout(() => {
    var cardTitle = document.getElementById("cardTitle");
    var cardBody = document.getElementById("cardBody");

    cardTitle.innerHTML = "Enhanced Candidate Matching";
    cardBody.innerHTML =
      "Precise job recommendations aligning skills and preferences for efficient job searches.";

    cardTitle.setAttribute("class", "card-title");
    cardBody.setAttribute("class", "card-text");
    console.log("Done");
  }, 5000);
};

const loginEmailInput = document.getElementById("login-email");
const signupEmailInput = document.getElementById("signup-email");
var emailValidated = false;

//Functions
function validateEmailLogin(email, helpId, checkboxId, buttonId) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
  const emailHelp = document.getElementById(helpId);
  const checkbox = document.getElementById(checkboxId);

  if (!emailRegex.test(email)) {
    emailHelp.textContent = "Invalid email format.";
    emailValidated = false;
  } else {
    emailHelp.textContent = "";
    emailValidated = true;
  }

  enableCheckboxLogin(emailValidated, passwordValidated, checkbox);
  enableButton(buttonId, checkbox);
}

function validateEmailSignup(email, helpId, checkboxId, buttonId) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
  const emailHelp = document.getElementById(helpId);
  const checkbox = document.getElementById(checkboxId);

  if (!emailRegex.test(email)) {
    emailHelp.textContent = "Invalid email format.";
    emailValidated = false;
  } else {
    emailHelp.textContent = "";
    emailValidated = true;
  }

  enableCheckboxSignup(emailValidated, passwordValidated, passwordMatched, fnameValidated, lnameValidated, checkbox);
  enableButton(buttonId, checkbox);
}

loginEmailInput.addEventListener("input", function () {
  validateEmailLogin(
    loginEmailInput.value,
    "login-email-help",
    "login-terms-conditions",
    "login-form-button"
  );
});

signupEmailInput.addEventListener("input", function () {
  validateEmailSignup(
    signupEmailInput.value,
    "signup-email-help",
    "signup-terms-conditions",
    "signup-form-button"
  );
});
