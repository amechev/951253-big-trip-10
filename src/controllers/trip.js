import {render, RenderPosition, replace} from "../utils/render";
import CardComponent from "../components/card";
import CardEditComponent from "../components/card-edit";
import NoCardsComponent from "../components/no-cards";
import DaysListComponent from "../components/days-list";
import DayComponent from "../components/day";
import SortComponent from "../components/sort";

const renderCard = (event, day) => {
  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToTask();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  const replaceEditToTask = () => {
    replace(cardComponent, cardEditComponent);
  };

  const replaceTaskToEdit = () => {
    replace(cardEditComponent, cardComponent);
  };

  const cardComponent = new CardComponent(event);
  cardComponent.setEditButtonClickHandler(() => {
    replaceTaskToEdit();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  const cardEditComponent = new CardEditComponent(event);
  cardEditComponent.setSubmitHandler(() => {
    replaceEditToTask();
  });

  render(day, cardComponent, RenderPosition.BEFOREEND);
};

const renderDefaultList = (container, daysListElement, events) => {
  let currentDay = 1;
  let currentDate = events[0].start;
  render(daysListElement, new DayComponent(currentDate, currentDay), RenderPosition.BEFOREEND);
  let dayEventsListElement = container.querySelector(`.trip-events__list`);

  events.forEach((item) => {
    if (item.start.getDate() !== currentDate.getDate()) {
      currentDay++;
      currentDate = item.start;
      render(daysListElement, new DayComponent(currentDate, currentDay), RenderPosition.BEFOREEND);
      const nodes = container.querySelectorAll(`.trip-events__list`);
      dayEventsListElement = nodes[nodes.length - 1];
    }

    renderCard(item, dayEventsListElement);
  });
};

const renderSorted = (container, daysListElement, events) => {
  render(daysListElement, new DayComponent(), RenderPosition.BEFOREEND);
  let dayEventsListElement = container.querySelector(`.trip-events__list`);

  events.forEach((item) => {
    renderCard(item, dayEventsListElement);
  });
};

export default class TripController {
  constructor(container) {
    this._container = container;

    this._noCardsComponent = new NoCardsComponent();
    this._daysListComponent = new DaysListComponent();
    this._sortComponent = new SortComponent();
  }

  render(events) {
    if (!events.length) {
      render(this._container, this._noCardsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);

    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);

    const daysListElement = this._container.querySelector(`.trip-days`);

    renderDefaultList(this._container, daysListElement, events);

    this._sortComponent.setSortTypeChangeHandler((sortType) => {
      let sortedEvents = [];

      daysListElement.innerHTML = ``;

      switch (sortType) {
        case `price`:
          sortedEvents = events.slice().sort((a, b) => b.price - a.price);
          renderSorted(this._container, daysListElement, sortedEvents);
          break;
        case `time`:
          sortedEvents = events.slice().sort((a, b) => (a.start - a.finish) - (b.start - b.finish));
          renderSorted(this._container, daysListElement, sortedEvents);
          break;
        case `event`:
          sortedEvents = events.slice();
          renderDefaultList(this._container, daysListElement, sortedEvents);
          break;
      }
    });
  }
}

