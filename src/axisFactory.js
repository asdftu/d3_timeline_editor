import * as d3 from 'd3';
function axisFactory(scale, tickConfig) {
  console.log(JSON.stringify(tickConfig));
  return d3.axisBottom(scale).ticks(tickConfig.filter).tickSize(-tickConfig.tickH).tickFormat(tickConfig.format);//.tickPadding(6);
}
export default axisFactory;
