const form = document.getElementById("form");
/* const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword"); */

const username=document.querySelector("[name='username']");
const email=document.querySelector("[name='email']");
const password = document.querySelector("[name='password']");
const confirmPassword=document.querySelector("[name='confirmPassword']");

const getFieldName = input =>
  input.id.charAt(0).toUpperCase() + input.id.slice(1);

const showError = (input, message) => (
  input.parentElement.classList.contains("success")
    ? (input.parentElement.classList.remove("success"),
      input.parentElement.classList.add("error"))
    : input.parentElement.classList.add("error"),
  (input.parentElement.querySelector("small").textContent = message)
);

const showSuccess = input => (
  input.parentElement.classList.add("success"),
  input.parentElement.classList.remove("error")
);

const checkRequired = arr => {
  for (item of arr) {
    item.value.trim() === ""
      ? showError(item, `${getFieldName(item)} is required`)
      : showSuccess(item);
  }
};

const checkEmail = input => {
  const REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  REGEXP.test(input.value.trim())
    ? showSuccess(input)
    : showError(input, "Email is not valid");
};

const checkLength = (input, min, max) => {
  input.value.length < min
    ? showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    )
    : input.value.length > max
      ? showError(
        input,
        `${getFieldName(input)} must be less than ${max} characters`
      )
      : showSuccess(input);
};

const checkPasswordsMatch = (input1, input2) =>
  input1.value !== input2.value && showError(input2, "Passwords do not match");

form.addEventListener("submit", e => {
  e.preventDefault();
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, confirmPassword);
});
