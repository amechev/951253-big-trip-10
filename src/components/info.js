import {MONTH_NAMES} from "../const";
import AbstractComponent from "./abstract-component";

const MAX_DESTINATIONS_COUNTER = 3;

const createInfoTemplate = (points) => {
  if (!points || !points.length) {
    return `<div class="trip-info__main"></div>`;
  }

  points.sort((a, b) => a.start - b.start);

  let destinationNames = points.map((el) => {
    return el.destination.name;
  });

  if (destinationNames.length > MAX_DESTINATIONS_COUNTER) {
    destinationNames.splice(1, destinationNames.length - 2);
    destinationNames = destinationNames.join(` — ... — `);
  } else {
    destinationNames = destinationNames.join(` — `);
  }

  const startDate = new Date(points[0].start);
  const finishDate = new Date(points[points.length - 1].finish);
  const firstDateOfTrip = `${startDate.getDate()} ${MONTH_NAMES[startDate.getMonth()]}`;
  const latsDateOfTrip = `${finishDate.getDate()} ${MONTH_NAMES[finishDate.getMonth()]}`;

  return (
    `<div class="trip-info__main">
        <h1 class="trip-info__title">${destinationNames}</h1>

        <p class="trip-info__dates">${firstDateOfTrip}&nbsp;&mdash;&nbsp;${latsDateOfTrip}</p>
      </div>`
  );
};

export default class Info extends AbstractComponent {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
    this._points = [];
  }

  getTemplate() {
    this._points = this._pointsModel.getPointsAll();
    return createInfoTemplate(this._points);
  }
}
