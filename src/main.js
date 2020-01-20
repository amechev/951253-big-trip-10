import TripController from "./controllers/trip";
import PointsComponent from './components/points.js';
import StatisticsComponent from './components/statistics.js';
import PointsModel from './models/points.js';
import OffersModel from './models/offers.js';
import DestinationsModel from './models/destinations.js';
import {render, RenderPosition} from "./utils/render";
import 'flatpickr/dist/flatpickr.css';
import HeaderController, {MenuItem} from "./controllers/header";
import API from "./api";

const AUTHORIZATION = `Basic ` + Math.random().toString(36).substring(2, 15);
const END_POINT = `https://htmlacademy-es-10.appspot.com/big-trip/`;
const api = new API(END_POINT, AUTHORIZATION);
const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

Promise.all([
  api.getDestinations(),
  api.getOffers(),
  api.getPoints()
]).then(([destinations, offers, points]) => {
  destinationsModel.setDestinations(destinations);
  offersModel.setOffers(offers);
  pointsModel.setPoints(points);
  pointsModel.updateOffers(offers);

  const headerContainerElement = document.querySelector(`.page-header__container`);
  const pointsContainerElement = document.querySelector(`.trip-events`);

  const pointsComponent = new PointsComponent();
  const statisticsComponent = new StatisticsComponent(pointsModel);
  const headerController = new HeaderController(headerContainerElement, pointsModel);
  const tripController = new TripController(pointsComponent, pointsModel, offersModel, destinationsModel, api);

  render(pointsContainerElement, statisticsComponent, RenderPosition.BEFOREEND);
  render(pointsContainerElement, pointsComponent, RenderPosition.BEFOREEND);

  statisticsComponent.hide();
  headerController.render();
  headerController.setOnChange((menuItem) => {
    switch (menuItem) {
      case MenuItem.NEW_POINT:
        headerController.setActiveItem(MenuItem.POINTS);
        statisticsComponent.hide();
        tripController.show();
        tripController.createPoint();
        break;
      case MenuItem.STATISTICS:
        tripController.hide();
        statisticsComponent.show();
        break;
      case MenuItem.POINTS:
        statisticsComponent.hide();
        tripController.show();
        break;
    }
  });

  tripController.render();
}).catch(() => {
});
