import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // isProgressing: boolean;
  running: any[];

  constructor() {
    this.running = [];
  }

  startProgress() {
    this.running.push(0);
    // this.isProgressing = true;
    // console.log('progress', this.running);
  }
  stopProgress() {
    this.running.pop();
    // this.isProgressing = false;
    // console.log('progress', this.running);
  }

  get isProgressing() {
    return this.running.length > 0;
  }
}
