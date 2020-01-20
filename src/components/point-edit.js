import {ACTIVITIES, TRANSFERS, TYPES_ICONS} from "../const";
import AbstractSmartComponent from "./abtract-smart-component";
import flatpickr from "flatpickr";
import {formatDate} from "../utils/common";
import {Mode as PointControllerMode} from "../controllers/point";
import debounce from 'lodash/debounce';

const OPTION_ID_PREFIX = `event-offer-`;
const DEBOUNCE_TIMEOUT = 500;


const DefaultData = {
  deleteButtonText: `Delete`,
  saveButtonText: `Save`,
  cancelButtonText: `Cancel`
};

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
        `<option value="${item.name}">${item.name}</option>`
      );
    }).join(`\n`);
};

const createOptionsMarkup = (options, optionsActive) => {
  return options
    .map((item, index) => {
      const isChecked = optionsActive.some((el) => el.title === item.title);
      return (
        `<div class="event__offer-selector">
          <input class="event__offer-checkbox  visually-hidden"
          id="event-offer-${index}"
          type="checkbox"
          name="event-offer-checkbox" 
          ${isChecked ? `checked` : ``}>
          <label class="event__offer-label" for="event-offer-${index}">
            <span class="event__offer-title">${item.title}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${item.price}</span>
          </label>
        </div>`
      );
    }).join(`\n`);
};

