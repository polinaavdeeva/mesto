import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, image, descriprion) {
        super(popupSelector);
        this._image = image;
        this._description = descriprion;
    }

    open(descriprion, image) {
        super.open();
        this._image.src = image;
        this._description.textContent = descriprion;
        this._image.alt = descriprion;
    }
}