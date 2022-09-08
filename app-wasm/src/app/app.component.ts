import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, tap, } from 'rxjs';
import * as call from '../assets/rust_wasm_callback';
import { ExClass, RetEx } from '../assets/rust_wasm_callback';

import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { JsPrimerCounter, WasmPrimerCounter } from './common';

interface Detail {
  msg: string,
  total: number,
  time: number,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-wasm';


  /*
   * counter
   */
  private readonly _counter = new BehaviorSubject<number>(100000);
  counter$ = this._counter.asObservable().pipe(distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));

  /*
  * counter getter
  */
  get counter(): number {
    return this._counter.getValue();
  }

  /*
   * counter setter
   */
  set counter(value: number) {
    if (this._counter.getValue() !== value) {
      this._counter.next(value);
    }
  }




  /*
   * WasmTime
   */
  private readonly _wasmTime = new BehaviorSubject<number>(0);
  wasmTime$ = this._wasmTime.asObservable().pipe(distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));

  /*
  * WasmTime getter
  */
  get wasmTime(): number {
    return this._wasmTime.getValue();
  }

  /*
   * WasmTime setter
   */
  set wasmTime(value: number) {
    if (this._wasmTime.getValue() !== value) {
      this._wasmTime.next(value);
    }
  }

  /*
   * JsDetail
   */
  private readonly _detail = new BehaviorSubject<Detail[] | null>(null);
  detail$ = this._detail.asObservable().pipe(distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));



  ngOnInit(): void {

    this._counter.pipe(tap(count => {
      this.counterMax(count);
    })).subscribe();
  }


  /**
   *
   * @param maxPrimerNumber
   */
  counterMax(maxPrimerNumber: number) {
    const js = JsPrimerCounter(maxPrimerNumber)
    const wasm = WasmPrimerCounter(maxPrimerNumber)
    combineLatest([
      js,
      wasm
    ])
      .pipe(
        tap(([js, wasm]) => {
          const detail = [{ msg: js.retEx.msg, time: js.time, total: js.retEx.total }];
          detail.push({ msg: wasm.retEx.msg, time: wasm.time, total: wasm.retEx.total })
          this._detail.next(detail);
        })
      )
      .subscribe()
  }

  callback(ret: string) {
    alert(ret);
  }

}
