import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { initialCards, enableValidationForm } from "./constans.js";

const popupsList = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonsClosePopup = document.querySelectorAll('.popup__close-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const formEditProfile = editPopup.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_about-oneself');
const profileName = document.querySelector('.profile__info-title');
const profileInfo = document.querySelector('.profile__info-subtitle');
const placeContainer = document.querySelector('.elements__items');
const placeFormName = document.querySelector('.popup__text_type_place-name');
const placeFormImage = document.querySelector('.popup__text_type_picture-link');
const popupImage = document.querySelector('.popup__image');
const popupDescription = document.querySelector('.popup__description');
const cardImgPopup = document.querySelector('.popup_type_image-zoom');
const formsList = document.querySelectorAll('.popup__form');


function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

function handleOpenImagePopup(name, link) {
    popupImage.src = link;
    popupImage.alt = name;
    popupDescription.textContent = name;
    openPopup(cardImgPopup);
}

const validationForms = [];

formsList.forEach((form) => {
    const validationForm = new FormValidator(enableValidationForm, form);
    validationForm.enableValidation();
    validationForms.push(validationForm);
});

function cleanErrorsByOpen(validationForms) {
    validationForms.forEach((validationForm) => {
        validationForm.cleanErrors();
    });
}

buttonOpenEditProfilePopup.addEventListener('click', () => {
    openPopup(editPopup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
    cleanErrorsByOpen(validationForms);
});

buttonOpenAddCardPopup.addEventListener('click', () => {
    formAddCard.reset();
    openPopup(addPopup);
    cleanErrorsByOpen(validationForms);
});

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
};

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
};

buttonsClosePopup.forEach((button) => {
    const closestPopup = button.closest('.popup');
    button.addEventListener('click', function() {
        closePopup(closestPopup);
    });
});

popupsList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup);
        };
    });
});

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    closePopup(editPopup);
}

formEditProfile.addEventListener('submit', handleEditFormSubmit);

function createCard(card) {
    const cardElement = new Card(card, '#place-template', handleOpenImagePopup);
    return cardElement.generateCard();
}

initialCards.forEach((item) => {
    placeContainer.prepend(createCard(item));
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
    closePopup(addPopup);
}

const formAddCard = document.querySelector('.popup__add-form');
formAddCard.addEventListener('submit', handleAddFormSubmit);