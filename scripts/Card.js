export default class Card {
  constructor({ name, link, imageAlt }, cardSelector) {
    this._name = name;
    this._link = link;
    this._imageAlt = imageAlt;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });
    this._cardElement
      .querySelector(".card__trash-button")
      .addEventListener("click", () => {
        this._handleTrashIcon();
      });
  }

  _handleTrashIcon() {
    this._cardElement.remove();
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    // get the card view
    // set evt listeners
    this._setEventListeners();
    // return the card
  }
}
