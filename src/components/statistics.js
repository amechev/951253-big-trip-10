import AbstractSmartComponent from "./abtract-smart-component";
import Chart from "chart.js";
import ChartDataLabels from "chart.js";

const Color = {
  BLACK: `black`,
  BLUE: `blue`,
  GREEN: `green`,
  PINK: `pink`,
  YELLOW: `yellow`,
};

const ColorValue = {
  [Color.BLACK]: `#000000`,
  [Color.BLUE]: `#0c5cdd`,
  [Color.GREEN]: `#31b55c`,
  [Color.PINK]: `#ff3cb9`,
  [Color.YELLOW]: `#ffe125`,
};

const renderColorsChart = (colorsCtx, points) => {
  const money = points
    .map((point) => point.price);

  return new Chart(colorsCtx, {
    plugins: [ChartDataLabels],
    type: `bar`,
    data: {
      labels: money,
      datasets: [{
        data: money,
        backgroundColor: money.map((color) => ColorValue[color])
      }]
    },
    options: {
      plugins: {
        datalabels: {
          display: false
        }
      },
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const allData = data.datasets[tooltipItem.datasetIndex].data;
            const tooltipData = allData[tooltipItem.index];
            const total = allData.reduce((acc, it) => acc + parseFloat(it));
            const tooltipPercentage = Math.round((tooltipData / total) * 100);
            return `${tooltipData} points — ${tooltipPercentage}%`;
          }
        },
        displayColors: false,
        backgroundColor: `#ffffff`,
        bodyFontColor: `#000000`,
        borderColor: `#000000`,
        borderWidth: 1,
        cornerRadius: 0,
        xPadding: 15,
        yPadding: 15
      },
      title: {
        display: true,
        text: `DONE BY: COLORS`,
        fontSize: 16,
        fontColor: `#000000`
      },
      legend: {
        position: `left`,
        labels: {
          boxWidth: 15,
          padding: 25,
          fontStyle: 500,
          fontColor: `#000000`,
          fontSize: 13
        }
      }
    }
  });
};


const createStatisticsTemplate = (points) => {
  points.slice();
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
  constructor(points) {
    super();

    this._points = points;

    this._daysChart = null;
    this._tagsChart = null;
    this._colorsChart = null;

    this._renderCharts();
  }

  getTemplate() {
    const points = this._points.getPoints();
    return createStatisticsTemplate(points);
  }

  _renderCharts() {
    const element = this.getElement();

    const moneyCtx = element.querySelector(`.statistics__chart--money`);

    this._resetCharts();

    this._colorsChart = renderColorsChart(moneyCtx, this._points.getPoints());
  }

  _resetCharts() {
    if (this._daysChart) {
      this._daysChart.destroy();
      this._daysChart = null;
    }

    if (this._tagsChart) {
      this._tagsChart.destroy();
      this._tagsChart = null;
    }

    if (this._colorsChart) {
      this._colorsChart.destroy();
      this._colorsChart = null;
    }
  }
}
