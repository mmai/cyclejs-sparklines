/** @jsx hJSX */

import Rx from 'rx';
import {run} from '@cycle/core';
import {makeDOMDriver, h, hJSX} from '@cycle/dom';
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots, SparklinesBars, SparklinesNormalBand } from '../src/Sparklines';

function boxMullerRandom () {
    let phase = false,
        x1, x2, w, z;

    return (function() {

        if (phase = !phase) {
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            return x1 * w;
        } else {
            return x2 * w;
        }
    })();
}

function randomData(n = 30) {
    return Array.apply(0, Array(n)).map(boxMullerRandom);
}

const sampleData = randomData(30);
const sampleData100 = randomData(100);

/*** Header ***/
function header({DOM}) {
  const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData} width={300} height={50}>
          <sparklinesLine style={{ stroke: "white", fill: "none" }} />
          <sparklinesReferenceLine style={{ stroke: 'white', strokeOpacity: .75, strokeDasharray: '2, 2' }} />
      </sparklines>
    </span>
  );

  return { DOM: view$ }
}

run(header, {
    DOM: makeDOMDriver('#headersparklines', {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine, 'sparklinesReferenceLine': SparklinesReferenceLine}) }
);

/** Simple **/
function simple({DOM}) {
  const view$ = Rx.Observable.just(
    <span>
      <sparklines data={[5,10,5,20,8,15,16,19,13,14,12]}>
          <sparklinesLine />
      </sparklines>
    </span>
  );

  return { DOM: view$ }
}

run(simple, {
    DOM: makeDOMDriver('#simple', {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine}) }
);


/** Customizable **/
function makeCustomizable(color){
  return function ({DOM}) {
    const view$ = Rx.Observable.just(
      <span>
        <sparklines data={sampleData}>
          <sparklinesLine color={color} />
        </sparklines>
      </span>
      );

    return { DOM: view$ }
  };
}

const custColors = {
  customizable1: "#1c8cdc",
  customizable2: "#fa7e17",
  customizable3: "#ea485c",
  customizable4: "#56b45d",
  customizable5: "#1c8cdc",
  customizable6: "#253e56",
}

for (let elem in custColors){
  run(makeCustomizable(custColors[elem]), {
      DOM: makeDOMDriver('#' + elem, {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine}) }
  );
}

/** Spots **/
function spots1({DOM}) {
  const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData}>
        <sparklinesLine style={{fill: "none"}} />
        <sparklinesSpots />
      </sparklines>
    </span>
  );

  return { DOM: view$ }
}
run(spots1, { DOM: makeDOMDriver('#spots1', {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine, 'sparklinesSpots':SparklinesSpots})});

function spots2({DOM}) {
  const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData}>
        <sparklinesLine color="#56b45d" />
        <sparklinesSpots style={{ fill: "#56b45d" }} />
      </sparklines>
    </span>
  );

  return { DOM: view$ }
}
run(spots2, { DOM: makeDOMDriver('#spots2', {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine, 'sparklinesSpots':SparklinesSpots})});

function spots3({DOM}) {
  const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData} margin={6}>
        <sparklinesLine style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} />
        <sparklinesSpots size={4} style={{ stroke: "#336aff", strokeWidth: 3, fill: "white" }} />
      </sparklines>
    </span>
  );

  return { DOM: view$ }
}
run(spots3, { DOM: makeDOMDriver('#spots3', {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine, 'sparklinesSpots':SparklinesSpots})});

/** Bounds **
function bounds({DOM}) {
  const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData} max={0.5}>
        <sparklinesLine />
      </sparklines>
    </span>
  );

  return { DOM: view$ }
}
run(bounds, { DOM: makeDOMDriver('#bounds1', {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine, 'sparklinesSpots':SparklinesSpots})});
*/

