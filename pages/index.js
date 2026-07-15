import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    imageAlt: "Yosemite Valley",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg ",
    imageAlt: "Lake Louise",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    imageAlt: "Bald Mountains",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    imageAlt: "Latemar",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    imageAlt: "Vanoise National Park",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    imageAlt: "Lago di Braies",
  },
];

console.log(initialCards);
const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  imageAlt: "Yosemite Valley",
};
const card = new Card(cardData, "#card-template");
card.getView();

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const profileCloseButton = profileEditModal.querySelector(
  "#profile-close-button"
);
const addNewCardButtonClose = addCardModal.querySelector(
  "#add-card-close-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const previewImageModalClose = document.querySelector("#preview-image-close");
const previewImageModalTitle = document.querySelector(
  ".modal__preview-image-title"
);
const previewImageModal = document.querySelector("#preview-image-modal");
console.log("previewImageModal:", previewImageModal);
const modalImg = document.querySelector("#modal-image");
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardLinkInput = addCardForm.querySelector("#image-url-input");
const modals = document.querySelectorAll(".modal");
const modalForms = document.querySelectorAll(".modal__container");
const modalPreviews = document.querySelectorAll(".modal__preview");
const closeButtons = document.querySelectorAll(".modal__close");
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function renderCard(cardData) {
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardTemplate = document
    .querySelector("#card-template")
    .content.querySelector(".card");
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  const trashButton = cardElement.querySelector(".card__trash-button");
  trashButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    const cardData = {
      link: cardImageEl.src,
      name: cardImageEl.alt,
      title: cardTitleEl.textContent,
    };
    modalImg.src = cardData.link;
    modalImg.alt = cardData.name;
    previewImageModalTitle.textContent = cardData.title;
    openModal(previewImageModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.imageAlt;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

// preview image modal event

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);

  editFormValidator.toggleButtonState();
}

// add card
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const titleValue = cardTitleInput.value;
  const linkValue = cardLinkInput.value;
  const cardData = { name: titleValue, link: linkValue, imageAlt: titleValue };
  renderCard(cardData);
  closeModal(addCardModal);
  e.target.reset();

  addCardFormValidator.toggleButtonState();
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editFormValidator.resetValidation();
  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  openModal(addCardModal);
});

// overlay event
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    const openModal = document.querySelector(".modal_opened");
    closeModal(openModal);
  });
});

modalForms.forEach((modalForm) => {
  modalForm.addEventListener("click", (event) => {
    event.stopPropagation();
  });
});

modalPreviews.forEach((preview) => {
  preview.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});

// escape key event
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopUp = document.querySelector(".modal_opened");
    closeModal(openedPopUp);
  }
}
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormElement = document.querySelector("#edit-profile-form");
const addCardFormElement = document.querySelector("#add-card-form");

const editFormValidator = new FormValidator(settings, editFormElement);
const addCardFormValidator = new FormValidator(settings, addCardFormElement);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
