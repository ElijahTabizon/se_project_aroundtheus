export default class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._imageAlt = data.imageAlt || data.name;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    this._cardImageEl
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    this._cardImageEl
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleTrashIcon();
      });
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  _handleTrashIcon() {
    this._cardImageEl.remove();
  }

  _handleLikeIcon() {
    this._cardImageEl
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardImageEl = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardImage = this._cardImageEl.querySelector(".card__image");
    this._cardTitle = this._cardImageEl.querySelector(".card__title");

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._imageAlt;

    // set evt listeners
    this._setEventListeners();
    // return the card
    return this._cardImageEl;
  }
}
