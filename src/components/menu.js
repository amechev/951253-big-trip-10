import AbstractComponent from "./abstract-component";

const ACTIVE_CLASS = `trip-tabs__btn--active`;

const generateMenuMarkup = (items) => {
  return Array.from(items)
    .map((item) => {
      const isActive = item.value ? ACTIVE_CLASS : ``;
      return (
        `<a class="trip-tabs__btn  ${isActive}" id="${item.name}" href="#">${item.name}</a>`
      );
    }).join(`\n`);
};

const createSiteMenuTemplate = (menu) => {
  const menuMarkup = generateMenuMarkup(menu);
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
        ${menuMarkup}
     </nav>`
  );
};

export default class Menu extends AbstractComponent {
  constructor(items) {
    super();
    this._items = items;
  }

  getTemplate() {
    return createSiteMenuTemplate(this._items);
  }

  setActiveItem(menuItem) {
    this.getElement().querySelector(`.` + ACTIVE_CLASS).classList.remove(ACTIVE_CLASS);
    const item = this.getElement().querySelector(`#${menuItem}`);

    if (item) {
      item.classList.add(ACTIVE_CLASS);
    }
  }

  setOnChange(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      if (evt.target.tagName.toUpperCase() !== `A`) {
        return;
      }

      const menuItem = evt.target.id;

      handler(menuItem);
    });
  }
}
