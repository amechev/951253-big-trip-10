import AbstractComponent from "./abstract-component";

const createTotalTemplate = (points) => {
  let total = 0;
  points.forEach((el) => {
    const options = Array.from(el.options);
    options.forEach((item) => {
      total += item.price;
    });
    total += el.price;
  });

  return (
    `<p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>
      </p>`
  );
};

export default class Total extends AbstractComponent {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
    this._points = null;
  }

  getTemplate() {
    this._points = this._pointsModel.getPointsAll();
    return createTotalTemplate(this._points);
  }
}
