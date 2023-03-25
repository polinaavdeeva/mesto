const enableValidationForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    openedPopupClass: '.popup_opened',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__error_visible',
    errorTextClass: '.popup__text-error'
};

function cleanErrors(validationObj) {
    const openedPopup = document.querySelector(validationObj.openedPopupClass);
    const inputErrorList = Array.from(openedPopup.querySelectorAll(validationObj.errorTextClass));
    const inputList = Array.from(openedPopup.querySelectorAll(validationObj.inputSelector));

    inputErrorList.forEach((inputError) => {
        inputError.textContent = '';
    });

    inputList.forEach((input) => {
        input.classList.remove(validationObj.inputErrorClass);
    });
};

function setDisabledButton(validationObj) {
    const openedPopup = document.querySelector(validationObj.openedPopupClass);
    const submitButton = openedPopup.querySelector(validationObj.submitButtonSelector);

    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(validationObj.inactiveButtonClass);
};

//пробегаемся по кажддой форме, если их несколько и навешиваем слушатели
function enableValidation(validationObj) {
    const formList = Array.from(document.querySelectorAll(validationObj.formSelector));
    formList.forEach(function(formElement) {
        setEventListeners(formElement, validationObj);
    });
};

function setEventListeners(formElement, validationObj) {
    const inputList = Array.from(formElement.querySelectorAll(validationObj.inputSelector));
    const buttonElement = formElement.querySelector(validationObj.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationObj);

    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, validationObj);
            toggleButtonState(inputList, buttonElement, validationObj);
        });
    });
};

function checkInputValidity(formElement, inputElement, validationObj) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validationObj);
    } else {
        hideInputError(formElement, inputElement, validationObj);
    }
};

function showInputError(formElement, inputElement, errorMessage, validationObj) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationObj.errorClass);
};

function hideInputError(formElement, inputElement, validationObj) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationObj.inputErrorClass)
    errorElement.classList.remove(validationObj.errorClass);
    errorElement.textContent = '';
};

function toggleButtonState(inputList, buttonElement, validationObj) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(validationObj.inactiveButtonClass)
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(validationObj.inactiveButtonClass)
    }
};

//если хотябы одно поле не валидно,то возвращаем true
function hasInvalidInput(inputList) {
    return inputList.some(function(inputElement) {
        return !inputElement.validity.valid
    });
};

enableValidation(enableValidationForm);