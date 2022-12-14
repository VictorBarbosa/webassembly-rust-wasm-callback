import { Observable } from 'rxjs';
import * as call from '../assets/rust_wasm_code';
import { RetEx } from '../assets/rust_wasm_code';

export const JsPrimerCounter = (counter: number): Observable<{ retEx: RetEx, time: number }> => {
  console.time("js-time")
  const start = performance.now()
  let primerList = [];
  for (let i = 0; i < counter; i++) {
    if (isPrimer(i)) {
      primerList.push(i);
    }
  }

  return new Observable(obs => {
    obs.next({ retEx: new RetEx(primerList.length, `Total - ${primerList.length} primers number in ${counter}, msg from js`), time: (performance.now() - start) / 1000 })
    console.timeEnd("js-time")
  })
}

const isPrimer = (n: number): boolean => {
  for (let a = 2; a < n; a++) {
    if (n % a === 0) {
      return false;
    }
  }
  return true;
}


/**
 *
 * @param counter primer number range
 * @returns Return a Promise
 */
export const WasmPrimerCounter = (counter: number): Observable<{ retEx: RetEx, time: number }> => {
  console.time("wasm-time")
  const start = performance.now()
  return new Observable(obs => {
    const exClass = new call.ExClass()
    const ret = exClass.conterPrimer(counter)
    obs.next({ retEx: ret, time: (performance.now() - start) / 1000 });
    console.timeEnd("wasm-time");
    exClass.free();
  });
}




