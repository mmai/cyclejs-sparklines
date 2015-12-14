/** @jsx hJSX */

import {Rx} from 'rx';
import {h, svg} from '@cycle/dom';
import DataProcessor from './DataProcessor';

export default function sparklinesReferenceLine (responses) {
  let props$ = responses.props.getAll();
  let vtree$ = props$.map(props => {
      const { points, margin, value } = props;

      //type: one of ['max', 'min', 'mean', 'avg', 'median', 'custom']
      let type = props.type || 'mean'; 
      let style = props.style || { stroke: 'red', strokeOpacity: .75, strokeDasharray: '2, 2' };

      const ypoints = points.map(p => p.y);
      const y = type == 'custom' ? value : DataProcessor.calculateFromData(ypoints, type);

      return svg('line', {
          x1: points[0].x,
          y1: y + margin,
          x2: points[points.length - 1].x,
          y2: y + margin,
          style: style 

        })
    });
  return {
    DOM: vtree$
  };
}
