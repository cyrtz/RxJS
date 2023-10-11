import { Subject, fromEvent } from "rxjs";
import { filter } from "rxjs/operators"


const start_btn = document.querySelector('#start')!;
const count_btn = document.querySelector('#count')!;
const error_btn = document.querySelector('#error')!;
const complete_btn = document.querySelector('#complete')!;
const currentCounterLabel = document.querySelector('#currentCounter')!;
const evenCounterLabel = document.querySelector('#eventCounter')!;
const statusLabel = document.querySelector('#status')!;

let counter = 0;
let counter$: Subject<number>;


fromEvent(start_btn, 'click').subscribe(() => {
  counter$ = new Subject();
  counter = 0;

  statusLabel.innerHTML = '目前狀態：開始計數';

  counter$.subscribe(data => {
    currentCounterLabel.innerHTML = `目前計數：${data}`;
  });

  const evenCounter$ = counter$.pipe(filter(data => data % 2 === 0));
  counter$.subscribe(data => {
    evenCounterLabel.innerHTML = `偶數計數${data}`;
  });

  counter$.subscribe({
    next: () => { },

    error: message => {
      statusLabel.innerHTML = `目前狀態：錯誤 -> ${message}`
    },
    complete: () => {
      statusLabel.innerHTML = `目前狀態：完成`;
    }
  });

  counter$.next(counter);
});

fromEvent(count_btn, 'click').subscribe(() => {
  counter$.next(++counter);
});

fromEvent(error_btn, 'click').subscribe(() => {
  const reason = prompt('請輸入錯誤訊息：');
  counter$.error(reason || 'error');
});

fromEvent(complete_btn, 'click').subscribe(() => {
  counter$.complete();
})