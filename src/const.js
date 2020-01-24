const ICONS_URL = `img/icons/`;

export const SHAKE_ANIMATION_TIMEOUT = 600;

export const TRANSFERS = [
  `bus`,
  `drive`,
  `flight`,
  `ship`,
  `taxi`,
  `train`,
  `transport`,
];

export const ACTIVITIES = [
  `check-in`,
  `restaurant`,
  `sightseeing`
];

export const MONTH_NAMES = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`,
];

export const IconType = {
  BUS: `${ICONS_URL}bus.png`,
  CHECK_IN: `${ICONS_URL}check-in.png`,
  DRIVE: `${ICONS_URL}taxi.png`,
  FLIGHT: `${ICONS_URL}flight.png`,
  RESTAURANT: `${ICONS_URL}restaurant.png`,
  SHIP: `${ICONS_URL}ship.png`,
  SIGHTSEEING: `${ICONS_URL}sightseeing.png`,
  TAXI: `${ICONS_URL}taxi.png`,
  TRAIN: `${ICONS_URL}train.png`,
  TRANSPORT: `${ICONS_URL}transport.png`,
  TRIP: `${ICONS_URL}trip.png`
};

export const FilterType = {
  ALL: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const SORTS = [
  {
    type: SortType.EVENT,
    name: `event`,
  },
  {
    type: SortType.TIME,
    name: `time`,
  },
  {
    type: SortType.PRICE,
    name: `price`,
  }
];

export const POINTS = [
  {
    title: `bus`,
    icon: IconType.BUS
  },
  {
    title: `drive`,
    icon: IconType.DRIVE
  },
  {
    title: `flight`,
    icon: IconType.FLIGHT
  },
  {
    title: `ship`,
    icon: IconType.SHIP
  },
  {
    title: `taxi`,
    icon: IconType.TAXI
  },
  {
    title: `train`,
    icon: IconType.TRAIN
  },
  {
    title: `transport`,
    icon: IconType.TRANSPORT
  },
  {
    title: `check-in`,
    icon: IconType.CHECK_IN
  },
  {
    title: `restaurant`,
    icon: IconType.RESTAURANT
  },
  {
    title: `sightseeing`,
    icon: IconType.SIGHTSEEING
  }
];

export const MENU_ITEMS = [
  {
    type: `table`,
    name: `Table`,
    value: true
  },
  {
    type: `stats`,
    name: `Stats`,
    value: false
  }
];
