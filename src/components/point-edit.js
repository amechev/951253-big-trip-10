import {TypesIcons, Transfers, Activities, Cities, Options} from "../const";
import AbstractSmartComponent from "./abtract-smart-component";
import flatpickr from "flatpickr";
import {formatDate} from "../utils/common";
import {Mode as PointControllerMode} from "../controllers/point";

const OPTION_ID_PREFIX = `event-offer-`;

const getOptionNameByClass = (name) => {
  return name.substring(OPTION_ID_PREFIX.length);
};

const createTransfersMarkup = (items, active) => {
  return Array.from(items)
    .map((item) => {
      const isChecked = item === active ? `checked` : ``;
      return (
        `<div class="event__type-item">
          <input id="event-type-${item}" 
            ${isChecked} 
            class="event__type-input  visually-hidden" 
            type="radio" 
            name="event-type"
             value="${item}">
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
          <input id="event-type-${item}"
             ${isChecked}
             class="event__type-input  visually-hidden"
             type="radio" 
             name="event-type" 
             value="${item}">
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

const createOptionsMarkup = (options, optionsActive) => {
  return options
    .map((item) => {
      const isChecked = optionsActive.some((el) => el === item.type);
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden"
          id="event-offer-${item.type}"
          type="checkbox"
          name="event-offer-${item.type}" 
          ${isChecked ? `checked` : ``}>
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
  if (!items) {
    return ``;
  }
  return Array.from(items)
    .map((item) => {
      return (
        `<img class="event__photo" src="${item}" alt="Event photo">`
      );
    }).join(`\n`);
};

const createPointEditTemplate = (point, pointOptions = {}) => {
  const {pictures, description = ``, isFavorite} = point;
  const {type, destination, start, finish, price, options, mode} = pointOptions;

  const pointType = Transfers.some((el) => el === type) ? `to` : `on`;
  const transfersMarkup = createTransfersMarkup(Transfers, type);
  const activitiesMarkup = createActivitiesMarkup(Activities, type);
  const citiesMarkup = creatingCitiesMarkup(Cities);
  const optionsMarkup = createOptionsMarkup(Options, options);
  const photosMarkup = createPhotosMarkup(pictures);
  const startDate = formatDate(start);
  const finishDate = formatDate(finish);
  const isChecked = isFavorite ? `checked` : ``;
  const resetButtonTxt = mode === PointControllerMode.ADDING ? `Cancel` : `Delete`;

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
                <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
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
                  &euro;
                </label>
                <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
              </div>

              <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
              <button class="event__reset-btn" type="reset">${resetButtonTxt}</button>
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

const parseFormData = (formData, context) => {
  const options = [];

  return {
    type: formData.get(`event-type`),
    destination: formData.get(`event-destination`),
    start: context._flatpickrStart.parseDate(formData.get(`event-start-time`), `d/m/y H:i`),
    finish: context._flatpickrFinish.parseDate(formData.get(`event-end-time`), `d/m/y H:i`),
    price: formData.get(`event-price`),
    options: formData.getAll(`event__offer-checkbox`).reduce((acc, it) => {
      acc[it] = true;
      return acc;
    }, options),
  };
};

export default class PointEdit extends AbstractSmartComponent {
  constructor(point, mode) {

    super();

    this._mode = mode;
    this._point = point;
    this._pointType = point.type;
    this._pointDestination = point.destination;
    this._pointStart = point.start;
    this._pointFinish = point.finish;
    this._pointPrice = point.price;
    this._pointOptions = point.options.slice();
    this._submitHandler = null;
    this._deleteButtonClickHandler = null;
    this._favoriteHandler = null;
    this._flatpickrStart = null;
    this._flatpickrFinish = null;

    this._subscribeOnEvents();
    this._applyFlatpickr();
  }

  getTemplate() {
    return createPointEditTemplate(this._point, {
      type: this._pointType,
      destination: this._pointDestination,
      start: this._pointStart,
      finish: this._pointFinish,
      price: this._pointPrice,
      options: this._pointOptions,
      mode: this._mode
    });
  }

  removeElement() {
    if (this._flatpickrStart && this._flatpickrFinish) {
      this._destroyFlatpickrs();
    }

    super.removeElement();
  }

  recoveryListeners() {
    this.setSubmitHandler(this._submitHandler);
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();

    this._applyFlatpickr();
  }

  reset() {
    const point = this._point;
    this._pointType = point.type;
    this._pointDestination = point.destination;
    this._pointStart = point.start;
    this._pointFinish = point.finish;
    this._pointPrice = point.price;
    this._pointOptions = point.options.slice();

    this.rerender();
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);

    return parseFormData(formData, this);
  }

  setSubmitHandler(handler) {
    const form = this.getElement().querySelector(`form`);
    if (form) {
      form.addEventListener(`submit`, handler);
    }

    this._submitHandler = handler;
  }

  setDeleteButtonClickHandler(handler) {
    const deleteButton = this.getElement().querySelector(`.event__reset-btn`);
    if (deleteButton) {
      deleteButton.addEventListener(`click`, handler);
    }

    this._deleteButtonClickHandler = handler;
  }

  setFavoritesButtonClickHandler(handler) {
    this._favoriteHandler = handler;
  }

  _destroyFlatpickrs() {
    this._flatpickrStart.destroy();
    this._flatpickrStart = null;
    this._flatpickrFinish.destroy();
    this._flatpickrFinish = null;
  }

  _applyFlatpickr() {
    if (this._flatpickrStart && this._flatpickrFinish) {
      this._destroyFlatpickrs();
    }

    const dateElementStart = this.getElement().querySelector(`#event-start-time-1`);
    this._flatpickrStart = flatpickr(dateElementStart, {
      allowInput: true,
      defaultDate: this._pointStart,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });

    const dateElementFinish = this.getElement().querySelector(`#event-end-time-1`);
    this._flatpickrFinish = flatpickr(dateElementFinish, {
      allowInput: true,
      defaultDate: this._pointFinish,
      enableTime: true,
      dateFormat: `d/m/y H:i`,
    });
  }

  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._deleteButtonClickHandler);

    element.querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, this._favoriteHandler);

    element.querySelector(`.event__save-btn`)
      .addEventListener(`click`, this._submitHandler);

    element.querySelectorAll(`.event__type-input`).forEach((item) => {
      item.addEventListener(`click`, (event) => {
        if (event.target.value) {
          this._pointType = event.target.value;
          this.rerender();
        }
      });
    });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`input`, (evt) => {
        this._pointDestination = evt.target.value;
        this.rerender();
      });

    element.querySelector(`.event__input--price`)
      .addEventListener(`input`, (evt) => {
        this._pointPrice = evt.target.value;
        this.rerender();
      });

    element.querySelector(`#event-start-time-1`)
      .addEventListener(`input`, (evt) => {
        if (evt.target.value) {
          this._pointStart = this._flatpickrStart.parseDate(evt.target.value, `d/m/y H:i`);
          this.rerender();
        }
      });

    element.querySelector(`#event-end-time-1`)
      .addEventListener(`input`, (evt) => {
        if (evt.target.value) {
          this._pointFinish = this._flatpickrFinish.parseDate(evt.target.value, `d/m/y H:i`);
          this.rerender();
        }
      });

    const options = element.querySelector(`.event__available-offers`);
    if (options) {
      options.addEventListener(`change`, (evt) => {
        const optionName = getOptionNameByClass(evt.target.name);
        if (evt.target.checked) {
          this._pointOptions.push(optionName);
        } else {
          this._pointOptions = this._pointOptions.filter((el) => {
            return el !== optionName;
          });
        }
        this.rerender();

      });
    }
  }
}
