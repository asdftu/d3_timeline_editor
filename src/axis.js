import * as d3 from 'd3';
import axisFactory from'./axisFactory';

class Axis {
  constructor(axesContainer, scale, config, tickConfigure) {
      this.axesContainer = axesContainer;
      this.scale = scale;
      this.tickConfigure = tickConfigure;
      const creater = (scope, scale) => {
          const selection = axesContainer.selectAll(`.timeline-x-axis.${scope}`).data([{}]);

          let Axis = axisFactory.bind(null, scale);
          var tickConfig = tickConfigure(config.start, config.end);
          var axis = scope === 'long' ? Axis(tickConfig.long) : Axis(tickConfig.short);
          selection.enter()
              .append('svg:g')
              .classed('timeline-x-axis', true)
              .classed(scope, true)
              .call(axis)
              .attr('transform', `translate(0, ${config.h + config.vPadding})`);

          //selection.call(xAxis(scale, configuration, dimensions.width));
          selection.exit().remove();
          return axis;
      };

      this.axesMap = {
          'long' : creater('long', scale),
          'short': creater('short', scale)
      };
      //this.axes = [this.axesMap['long'], this.axesMap['short']];
      d3.selectAll('.timeline-x-axis.long text').attr("transform", `translate(${config.labelOffsetX},${-config.labelOffsetY})`);
  }

  zoom(pos, k, t) {
      var x = this.scale(pos);
      var zoomedScale = d3.zoomIdentity.translate(-x/2,0).scale(k).rescaleX(this.scale);
      this.applyScalue(zoomedScale, t);
  }
  applyScalue(scale, t) {
      for (var scope in this.axesMap){
          var axis = this.axesMap[scope];
          var tickConfig = this.tickConfigure(+scale.domain()[0],+scale.domain()[1]);
          axis.scale(scale).ticks(tickConfig[scope].filter);
      }
      this.updateAxes(t);
  }

  updateAxes(t) {
      const updater = (scope) => {
          const selection = this.axesContainer.selectAll(`.timeline-x-axis.${scope}`).data([{}]);
          if(t)
              selection
                  .enter()
                  .transition(t)
                  .call(this.axesMap[scope]);
          else
              selection
                  .enter()
                  .call(this.axesMap[scope]);
          //selection.call(xAxis(scale, configuration, dimensions.width));
          selection.exit().remove();
      };
      for (var scope in this.axesMap){
          updater(scope);
      }
  }
}

export default Axis;
