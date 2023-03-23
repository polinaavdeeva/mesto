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

function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closePopupByEsc);
}

buttonOpenEditProfilePopup.addEventListener('click', () => {
    openPopup(editPopup);
    nameInput.value = profileName.textContent;
    jobInput.value = profileInfo.textContent;
    setDisabledButton(enableValidationForm);
});

buttonOpenAddCardPopup.addEventListener('click', () => {
    openPopup(addPopup);
    setDisabledButton(enableValidationForm);
});

function closeForm(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', closePopupByEsc);
    formAddCard.reset();
};

function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        popupsList.forEach((closestPopup) => {
            closeForm(closestPopup);
        });
    }
};

buttonsClosePopup.forEach((button) => {
    const closestPopup = button.closest('.popup');
    button.addEventListener('click', function() {
        closeForm(closestPopup);
        cleanErrors(enableValidationForm);
    });
});

popupsList.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closeForm(popup);
            cleanErrors(enableValidationForm);
        };
    });
});

function handleEditFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileInfo.textContent = jobInput.value;
    closeForm(editPopup);
}

formEditProfile.addEventListener('submit', handleEditFormSubmit);

const placeTemplateCard = document.querySelector('#place-template').content;

function createCard(card) {
    const placeCard = placeTemplateCard.querySelector('.elements__item').cloneNode(true);
    const placeName = placeCard.querySelector('.elements__title');
    placeName.textContent = card.name;

    const placeImage = placeCard.querySelector('.elements__image');
    placeImage.setAttribute('src', card.link);
    placeImage.setAttribute('alt', card.name);

    placeCard.querySelector('.elements__like').addEventListener('click', function(event) {
        event.target.classList.toggle('elements__like_active');
    });

    placeCard.querySelector('.elements__reset-button').addEventListener('click', function(event) {
        event.target.closest('.elements__item').remove();
    });

    placeImage.addEventListener('click', () => {
        openPopup(cardImgPopup);

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
    formAddCard.reset();
    closeForm(addPopup);
}

const formAddCard = document.querySelector('.popup__add-form');
formAddCard.addEventListener('submit', handleAddFormSubmit);