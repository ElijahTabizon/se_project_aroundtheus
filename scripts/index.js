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
const modalImg = document.querySelector("#modal-image");
const cardTitleInput = addCardForm.querySelector("#card-title-input");
const cardLinkInput = addCardForm.querySelector("#card-link-input");

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}

function openPopUp(modal) {
  modal.classList.add("modal_opened");
}

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
    openPopUp(previewImageModal);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.imageAlt;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

// preview image modal event
previewImageModalClose.addEventListener("click", () => {
  closePopUp(previewImageModal);
});

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopUp(profileEditModal);
}

// add card
function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const titleValue = cardTitleInput.value;
  const linkValue = cardLinkInput.value;
  const cardData = { name: titleValue, link: linkValue, imageAlt: titleValue };
  const cardElement = getCardElement(cardData);
  cardListEl.prepend(cardElement);
  closePopUp(addCardModal);
  cardTitleInput.value = "";
  cardLinkInput.value = "";
}

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  //profileEditModal.classList.add("modal_opened");
  openPopUp(profileEditModal);
});

profileCloseButton.addEventListener("click", () =>
  closePopUp(profileEditModal)
);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

addNewCardButton.addEventListener("click", () => openPopUp(addCardModal));
addNewCardButtonClose.addEventListener("click", () => closePopUp(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
