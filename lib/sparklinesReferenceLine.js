'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = sparklinesReferenceLine;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cycleDom = require('@cycle/dom');

var _DataProcessor = require('./DataProcessor');

var _DataProcessor2 = _interopRequireDefault(_DataProcessor);

function sparklinesReferenceLine(responses) {
  var props$ = responses.props.getAll();
  var vtree$ = props$.map(function (props) {
    var points = props.points;
    var margin = props.margin;
    var value = props.value;

    //type: one of ['max', 'min', 'mean', 'avg', 'median', 'custom']
    var type = props.type || 'mean';
    var style = props.style || {
      stroke: 'red',
      strokeOpacity: .75,
      strokeDasharray: '2, 2'
    };

    var ypoints = points.map(function (p) {
      return p.y;
    });
    var y = type === 'custom' ? value : _DataProcessor2['default'].calculateFromData(ypoints, type);

    return (0, _cycleDom.svg)('line', {
      x1: points[0].x,
      y1: y + margin,
      x2: points[points.length - 1].x,
      y2: y + margin,
      style: style
    });
  });
  return { DOM: vtree$ };
}

module.exports = exports['default'];