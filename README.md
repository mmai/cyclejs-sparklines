# Beautiful and expressive sparklines component for Cycle.js

This is a full port of the [react-sparklines](https://github.com/borisyankov/react-sparklines) component for Cycle.js .

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

![](http://borisyankov.github.io/react-sparklines/img/basic.png)

```
<Sparklines data={[5, 10, 5, 20, 8, 15]} limit={5} width={100} height={20} margin={5}>
</Sparklines>
```

Sparklines component is a container with the following properties:

data - the data set used to build the sparkline

limit - optional, how many data points to display at once

width, height - dimensions of the component

margin - optional, offset the chart

min, max - optional, bound the chart


#### Basic Sparkline

![](http://borisyankov.github.io/react-sparklines/img/customizable.png)

```
<Sparklines data={[5, 10, 5, 20]}>
  <SparklinesLine color="blue" />
</Sparklines>
```

#### Bars

![](http://borisyankov.github.io/react-sparklines/img/bars.png)


```
<Sparklines data={[5, 10, 5, 20]}>
  <SparklinesBars />
</Sparklines>
```

#### Spots

![](http://borisyankov.github.io/react-sparklines/img/spots.png)


```
<Sparklines data={sampleData}>
    <SparklinesLine style={{ fill: "none" }} />
    <SparklinesSpots />
</Sparklines>
```

#### Reference Line

![](http://borisyankov.github.io/react-sparklines/img/referenceline.png)


```
<Sparklines data={sampleData}>
    <SparklinesLine />
    <SparklinesReferenceLine type="mean" />
</Sparklines>
```

#### Normal Band

![](http://borisyankov.github.io/react-sparklines/img/normalband.png)


```
<Sparklines data={sampleData}>
    <SparklinesLine style={{ fill: "none" }}/>
    <SparklinesNormalBand />
</Sparklines>
```
