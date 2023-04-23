export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        this._popup
            .querySelector('.popup__close-button')
            .addEventListener('click', () => {
                this.close();
            });

        this._popup
            .addEventListener('mousedown', (evt) => {
                if (evt.target === this._popup) {
                    this.close();
                };
            });
    }
}