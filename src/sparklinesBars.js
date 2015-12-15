import {svg} from '@cycle/dom'

export default function sparklinesBars(responses) {
  let props$ = responses.props.getAll()
  let vtree$ = props$.map(props => {
    const {points, height} = props
    let style = props.style || {fill: `slategray`}
    const barWidth = points.length >= 2 ? Math.max(0, points[1].x - points[0].x) : 0

    return svg(`g`, points.map((p, i) => svg(`rect`, {
      key: i,
      x: Math.ceil(p.x),
      y: Math.ceil(p.y),
      width: Math.ceil(barWidth),
      height: Math.ceil(Math.max(0, height - p.y)),
      style: style,
    })))
  })
  return {
    DOM: vtree$,
  }
}
