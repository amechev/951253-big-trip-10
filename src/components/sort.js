import AbstractComponent from "./abstract-component";

export const SortType = [
  `event`,
  `time`,
  `price`,
];

const createSortMarkup = (items) => {
  return Array.from(items)
    .map((item) => {
      const checked = item === `event` ? `checked` : ``;
      return (
        `<div class="trip-sort__item  trip-sort__item--${item}">
          <input id="sort-${item}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${item}" ${checked}>
          <label class="trip-sort__btn" for="sort-${item}">
            ${item}
          </label>
         </div>`
      );
    }).join(`\n`);

};

const createSortTemplate = (filters) => {
  const sortsMarkup = createSortMarkup(filters);
  return (
    `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <span class="trip-sort__item  trip-sort__item--day">day</span>

        ${sortsMarkup}

        <span class="trip-sort__item  trip-sort__item--offers">Offers</span>
      </form>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._items = SortType;
    this._currenSortType = null;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `INPUT`) {
        return;
      }

      const sortType = evt.target.value;

      if (this._currenSortType === sortType) {
        return;
      }

      this._currenSortType = sortType;

      handler(this._currenSortType);
    });
  }

  getTemplate() {
    return createSortTemplate(this._items);
  }
}
