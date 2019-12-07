import AbstractComponent from "./abstract-component";

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

export default class Total extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createTotalTemplate(this._points);
  }
}
