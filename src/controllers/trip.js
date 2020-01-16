import {render, RenderPosition} from "../utils/render";
import NoPointsComponent from "../components/no-points";
import DaysListComponent from "../components/days-list";
import DayComponent from "../components/day";
import SortComponent, {SortType} from "../components/sort";
import PointController, {EmptyPoint, Mode as PointControllerMode} from './point.js';
import moment from "moment";

const renderDefaultList = (daysListElement, allPoints, points, offers, destinations, onDataChange, onViewChange) => {
  let currentDate = new Date(points[0].start);
  let currentDay = 1;
  let firstDate = new Date(allPoints[0].start);
  const futureDay = moment(points[0].start).startOf(`day`).diff(moment(firstDate).startOf(`day`), `days`);

  currentDay = futureDay ? futureDay + 1 : 1;
  let dayComponent = new DayComponent(currentDate, currentDay);

  render(daysListElement, dayComponent, RenderPosition.BEFOREEND);
  let dayEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);
  const pointControllers = [];

  points.forEach((item) => {
    const startDate = new Date(item.start);
    if (startDate.getDate() !== currentDate.getDate()) {
      currentDay += moment(item.start).startOf(`day`).diff(moment(currentDate).startOf(`day`), `days`);
      currentDate = new Date(item.start);
      dayComponent = new DayComponent(currentDate, currentDay);
      render(daysListElement, dayComponent, RenderPosition.BEFOREEND);
      const nodes = dayComponent.getElement().querySelectorAll(`.trip-events__list`);
      dayEventsListElement = nodes[nodes.length - 1];
    }

    const pointController = new PointController(dayEventsListElement, onDataChange, onViewChange);
    pointController.render(item, offers, destinations, PointControllerMode.DEFAULT);
    pointControllers.push(pointController);
  });

  return pointControllers;
};

const renderSorted = (daysListElement, points, offers, destinations, onDataChange, onViewChange) => {
  let dayComponent = new DayComponent();
  render(daysListElement, dayComponent, RenderPosition.BEFOREEND);

  let dayEventsListElement = dayComponent.getElement().querySelector(`.trip-events__list`);

  const pointControllers = [];
  points.forEach((item) => {
    const pointController = new PointController(dayEventsListElement, onDataChange, onViewChange);
    pointController.render(item, offers, destinations, PointControllerMode.DEFAULT);
    pointControllers.push(pointController);
  });

  return pointControllers;
};

export default class TripController {
  constructor(container, pointModel, offersModel, destinationsModel, api) {
    this._container = container;
    this._pointsModel = pointModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._api = api;

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

  hide() {
    this._container.hide();
  }

  show() {
    this._container.show();
  }

  render() {
    const points = this.getPoints();
    const container = this._container.getElement();

    if (!points.length) {
      render(this._container, this._noPointsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(container, this._sortComponent, RenderPosition.BEFOREEND);
    render(container, this._daysListComponent, RenderPosition.BEFOREEND);

    this._renderPoints(points, this.getOffers(), this.getDestinations());
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    this._onViewChange();

    const offers = this._offersModel.getOffers();
    const destinations = this._destinationsModel.getDestinations();

    const taskListElement = this._daysListComponent.getElement();
    this._creatingPoint = new PointController(taskListElement, this._onDataChange, this._onViewChange);
    this._creatingPoint.render(EmptyPoint, offers, destinations, PointControllerMode.ADDING);
  }

  getPoints() {
    return this._pointsModel.getPoints();
  }

  getOffers() {
    return this._offersModel.getOffers();
  }

  getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _removePoints() {
    this._showedPointsControllers.forEach((pointController) => pointController.destroy());

    this._showedPointsControllers = [];

    this._daysListComponent.getElement().innerHTML = ``;
  }

  _renderPoints(points, offers, destinations) {
    const daysListComponent = this._daysListComponent.getElement();

    let newPoints = [];
    if (this._dayInfoVisible) {
      const allPoints = this._pointsModel.getPointsAll();
      newPoints = renderDefaultList(daysListComponent, allPoints, points, offers, destinations, this._onDataChange, this._onViewChange);
    } else {
      newPoints = renderSorted(daysListComponent, points, offers, destinations, this._onDataChange, this._onViewChange);
    }
    this._showedPointsControllers = this._showedPointsControllers.concat(newPoints);
  }

  _updatePoints() {
    this._removePoints();
    const points = this.getPoints();
    if (points.length) {
      this._renderPoints(points, this.getOffers(), this.getDestinations());
    }
  }

  _onDataChange(pointController, oldData, newData, disableRerender) {
    if (oldData === EmptyPoint) {
      this._creatingPoint = null;
      if (newData === null) {
        pointController.destroy();
        this._updatePoints();
      } else {
        this._api.createPoint(newData)
          .then((pointModel) => {
            this._pointsModel.addPoint(pointModel);
            pointController.render(pointModel, this.getOffers(), this.getDestinations(), PointControllerMode.DEFAULT);

            const destroyedPoint = this._showedPointsControllers.pop();
            destroyedPoint.destroy();

            this._showedPointsControllers = [].concat(pointController, this._showedPointsControllers);
            this._updatePoints();
          })
          .catch(() => {
            pointController.shake();
          });

      }
    } else if (newData === null) {
      this._api.deletePoint(oldData.id)
        .then(() => {
          this._pointsModel.removePoint(oldData.id);
          this._updatePoints();
        })
        .catch(() => {
          pointController.shake();
        });
    } else {
      this._api.updatePoint(oldData.id, newData)
        .then((taskModel) => {
          const isSuccess = this._pointsModel.updatePoint(oldData.id, taskModel);
          if (isSuccess && !disableRerender) {
            pointController.render(newData, this.getOffers(), this.getDestinations(), PointControllerMode.DEFAULT);
            pointController.destroy();
            this._updatePoints();
          }
        })
        .catch(() => {
          pointController.shake();
        });
    }
  }

  _onViewChange() {
    this._showedPointsControllers.forEach((it) => {
      it.setDefaultView();
    });

    if (this._creatingPoint) {
      this._creatingPoint.destroy();
      this._creatingPoint = null;
    }
  }

  _onSortTypeChange(sortType) {
    let sortedPoints = [];
    const points = this.getPoints();

    switch (sortType) {
      case `price`:
        sortedPoints = points.slice().sort((a, b) => b.price - a.price);
        break;
      case `time`:
        sortedPoints = points.slice().sort((a, b) => (new Date(a.start) - new Date(a.finish)) - (new Date(b.start) - new Date(b.finish)));
        break;
      case `event`:
        sortedPoints = points.slice().sort((a, b) => (new Date(a.start) - new Date(b.start)));
        break;
    }

    this._dayInfoVisible = sortType === SortType.EVENT;

    this._removePoints();

    this._renderPoints(sortedPoints, this.getOffers(), this.getDestinations());

  }

  _onFilterChange() {
    this._updatePoints();
  }
}