const createDestinationMarkup = (destination) => {
  if (!destination) {
    return ``;
  }

  let picturesMarkup = ``;

  if (destination.pictures) {
    picturesMarkup = Array.from(destination.pictures)
      .map((item) => {
        return (
          `<img class="event__photo" src="${item.src}" alt="${item.description}">`
        );
      }).join(`\n`);
  }

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${destination.description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
           ${picturesMarkup}
        </div>
      </div>
    </section>`
  );
};

const createFavoriteMarkup = (isFavorite, mode) => {
  return mode !== PointControllerMode.ADDING ? (
    `<input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite}>
      <label class="event__favorite-btn" for="event-favorite-1">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </label>`
  ) : ``;
};

const createPointEditTemplate = (pointOptions = {}) => {
  const {type, isFavorite, destination, start, finish, price, optionsSelected, mode, externalData, offers, destinations} = pointOptions;
  const offerByType = offers.find((el) => {
    return el.type === type;
  });

  const pointType = TRANSFERS.some((el) => el === type) ? `to` : `in`;
  const transfersMarkup = createTransfersMarkup(TRANSFERS, type);
  const activitiesMarkup = createActivitiesMarkup(ACTIVITIES, type);
  const citiesMarkup = creatingCitiesMarkup(destinations);
  const optionsMarkup = createOptionsMarkup(offerByType[`offers`], optionsSelected);
  const destinationMarkup = createDestinationMarkup(destination);
  const startDate = formatDate(start);
  const finishDate = formatDate(finish);
  const isChecked = isFavorite ? `checked` : ``;
  const favoriteMarkup = createFavoriteMarkup(isChecked, mode);
  const resetButtonTxt = mode === PointControllerMode.ADDING ? externalData.cancelButtonText : externalData.deleteButtonText;
  const saveButtonText = externalData.saveButtonText;

  return (
    `<form class="trip-events__item  event  event--edit" action="#" method="post">
            <header class="event__header">
              <div class="event__type-wrapper">
                <label class="event__type  event__type-btn" for="event-type-toggle-1">
                  <span class="visually-hidden">Choose event type</span>
                  <img class="event__type-icon" width="17" height="17" src="${TYPES_ICONS[type]}" alt="Event type icon">
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
                <input class="event__input  event__input--destination"
                 id="event-destination-1" 
                 type="text" 
                 name="event-destination"
                 value="${destination ? destination.name : ``}"
                 list="destination-list-1">
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

              <button class="event__save-btn  btn  btn--blue" type="submit">${saveButtonText}</button>
              <button class="event__reset-btn" type="reset">${resetButtonTxt}</button>
              
              ${favoriteMarkup}
              
            </header>
            <section class="event__details">

              <section class="event__section  event__section--offers">
                <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                <div class="event__available-offers">
                  ${optionsMarkup}
                </div>
              </section>
              
              ${destinationMarkup}

            </section>
          </form>`
  );
};

export default class PointEdit extends AbstractSmartComponent {
  constructor(point, offers, destinations, mode) {
    super();

    this._mode = mode;
    this._point = point;
    this._isFavorite = point.isFavorite;
    this._offers = offers;
    this._destinations = destinations;
    this._pointType = point.type;
    this._pointDestination = point.destination;
    this._pointStart = point.start;
    this._pointFinish = point.finish;
    this._pointPrice = point.price;
    this._pointOptions = point.options.slice();
    this._submitHandler = null;
    this._deleteButtonClickHandler = null;
    this._favoriteHandler = null;
    this._externalData = DefaultData;
    this._flatpickrStart = null;
    this._flatpickrFinish = null;

    this._applyFlatpickr();
  }

  getTemplate() {
    return createPointEditTemplate({
      type: this._pointType,
      destination: this._pointDestination,
      isFavorite: this._isFavorite,
      start: this._pointStart,
      finish: this._pointFinish,
      price: this._pointPrice,
      optionsSelected: this._pointOptions,
      mode: this._mode,
      externalData: this._externalData,
      offers: this._offers,
      destinations: this._destinations
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
    return new FormData(form);
  }

  setData(data) {
    this._externalData = Object.assign({}, DefaultData, data);
    this.rerender();
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

    if (this._mode !== PointControllerMode.ADDING) {
      element.querySelector(`.event__favorite-checkbox`)
        .addEventListener(`change`, debounce((evt) => {
          this._isFavorite = evt.target.checked;
          this.rerender();
          this._favoriteHandler();
        }, DEBOUNCE_TIMEOUT));
    }

    element.querySelector(`.event__save-btn`)
      .addEventListener(`click`, this._submitHandler);

    element.querySelectorAll(`.event__type-input`).forEach((item) => {
      item.addEventListener(`click`, (event) => {
        if (event.target.value) {
          this._pointType = event.target.value;
          this._pointOptions = [];
          this.rerender();
        }
      });
    });

    element.querySelector(`.event__input--destination`)
      .addEventListener(`change`, (evt) => {
        this._pointDestination = this._destinations.find((el) => {
          return el.name === evt.target.value;
        });
        this.rerender();
      });

    element.querySelector(`.event__input--price`)
      .addEventListener(`input`, (evt) => {
        this._pointPrice = evt.target.value;
      });

    element.querySelector(`#event-start-time-1`)
      .addEventListener(`change`, (evt) => {
        if (evt.target.value) {
          this._pointStart = this._flatpickrStart.parseDate(evt.target.value, `d/m/y H:i`);

          if (new Date(this._pointStart) > new Date(this._pointFinish)) {
            this._pointFinish = this._pointStart;
          }

          this.rerender();
        }
      });

    element.querySelector(`#event-end-time-1`)
      .addEventListener(`change`, (evt) => {
        if (evt.target.value) {
          this._pointFinish = this._flatpickrFinish.parseDate(evt.target.value, `d/m/y H:i`);
          this.rerender();
        }
      });

    const options = element.querySelector(`.event__available-offers`);
    if (options) {
      options.addEventListener(`change`, (evt) => {
        const optionName = getOptionNameByClass(evt.target.id);
        const offerByType = this._offers.find((el) => {
          return el.type === this._pointType;
        });
        if (evt.target.checked) {
          this._pointOptions.push(offerByType.offers[optionName]);
        } else {
          this._pointOptions = this._pointOptions.filter((el) => {
            return el.title !== offerByType.offers[optionName].title;
          });
        }
        this.rerender();

      });
    }
  }
}
