import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, tap, } from 'rxjs';
import * as call from '../assets/rust_wasm_callback';
import { ExClass, RetEx } from '../assets/rust_wasm_callback';

import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { JsPrimerCounter, WasmPrimerCounter } from './common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app-wasm';
  count: number = 3;
  response: string[] = [];
  exClass: ExClass | null = null;

  jsFaster = false;
  wasmFaster = false;

  /*
   * counter
   */
  private readonly _counter = new BehaviorSubject<number>(1000);
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
   * Js
   */
  private readonly _js = new BehaviorSubject<{ retEx: RetEx, time: number } | null>(null);
  js$ = this._js.asObservable().pipe(distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));

  /*
   * Wasm
   */
  private readonly _wasm = new BehaviorSubject<{ retEx: RetEx, time: number } | null>(null);
  wasm$ = this._wasm.asObservable().pipe(distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));


  ngOnInit(): void {
    this._counter.pipe(tap(counter => {
      JsPrimerCounter(counter)
        .pipe(
          map(m => {
            return {
              retEx:
              {
                msg: m.retEx.msg,
                total: m.retEx.total
              },
              time: m.time
            }
          }),
          tap(ret => this._js.next({ retEx: ret.retEx as RetEx, time: ret.time }))
        ).subscribe()

      WasmPrimerCounter(counter)
        .pipe(
          map(m => {
            return {
              retEx:
              {
                msg: m.retEx.msg,
                total: m.retEx.total
              },
              time: m.time
            }
          }),
          tap(ret => this._wasm.next({ retEx: ret.retEx as RetEx, time: ret.time }))
        ).subscribe()
    })).subscribe();
    combineLatest([
      this._js,
      this._wasm
    ]).pipe(tap(([js, wasm]) => {

      if ((js?.time !== null && js?.time !== undefined) && (wasm?.time !== null && wasm?.time !== undefined)) {
        if (js?.time < wasm?.time) {
          this.jsFaster = true;
          this.wasmFaster = false;
        }
        if (js?.time > wasm?.time) {
          this.jsFaster = false;
          this.wasmFaster = true;
        }
      }
    })).subscribe();

  }

  startCount() {
    this.response = [];
    const callback = (ret: string) => {
      this.response.push(ret);
    }

    call.callback_ex(this.count, callback)
  }


  callback(ret: string) {
    alert(ret);
  }

}
