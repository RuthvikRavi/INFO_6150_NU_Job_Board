// Constants
const loginEmailInput = document.getElementById("login-email");
const signupEmailInput = document.getElementById("signup-email");

const loginPasswordInput = document.getElementById("login-password");
const signupPasswordInput = document.getElementById("signup-password");
const confirmPasswordInput = document.getElementById("confirm-password");

const signupFnameInput = document.getElementById("signup-fname");

const signupLnameInput = document.getElementById("signup-lname");

const loginCheckbox = document.getElementById("login-terms-conditions");
const signupCheckbox = document.getElementById("signup-terms-conditions");

const submitLogin = document.getElementById("login-form-button");
const submitSignup = document.getElementById("signup-form-button");

// Boolean Variables
var emailValidated = false;
var passwordValidated = false;
var passwordMatched = false;
var fnameValidated = false;
var lnameValidated = false;
var confirmPasswordTyped = false;
var genderValidated = false;
var selectedGender;

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

function validateFnameSignup(fname, helpId, checkboxId, buttonId) {
  const fnameRegex = /^[A-Za-z]{1,10}$/;
  const fnameHelp = document.getElementById(helpId);
  const checkbox = document.getElementById(checkboxId);

  if (!fnameRegex.test(fname)) {
    fnameHelp.textContent = "Invalid first name. Please avoid any spaces and symbols.";
    fnameValidated = false;
  } else {
    fnameHelp.textContent = "";
    fnameValidated = true;
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

function enableCheckboxLogin(emailValidated, passwordValidated, checkbox){
  if(emailValidated && passwordValidated){
      checkbox.disabled = false;
  }else{
      checkbox.disabled = true;
  }
}

function enableCheckboxSignup(emailValidated, passwordValidated, passwordMatched, fnameValidated, lnameValidated, checkbox){
  if(emailValidated && passwordValidated && passwordMatched && fnameValidated && lnameValidated){
      checkbox.disabled = false;
  }else{
      checkbox.disabled = true;
      checkbox.checked = false;
  }
}

function enableButton(buttonId, checkbox) {
const button = document.querySelector(`#${buttonId}`);
button.disabled = !checkbox.checked;
}

function addSpinner(buttonId){
  const button = document.querySelector(`#${buttonId}`);
  var textBtn = button.innerHTML;
  button.innerHTML = `<div class="spinner-border" role="status">
  </div>`;
}

function showAlert() {
  document.getElementById('myAlert').style.display = 'block';
}


// Event Listeners
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

signupFnameInput.addEventListener("input", function () {
  validateFnameSignup(
    signupFnameInput.value,
    "signup-fname-help",
    "signup-terms-conditions",
    "signup-form-button"
  );
});

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

loginCheckbox.addEventListener("change", function () {
  enableButton("login-form-button", loginCheckbox);
});

signupCheckbox.addEventListener("change", function () {
  enableButton("signup-form-button", signupCheckbox);
});

submitSignup.addEventListener("click", function () {
  addSpinner("signup-form-button");
});

submitLogin.addEventListener("click", function () {
  addSpinner("login-form-button");
  showAlert();
});