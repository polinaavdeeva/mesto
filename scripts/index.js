const popup = document.querySelector('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelectorAll('.popup__close-button');
const addButton = document.querySelector('.profile__add-button');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__about-oneself');
const profileName = document.querySelector('.profile__info-title');
const profileInfo = document.querySelector('.profile__info-subtitle');
const saveButton = formElement.querySelector('.popup__save-button');
const placeContainer = document.querySelector('.elements__items');
const placeFormName = document.querySelector('.popup__place-name');
const popupImage = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__description');
const placeFormImage = document.querySelector('.popup__picture-link');
const cardImgPopup = document.querySelector('.popup_type_image-zoom')

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

function openZoomForm() {
    cardImgPopup.classList.add('popup_opened');
}

function closeForm(popup) {
    popup.classList.remove('popup_opened');
}

closeButton.forEach((button) => {
    const closestPopup = button.closest('.popup');
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

const placeTemplateCard = document.querySelector('#place-template').content;

function createCard(card) {
    const placeCard = placeTemplateCard.querySelector('.elements__item').cloneNode(true);
    const placeName = placeCard.querySelector('.elements__title');
    placeName.textContent = card.name;

    const placeImage = placeCard.querySelector('.elements__image');
    placeImage.setAttribute('src', card.link);

    const placeImageAlt = placeImage;
    placeImageAlt.setAttribute('alt', card.name);

    placeCard.querySelector('.elements__like').addEventListener('click', function(event) {
        event.target.classList.toggle('elements__like_active');
    });

    placeCard.querySelector('.elements__reset-button').addEventListener('click', function(event) {
        event.target.closest('.elements__item').remove();
    });

    placeImage.addEventListener('click', () => {
        openZoomForm();

        popupImage.src = placeImage.src;
        popupImage.alt = placeImage.alt;
        popupDescription.textContent = placeName.textContent;
    });

    return placeCard;
}

initialCards.forEach(function(item) {
    const card = createCard(item);
    placeContainer.prepend(card);
});

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    const placeNameInput = placeFormName.value;
    const placePictureInput = placeFormImage.value;
    const newCard = {
        name: placeNameInput,
        link: placePictureInput
    }
    placeContainer.prepend(createCard(newCard));
    addForm.reset();
    closeForm(addPopup);
}

const addForm = document.querySelector('.popup__add-form');
addForm.addEventListener('submit', handleAddFormSubmit);