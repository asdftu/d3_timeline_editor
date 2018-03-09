import * as d3 from 'd3';
import config from '../config';
import Scale from './scale';
import Axis from  './axis';

var clips = [];
// d3.timeMinute.filter(function (d) {
//     return d.getMinutes() % 15 === 0;
// })

var timeFilter = function (start, end, step) {
    var total = end - start;
    var interval = Math.floor(total/step);
    var floor = function (d) {
        console.log(typeof d);
        var t = Math.floor((+d - start) / interval) * interval + start;
        d.setTime(t);
    };
    var offset = function (date, step) {
        date.setTime(+date + step * interval);
    };
    return d3.timeInterval(floor, offset);
};

const tickConfig = {
    long: {
        tickH: config.tickH,
        filter: timeFilter(config.start, config.end, 15),
        format: d3.timeFormat("%H:%M:%S")
    },
    short: {
        tickH: config.tickH / 3,
        filter: timeFilter(config.start, config.end, 150),
        format: ''
    }
};

var init = function () {
    var scale = Scale(config);

    var svg = d3.select("svg")
        .classed('timeline-chart', true)
        .attr("width", config.w + 2 * config.hPadding)
        .attr("height", config.h + 4 * config.vPadding);

    const axesContainer = svg.append('svg:g')
        .classed('timeline-axes', true)
        .attr('transform', `translate(${config.hPadding},  ${config.vPadding})`);

    const brushContainer = svg.append('svg:g')
        .classed('timeline-curson', true)
        .attr("height", config.seekZoneH)
        .attr('transform', `translate(${config.hPadding},  ${config.vPadding})`);

    const clipsContainer = svg.append('svg:g')
        .classed('timeline-clips', true)
        .attr("height", config.h - config.seekZoneH)
        .attr('transform', `translate(${config.hPadding},  ${config.vPadding})`);

    var axis = Axis(axesContainer, scale, config, tickConfig);
}
