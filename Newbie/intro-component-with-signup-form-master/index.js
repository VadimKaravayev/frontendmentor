const ERROR_CLASS = "validation-error";
const ERROR_ICON_CLASS = "validation-error-icon";
const ERROR_MSG_CLASS = "error-msg";

const form = document.querySelector(".form");

const ERROR_ICON =
  '<img class="validation-error-icon" src="images/icon-error.svg" alt="Error Icon">';

const ERROR_MSG_FN = (msg) => `<small class="error-msg">${msg}</small>`;

const isEmpty = {
  msg: (title) => `${title} cannot be empty`,
  predicate: (value) => value.trim().length === 0,
};

const wrongEmail = {
  msg: () => "Looks like this is not an email",
  predicate: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value);
  },
};

const FIELDS = [
  {
    elem: document.querySelector("#first-name-input"),
    validators: [isEmpty],
  },
  {
    elem: document.querySelector("#last-name-input"),
    validators: [isEmpty],
  },
  {
    elem: document.querySelector("#email-input"),
    validators: [isEmpty, wrongEmail],
  },
  {
    elem: document.querySelector("#password-input"),
    validators: [isEmpty],
  },
];

FIELDS.forEach((field) => {
  field.elem.addEventListener("input", (e) => clearErrorField(e.target));
  field.elem.addEventListener("blur", () => validateField(field));
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isValid = FIELDS.reduce((acc, cur) => acc && validateField(cur), true);

  if (isValid) {
    form.submit();
  }
});

function validateField({ elem, validators }) {
  if (elem.classList.contains(ERROR_CLASS)) {
    return;
  }
  const found = validators.find(({ predicate }) => predicate(elem.value));
  const errorMsg = found ? found.msg(paramForMsg(elem.name)) : found;

  if (errorMsg) {
    elem.classList.add(ERROR_CLASS);
    [ERROR_ICON, ERROR_MSG_FN(errorMsg)].forEach((htmlStr) => {
      elem.parentElement.append(stringToDomElement(htmlStr));
    });
  }
  return !errorMsg;
}

function clearErrorField(elem) {
  if (elem.classList.contains(ERROR_CLASS)) {
    elem.classList.remove(ERROR_CLASS);
    const parent = elem.parentElement;
    [ERROR_ICON_CLASS, ERROR_MSG_CLASS].forEach((selector) => {
      parent.removeChild(parent.querySelector(`.${selector}`));
    });
  }
}

function stringToDomElement(str) {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(str.trim(), "text/html");
  return parsed.body.firstChild;
}

function paramForMsg(param) {
  return capitalize(param)
    .split(/(?=[A-Z])/)
    .join(" ");
}

function capitalize(str) {
  return str && str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str;
}
