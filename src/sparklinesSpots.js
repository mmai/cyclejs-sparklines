import {svg} from '@cycle/dom'

function lastDirection(points) {
  Math.sign = Math.sign || function sign(x) { return x > 0 ? 1 : -1 }
  return points.length < 2 ? 0 :
   Math.sign(points[points.length - 2].y - points[points.length - 1].y)
}

export default function sparklinesSpots(responses) {
  let props$ = responses.props.getAll()
  let vtree$ = props$.map(props => {
    const {points, style} = props
    let size = props.size || 2
    let spotColors = props.spotColors || {
      '-1': `red`,
      0: `black`,
      1: `green`,
    }

    let svgElems = []
    if (style) {
      const startSpot = svg(`circle`, {
        cx: points[0].x,
        cy: points[0].y,
        r: size,
        style: style,
      })

      svgElems.push(startSpot)
    }

    const endSpot = svg(`circle`, {
      cx: points[points.length - 1].x,
      cy: points[points.length - 1].y,
      r: size,
      style: style || {fill: spotColors[lastDirection(points)]},
    })
    svgElems.push(endSpot)

    return svg(`g`, svgElems)
  })
  return {DOM: vtree$}
}

