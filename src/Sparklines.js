import {Rx} from '@cycle/core';
import {hJSX, h, svg} from '@cycle/dom';
var UltraDeepClone = require('udc');

import SparklinesLine from './SparklinesLine';
import SparklinesBars from './SparklinesBars';
import SparklinesSpots from './SparklinesSpots';
import SparklinesReferenceLine from './SparklinesReferenceLine';
import SparklinesNormalBand from './SparklinesNormalBand';
import DataProcessor from './DataProcessor';

export function Sparklines(responses) {
  let props$ = responses.props.getAll();
  let vtree$ = props$.map(props => {
        const { limit, style, max, min  } = props;
        let data = props.data || [];
        let width = props.width || 120;
        let height = props.height || 30;
        let margin = props.margin || 2;

        if (data.length === 0) return false;

        const points = DataProcessor.dataToPoints(data, limit, width, height, margin, max, min);
        return  svg('svg', { width:width, height:height, style:style}, props.children.map(function(child) {
                        let newchild = UltraDeepClone(child); 
                        newchild.properties.points = points;
                        newchild.properties.width = width;
                        newchild.properties.height = height;
                        newchild.properties.margin = margin;
                        return newchild;
                      }))
    });

  return {
    DOM: vtree$
  };
}

export { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots, SparklinesBars, SparklinesNormalBand }
