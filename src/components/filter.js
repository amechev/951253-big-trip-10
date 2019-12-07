import AbstractComponent from "./abstract-component";

const createFilterMarkup = (items) => {
  return Array.from(items)
    .map((item) => {
      const isChecked = item.value ? `checked` : ``;
      return (
        `<div class="trip-filters__filter">
          <input id="filter-${item.type}" class="trip-filters__filter-input  visually-hidden" 
            type="radio"
            name="trip-filter" 
            value="${item.type}"
            ${isChecked}>
          <label class="trip-filters__filter-label" for="filter-everything">${item.name}</label>
        </div>`
      );
    }).join(`\n`);
};

const createSiteFilterTemplate = (filters) => {
  const filtersMarkup = createFilterMarkup(filters);
  return (
    `<form class="trip-filters" action="#" method="get">
        ${filtersMarkup}
  
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(items) {
    super();
    this._items = items;
  }

  getTemplate() {
    return createSiteFilterTemplate(this._items);
  }
}
