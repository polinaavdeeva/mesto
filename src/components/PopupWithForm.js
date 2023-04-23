import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, formSubmit) {
        super(popupSelector);
        this._formElement = this._popupSelector.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__text');
        this._formSubmit = formSubmit;
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
            this._formSubmit(this._getInputValues());
            this.close();
        });
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}