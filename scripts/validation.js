// enabling validation by calling enableValidation()
// pass all the settings on call

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageId = `#${inputEl.id}-error`;
  const errorElement = formEl.querySelector(errorMessageId);
  inputEl.classList.add(inputErrorClass);
  errorElement.textContent = inputEl.validationMessage;
  errorElement.classList.add(errorClass);
  console.log(errorClass, inputErrorClass, inputEl);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageId = `#${inputEl.id}-error`;
  const errorElement = formEl.querySelector(errorMessageId);
  inputEl.classList.remove(inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(errorClass);
}

function checkInputValidity(formEl, inputEl, options) {
  console.log(inputEl.validity.valid);
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, options);
  }
  hideInputError(formEl, inputEl, options);
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

// disableButton
// enableButton
// enables and disables the submit button

function toggleButtonState(inputEls, submitButton, options) {
  if (hasInvalidInput(inputEls)) {
    submitButton.classList.add(options.inactiveButtonClass);
    submitButton.disabled = true;
  } else {
    submitButton.classList.remove(options.inactiveButtonClass);
    submitButton.disabled = false;
  }
}

function setEventListeners(formEl, options) {
  // const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(options.inputSelector)];
  const submitButton = formEl.querySelector(options.submitButtonSelector);
  toggleButtonState(inputEls, submitButton, options);
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, options);
      toggleButtonState(inputEls, submitButton, options);
    });
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  console.log("forms found", formEls);
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formEl, options);
  });
}

const options = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(options);
