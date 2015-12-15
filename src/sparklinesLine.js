import {svg} from '@cycle/dom'

export default function sparklinesLine(responses) {
  let props$ = responses.props.getAll()
  let vtree$ = props$.map(props => {
    const {points, height, margin, color} = props
    let style = props.style || {}

    const linePoints = points
    .map((p) => [p.x, p.y])
    .reduce((a, b) => a.concat(b))

    const closePolyPoints = [
      points[points.length - 1].x, height - margin,
      margin, height - margin,
      margin, points[0].y,
    ]

    const fillPoints = linePoints.concat(closePolyPoints)

    const lineStyle = {
      stroke: color || style.stroke || `slategray`,
      strokeWidth: style.strokeWidth || `1`,
      strokeLinejoin: style.strokeLinejoin || `round`,
      strokeLinecap: style.strokeLinecap || `round`,
      fill: `none`,
    }
    const fillStyle = {
      stroke: style.stroke || `none`,
      strokeWidth: `0`,
      fillOpacity: style.fillOpacity || `.1`,
      fill: color || style.fill || `slategray`,
    }

    return svg(`g`, [
      svg(`polyline`, {points: fillPoints.join(` `), style: fillStyle}),
      svg(`polyline`, {points: linePoints.join(` `), style: lineStyle}),
    ]
    )
  })
  return {
    DOM: vtree$,
  }
}
