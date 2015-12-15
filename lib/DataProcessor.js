"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function max(data) {
  return Math.max.apply(Math, data);
}

function min(data) {
  return Math.min.apply(Math, data);
}

function mean(data) {
  return (max(data) - min(data)) / 2;
}

function avg(data) {
  return data.reduce(function (a, b) {
    return a + b;
  }) / data.length;
}

function median(data) {
  return data.sort()[Math.floor(data.length / 2)];
}

function variance(data) {
  var sq = data.map(function (n) {
    return Math.pow(n - mean(data), 2);
  });
  return mean(sq);
}

function stdev(data) {
  var sqDiff = data.map(function (n) {
    return Math.pow(n - mean(data), 2);
  });
  var avgSqDiff = avg(sqDiff);
  return Math.sqrt(avgSqDiff);
}

var DataProcessor = {
  calculateFromData: function calculateFromData(data, calculationType) {
    switch (calculationType) {
      case "max":
        return max(data);
      case "min":
        return min(data);
      case "mean":
        return mean(data);
      case "avg":
        return avg(data);
      case "median":
        return median(data);
      case "variance":
        return variance(data);
      case "stdev":
        return stdev(data);
      default:
        return false;
    }
  },
  avg: avg,

  dataToPoints: function dataToPoints(datav, limit) {
    var width = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
    var height = arguments.length <= 3 || arguments[3] === undefined ? 1 : arguments[3];
    var margin = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];
    var maxv = arguments.length <= 5 || arguments[5] === undefined ? max(datav) : arguments[5];
    var minv = arguments.length <= 6 || arguments[6] === undefined ? min(datav) : arguments[6];
    return (function () {
      var len = datav.length;

      var data = limit && limit < len ? datav.slice(len - limit) : datav;

      var vfactor = (height - margin * 2) / (maxv - minv || 1);
      var hfactor = (width - margin * 2) / ((limit || len) - (len > 1 ? 1 : 0));

      return data.map(function (d, i) {
        return {
          x: i * hfactor + margin,
          y: ((maxv === minv ? height : maxv) - d) * vfactor + margin
        };
      });
    })();
  }
};

exports["default"] = DataProcessor;
module.exports = exports["default"];