import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, shareReplay } from 'rxjs';
interface Detail {
  msg: string;
  total: number;
  time: number
}
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


  /*
   * _detail
   */
  private _detail = new BehaviorSubject<Detail[] | null>(null);
  $detail = this._detail.asObservable().pipe(distinctUntilChanged(), shareReplay({ bufferSize: 1, refCount: true }));

  /*
   * _detail Getter
   */
  get detail(): Detail[] | null {
    return this._detail.getValue();
  }

  /*
   * _detail Setter
   */
  @Input() set detail(value: Detail[] | null) {
    if (this._detail.getValue() !== value) {
      this._detail.next(value);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
