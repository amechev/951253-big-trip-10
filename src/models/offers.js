export default class Offers {
  constructor() {
    this._offers = [];

    this._dataChangeHandlers = [];
  }

  getOffers() {
    return this.getOffersAll();
  }

  getOffersAll() {
    return this._offers;
  }

  setOffers(offers) {
    this._offers = Array.from(offers);
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
