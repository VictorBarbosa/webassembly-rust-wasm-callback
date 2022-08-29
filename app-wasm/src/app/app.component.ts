import { Component } from '@angular/core';
import * as call from '../assets/rust_wasm_callback';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-wasm';

  count: number = 3;

  response: string[] = [];

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
