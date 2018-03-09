import * as d3 from 'd3';
function axisFactory(scale, tickConfig) {
  console.log(JSON.stringify(tickConfig));
  return d3.axisBottom(scale).ticks(d3.timeMinute.filter(tickConfig.filter)).tickSize(-tickConfig.tickH).tickPadding(6).tickFormat(tickConfig.format);
}
export default axisFactory;
