import * as d3 from 'd3';

function scale(config) {
  return d3.scaleTime().range([0, config.w]).domain([config.start, config.end]);
}
export default scale;
