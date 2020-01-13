import {MonthNames} from "../const";
import AbstractComponent from "./abstract-component";

const createInfoTemplate = (points) => {
  points.sort((a, b) => a.start - b.start);
  if (!points.length) {
    return false;
  }
  const startDate = new Date(points[0].start);
  const finishDate = new Date(points[points.length - 1].finish);
  const firstDateOfTrip = `${MonthNames[startDate.getMonth()]} ${startDate.getDate()}`;
  const latsDateOfTrip = finishDate.getDate();
  const firstCity = points[0].destination.name;
  const lastCity = points[points.length - 1].destination.name;

  return (
    `<div class="trip-info__main">
        <h1 class="trip-info__title">${firstCity} &mdash; ... &mdash; ${lastCity}</h1>

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
    this._points = this._pointsModel.getPoints();
    return createInfoTemplate(this._points);
  }
}
