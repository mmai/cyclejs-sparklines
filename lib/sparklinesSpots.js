'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sparklinesSpots;

var _cycleDom = require('@cycle/dom');

function lastDirection(points) {
  Math.sign = Math.sign || function sign(x) {
    return x > 0 ? 1 : -1;
  };
  return points.length < 2 ? 0 : Math.sign(points[points.length - 2].y - points[points.length - 1].y);
}

function sparklinesSpots(responses) {
  var props$ = responses.props.getAll();
  var vtree$ = props$.map(function (props) {
    var points = props.points;
    var style = props.style;

    var size = props.size || 2;
    var spotColors = props.spotColors || {
      '-1': 'red',
      0: 'black',
      1: 'green'
    };

    var svgElems = [];
    if (style) {
      var startSpot = (0, _cycleDom.svg)('circle', {
        cx: points[0].x,
        cy: points[0].y,
        r: size,
        style: style
      });

      svgElems.push(startSpot);
    }

    var endSpot = (0, _cycleDom.svg)('circle', {
      cx: points[points.length - 1].x,
      cy: points[points.length - 1].y,
      r: size,
      style: style || { fill: spotColors[lastDirection(points)] }
    });
    svgElems.push(endSpot);

    return (0, _cycleDom.svg)('g', svgElems);
  });
  return { DOM: vtree$ };
}

module.exports = exports['default'];