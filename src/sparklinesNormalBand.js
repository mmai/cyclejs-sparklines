import {svg} from '@cycle/dom'
import DataProcessor from './DataProcessor'

export default function sparklinesNormalBand(responses) {
  let props$ = responses.props.getAll()
  let vtree$ = props$.map(props => {
    const {points, margin} = props
    let style = props.style || {fill: `red`, fillOpacity: .1}

    const ypoints = points.map(p => p.y)
    const mean = DataProcessor.calculateFromData(ypoints, `mean`)
    const stdev = DataProcessor.calculateFromData(ypoints, `stdev`)

    return svg(`rect`, {
      x: points[0].x,
      y: mean - stdev + margin,
      width: points[points.length - 1].x - points[0].x,
      height: stdev * 2,
      style: style,
    })
  })
  return {
    DOM: vtree$,
  }
}
