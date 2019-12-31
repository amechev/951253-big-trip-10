import {MonthNames} from "../const";
import AbstractComponent from "./abstract-component";

const createDayItemTemplate = (date, cnt) => {
  let dateTime = ``;
  let dateText = ``;
  if (date && cnt) {
    dateTime = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    dateText = `${MonthNames[date.getMonth()]} ${date.getDate()}`;
  }

  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${cnt}</span>
          <time class="day__date" datetime="${dateTime}">${dateText}</time>
        </div>

        <ul class="trip-events__list"></ul>
     </li>`
  );
};

export default class Day extends AbstractComponent {
  constructor(date, cnt) {
    super();
    this._date = date || ``;
    this._cnt = cnt || ``;
  }

  getTemplate() {
    return createDayItemTemplate(this._date, this._cnt);
  }
}
