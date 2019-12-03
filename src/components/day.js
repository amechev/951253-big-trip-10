import {MonthNames} from "../const";
import {createElement} from "../utils";

const createDayItemTemplate = (date, cnt) => {
  const dateTime = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
  const dateText = `${MonthNames[date.getMonth() - 1]} ${date.getDate()}`;
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

export default class Day {
  constructor(date, cnt) {
    this._element = null;
    this._date = date;
    this._cnt = cnt;
  }

  getTemplate() {
    return createDayItemTemplate(this._date, this._cnt);
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
