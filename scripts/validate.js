const enableValidationForm = {
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__error_visible',
    errorTextClass: '.popup__text-error'
};

function cleanErrors(form) {
    const inputErrorList = Array.from(document.querySelectorAll(form.errorTextClass));
    const inputList = Array.from(document.querySelectorAll(form.inputSelector));

    inputErrorList.forEach((inputError) => {
        inputError.textContent = '';
    });

    inputList.forEach((input) => {
        input.classList.remove(form.inputErrorClass);
    });
};

//пробегаемся по кажддой форме, если их несколько и навешиваем слушатели
function enableValidation(form) {
    const formList = Array.from(document.querySelectorAll(form.formSelector));
    formList.forEach(function(formElement) {
        setEventListeners(formElement, form);
    });
};

function setEventListeners(formElement, form) {
    const inputList = Array.from(formElement.querySelectorAll(form.inputSelector));
    const buttonElement = formElement.querySelector(form.submitButtonSelector)

    toggleButtonState(inputList, buttonElement, form);

    inputList.forEach(function(inputElement) {
        inputElement.addEventListener('input', function() {
            checkInputValidity(formElement, inputElement, form);
            toggleButtonState(inputList, buttonElement, form);
        });
    });
};

function checkInputValidity(formElement, inputElement, form) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, form);
    } else {
        hideInputError(formElement, inputElement, form);
    }
};

function showInputError(formElement, inputElement, errorMessage, form) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(form.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(form.errorClass);
};

function hideInputError(formElement, inputElement, form) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(form.inputErrorClass)
    errorElement.classList.remove(form.errorClass);
    errorElement.textContent = '';
};

function toggleButtonState(inputList, buttonElement, form) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(form.inactiveButtonClass)
    } else {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(form.inactiveButtonClass)
    }
};

//если хотябы одно поле не валидно,то возвращаем true
function hasInvalidInput(inputList) {
    return inputList.some(function(inputElement) {
        return !inputElement.validity.valid
    });
};

enableValidation(enableValidationForm);