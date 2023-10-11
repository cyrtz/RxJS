import { Subject } from "rxjs";

const youtuber$ = new Subject();

youtuber$.next(1);

const observerA = {
    next: id => {
        console.log(`我是觀察者A，我收到影片${id}上架通知了`);
    },
    error: () => {},
    complete: () => {}
    
};

const observerASubscription = youtuber$.subscribe(observerA);

youtuber$.next(2);

const observerBSubscription = youtuber$.subscribe(id => {
    console.log(`我是觀察者B，我收到影片${id}上架通知了`);
});

youtuber$.next(3);

observerBSubscription.unsubscribe();

youtuber$.next(4);
