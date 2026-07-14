class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings._submitButtonSelector;
    this._inactiveButtonClass = settings._inactiveButtonClass;
    this._inputErrorClass = settings._inputErrorClass;
    this._errorClass = settings._errorClass;
    this._form = formEl;
  }

  _showInputError(inputEl, errorMessage) {
    const errorMessageId = `#${inputEl.id}-error`;
    const errorElement = this._form.querySelector(errorMessageId);
    inputEl.classList.add(this._inputErrorClass);
    errorElement.textContent = inputEl.validationMessage;
    errorElement.classList.add(this._errorClass);
    console.log(this._errorClass, this._inputErrorClass, inputEl);
  }

  _toggleButtonState() {}

  _hasInvalidInput() {}

  _setEventListeners() {
    const inputEls = [...this._form.querySelectorAll(this._inputSelector)];
    const submitButton = this._form.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputEls, submitButton);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState(inputEls, submitButton);
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editForm = document.querySelector("#edit-profile-form");
const editFormValidator = new FormValidator(settings, editForm);
editFormValidator.enableValidation();
// const addFormValidator = new FormValidator(settings, addForm);
export default FormValidator;
