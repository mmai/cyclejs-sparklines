'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.sparklines = sparklines;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _cycleDom = require('@cycle/dom');

var _udc = require('udc');

var _udc2 = _interopRequireDefault(_udc);

var _sparklinesLine = require('./sparklinesLine');

var _sparklinesLine2 = _interopRequireDefault(_sparklinesLine);

var _sparklinesBars = require('./sparklinesBars');

var _sparklinesBars2 = _interopRequireDefault(_sparklinesBars);

var _sparklinesSpots = require('./sparklinesSpots');

var _sparklinesSpots2 = _interopRequireDefault(_sparklinesSpots);

var _sparklinesReferenceLine = require('./sparklinesReferenceLine');

var _sparklinesReferenceLine2 = _interopRequireDefault(_sparklinesReferenceLine);

var _sparklinesNormalBand = require('./sparklinesNormalBand');

var _sparklinesNormalBand2 = _interopRequireDefault(_sparklinesNormalBand);

var _DataProcessor = require('./DataProcessor');

var _DataProcessor2 = _interopRequireDefault(_DataProcessor);

function sparklines(responses) {
  var props$ = responses.props.getAll();
  var vtree$ = props$.map(function (props) {
    var limit = props.limit;
    var style = props.style;
    var max = props.max;
    var min = props.min;

    var data = props.data || [];
    var width = props.width || 120;
    var height = props.height || 30;
    var margin = props.margin || 2;

    if (data.length === 0) {
      return false;
    }

    var points = _DataProcessor2['default'].dataToPoints(data, limit, width, height, margin, max, min);
    return (0, _cycleDom.svg)('svg', { width: width, height: height, style: style }, props.children.map(function nchild(child) {
      var newchild = (0, _udc2['default'])(child);
      newchild.properties.points = points;
      newchild.properties.width = width;
      newchild.properties.height = height;
      newchild.properties.margin = margin;
      return newchild;
    }));
  });

  return {
    DOM: vtree$
  };
}

exports.sparklines = sparklines;
exports.sparklinesLine = _sparklinesLine2['default'];
exports.sparklinesReferenceLine = _sparklinesReferenceLine2['default'];
exports.sparklinesSpots = _sparklinesSpots2['default'];
exports.sparklinesBars = _sparklinesBars2['default'];
exports.sparklinesNormalBand = _sparklinesNormalBand2['default'];