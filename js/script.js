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
const signupLnameInput = document.getElementById("signup-lname");
var lnameValidated = false;
const submitSignup = document.getElementById("signup-form-button");

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

const loginPasswordInput = document.getElementById("login-password");
const signupPasswordInput = document.getElementById("signup-password");
const confirmPasswordInput = document.getElementById("confirm-password");

var passwordValidated = false;
var passwordMatched = false;
var confirmPasswordTyped = false;

function validatePasswordLogin(password, helpId, checkboxId, buttonId) {
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const passwordHelp = document.getElementById(helpId);
  const checkbox = document.getElementById(checkboxId);

  if (!passwordRegex.test(password)) {
    passwordHelp.textContent =
      "Password must be at least 8 characters long, include one lowercase letter, one uppercase letter, and one number.";
    passwordValidated = false;
  } else {
    passwordHelp.textContent = "";
    passwordValidated = true;
  }

  enableCheckboxLogin(emailValidated, passwordValidated, checkbox);
  enableButton(buttonId, checkbox);
}

function validatePasswordSignup(password, helpId, checkboxId, buttonId) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const passwordHelp = document.getElementById(helpId);
    const checkbox = document.getElementById(checkboxId);
  
    if (!passwordRegex.test(password)) {
      passwordHelp.textContent =
        "Password must be at least 8 characters long, include one lowercase letter, one uppercase letter, and one number.";
      passwordValidated = false;
    } else {
      passwordHelp.textContent = "";
      passwordValidated = true;
    }
  
    enableCheckboxSignup(emailValidated, passwordValidated, passwordMatched, fnameValidated, lnameValidated, checkbox);
    enableButton(buttonId, checkbox);
  }

function validatePasswordMatch(
  password,
  confirmPassword,
  helpId,
  checkboxId,
  buttonId
) {
  const passwordHelp = document.getElementById(helpId);
  const checkbox = document.getElementById(checkboxId);

  if (password !== confirmPassword) {
    passwordHelp.textContent = "Passwords do not match.";
    passwordMatched = false;
  } else {
    passwordHelp.textContent = "";
    passwordMatched = true;
  }

  enableCheckboxSignup(emailValidated, passwordValidated, passwordMatched, fnameValidated, lnameValidated, checkbox);
  enableButton(buttonId, checkbox);
}

function validateLnameSignup(lname, helpId, checkboxId, buttonId) {
  const lnameRegex = /^[A-Za-z]{1,10}$/;
  const lnameHelp = document.getElementById(helpId);
  const checkbox = document.getElementById(checkboxId);

  if (!lnameRegex.test(lname)) {
    lnameHelp.textContent = "Invalid last name. Please avoid any spaces and symbols.";
    lnameValidated = false;
  } else {
    lnameHelp.textContent = "";
    lnameValidated = true;
  }

  enableCheckboxSignup(emailValidated, passwordValidated, passwordMatched, fnameValidated, lnameValidated, checkbox);
  enableButton(buttonId, checkbox);
}


signupLnameInput.addEventListener("input", function () {
  validateLnameSignup(
    signupLnameInput.value,
    "signup-lname-help",
    "signup-terms-conditions",
    "signup-form-button"
  );
});

loginPasswordInput.addEventListener("input", function () {
  validatePasswordLogin(
    loginPasswordInput.value,
    "login-password-help",
    "login-terms-conditions",
    "login-form-button"
  );
});


signupPasswordInput.addEventListener("input", function () {
  validatePasswordSignup(
    signupPasswordInput.value,
    "signup-password-help",
    "signup-terms-conditions",
    "signup-form-button"
  );

  if(confirmPasswordTyped){
    validatePasswordMatch(
        signupPasswordInput.value,
        confirmPasswordInput.value,
        "passwordHelp",
        "signup-terms-conditions",
        "signup-form-button"
      );
  }
});

confirmPasswordInput.addEventListener("input", function () {
  validatePasswordMatch(
    signupPasswordInput.value,
    confirmPasswordInput.value,
    "passwordHelp",
    "signup-terms-conditions",
    "signup-form-button"
  );
  confirmPasswordTyped = true;
});

submitSignup.addEventListener("click", function () {
  addSpinner("signup-form-button");
});

function addSpinner(buttonId){
  const button = document.querySelector(`#${buttonId}`);
  var textBtn = button.innerHTML;
  button.innerHTML = `<div class="spinner-border" role="status">
  </div>`;
}

