import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popup, handleDeleteCard) {
        super(popup);
        this._formElement = this._popup.querySelector('.popup__form');
        this._handleDeleteCard = handleDeleteCard;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleDeleteCard(this._cardElem);
            this.close();
        });
    }

    open(card) {
        super.open();
        this._cardElem = card;
    }
}