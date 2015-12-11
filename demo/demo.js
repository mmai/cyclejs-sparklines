/** @jsx hJSX */

import Rx from 'rx';
import {run} from '@cycle/core';
import {makeDOMDriver, h, hJSX} from '@cycle/dom';
import { Sparklines, SparklinesLine } from '../src/Sparklines';

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

function main({DOM}) {
  const view$ = Rx.Observable.just(
    <div>
      <sparklines data={sampleData} width={300} height={50}>
          <sparklinesLine style={{ stroke: "slategray", fill: "gray" }} />
      </sparklines>
    </div>
  );

  return {
    DOM: view$,
  }
}

let drivers = {
  DOM: makeDOMDriver('#simple', {'sparklines':Sparklines, 'sparklinesLine':SparklinesLine})
};

run(main, drivers);




