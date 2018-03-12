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
        //console.log(typeof d);
        var t = Math.floor((+d - start) / interval) * interval + start;
        d.setTime(t);
    };
    var offset = function (date, step) {
        date.setTime(+date + step * interval);
    };
    return d3.timeInterval(floor, offset);
};

const tickConfigure = function (start, end) {
    return {
        long: {
            tickH: config.tickH,
            filter: timeFilter(start, end, 15),
            format: d3.timeFormat("%H:%M:%S")
        },
        short: {
            tickH: 10,
            filter: timeFilter(start, end, 150),
            format: ''
        }
    };
}

var init = function () {
    var scale = Scale(config);
    var offset = 0;

    var svg = d3.select("svg")
        .classed('timeline-chart', true)
        .attr("width", config.w + 2 * config.hPadding)
        .attr("height", config.h + 4 * config.vPadding);

    const axesContainer = svg.append('svg:g')
        .classed('timeline-axes', true)
        .attr("height", config.clipZoneH)
        .attr('transform', `translate(${config.hPadding},  ${config.vPadding})`);

    const brushContainer = svg.append('svg:g')
        .classed('timeline-cursor', true)
        .attr("height", config.seekZoneH)
        .attr('transform', `translate(${config.hPadding},  ${config.vPadding})`);

    // const clipsContainer = svg.append('svg:g')
    //     .classed('timeline-clips', true)
    //     .attr("height", config.h - config.seekZoneH)
    //     .attr('transform', `translate(${config.hPadding},  ${config.vPadding})`);

    var axis = new Axis(axesContainer, scale, config, tickConfigure);

    function dragstarted(d) {
        window.clearInterval(timer);
        d3.select(this).raise().classed("active", true);
    }

    function dragged(d) {
        var t = scale.invert(d3.event.x);
        move(t);
    }

    function dragended(d) {
        d3.select(this).classed("active", false);
        var t = scale.invert(d3.event.x);
        offset = t - Date.now();
        timer = setInterval(() => move(Date.now() + offset), 500);
    }

    var circle = d3.symbol().type(d3.symbolCircle).size(100);
    brushContainer.append('svg:circle')
        .classed('timeline-cursor-circle', true)
        .attr("cx", config.w /2)
        .attr("cy", config.seekZoneH / 2)
        .attr("r", 8)
        .attr('fill', 'red')
        //.attr('transform', `translate(${config.w /2},  ${config.seekZoneH / 2})`)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    svg.append('svg:line')
        .classed('timeline-cursor-line', true)
        .attr('style', "stroke:rgb(99,99,99);stroke-width:2")
        .attr('x1',`${config.hPadding + config.w /2}`)
        .attr('y1',`${config.vPadding + config.seekZoneH / 2}`)
        .attr('x2',`${config.hPadding + config.w /2}`)
        .attr('y2',`${2*config.vPadding + config.seekZoneH + config.clipZoneH}`);

    var currentPos;
    var move = function (d) {
        currentPos = d;
        d3.select('.timeline-cursor-circle')
            .attr('cx', `${scale(d)}`);
        d3.select('.timeline-cursor-line')
            .attr('x1', `${config.hPadding + scale(d)}`)
            .attr('x2', `${config.hPadding + scale(d)}`);
    };
    var timer = setInterval(() => move(Date.now()), 500);

    d3.select('input')
        .on('change', function (d,i,nodes) {
            //console.log(nodes[i].value);
            var k = 1;
            var value = nodes[i].value;
            if(value)
                k = 10 / value;
            var t = d3.transition().duration(200);
            axis.zoom(currentPos, k, t);
        });
};

init();


var zoomIn = function () {
    
};
var zoomOut = function() {

}
