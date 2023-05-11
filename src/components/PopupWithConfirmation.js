import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popup) {
        super(popup);
        this._formElement = this._popup.querySelector('.popup__form');
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleDeleteCard();
            this.close();
        });
    }

    setSubmitMethod(setHandledeteleCard) {
        this._handleDeleteCard = setHandledeteleCard;
    }

    /*open(card) {
        super.open();
        this._cardElem = card;
    }*/
}