import * as d3 from 'd3';

function scale(config, timeBoundary) {
  return d3.scaleTime().range([0, config.w]).domain(timeBoundary);
}
export default scale;
