let popup = document.querySelector('.popup');
let editPopup = document.querySelector('.popup_type_edit');
let addPopup = document.querySelector('.popup_type_add');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelectorAll('.popup__close-button');
let addButton = document.querySelector('.profile__add-button');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__about-oneself');
let profileName = document.querySelector('.profile__info-title');
let profileInfo = document.querySelector('.profile__info-subtitle');
let saveButton = formElement.querySelector('.popup__save-button');
let placeContainer = document.querySelector('.elements__items');
let placeName = document.querySelector('.popup__place-name');
let placeImage = document.querySelector('.popup__picture-link');

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

function openEditForm() {
    editPopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
}

function openAddForm() {
    addPopup.classList.add('popup_opened');
}

editButton.addEventListener('click', openEditForm);
addButton.addEventListener('click', openAddForm);

function closeForm(popup) {
    popup.classList.remove('popup_opened');
}

closeButton.forEach((button) => {
    let closestPopup = button.closest('.popup');
    button.addEventListener('click', function() {
        closeForm(closestPopup);
    });
});

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    closeForm(popup);
}


formElement.addEventListener('submit', handleEditFormSubmit);

function createCard(card) {
    const placeCard = document.querySelector('#place-template').content.cloneNode(true);
    const placeName = placeCard.querySelector('.elements__title');
    placeName.textContent = card.name;

    const placeImage = placeCard.querySelector('.elements__image');
    placeImage.setAttribute('src', card.link);

    const placeImageAlt = placeCard.querySelector('.elements__image');
    placeImageAlt.setAttribute('alt', card.name);

    placeCard.querySelector('.elements__like').addEventListener('click', function(event) {
        event.target.classList.toggle('elements__like_active');
    });

    placeCard.querySelector('.elements__reset-button').addEventListener('click', function(event) {
        event.target.closest('.elements__item').remove();
    });

    return placeCard;
}

initialCards.forEach(function(item) {
    const card = createCard(item);
    placeContainer.prepend(card);
});


function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const placeNameInput = placeName.value;
    const placePictureInput = placeImage.value;
    const newCard = {
        name: placeNameInput,
        link: placePictureInput
    }

    console.log(newCard.link)
    placeContainer.prepend(createCard(newCard));
    closeForm(addPopup);
}

const addForm = document.querySelector('.popup__add-form');
addForm.addEventListener('submit', handleAddFormSubmit);