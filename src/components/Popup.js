export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
    }

    open() {
        this._popupSelector.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._popupSelector.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popupSelector
            .querySelector('.popup__close-button')
            .addEventListener('click', () => {
                this.close();
            });

        this._popupSelector
            .addEventListener('mousedown', (evt) => {
                if (evt.target === this._popupSelector) {
                    this.close();
                };
            });
    }
}