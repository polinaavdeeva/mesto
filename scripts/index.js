let popup = document.querySelector('.popup');
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close-button');
let formElement = popup.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__text_type_name');
let jobInput = formElement.querySelector('.popup__text_type_about-oneself');
let profileName = document.querySelector('.profile__info-title');
let profileInfo = document.querySelector('.profile__info-subtitle');
let saveButton = formElement.querySelector('.popup__save-button');


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