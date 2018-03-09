var d3 = require('d3');
var hPadding = 15;
var vPadding = 10;
var w = 1000,
  h = 50,
  x = d3.scaleTime().range([0, w]).domain([new Date(2000, 0, 1, 0), new Date(2000, 0, 1, 2)]),
  xAxis1 = d3.axisBottom(x).ticks(d3.timeMinute.filter(function (d) {
    return d.getMinutes() % 15 === 0;
  })).tickSize(-h).tickPadding(6).tickFormat(d3.timeFormat("%H:%M")),
  xAxis2 = d3.axisBottom(x).ticks(d3.timeMinute.filter(function (d) {
    return d.getMinutes() % 3 === 0 && d.getMinutes() % 15 !== 0;
  })).tickSize(-h/3).tickPadding(6).tickFormat(d3.timeFormat(""));
var yAxisCall = d3.axisLeft(d3.scaleLinear()).tickSize(0).tickFormat('');


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


var zoom = d3.zoom().scaleExtent([0.2,8]);
d3.select("#btn").on('click', function () {
  var newX = d3.zoomIdentity.translate(-w/2,0).scale(2).rescaleX(x);
  xAxis1.scale(newX);
  xAxis2.scale(newX);
  var t = d3.transition().duration(200);
  d3.select(".long").transition(t).call(xAxis1);
  d3.select(".short").transition(t).call(xAxis2);
  //d3.select(".x_axis").call(zoom.transform, d3.zoomIdentity.translate(-500, 0).scale(2));
});

// var zoom = d3.zoom()
//   .on("zoom", function () {
//
//   });
//
// setTimeout(function () {
// }, 5000);
//
// d3.select(".x_axis").call(zoom.transform, transform);
// function transform() {
//   console.log('transform called');
//   d3.zoomIdentity
//     .translate(500, 50)
//     .scale(8)
//     .translate(-100, -10);
// }

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


