import {render, RenderPosition} from "../utils/render";
import NoCardsComponent from "../components/no-cards";
import DaysListComponent from "../components/days-list";
import DayComponent from "../components/day";
import SortComponent from "../components/sort";
import PointController from "./point";

const renderDefaultList = (daysListElement, events, onDataChange, onViewChange) => {
  let currentDay = 1;
  let currentDate = events[0].start;
  let dayComponent = new DayComponent(currentDate, currentDay);

  render(daysListElement, dayComponent, RenderPosition.BEFOREEND);
  let dayEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);
  const points = [];

  events.forEach((item) => {
    if (item.start.getDate() !== currentDate.getDate()) {
      currentDay++;
      currentDate = item.start;
      dayComponent = new DayComponent(currentDate, currentDay);
      render(daysListElement, dayComponent, RenderPosition.BEFOREEND);
      const nodes = dayComponent.getElement().querySelectorAll(`.trip-events__list`);
      dayEventsListElement = nodes[nodes.length - 1];
    }

    const point = new PointController(dayEventsListElement, onDataChange, onViewChange);
    point.render(item);
    points.push(point);
  });

  return points;
};

const renderSorted = (daysListElement, events, onDataChange, onViewChange) => {
  let dayComponent = new DayComponent();
  render(daysListElement, dayComponent, RenderPosition.BEFOREEND);

  let dayEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);

  const points = [];
  events.forEach((item) => {
    const point = new PointController(dayEventsListElement, onDataChange, onViewChange);
    point.render(item);
    points.push(point);
  });

  return points;
};

export default class TripController {
  constructor(container) {
    this._container = container;
    this._events = [];
    this._showedCardsControllers = [];
    this._noCardsComponent = new NoCardsComponent();
    this._daysListComponent = new DaysListComponent();
    this._sortComponent = new SortComponent();
    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _onSortTypeChange(sortType) {
    let sortedEvents = [];
    this._daysListComponent.getElement().innerHTML = ``;
    this._showedCardsControllers = [];

    switch (sortType) {
      case `price`:
        sortedEvents = this._events.slice().sort((a, b) => b.price - a.price);
        this._showedCardsControllers = renderSorted(this._daysListComponent.getElement(), sortedEvents, this._onDataChange, this._onViewChange);
        break;
      case `time`:
        sortedEvents = this._events.slice().sort((a, b) => (a.start - a.finish) - (b.start - b.finish));
        this._showedCardsControllers = renderSorted(this._daysListComponent.getElement(), sortedEvents, this._onDataChange, this._onViewChange);
        break;
      case `event`:
        sortedEvents = this._events.slice();
        this._showedCardsControllers = renderDefaultList(this._daysListComponent.getElement(), sortedEvents, this._onDataChange, this._onViewChange);
        break;
    }
  }

  _onViewChange() {
    this._showedCardsControllers.forEach((it) => it.setDefaultView());
  }

  _onDataChange(cardController, oldData, newData) {
    const index = this._events.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._events = [].concat(this._events.slice(0, index), newData, this._events.slice(index + 1));
    cardController.render(this._events[index]);
  }

  render(events) {
    this._events = events;

    if (!this._events.length) {
      render(this._container, this._noCardsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(this._container, this._sortComponent, RenderPosition.BEFOREEND);

    render(this._container, this._daysListComponent, RenderPosition.BEFOREEND);

    this._showedCardsControllers = renderDefaultList(this._daysListComponent.getElement(), this._events, this._onDataChange, this._onViewChange);
  }
}

