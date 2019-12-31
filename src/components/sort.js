import AbstractComponent from "./abstract-component";

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const Sorts = [
  {
    type: SortType.EVENT,
    name: `event`,
  },
  {
    type: SortType.TIME,
    name: `time`,
  },
  {
    type: SortType.PRICE,
    name: `price`,
  }
];


const createSortMarkup = (items) => {
  return Array.from(items)
    .map((item) => {
      const checked = item.type === `event` ? `checked` : ``;
      return (
        `<div class="trip-sort__item  trip-sort__item--${item.name}">
          <input id="sort-${item.name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="${item.name}" ${checked}>
          <label class="trip-sort__btn" for="sort-${item.name}">
            ${item.name}
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
    this._items = Sorts;
    this._currenSortType = null;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName.toUpperCase() !== `INPUT`) {
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
