const ICONS_URL = `img/icons/`;

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

export const TYPES_ICONS = {
  'bus': `${ICONS_URL}bus.png`,
  'check-in': `${ICONS_URL}check-in.png`,
  'drive': `${ICONS_URL}taxi.png`,
  'flight': `${ICONS_URL}flight.png`,
  'restaurant': `${ICONS_URL}restaurant.png`,
  'ship': `${ICONS_URL}ship.png`,
  'sightseeing': `${ICONS_URL}sightseeing.png`,
  'taxi': `${ICONS_URL}taxi.png`,
  'train': `${ICONS_URL}train.png`,
  'transport': `${ICONS_URL}transport.png`,
  'trip': `${ICONS_URL}trip.png`
};

export const FILTER_TYPES = {
  ALL: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

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

export const SHAKE_ANIMATION_TIMEOUT = 600;

export const SORT_TYPES = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const SORTS = [
  {
    type: SORT_TYPES.EVENT,
    name: `event`,
  },
  {
    type: SORT_TYPES.TIME,
    name: `time`,
  },
  {
    type: SORT_TYPES.PRICE,
    name: `price`,
  }
];
