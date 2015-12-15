function max(data) {
  return Math.max.apply(Math, data)
}

function min(data) {
  return Math.min.apply(Math, data)
}

function mean(data) {
  return (max(data) - min(data)) / 2
}

function avg(data) {
  return data.reduce((a, b) => a + b) / data.length
}

function median(data) {
  return data.sort()[Math.floor(data.length / 2)]
}

function variance(data) {
  const sq = data.map(n => Math.pow(n - mean(data), 2))
  return mean(sq)
}

function stdev(data) {
  const sqDiff = data.map(n => Math.pow(n - mean(data), 2))
  const avgSqDiff = avg(sqDiff)
  return Math.sqrt(avgSqDiff)
}

const DataProcessor = {
  calculateFromData: function calculateFromData(data, calculationType) {
    switch (calculationType) {
    case `max`: return max(data)
    case `min`: return min(data)
    case `mean`: return mean(data)
    case `avg`: return avg(data)
    case `median`: return median(data)
    case `variance`: return variance(data)
    case `stdev`: return stdev(data)
    default: return false
    }
  },
  avg: avg,

  dataToPoints: function dataToPoints(datav, limit, width = 1, height = 1, margin = 0, maxv = max(datav), minv = min(datav)) {
    const len = datav.length

    const data = limit && limit < len ? datav.slice(len - limit) : datav

    const vfactor = (height - margin * 2) / (maxv - minv || 1)
    const hfactor = (width - margin * 2) / ((limit || len) - (len > 1 ? 1 : 0))

    return data.map((d, i) => {
      return {
        x: i * hfactor + margin,
        y: ((maxv === minv ? height : maxv) - d) * vfactor + margin,
      }
    })
  },
}

export default DataProcessor

