import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popup, submitForm) {
        super(popup);
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._formElement.querySelectorAll('.popup__text');
        this._submitButton = this._popup.querySelector('.popup__save-button');
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

        this._formElement.addEventListener('submit', (event) => {
            event.preventDefault();
            // перед запросом сохраняем изначальный текст кнопки
            const initialText = this._submitButton.textContent;
            // меняем его, чтобы показать пользователю ожидание
            this._submitButton.textContent = 'Сохранение...';
            this._submitForm(this._getInputValues())
                .then(() => this.close()) // закрывается попап в `then`
                .finally(() => {
                    this._submitButton.textContent = initialText;
                }) // в любом случае меняется текст кнопки обратно на начальный в `finally`
        });
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}