const ICONS_URL = `img/icons/`;
export const CURRENCY = `€`;

export const Transfers = [
  `bus`,
  `drive`,
  `flight`,
  `ship`,
  `taxi`,
  `train`,
  `transport`,
];

export const Activities = [
  `check-in`,
  `restaurant`,
  `sightseeing`
];

export const Types = [
  `bus`,
  `check-in`,
  `drive`,
  `flight`,
  `restaurant`,
  `ship`,
  `sightseeing`,
  `taxi`,
  `train`,
  `transport`,
  `trip`
];

export const TypesIcons = {
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

export const Cities = [
  `Amsterdam`, `Geneva`, `Prague`, `Perth`, `Munich`
]

export const Options = [
  {
    type: 'luggage',
    name: `Add luggage`,
    price: `10`
  },
  {
    type: 'comfort',
    name: `Switch to comfort class`,
    price: `150`
  },
  {
    type: 'meal',
    name: `Add meal`,
    price: `2`
  },
  {
    type: 'seats',
    name: `Choose seats`,
    price: `9`
  },
];

export const Filters = [
  {
    type: `everything`,
    name: `Everything`,
    value : true
  },
  {
    type: `future`,
    name: `Future`,
    value: false
  },
  {
    type: `past`,
    name: `Past`,
    value: false
  }
];

export const Menu = [
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

export const MonthNames = [
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
