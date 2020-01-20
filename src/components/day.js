import {MONTH_NAMES} from "../const";
import AbstractComponent from "./abstract-component";

const createDayItemTemplate = (date, dayCounter) => {
  const dateTime = date && dayCounter ? `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}` : ``;
  const dateText = date && dayCounter ? `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}` : ``;

  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayCounter}</span>
          <time class="day__date" datetime="${dateTime}">${dateText}</time>
        </div>

        <ul class="trip-events__list"></ul>
     </li>`
  );
};

export default class Day extends AbstractComponent {
  constructor(date, dayCounter) {
    super();
    this._date = new Date(date) || ``;
    this._dayCounter = dayCounter || ``;
  }

  getTemplate() {
    return createDayItemTemplate(this._date, this._dayCounter);
  }
}
