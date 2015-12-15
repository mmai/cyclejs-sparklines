'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sparklinesBars;

var _cycleDom = require('@cycle/dom');

function sparklinesBars(responses) {
  var props$ = responses.props.getAll();
  var vtree$ = props$.map(function (props) {
    var points = props.points;
    var height = props.height;

    var style = props.style || { fill: 'slategray' };
    var barWidth = points.length >= 2 ? Math.max(0, points[1].x - points[0].x) : 0;

    return (0, _cycleDom.svg)('g', points.map(function (p, i) {
      return (0, _cycleDom.svg)('rect', {
        key: i,
        x: Math.ceil(p.x),
        y: Math.ceil(p.y),
        width: Math.ceil(barWidth),
        height: Math.ceil(Math.max(0, height - p.y)),
        style: style
      });
    }));
  });
  return {
    DOM: vtree$
  };
}

module.exports = exports['default'];