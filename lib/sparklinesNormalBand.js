'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sparklinesNormalBand;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cycleDom = require('@cycle/dom');

var _DataProcessor = require('./DataProcessor');

var _DataProcessor2 = _interopRequireDefault(_DataProcessor);

function sparklinesNormalBand(responses) {
  var props$ = responses.props.getAll();
  var vtree$ = props$.map(function (props) {
    var points = props.points;
    var margin = props.margin;

    var style = props.style || { fill: 'red', fillOpacity: .1 };

    var ypoints = points.map(function (p) {
      return p.y;
    });
    var mean = _DataProcessor2['default'].calculateFromData(ypoints, 'mean');
    var stdev = _DataProcessor2['default'].calculateFromData(ypoints, 'stdev');

    return (0, _cycleDom.svg)('rect', {
      x: points[0].x,
      y: mean - stdev + margin,
      width: points[points.length - 1].x - points[0].x,
      height: stdev * 2,
      style: style
    });
  });
  return {
    DOM: vtree$
  };
}

module.exports = exports['default'];