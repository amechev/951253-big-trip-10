import {render, RenderPosition} from "../utils/render";
import NoPointsComponent from "../components/no-points";
import DaysListComponent from "../components/days-list";
import DayComponent from "../components/day";
import SortComponent, {SortType} from "../components/sort";
import PointController, {EmptyPoint, Mode as PointControllerMode} from './point.js';
import moment from "moment";

const renderDefaultList = (daysListElement, events, onDataChange, onViewChange) => {
  let currentDay = 1;
  events.sort((a, b) => a.start - b.start);
  let currentDate = events[0].start;
  let dayComponent = new DayComponent(currentDate, currentDay);

  render(daysListElement, dayComponent, RenderPosition.BEFOREEND);
  let dayEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);
  const pointControllers = [];

  events.forEach((item) => {
    if (item.start.getDate() !== currentDate.getDate()) {
      currentDay += moment(item.start).startOf(`day`).diff(moment(currentDate).startOf(`day`), `days`);
      currentDate = item.start;
      dayComponent = new DayComponent(currentDate, currentDay);
      render(daysListElement, dayComponent, RenderPosition.BEFOREEND);
      const nodes = dayComponent.getElement().querySelectorAll(`.trip-events__list`);
      dayEventsListElement = nodes[nodes.length - 1];
    }

    const pointController = new PointController(dayEventsListElement, onDataChange, onViewChange);
    pointController.render(item, PointControllerMode.DEFAULT);
    pointControllers.push(pointController);
  });

  return pointControllers;
};

const renderSorted = (daysListElement, events, onDataChange, onViewChange) => {
  let dayComponent = new DayComponent();
  render(daysListElement, dayComponent, RenderPosition.BEFOREEND);

  let dayEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);

  const pointControllers = [];
  events.forEach((item) => {
    const pointController = new PointController(dayEventsListElement, onDataChange, onViewChange);
    pointController.render(item, PointControllerMode.DEFAULT);
    pointControllers.push(pointController);
  });

  return pointControllers;
};

export default class TripController {
  constructor(container, pointModel) {
    this._container = container;
    this._pointsModel = pointModel;

    this._events = [];
    this._showedPointsControllers = [];
    this._noPointsComponent = new NoPointsComponent();
    this._daysListComponent = new DaysListComponent();
    this._sortComponent = new SortComponent();
    this._creatingPoint = null;
    this._dayInfoVisible = true;

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onViewChange = this._onViewChange.bind(this);
    this._onFilterChange = this._onFilterChange.bind(this);

    this._sortComponent.setSortTypeChangeHandler(this._onSortTypeChange);
    this._pointsModel.setFilterChangeHandler(this._onFilterChange);
  }

  render() {
    const points = this._pointsModel.getPoints();
    const container = this._container.getElement();

    if (!points.length) {
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._daysListComponent, RenderPosition.BEFOREEND);

    this._renderPoints(points);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    const taskListElement = this._daysListComponent.getElement();
    this._creatingPoint = new PointController(taskListElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, PointControllerMode.ADDING);
  }

  _removePoints() {
    this._showedPointsControllers.forEach((pointController) => pointController.destroy());

    this._showedPointsControllers = [];

    this._daysListComponent.getElement().innerHTML = ``;
  }

  _renderPoints(points) {
    const daysListComponent = this._daysListComponent.getElement();

    let newPoints = [];
    if (this._dayInfoVisible) {
      newPoints = renderDefaultList(daysListComponent, points, this._onDataChange, this._onViewChange);
    } else {
      newPoints = renderSorted(daysListComponent, points, this._onDataChange, this._onViewChange);
    }
    this._showedPointsControllers = this._showedPointsControllers.concat(newPoints);
  }

  _updatePoints() {
    this._removePoints();
    const points = this._pointsModel.getPoints();
    if (points.length) {
      this._renderPoints(points);
    }
  }

  _onDataChange(pointController, oldData, newData) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._pointsModel.addPoint(newData);
        pointController.render(newData, PointControllerMode.DEFAULT);
        this._showedPointsControllers = [].concat(pointController, this._showedPointsControllers);
        this._updatePoints();
      }
    } else if (newData === null) {
      this._pointsModel.removePoint(oldData.id);
      this._updatePoints();
    } else {
      const isSuccess = this._pointsModel.updatePoint(oldData.id, newData);
      if (isSuccess) {
        pointController.render(newData, PointControllerMode.DEFAULT);
        pointController.destroy();
        this._updatePoints();
      }
    }
  }

  _onViewChange() {
    this._showedPointsControllers.forEach((it) => it.setDefaultView());
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];
    const points = this._pointsModel.getPoints();

    switch (sortType) {
      case `price`:
        sortedPoints = points.slice().sort((a, b) => b.price - a.price);
        break;
      case `time`:
        sortedPoints = points.slice().sort((a, b) => (a.start - a.finish) - (b.start - b.finish));
        break;
      case `event`:
        sortedPoints = points.slice();
        break;
    }

    this._dayInfoVisible = sortType === SortType.EVENT;

    this._removePoints();

    this._renderPoints(sortedPoints);

  }

  _onFilterChange() {
    this._updatePoints();
  }
}

