const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
}

const showInputError = (formElement, inputElement, errorMsg) => {
    const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
    errorMsgEl.textContent = errorMsg;
    inputElement.classList.add('modal__input_type_error');
};

const hideInputError = (formElement, inputElement) => {
    const errorMsgEl = formElement.querySelector(`#${inputElement.id}-error`);
    errorMsgEl.textContent = "";
    inputElement.classList.remove('modal__input_type_error'); 
};

const checkInputValidity = (formElement, inputElement) => {
 if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((input) => {
        return !input.validity.valid;
   });
};

const toggleButtonState = (inputList, submitButton) => {
    if (hasInvalidInput(inputList)) {
        disableButton(submitButton);
    } else {
        submitButton.disabled = false;
        submitButton.classList.remove("modal__submit-btn_disabled");
    };
};

const disableButton = (buttonElement) => {
    buttonElement.disabled = true;
    buttonElement.classList.add("modal__submit-btn_disabled");
};

const resetValidation = (formElement, inputList) => {
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );

  const submitButton = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, submitButton);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, submitButton);
    });
  });
};



const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(`${config.formSelector}`));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
        });
    };

enableValidation(config);