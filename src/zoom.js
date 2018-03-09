import * as d3 from 'd3'

export default class zoom {

  constructor(){
    this.zoom = d3.behavior.zoom()
      .size([dimensions.width, dimensions.height])
      .scaleExtent([configuration.minScale, configuration.maxScale])
      .x(scales.x);
  }

}

