import {createElement} from "../utils";

const createTotalTemplate = (points) => {
  let total = 0;
  points.forEach((el) => {
    total += el.price;
  });

  return (
    `<p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
      </p>`
  );
};

export default class Total {
  constructor(points) {
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return createTotalTemplate(this._points);
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
