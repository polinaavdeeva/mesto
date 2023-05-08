import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import { initialCards, enableValidationForm } from "../components/constans.js";
import "./index.css";

const editPopup = document.querySelector('.popup_type_edit');
const addPopup = document.querySelector('.popup_type_add');
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
const formEditProfile = editPopup.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__text_type_name');
const jobInput = formEditProfile.querySelector('.popup__text_type_about-oneself');
const profileName = document.querySelector('.profile__info-title');
const profileInfo = document.querySelector('.profile__info-subtitle');
const placeContainer = document.querySelector('.elements__items');
const cardImgPopup = document.querySelector('.popup_type_image-zoom');
const formsList = document.querySelectorAll('.popup__form');
const formAddCard = document.querySelector('.popup__add-form');
const editAvatarPopup = document.querySelector('.popup_type_avatar');
const formEditAvatar = document.querySelector('.popup__avatar-form');
const profileAvatar = document.querySelector('.profile__avatar-overlay');
const profileAvatarImg = document.querySelector('.profile__avatar');
const deleteCardPopup = document.querySelector('.popup_type_delete');

const validators = {};

function applyValidationForFrom(form) {
    const validationForm = new FormValidator(enableValidationForm, form);
    validationForm.enableValidation();
    validators[form.name] = validationForm;
}

formsList.forEach((form) => {
    applyValidationForFrom(form);
});

const userData = new UserInfo(profileName, profileInfo, profileAvatarImg);

const editAvatarElement = new PopupWithForm(
    editAvatarPopup,
    (input) => {
        userData.setUserAvatar(input['avatarLink']);
    }
);

editAvatarElement.setEventListeners();

profileAvatar.addEventListener('click', () => {
    formEditAvatar.reset();
    editAvatarElement.open();
    validators.avatarForm.cleanErrors();
});

const editPopupElement = new PopupWithForm(
    editPopup,
    (inputs) => {
        userData.setUserInfo(inputs['userName'], inputs['aboutUser']);
    }
);

editPopupElement.setEventListeners();

const formAddElement = new PopupWithForm(addPopup,
    (inputs) => {
        const card = createCard(inputs['placeName'], inputs['imgLink']);
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

const imagePopup = new PopupWithImage(cardImgPopup);
imagePopup.setEventListeners();

function handleCardClick(name, link) {
    imagePopup.open(name, link);
}

const confirmationPopup = new PopupWithConfirmation(
    deleteCardPopup,
    (card) => {
        card.deleteCard();
    });

confirmationPopup.setEventListeners();

function createCard(name, link) {
    const cardElement = new Card(name, link, '#place-template', handleCardClick,
        () => {
            confirmationPopup.open(cardElement);
        });
    return cardElement.generateCard();
}

const sectionElement = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item.name, item.link);
        sectionElement.addItem(card);
    }
}, placeContainer);

sectionElement.renderer();