import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";
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
        api.editUserAvatar(input)
            .then((response) => {
                userData.setUserAvatar(response.avatar);
            })
            .catch((error) => {
                console.log(`Ошибка ${error}`)
            })
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
        editPopupElement.loadingButtonText(true, 'Сохранение...')
        api.editUserInfo(inputs)
            .then((response) => {
                userData.setUserInfo(response.name, response.about);
            })
            .catch((error) => {
                console.log(`Ошибка ${error}`)
            })
            .finally(() => {
                editPopupElement.loadingButtonText(false, 'Сохранить')
            })
    }
);

editPopupElement.setEventListeners();

const formAddElement = new PopupWithForm(addPopup,
    (inputs) => {
        formAddElement.loadingButtonText(true, 'Создание...')
        api.addNewCard(inputs)
            .then((response) => {
                const card = createCard(response);
                sectionElement.addItem(card);
            })
            .catch((error) => {
                console.log(`Ошибка ${error}`)
            })
            .finally(() =>
                formAddElement.loadingButtonText(false, 'Создать')
            )
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

const confirmationPopup = new PopupWithConfirmation(deleteCardPopup);

confirmationPopup.setEventListeners();

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
    headers: {
        authorization: 'be897a2d-f774-4214-8213-bbd45b161de7',
        'Content-Type': 'application/json'
    }
});

//let userId = null;

Promise.all([api.getUserInfo(), api.getInitalCards()])
    .then(([userInfo, cards]) => {
        userId = userInfo._id;
        userData.setUserInfo(userInfo.name, userInfo.about);
        userData.setUserAvatar(userInfo.avatar);
        sectionElement.renderer(cards);
        //console.log(userInfo)
        userId = userInfo._id;
    })
    .catch((error) => {
        console.log(`Ошибка ${error}`)
    });

let userId = null;

function createCard(data) {
    const cardElement = new Card(data, userId, '#place-template', handleCardClick,
        (id) => {
            confirmationPopup.open();
            confirmationPopup.setSubmitMethod(() => {
                api.deleteCard(id)
                    .then(() => {
                        cardElement.removeCard();
                    })
                    .catch((error) => {
                        console.log(`Ошибка ${error}`)
                    })
            })
        },
        (id) => {
            if (cardElement.isCardLiked()) {
                api.deleteLike(id)
                    .then((response) => {
                        cardElement.setNewLikes(response.likes);
                    })
                    .catch((error) => {
                        console.log(`Ошибка ${error}`)
                    })
            } else {
                api.putLike(id)
                    .then((response) => {
                        cardElement.setNewLikes(response.likes);
                    })
                    .catch((error) => {
                        console.log(`Ошибка ${error}`)
                    })
            }
        });
    return cardElement.generateCard();
}

const sectionElement = new Section({
    renderer: (item) => {
        const card = createCard(item);
        sectionElement.addItem(card);
    }
}, placeContainer);

//sectionElement.renderer();