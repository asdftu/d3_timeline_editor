import * as d3 from 'd3';
import config from './config';
import Scale from './scale';
import Axis from  './axis';

console.log(typeof Scale);
var scale = Scale(config, [new Date(2000, 0, 1, 0), new Date(2000, 0, 1, 2)]);


var svg = d3.select("svg")
  .classed('timeline-chart', true)
  .attr("width", config.w + 2 * config.hPadding)
  .attr("height", config.h + 4 * config.vPadding);

const axesContainer = svg.append('svg:g')
  .classed('timeline-axes', true)
  .attr('transform', `translate(${config.hPadding},  ${config.vPadding})`);

const cursorContainer = svg.append('svg:g')
  .classed('timeline-curson', true)
  .attr('transform', `translate(${config.hPadding},  ${config.vPadding})`);


const tickConfig = {
  long: {
    tickH: config.tickH,
    filter: function (d) {
      return d.getMinutes() % 15 === 0;
    },
    format: d3.timeFormat("%H:%M")
  },
  short: {
    tickH: config.tickH / 3,
    filter: function (d) {
      return d.getMinutes() % 3 === 0 && d.getMinutes() % 15 !== 0;
    },
    format: d3.timeFormat("%M")
  }
};

var axis = Axis(axesContainer, scale, config, tickConfig);

