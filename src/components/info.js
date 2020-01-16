import {MonthNames} from "../const";
import AbstractComponent from "./abstract-component";

const findUniqueDestinations = (value, index, self) => {
  return self.indexOf(value) === index;
};

const createInfoTemplate = (points) => {
  if (!points || !points.length) {
    return `<div class="trip-info__main"></div>`;
  }

  points.sort((a, b) => a.start - b.start);

  let destinationNames = [];
  points.forEach((el) => {
    destinationNames.push(el.destination.name);
  });

  destinationNames.filter(findUniqueDestinations);
  if (destinationNames.length > 3) {
    destinationNames.splice(1, destinationNames.length - 2);
    destinationNames = destinationNames.join(` — ... — `);
  } else {
    destinationNames = destinationNames.join(` — `);
  }

  const startDate = new Date(points[0].start);
  const finishDate = new Date(points[points.length - 1].finish);
  const firstDateOfTrip = `${startDate.getDate()} ${MonthNames[startDate.getMonth()]}`;
  const latsDateOfTrip = `${finishDate.getDate()} ${MonthNames[finishDate.getMonth()]}`;

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