function bars1({DOM}) {
  const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData}>
        <sparklinesBars style={{ fill: "#41c3f9" }} />
      </sparklines>
    </span>
  );

  return { DOM: view$ }
}
run(bars1, { DOM: makeDOMDriver('#bars1', {'sparklines':Sparklines, 'sparklinesBars':SparklinesBars})});

function bars2({DOM}) {
  const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData}>
          <sparklinesBars style={{ stroke: "white", fill: "#41c3f9", fillOpacity: ".25" }} />
          <sparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
      </sparklines>
    </span>
  );

  return { DOM: view$ }
}
run(bars2, { DOM: makeDOMDriver('#bars2', {'sparklines':Sparklines, 'sparklinesBars':SparklinesBars, 'sparklinesLine':SparklinesLine})});

/** Dynamic **/

function makeDataSourceDriver(){
  return Rx.Observable.interval(100)
    .scan( (acc, x) => acc.concat([boxMullerRandom()] ), []);
}

function dynamic1({DOM, DataSource}) {
  const view$ = DataSource
  .map( data => (
    <span>
      <sparklines data={data} limit={20}>
        <sparklinesLine color="#1c8cdc" />
        <sparklinesSpots />
      </sparklines>
      </span>
    ));
  return { DOM: view$ }
}
run(dynamic1, {
    DOM: makeDOMDriver('#dynamic1', {'sparklines':Sparklines, 'sparklinesSpots':SparklinesSpots, 'sparklinesLine':SparklinesLine}),
    DataSource: makeDataSourceDriver 
  });

function dynamic2({DOM, DataSource}) {
  const view$ = DataSource
  .map( data => (
    <span>
      <sparklines data={data} limit={20}>
        <sparklinesBars style={{ fill: "#41c3f9", fillOpacity: ".25" }} />
        <sparklinesLine style={{ stroke: "#41c3f9", fill: "none" }} />
      </sparklines>
      </span>
    ));
  return { DOM: view$ }
}
run(dynamic2, {
    DOM: makeDOMDriver('#dynamic2', {'sparklines':Sparklines, 'sparklinesBars':SparklinesBars, 'sparklinesLine':SparklinesLine}),
    DataSource: makeDataSourceDriver 
  });

function dynamic3({DOM, DataSource}) {
  const view$ = DataSource
  .map( data => (
    <span>
      <sparklines data={data} limit={20}>
        <sparklinesLine style={{ stroke: "none", fill: "#8e44af", fillOpacity: "1" }}/>
      </sparklines>
      </span>
    ));
  return { DOM: view$ }
}
run(dynamic3, {
    DOM: makeDOMDriver('#dynamic3', {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine}),
    DataSource: makeDataSourceDriver 
  });

function dynamic4({DOM, DataSource}) {
  const view$ = DataSource
  .map( data => (
    <span>
      <sparklines data={data} limit={10}>
        <sparklinesBars color="#0a83d8" />
      </sparklines>
      </span>
    ));
  return { DOM: view$ }
}
run(dynamic4, {
    DOM: makeDOMDriver('#dynamic4', {'sparklines':Sparklines, 'sparklinesBars':SparklinesBars}),
    DataSource: makeDataSourceDriver 
  });


/** Reference line **/
function makeReference(type){
  return function ({DOM}) {
    const view$ = Rx.Observable.just(
      <span>
        <sparklines data={sampleData}>
          <sparklinesLine />
          <sparklinesReferenceLine type={type} />
        </sparklines>
      </span>
      );

    return { DOM: view$ }
  };
}

const refTypes = {
  referenceline1: "max",
  referenceline2: "min",
  referenceline3: "mean",
  referenceline4: "avg",
  referenceline5: "median"
}

for (let elem in refTypes){
  run(makeReference(refTypes[elem]), {
      DOM: makeDOMDriver('#' + elem, {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine, 'sparklinesReferenceLine': SparklinesReferenceLine}) }
  );
}

