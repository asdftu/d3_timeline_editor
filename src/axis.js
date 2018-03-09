import * as d3 from 'd3';
import axisFactory from'./axisFactory';

function axis(axesContainer, scale, config, tickConfig) {

  const axis = (scope, scale) => {
    const selection = axesContainer.selectAll(`.timeline-x-axis.${scope}`).data([{}]);

    let Axis = axisFactory.bind(null, scale);
    selection.enter()
      .append('svg:g')
      .classed('timeline-x-axis', true)
      .classed(scope, true)
      .call(scope === 'long' ? Axis(tickConfig.long) : Axis(tickConfig.short))
      .attr('transform', `translate(0, ${config.h + config.vPadding})`);

    //selection.call(xAxis(scale, configuration, dimensions.width));
    selection.exit().remove();
  };

  axis('long', scale);
  axis('short', scale);

  d3.selectAll('.timeline-x-axis.long text').attr("transform", `translate(${config.labelOffsetX},${-config.labelOffsetY})`);
}

export default axis;
