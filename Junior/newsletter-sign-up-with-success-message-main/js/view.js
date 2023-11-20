class View {
  #errorTemplate(msg) {
    return `<span class="error" aria-live="polite">${msg}</span>`;
  }

  #classes = {
    error: "error",
    invalid: "invalid",
    hide: "hide",
  };

  constructor(formSelector, mainScreenSelector, successScreenSelector) {
    this.form = document.querySelector(formSelector);
    this.mainScreen = document.querySelector(mainScreenSelector);
    this.successScreen = document.querySelector(successScreenSelector);
  }

  get email() {
    return this.form.email.value;
  }

  onSubmit(handler) {
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }

  onInput(handler) {
    this.form.addEventListener("input", (e) => {
      handler(e.target);
    });
  }

  onClickDismiss(handler) {
    const dismissBtn = this.successScreen.querySelector(".dismiss-btn");
    dismissBtn.addEventListener("click", handler);
  }

  #insertErrorAboveElement(element) {
    const errorMsg = this.getErrorMsg(element);
    element.insertAdjacentHTML("beforebegin", this.#errorTemplate(errorMsg));
  }

  showError(field) {
    field.classList.add("invalid");
    this.#insertErrorAboveElement(field);
  }

  showCustomError(msg) {
    const input = document.querySelector(".form__email");
    input.classList.add(this.#classes.invalid);
    input.insertAdjacentHTML("beforebegin", this.#errorTemplate(msg));
  }

  getErrorMsg(field) {
    const validity = field.validity;
    const data = field.dataset;
    for (let key in validity) {
      if (validity[key]) {
        return data[key];
      }
    }
  }

  removeError(element) {
    element.classList.remove(this.#classes.invalid);
    const errors = element.parentElement.getElementsByClassName(
      this.#classes.error
    );
    [...errors].forEach((error) => error.remove());
  }

  clearFields() {
    this.form.reset();
  }

  vadlidateForm() {
    [...this.form].forEach((field) => {
      if (!field.checkValidity()) {
        const error = new Error(`Invalid field ${field.name}`);
        error.invalidField = field;
        throw error;
      }
    });
  }

  #hideElement(element) {
    element.classList.add(this.#classes.hide);
  }

  #showElement(element) {
    element.classList.remove(this.#classes.hide);
  }

  showSuccessScreen(email) {
    this.#hideElement(this.mainScreen);
    this.successScreen.querySelector(".email-placeholder").textContent = email;
    this.#showElement(this.successScreen);
  }

  dismissSuccessScreen() {
    this.#hideElement(this.successScreen);
    this.#showElement(this.mainScreen);
  }
}
