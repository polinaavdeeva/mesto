import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._image = this._popup.querySelector('.popup__image ');
        this._description = this._popup.querySelector('.popup__description');
    }

    open(descriprion, image) {
        super.open();
        this._image.src = image;
        this._description.textContent = descriprion;
        this._image.alt = descriprion;
    }
}