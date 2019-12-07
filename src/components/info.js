import {MonthNames} from "../const";
import AbstractComponent from "./abstract-component";

const createInfoTemplate = (points) => {
  const firstDateOfTrip = `${MonthNames[points[0].start.getMonth() - 1]} ${points[0].start.getDate()}`;
  const latsDateOfTrip = points[points.length - 1].finish.getDate();
  const firstCity = points[0].location;
  const lastCity = points[points.length - 1].location;

  return (
    `<div class="trip-info__main">
        <h1 class="trip-info__title">${firstCity} &mdash; ... &mdash; ${lastCity}</h1>

        <p class="trip-info__dates">${firstDateOfTrip}&nbsp;&mdash;&nbsp;${latsDateOfTrip}</p>
      </div>`
  );
};

export default class Info extends AbstractComponent {
  constructor(points) {
    super();
    this._points = points;
  }

  getTemplate() {
    return createInfoTemplate(this._points);
  }
}
