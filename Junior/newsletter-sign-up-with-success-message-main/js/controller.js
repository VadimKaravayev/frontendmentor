class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
  }

  handleSubmit() {
    try {
      this.view.vadlidateForm();
      const email = this.view.email;
      const onSave = () => {
        this.view.clearFields();
        this.view.showSuccessScreen(email);
      };
      const onFailToSave = (e) => {
        if ("ConstraintError" === e.target.error.name) {
          this.view.showCustomError("You have already subscribed");
        }
      };
      this.model.save(email, onSave, onFailToSave);
    } catch (error) {
      const { invalidField } = error;
      if (invalidField) {
        this.view.showError(invalidField);
      }
    }
  }

  handleInput(element) {
    this.view.removeError(element);
  }

  handleClickDismiss() {
    this.view.dismissSuccessScreen();
  }

  init() {
    this.view.onSubmit(this.handleSubmit.bind(this));
    this.view.onInput(this.handleInput.bind(this));
    this.view.onClickDismiss(this.handleClickDismiss.bind(this));
  }
}
