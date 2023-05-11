export default class Card {
    constructor(data, userId, templateSelector, handleCardClick, handleDeleteCard, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        //this._likesNums = `${data.likes.length}`;
        this._userId = userId;
        this._ownerId = data.owner._id;
        this._id = data._id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeClick = handleLikeClick;
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

        this._likesNums = this._element.querySelector('.elements__like-nums');
        this.setNewLikes(this._likes);

        this._setEventListeners();
        this._isOwnCard();

        return this._element;
    }

    isCardLiked() {
        const likedCard = this._likes.find((user) => {
            return user._id === this._userId;
        })

        return likedCard;
    }

    setNewLikes(likes) {
        this._likes = likes;
        this._likesNums.textContent = `${this._likes.length}`;

        if (this.isCardLiked()) {
            this._addLike();
        } else {
            this._removeLike()
        }
    }

    _isOwnCard() {
        if (this._userId !== this._ownerId) {
            this._cardDeleteButton.style.display = 'none';
        }
    }

    _addLike() {
        this._cardLikeButton.classList.add('elements__like_active');
    }

    _removeLike() {
        this._cardLikeButton.classList.remove('elements__like_active');
    }


    removeCard() {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._handleLikeClick(this._id);
        });

        this._cardDeleteButton.addEventListener('click', () => {
            this._handleDeleteCard(this._id);
        });

        this._placeImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });
    }
}