let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__about-oneself');
let profileName = document.querySelector('.profile__info-title');
let profileInfo = document.querySelector('.profile__info-subtitle');
let saveButton = formElement.querySelector('.popup__save-button');
let placeContainer = document.querySelector('.elements__items');

const initialCards = [{
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

function openForm() {
    popup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
}

editButton.addEventListener('click', openForm);

function closeForm() {
    popup.classList.remove('popup_opened')
}

closeButton.addEventListener('click', closeForm);

function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    closeForm();
}


formElement.addEventListener('submit', handleFormSubmit);

function createCard(card) {
    const placeCard = document.querySelector('#place-template').content.cloneNode(true);
    const placeName = placeCard.querySelector('.elements__title');
    placeName.textContent = card.name;

    const placeImage = placeCard.querySelector('.elements__image');
    placeImage.setAttribute('src', card.link);

    placeCard.querySelector('.elements__like').addEventListener('click', function(event) {
        event.target.classList.toggle('elements__like_active');
    });

    placeCard.querySelector('.elements__reset-button').addEventListener('click', function(event) {
        event.target.closest('.elements__item').remove();
    });

    placeContainer.append(placeCard);
}

initialCards.forEach(createCard);