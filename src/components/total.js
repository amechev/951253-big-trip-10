import AbstractComponent from "./abstract-component";

const getSummaryByPrice = (arr) => {
  return arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.price;
  }, 0);
};

const createTotalTemplate = (points) => {
  const optionsArr = points.map((el) => {
    return getSummaryByPrice(el.options);
  });

  const optionsSummary = optionsArr.reduce((a, b) => {
    return a + b;
  });

  const total = getSummaryByPrice(points) + optionsSummary;

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
