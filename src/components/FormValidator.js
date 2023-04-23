export default class FormValidator {
    constructor(classSelector, formElement) {
        this.classSelector = classSelector;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this.classSelector.inputSelector));
        this._submitButton = this._formElement.querySelector(this.classSelector.submitButtonSelector);
    }

    enableValidation() {
        this._setEventListeners();
    };

    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
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

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this._setDisabledButton();
        } else {
            this._submitButton.removeAttribute('disabled');
            this._submitButton.classList.remove(this.classSelector.inactiveButtonClass)
        }
    };

    _hasInvalidInput() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid
        });
    };

    _setDisabledButton() {
        this._submitButton.setAttribute('disabled', true);
        this._submitButton.classList.add(this.classSelector.inactiveButtonClass)
    }

    cleanErrors() {
        this._setDisabledButton();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
        });
    }
}