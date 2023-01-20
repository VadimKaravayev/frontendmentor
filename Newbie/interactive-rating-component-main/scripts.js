(function (doc) {
  function init() {
    doc.addEventListener("click", restartRating);

    const form = get("#rating-form");
    form.addEventListener("submit", handleSubmit);
  }

  function restartRating(event) {
    const thankyouWindow = get(".thankyou-window");
    const ratingWindow = get(".rating-window");

    if (
      !thankyouWindow.contains(event.target) &&
      ratingWindow.classList.contains("hide")
    ) {
      const checkedRadio = get("input[type=radio]:checked");
      checkedRadio.checked = false;
      removeErrorMsg(".error-msg");
      thankyouWindow.classList.add("hide");
      ratingWindow.classList.remove("hide");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    removeErrorMsg(".error-msg");
    const data = new FormData(event.target);
    const value = data.get("rating");
    if (!value) {
      event.target.append(createErrorMsg("You must rate before submit"));
      return;
    }
    const ratingWindow = get(".rating-window");
    ratingWindow.classList.add("hide");

    console.log("You chose ", value);
    const result = get(".rate-value");
    result.innerText = value;

    const thankyouWindow = get(".thankyou-window");
    thankyouWindow.classList.remove("hide");
  }

  function removeErrorMsg(selector) {
    const errorMgs = get(selector);
    errorMgs && errorMgs.remove();
  }

  function createErrorMsg(text) {
    const msg = doc.createElement("span");
    msg.classList.add("error-msg");
    msg.innerText = text;
    return msg;
  }

  function get(selector) {
    return document.querySelector(selector);
  }

  init();
})(document);
