import {FILTER_TYPES} from '../const.js';

export const getEverythingPoints = (points) => {
  return points;
};

export const getFuturePoints = (points) => {
  return points.filter((point) => new Date(point.start) > new Date());
};

export const getPastPoints = (points) => {
  return points.filter((point) => new Date(point.start) < new Date());
};

export const getPointsByFilter = (points, filterType) => {
  switch (filterType) {
    case FILTER_TYPES.FUTURE:
      return getFuturePoints(points);
    case FILTER_TYPES.PAST:
      return getPastPoints(points);
    case FILTER_TYPES.ALL:
      return getEverythingPoints(points);
  }

  return points;
};
