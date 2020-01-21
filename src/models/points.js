import {getPointsByFilter} from '../utils/filter.js';
import {FILTER_TYPES, SORT_TYPES} from "../const";

export default class Points {
  constructor() {
    this._points = [];
    this._activeFilterType = FILTER_TYPES.ALL;
    this._activeSortType = SORT_TYPES.EVENT;

    this._dataChangeHandlers = [];
    this._filterChangeHandlers = [];
  }

  getPoints() {
    const points = getPointsByFilter(this._points, this._activeFilterType);
    switch (this._activeSortType) {
      case `price`:
        return points.slice().sort((a, b) => b.price - a.price);
      case `time`:
        return points.slice().sort((a, b) => (new Date(a.start) - new Date(a.finish)) - (new Date(b.start) - new Date(b.finish)));
      case `event`:
        return points.slice().sort((a, b) => (new Date(a.start) - new Date(b.start)));
    }
    return null;
  }

  getPointsAll() {
    return this._points;
  }

  setPoints(points) {
    this._points = points;
    this.sortPointsByDefault();
    if (this._dataChangeHandlers) {
      this._callHandlers(this._dataChangeHandlers);
    }
  }

  // Необходимо, так как почему-то в запросе points цены в доп.опциях отличаются от тех что приходят в offers
  updateOffers(offers) {
    this._points = this._points.map((el) => {
      const optionsByType = offers.find((offer) => {return offer.type === el.type}).offers;

      el.options = el.options.map((option) => {
        option.price = optionsByType.find((optionByType) => {return optionByType.title === option.title}).price;
        return option;
      });

      return el;
    });
  }

  setFilter(filterType) {
    this._activeFilterType = filterType;
    this._callHandlers(this._filterChangeHandlers);
  }

  setSortType(sortType) {
    this._activeSortType = sortType;
    this._callHandlers(this._filterChangeHandlers);
  }

  removePoint(id) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((it) => it.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));
    this.sortPointsByDefault();
    this._callHandlers(this._dataChangeHandlers);
    return true;
  }

  addPoint(point) {
    this._points = [].concat(point, this._points);
    this.sortPointsByDefault();
    this._callHandlers(this._dataChangeHandlers);
  }

  sortPointsByDefault() {
    this._points.sort((a, b) => (new Date(a.start) - new Date(b.start)));
  }

  setFilterChangeHandler(handler) {
    this._filterChangeHandlers.push(handler);
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
