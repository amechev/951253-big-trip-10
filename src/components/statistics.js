import AbstractSmartComponent from "./abtract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from "chart.js";
import {TRANSFERS} from "../const";
import {formatDateToStringDiff} from "../utils/common";

const getData = (items, labels) => {
  return {
    'labels': labels,
    'datasets': [{
      'data': items,
      'backgroundColor': `tomato`
    }]
  };
};

const getOptions = (data, title, handler) => {
  return {
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: false,
        ticks: {
          beginAtZero: true,
        }
      }],
    },
    tooltips: {
      callbacks: {
        label: (tooltipItem) => {
          return handler(tooltipItem);
        }
      },
      displayColors: false,
    },
    title: {
      display: true,
      text: title,
      fontSize: 20,
      fontColor: `#000000`
    },
  };
};

const renderColorsChart = (colorsCtx, points) => {
  const types = [];
  const money = [];

  points.forEach((el) => {
    const index = types.findIndex((item) => {
      return item === el.type;
    });

    if (index >= 0) {
      money[index] += el.price;
      return;
    }
    types.push(el.type);
    money.push(el.price);
  });

  const data = getData(money, types);
  const title = `MONEY`;
  const getTips = (tooltipItem) => {
    return `${tooltipItem.value}$`;
  };

  return new Chart(colorsCtx, {
    'plugins': [ChartDataLabels],
    'type': `horizontalBar`,
    'data': data,
    'options': getOptions(data, title, getTips)
  });
};

const renderTransportChart = (transportCtx, points) => {
  const transfers = points.filter((el) => {
    if (TRANSFERS.some((item) => {
      return item === el.type;
    })) {
      return el;
    }

    return null;
  });
  const counts = [];
  const types = [];

  transfers.forEach((el) => {
    const index = types.findIndex((item) => {
      return item === el.type;
    });
    if (index >= 0) {
      counts[index] += 1;
      return;
    }
    types.push(el.type);
    counts.push(1);
  });

  const data = getData(counts, types);
  const title = `TRANSPORT`;
  const getTips = (tooltipItem) => {
    return `${tooltipItem.value}x`;
  };

  return new Chart(transportCtx, {
    'plugins': [ChartDataLabels],
    'type': `horizontalBar`,
    'data': data,
    'options': getOptions(data, title, getTips)
  });
};

const renderTimeChart = (timeCtx, points) => {
  const types = [];
  const time = [];

  points.forEach((el) => {
    const index = types.findIndex((item) => {
      return item === el.type;
    });

    if (index >= 0) {
      time[index] += new Date(el.finish) - new Date(el.start);
      return;
    }
    types.push(el.type);
    time.push(new Date(el.finish) - new Date(el.start));
  });

  const data = getData(time, types);
  const title = `TIME SPEND`;
  const getTips = (tooltipItem) => {
    return formatDateToStringDiff(+tooltipItem.value);
  };

  return new Chart(timeCtx, {
    'plugins': [ChartDataLabels],
    'type': `horizontalBar`,
    'data': data,
    'options': getOptions(data, title, getTips)
  });
};


const createStatisticsTemplate = () => {
  return (
    `<section class="statistics">
      <h2 class="visually-hidden">Trip statistics</h2>

      <div class="statistics__item statistics__item--money">
        <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--transport">
        <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
      </div>

      <div class="statistics__item statistics__item--time-spend">
        <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
      </div>
    </section>`
  );
};

export default class Statistics extends AbstractSmartComponent {
  constructor(pointsModel) {
    super();

    this._pointsModel = pointsModel;
    this._points = [];

    this._timeChart = null;
    this._transportChart = null;
    this._colorsChart = null;

    this._renderCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  recoveryListeners() {
  }

  rerender() {
    super.rerender();

    this._renderCharts();
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);
    const transportCtx = element.querySelector(`.statistics__chart--transport`);
    const spendCtx = element.querySelector(`.statistics__chart--time`);

    this._resetCharts();

    this._points = this._pointsModel.getPointsAll();
    this._colorsChart = renderColorsChart(moneyCtx, this._points);
    this._transportChart = renderTransportChart(transportCtx, this._points);
    this._timeChart = renderTimeChart(spendCtx, this._points);
  }

  show() {
    super.show();

    this.rerender();
  }

  _resetCharts() {
    if (this._transportChart) {
      this._transportChart.destroy();
      this._transportChart = null;
    }

    if (this._timeChart) {
      this._timeChart.destroy();
      this._timeChart = null;
    }

    if (this._colorsChart) {
      this._colorsChart.destroy();
      this._colorsChart = null;
    }
  }
}
