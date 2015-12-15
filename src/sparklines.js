import {svg} from '@cycle/dom'
import ultraDeepClone from 'udc'

import sparklinesLine from './sparklinesLine'
import sparklinesBars from './sparklinesBars'
import sparklinesSpots from './sparklinesSpots'
import sparklinesReferenceLine from './sparklinesReferenceLine'
import sparklinesNormalBand from './sparklinesNormalBand'
import DataProcessor from './DataProcessor'

export function sparklines(responses) {
  let props$ = responses.props.getAll()
  let vtree$ = props$.map(props => {
    const {limit, style, max, min} = props
    let data = props.data || []
    let width = props.width || 120
    let height = props.height || 30
    let margin = props.margin || 2

    if (data.length === 0) {
      return false
    }

    const points = DataProcessor.dataToPoints(data, limit, width, height, margin, max, min)
    return svg(`svg`, {width: width, height: height, style: style}, props.children.map(
        function nchild(child) {
          let newchild = ultraDeepClone(child)
          newchild.properties.points = points
          newchild.properties.width = width
          newchild.properties.height = height
          newchild.properties.margin = margin
          return newchild
        }))
  })

  return {
    DOM: vtree$,
  }
}

export {
  sparklines,
  sparklinesLine,
  sparklinesReferenceLine,
  sparklinesSpots,
  sparklinesBars,
  sparklinesNormalBand,
}
