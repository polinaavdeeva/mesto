import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, submitForm) {
        super(popup);
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__text');
        this._submitButton = this._popup.querySelector('.popup__save-button');
        this._submitButtonText = this._submitButton.textContent;
        this._submitForm = submitForm;
    }

    _getInputValues() {
        this._inputData = {};

        this._inputList.forEach((input) => {
            this._inputData[input.name] = input.value;
        });

        return this._inputData;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues());
            this.close()
        });
    }

    loadingButtonText(loading, text) {
        if (loading) {
            this._submitButton.textContent = text;
        } else {
            this._submitButton.textContent = this._submitButtonText;
        }
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}