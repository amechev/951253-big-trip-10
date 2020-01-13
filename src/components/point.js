import {Transfers, TypesIcons} from "../const";
import AbstractSmartComponent from "./abtract-smart-component";
import moment from "moment";

const createOptionsMarkup = (items) => {
  return Array.from(items)
    .map((item) => {
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${item.title}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
         </li>`
      );
    }).join(`\n`);
};

const getPointTimeMarkup = (start, finish) => {
  const startTime = moment(start).format(`HH:mm`);
  const finishTime = moment(finish).format(`HH:mm`);
  return `<time class="event__start-time" datetime="${start}">${startTime}</time>
              &mdash;
              <time class="event__end-time" datetime="${finish}">${finishTime}</time>`;
};

const createPointTemplate = (point) => {
  const {type, destination, start, finish, price, options} = point;
  const pointType = Transfers.some((el) => el === type) ? `to` : `on`;
  const pointTimeMarkup = getPointTimeMarkup(start, finish);

  const offersMarkup = createOptionsMarkup(options);
  const diffTime = moment(finish).diff(moment(start));
  const diffHours = moment(finish).diff(moment(start), `hours`);
  const diff = diffHours + `H ` + moment.utc(diffTime).format(`mm[M]`);

  return (
    `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="${TypesIcons[type]}" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${pointType} ${destination.name}</h3>

          <div class="event__schedule">
            <p class="event__time">
              ${pointTimeMarkup}
            </p>
            <p class="event__duration">${diff}</p>
          </div>

          <p class="event__price">
            &euro;&nbsp;<span class="event__price-value">${price}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offersMarkup}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
};

export default class Point extends AbstractSmartComponent {
  constructor(point) {
    super();
    this._point = point;
  }

  getTemplate() {
    return createPointTemplate(this._point);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
