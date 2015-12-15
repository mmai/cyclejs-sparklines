'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sparklinesLine;

var _cycleDom = require('@cycle/dom');

function sparklinesLine(responses) {
  var props$ = responses.props.getAll();
  var vtree$ = props$.map(function (props) {
    var points = props.points;
    var height = props.height;
    var margin = props.margin;
    var color = props.color;

    var style = props.style || {};

    var linePoints = points.map(function (p) {
      return [p.x, p.y];
    }).reduce(function (a, b) {
      return a.concat(b);
    });

    var closePolyPoints = [points[points.length - 1].x, height - margin, margin, height - margin, margin, points[0].y];

    var fillPoints = linePoints.concat(closePolyPoints);

    var lineStyle = {
      stroke: color || style.stroke || 'slategray',
      strokeWidth: style.strokeWidth || '1',
      strokeLinejoin: style.strokeLinejoin || 'round',
      strokeLinecap: style.strokeLinecap || 'round',
      fill: 'none'
    };
    var fillStyle = {
      stroke: style.stroke || 'none',
      strokeWidth: '0',
      fillOpacity: style.fillOpacity || '.1',
      fill: color || style.fill || 'slategray'
    };

    return (0, _cycleDom.svg)('g', [(0, _cycleDom.svg)('polyline', { points: fillPoints.join(' '), style: fillStyle }), (0, _cycleDom.svg)('polyline', { points: linePoints.join(' '), style: lineStyle })]);
  });
  return {
    DOM: vtree$
  };
}

module.exports = exports['default'];