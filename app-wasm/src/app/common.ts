import { Observable } from 'rxjs';
import * as call from '../assets/rust_wasm_callback';
import { RetEx } from '../assets/rust_wasm_callback';

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
    obs.next({ retEx: new RetEx(primerList.length, `Total - ${primerList.length} primers number in ${counter}, msg from js`), time: (performance.now() - start) })
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
    obs.next({ retEx: new call.ExClass().ex_function(counter), time: (performance.now() - start) })
    console.timeEnd("wasm-time");
  });
}