function referenceline6({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData}>
        <sparklinesBars style={{ fill: 'slategray', fillOpacity: ".5" }} />
        <sparklinesReferenceLine />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(referenceline6, {
    DOM: makeDOMDriver('#referenceline6', {'sparklines':Sparklines, 'sparklinesBars':SparklinesBars, 'sparklinesReferenceLine': SparklinesReferenceLine})
  });

/** Normal band **/
function normalband1({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData}>
        <sparklinesLine style={{ fill: "none" }}/>
        <sparklinesNormalBand />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(normalband1, {
    DOM: makeDOMDriver('#normalband1', {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine, 'sparklinesNormalBand': SparklinesNormalBand})
  });

function normalband2({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData}>
        <sparklinesLine style={{ fill: "none" }}/>
        <sparklinesNormalBand />
        <sparklinesReferenceLine type="mean" />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(normalband2, {
    DOM: makeDOMDriver('#normalband2', {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine, 'sparklinesNormalBand': SparklinesNormalBand, 'sparklinesReferenceLine': SparklinesReferenceLine})
  });

/** Real world examples **/
const allSparkElements = {
  'sparklines':Sparklines,
  'sparklinesLine':SparklinesLine,
  'sparklinesSpots':SparklinesSpots,
  'sparklinesBars':SparklinesBars,
  'sparklinesNormalBand': SparklinesNormalBand,
  'sparklinesReferenceLine': SparklinesReferenceLine
};

function realworld1({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData}>
        <sparklinesLine style={{ strokeWidth: 3, stroke: "#336aff", fill: "none" }} />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(realworld1, { DOM: makeDOMDriver('#realworld1', allSparkElements)});

function realworld2({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData100} width={200}>
        <sparklinesLine style={{ stroke: "#2991c8", fill: "none"}} />
        <sparklinesSpots />
        <sparklinesNormalBand style={{ fill: "#2991c8", fillOpacity: .1 }} />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(realworld2, { DOM: makeDOMDriver('#realworld2', allSparkElements)});

function realworld3({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData100}>
        <sparklinesLine style={{ stroke: "black", fill: "none" }} />
        <sparklinesSpots style={{ fill: "orange" }} />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(realworld3, { DOM: makeDOMDriver('#realworld3', allSparkElements)});

function realworld4({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData}>
      <sparklinesBars style={{ stroke: "white", strokeWidth: "1", fill: "#40c0f5" }} />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(realworld4, { DOM: makeDOMDriver('#realworld4', allSparkElements)});

function realworld5({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData} height={80}>
        <sparklinesLine style={{ stroke: "#8ed53f", strokeWidth: "1", fill: "none" }} />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(realworld5, { DOM: makeDOMDriver('#realworld5', allSparkElements)});

function realworld6({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData} height={80}>
        <sparklinesLine style={{ stroke: "#d1192e", strokeWidth: "1", fill: "none" }} />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(realworld6, { DOM: makeDOMDriver('#realworld6', allSparkElements)});

function realworld7({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData} height={40}>
        <sparklinesLine style={{ stroke: "#559500", fill: "#8fc638", fillOpacity: "1" }} />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(realworld7, { DOM: makeDOMDriver('#realworld7', allSparkElements)});

function realworld8({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData} style={{background: "#272727"}} margin={10} height={40}>
          <sparklinesLine style={{ stroke: "none", fill: "#d2673a", fillOpacity: ".5" }} />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(realworld8, { DOM: makeDOMDriver('#realworld8', allSparkElements)});

function realworld9({DOM}) {
    const view$ = Rx.Observable.just(
    <span>
      <sparklines data={sampleData} style={{background: "#00bdcc"}} margin={10} height={40}>
          <sparklinesLine style={{ stroke: "white", fill: "none" }} />
          <sparklinesReferenceLine style={{ stroke: 'white', strokeOpacity: .75, strokeDasharray: '2, 2' }} />
      </sparklines>
      </span>
    );
  return { DOM: view$ }
}
run(realworld9, { DOM: makeDOMDriver('#realworld9', allSparkElements)});
