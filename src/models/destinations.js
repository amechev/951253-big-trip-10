export default class Destinations {
  constructor() {
    this._destinations = [];

    this._dataChangeHandlers = [];
  }

  getDestinations() {
    return this.getDestinationsAll();
  }

  getDestinationsAll() {
    return this._destinations;
  }

  setDestinations(destinations) {
    this._destinations = Array.from(destinations);
    if (this._dataChangeHandlers) {
      this._callHandlers(this._dataChangeHandlers);
    }
  }

  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
