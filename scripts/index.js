import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
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
const formAddCard = document.querySelector('.popup__add-form');

const validators = {};

function applyValidationForFrom(form) {
    const validationForm = new FormValidator(enableValidationForm, form);
    validationForm.enableValidation();
    validators[form.name] = validationForm;
}

formsList.forEach((form) => {
    applyValidationForFrom(form);
});

const userData = new UserInfo(profileName, profileInfo);

const editPopupElement = new PopupWithForm(
    editPopup,
    (inputs) => {
        userData.setUserInfo(inputs['userName'], inputs['aboutUser']);
    }
);

editPopupElement.setEventListeners();

const formAddElement = new PopupWithForm(addPopup,
    (inputs) => {
        const card = createCard(inputs);
        sectionElement.addItem(card);
    });

formAddElement.setEventListeners();

buttonOpenEditProfilePopup.addEventListener('click', () => {
    editPopupElement.open();
    const user = userData.getUsetInfo();
    nameInput.value = user.userName;
    jobInput.value = user.userDescriprion;
    validators.editForm.cleanErrors();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
    formAddCard.reset();
    formAddElement.open();
    validators.addForm.cleanErrors();
});

const imagePopup = new PopupWithImage(cardImgPopup, popupImage, popupDescription);
imagePopup.setEventListeners();

function handleCardClick(name, link) {
    imagePopup.open(name, link);
}

function createCard(card) {
    const cardElement = new Card(card, '#place-template', handleCardClick);
    return cardElement.generateCard();
}

const sectionElement = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item);
        sectionElement.addItem(card);
    }
}, placeContainer);

sectionElement.renderer();