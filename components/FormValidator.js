class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
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

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      this._showInputError(inputEl, inputEl.validationMessage);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hideInputError(inputEl) {
    const errorMessageId = `#${inputEl.id}-error`;
    const errorElement = this._form.querySelector(errorMessageId);

    inputEl.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);

    errorElement.textContent = "";
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

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
