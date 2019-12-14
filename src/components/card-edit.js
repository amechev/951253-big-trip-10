import {TypesIcons, Transfers, Activities, Cities, Options} from "../const";
import AbstractSmartComponent from "./abtract-smart-component";

const createTransfersMarkup = (items, active) => {
  return Array.from(items)
    .map((item) => {
      const isChecked = item === active ? `checked` : ``;
      return (
        `<div class="event__type-item">
          <input id="event-type-${item}" ${isChecked} class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
          <label class="event__type-label  event__type-label--${item}" for="event-type-${item}">${item}</label>
        </div>`
      );
    }).join(`\n`);
};
const createActivitiesMarkup = (items, active) => {
  return Array.from(items)
    .map((item) => {
      const isChecked = item === active ? `checked` : ``;
      return (
        `<div class="event__type-item">
          <input id="event-type-${item}" ${isChecked} class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
          <label class="event__type-label  event__type-label--${item}" for="event-type-${item}">${item}</label>
        </div>`
      );
    }).join(`\n`);
};

const creatingCitiesMarkup = (items) => {
  return Array.from(items)
    .map((item) => {
      return (
        `<option value="${item}"></option>`
      );
    }).join(`\n`);
};

const createOptionsMarkup = (optionsActive) => {
  return Array.from(Options)
    .map((item) => {
      const isChecked = optionsActive.some((el) => el === item.type) ? `checked` : ``;
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden"
          id="event-offer-${item.type}"
          type="checkbox"
          name="event-offer-${item.type}" ${isChecked}>
          <label class="event__offer-label" for="event-offer-${item.type}">
            <span class="event__offer-title">${item.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
};

const createPhotosMarkup = (items) => {
  return Array.from(items)
    .map((item) => {
      return (
        `<img class="event__photo" src="${item}" alt="Event photo">`
      );
    }).join(`\n`);
};

const createCardEditTemplate = (card) => {
  const {type, location, pictures, description, start, finish, price, options, isFavorite} = card;
  const pointType = Transfers.some((el) => el === type) ? `to` : `on`;
  const transfersMarkup = createTransfersMarkup(Transfers, type);
  const activitiesMarkup = createActivitiesMarkup(Activities);
  const citiesMarkup = creatingCitiesMarkup(Cities);
  const optionsMarkup = createOptionsMarkup(options);
  const photosMarkup = createPhotosMarkup(pictures);
  const startDate = `${start.getDate()}/${start.getMonth()}/${start.getFullYear()} ${start.getHours()}:${start.getMinutes()}`;
  const finishDate = `${finish.getDate()}/${finish.getMonth()}/${finish.getFullYear()} ${finish.getHours()}:${finish.getMinutes()}`;
  const isChecked = isFavorite ? `checked` : ``;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="${TypesIcons[type]}" alt="Event type icon">
                </label>
                <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

                <div class="event__type-list">
                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Transfer</legend>
                    ${transfersMarkup}
                  </fieldset>

                  <fieldset class="event__type-group">
                    <legend class="visually-hidden">Activity</legend>
                    ${activitiesMarkup}
                  </fieldset>
                </div>
              </div>

              <div class="event__field-group  event__field-group--destination">
                <label class="event__label  event__type-output" for="event-destination-1">
                  ${type} ${pointType}
                </label>
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${location}" list="destination-list-1">
                <datalist id="destination-list-1">
                  ${citiesMarkup}
                </datalist>
              </div>

              <div class="event__field-group  event__field-group--time">
                <label class="visually-hidden" for="event-start-time-1">
                  From
                </label>
                <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
                &mdash;
                <label class="visually-hidden" for="event-end-time-1">
                  To
                </label>
                <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${finishDate}">
              </div>

              <div class="event__field-group  event__field-group--price">
                <label class="event__label" for="event-price-1">
                  <span class="visually-hidden">Price</span>
                  ${price}&euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">Cancel</button>
              <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isChecked}>
              <label class="event__favorite-btn" for="event-favorite-1">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                  <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
              </label>
            </header>
            <section class="event__details">

              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  ${optionsMarkup}
                </div>
              </section>

              <section class="event__section  event__section--destination">
                <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                <p class="event__destination-description">${description}</p>

                <div class="event__photos-container">
                  <div class="event__photos-tape">
                     ${photosMarkup}
                  </div>
                </div>
              </section>
            </section>
          </form>`
  );
};

export default class CardEdit extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._subscribeOnEvents();
    this._submitHandler = null;
    this._favoriteHandler = null;
  }

  recoveryListeners() {
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  reset() {
    this.rerender();
  }

  getTemplate() {
    return createCardEditTemplate(this._card);
  }

  setSubmitHandler(handler) {
    this._submitHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this._favoriteHandler = handler;
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._favoriteHandler);

    element.querySelector(`.event__save-btn`)
      .addEventListener(`click`, this._submitHandler);

    element.querySelectorAll(`.event__type-input`).forEach((item) => {
      item.addEventListener(`click`, (event) => {
        if (event.target.value) {
          this._card.type = event.target.value;
          this.rerender();
        }
      });
    });

  }
}
