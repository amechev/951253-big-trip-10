import {createElement} from "../utils";

const generateMenuMarkup = (items) => {
  return Array.from(items)
    .map((item) => {
      const isActive = item.value ? `trip-tabs__btn--active` : ``;
      return (
        `<a class="trip-tabs__btn  ${isActive}" href="#">${item.name}</a>`
      );
    }).join(`\n`);
};

const createSiteMenuTemplate = (menu) => {
  const menuMArkup = generateMenuMarkup(menu);
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${menuMArkup}
     </nav>`
  );
};

export default class Menu {
  constructor(items) {
    this._element = null;
    this._items = items;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._items);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
