import {Options, Transfers, TypesIcons} from "../const";
import {timeStringFormater} from "../utils/common";
import AbstractSmartComponent from "./abtract-smart-component";

const createOptionsMarkup = (items) => {
  return Array.from(items)
    .map((item) => {
      const option = Options.find((el) => el.type === item);
      return (
        `<li class="event__offer">
          <span class="event__offer-title">${option.name}</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
         </li>`
      );
    }).join(`\n`);
};

const getTimeDiffString = (time) => {
  let hours = new Date(time).getUTCHours();
  let minutes = new Date(time).getUTCMinutes();

  hours = timeStringFormater(hours);
  minutes = timeStringFormater(minutes);
  return `${hours}H ${minutes}M `;
};

const getPointTimeMarkup = (start, finish) => {
  const startTime = `${timeStringFormater(start.getHours())}:${timeStringFormater(start.getMinutes())}`;
  const finishTime = `${timeStringFormater(finish.getHours())}:${timeStringFormater(finish.getMinutes())}`;
  return `<time class="event__start-time" datetime="${start}">${startTime}</time>
              &mdash;
              <time class="event__end-time" datetime="${finish}">${finishTime}</time>`;
};

const createCardTemplate = (card) => {
  const {type, location, start, finish, price, options} = card;
  const pointType = Transfers.some((el) => el === type) ? `to` : `on`;
  const pointTimeMarkup = getPointTimeMarkup(start, finish);

  const offersMarkup = createOptionsMarkup(options);
  const diffTime = (finish.getTime() - start.getTime());
  const diff = getTimeDiffString(diffTime);

  return (
    `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="${TypesIcons[type]}" alt="Event type icon">
          </div>
          <h3 class="event__title">${type} ${pointType} ${location}</h3>

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

export default class Card extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
