import { openPopup, cardImgPopup, popupImage, popupDescription } from './index.js'

export default class Card {
    constructor(card, templateSelector) {
        this._name = card.name;
        this._link = card.link;
        this._templateSelector = templateSelector;
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

    _deleteCard() {
        this._cardDeleteButton.closest('.elements__item').remove();
    }

    _createImagePopup() {
        openPopup(cardImgPopup);

        popupImage.src = this._link;
        popupImage.alt = this._name;
        popupDescription.textContent = this._name;
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._clickOnLike();
        });

        this._cardDeleteButton.addEventListener('click', () => {
            this._deleteCard();
        });

        this._placeImage.addEventListener('click', () => {
            this._createImagePopup();
        });
    }
}