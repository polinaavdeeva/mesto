class FormValidator {
    constructor(classSelector, formElement) {
        this.classSelector = classSelector;
        this._formElement = formElement;
    }

    cleanErrors() {
        const openedPopup = document.querySelector('.popup_opened');
        const inputErrorList = Array.from(openedPopup.querySelectorAll(this.classSelector.errorTextClass));
        const inputList = Array.from(openedPopup.querySelectorAll(this.classSelector.inputSelector));

        inputErrorList.forEach((inputError) => {
            inputError.textContent = '';
        });

        inputList.forEach((input) => {
            input.classList.remove(this.classSelector.inputErrorClass);
        });
    };

    setDisabledButton() {
        const openedPopup = document.querySelector('.popup_opened');
        const submitButton = openedPopup.querySelector(this.classSelector.submitButtonSelector);

        submitButton.setAttribute('disabled', true);
        submitButton.classList.add(this.classSelector.inactiveButtonClass);
    };

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this.classSelector.formSelector));
        formList.forEach(() => {
            this._setEventListeners();
        });
    };

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this.classSelector.inputSelector));
        const buttonElement = this._formElement.querySelector(this.classSelector.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this.classSelector.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this.classSelector.errorClass);
    };

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this.classSelector.inputErrorClass)
        errorElement.classList.remove(this.classSelector.errorClass);
        errorElement.textContent = '';
    };

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(this.classSelector.inactiveButtonClass)
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(this.classSelector.inactiveButtonClass)
        }
    };

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
    };
}
/*function cleanErrors(validationObj) {
    const openedPopup = document.querySelector('.popup_opened');
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
    const openedPopup = document.querySelector('.popup_opened');
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

enableValidation(enableValidationForm);*/