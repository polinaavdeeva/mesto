class PopupWithImage extends Popup {
    constructor(popupSelector, image, description) {
        super(popupSelector);
        this._image = this._popupSelector.querySelector('.popup__image');
        this._description = this._popupSelector.querySelector('.popup__description');
    }

    open(image, descriprion) {
        super.open();
        this._image.src = image;
        this._description.textContent = descriprion;
        this._image.alt = descriprion;
    }
}