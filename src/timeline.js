var d3 = require('d3');
var hPadding = 15;
var vPadding = 10;
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
/*
* d3.timeMinute.filter(function (d) {
    return d.getMinutes() % 15 === 0;
  })
* */
var w = 1000,
  h = 50,
  x = d3.scaleTime().range([0, w]).domain([Date.now() - 2*3600*1000, Date.now() + 2*3600*1000]),
  xAxis1 = d3.axisBottom(x).ticks(timeFilter(Date.now() - 2*3600*1000, Date.now() + 2*3600*1000, 15)).tickSize(-h).tickPadding(6).tickFormat(d3.timeFormat("%H:%M:%S")),
  xAxis2 = d3.axisBottom(x).ticks(timeFilter(Date.now() - 2*3600*1000, Date.now() + 2*3600*1000, 150)).tickSize(-h/3).tickPadding(6).tickFormat(d3.timeFormat(""));
var yAxisCall = d3.axisLeft(d3.scaleLinear()).tickSize(0).tickFormat('');

var timeFilter = function (start, end, step) {
  var total = end - start;
  var interval = Math.floor(total/step);
    return function (d) {
        var t = Math.floor((d - start) / interval) * interval + start;
        var formatTime = d3.timeFormat("%H:%M:%S");
        return formatTime(new Date(t));
    }
};

var svg = d3.select("svg")
  .attr("width", w + 4 * hPadding)
  .attr("height", h + 4*vPadding)
  .attr("transform", `translate(${hPadding},0)`);
svg.append("svg:g")
  .attr("class", "x_axis long")
  .attr("transform", `translate(${hPadding},${h+vPadding})`)
  .transition()
  .call(xAxis1);

svg.append("svg:g")
  .attr("class", "x_axis short")
  .attr("transform", `translate(${hPadding},${h+vPadding})`)
  .transition()
  .call(xAxis2);
d3.selectAll('.x_axis.long text').attr("transform", 'translate(20,-50)');

svg.append("g")
  .attr("class", "y_axis")
  .attr("transform", "translate("+[hPadding, vPadding]+")")
  .transition()
  .call(yAxisCall);

d3.select("#btn").on('click', function () {
  var newX = d3.zoomIdentity.translate(-w/2,0).scale(2).rescaleX(x);
  xAxis1.scale(newX);
  xAxis2.scale(newX);
  var t = d3.transition().duration(200);
  d3.select(".long").transition(t).call(xAxis1);
  d3.select(".short").transition(t).call(xAxis2);
  //d3.select(".x_axis").call(zoom.transform, d3.zoomIdentity.translate(-500, 0).scale(2));
});


var data = [
  {name: "Locke", number: 4},
  {name: "Reyes", number: 8},
  {name: "Ford", number: 15},
  {name: "Jarrah", number: 16},
  {name: "Shephard", number: 31},
  {name: "Kwon", number: 34}
];

d3.selectAll("div")
  .data(data, function(d) {
    return d ? d.name : this.id;
  })
  .text(function(d) {
    return d.number;
  });


