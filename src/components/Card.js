export default class Card {
    constructor(name, link, templateSelector, handleCardClick, handleDeleteCard) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector('.elements__item')
            .cloneNode(true);

        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();

        this._placeName = this._element.querySelector('.elements__title');
        this._placeName.textContent = this._name;

        this._placeImage = this._element.querySelector('.elements__image');
        this._placeImage.src = this._link;
        this._placeImage.alt = this._name;

        this._cardLikeButton = this._element.querySelector('.elements__like');
        this._cardDeleteButton = this._element.querySelector('.elements__reset-button');

        this._setEventListeners();

        return this._element;
    }

    _clickOnLike() {
        this._cardLikeButton.classList.toggle('elements__like_active');
    }

    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._clickOnLike();
        });

        this._cardDeleteButton.addEventListener('click', () => {
            this._handleDeleteCard();
        });

        this._placeImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}