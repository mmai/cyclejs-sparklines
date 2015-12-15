# Sparklines component for Cycle.js

This is a full port of the [react-sparklines](https://github.com/borisyankov/react-sparklines) component for [Cycle.js](http://cycle.js.org/).

Live demos and docs: [mmai.github.io/cyclejs-sparklines/](http://mmai.github.io/cyclejs-sparklines/)

## Install

```
npm install cyclejs-sparklines --save
```

## Run demo

```
npm install
npm start
http://localhost:8080
```

## Use

![](http://mmai.github.io/cyclejs-sparklines/img/basic.png)

```javascript
/** @jsx hJSX */

import Rx from 'rx'
import {run} from '@cycle/core'
import {makeDOMDriver, h, hJSX} from '@cycle/dom'
import { sparklines, sparklinesLine } from 'cyclejs-sparklines'

function main({DOM}) {
  const view$ = Rx.Observable.just(
    <span>
      <sparklines data={[5,10,5,20,8,15,16,19,13,14,12]}>
          <sparklinesLine />
      </sparklines>
    </span>
  );

  return { DOM: view$ }
}

run(main, {
  DOM: makeDOMDriver('#app', {'sparklines':sparklines, 'sparklinesLine':sparklinesLine})
  });

```

Sparklines component is a container with the following properties:

data - the data set used to build the sparkline

limit - optional, how many data points to display at once

width, height - dimensions of the component

margin - optional, offset the chart

min, max - optional, bound the chart

#### Basic Sparkline

![](http://mmai.github.io/cyclejs-sparklines/img/customizable.png)

```
<sparklines data={[5, 10, 5, 20]}>
  <sparklinesLine color="blue" />
</sparklines>
```

#### Bars

![](http://mmai.github.io/cyclejs-sparklines/img/bars.png)


```
<sparklines data={[5, 10, 5, 20]}>
  <sparklinesBars />
</sparklines>
```

#### Spots

![](http://mmai.github.io/cyclejs-sparklines/img/spots.png)


```
<sparklines data={sampleData}>
    <sparklinesLine style={{ fill: "none" }} />
    <sparklinesSpots />
</sparklines>
```

#### Reference Line

![](http://mmai.github.io/cyclejs-sparklines/img/referenceline.png)


```
<sparklines data={sampleData}>
    <sparklinesLine />
    <sparklinesReferenceLine type="mean" />
</sparklines>
```

#### Normal Band

![](http://mmai.github.io/cyclejs-sparklines/img/normalband.png)


```
<sparklines data={sampleData}>
    <sparklinesLine style={{ fill: "none" }}/>
    <sparklinesNormalBand />
</sparklines>
```
