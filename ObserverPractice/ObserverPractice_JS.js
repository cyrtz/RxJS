const observerA = {
    notify: id => {
        console.log(`我是觀察者A，我收到影片${id}上架通知了`);
    }
};

const observerB = {
    notify: id => {
        console.log(`我是觀察者B，我收到影片${id}上架通知了`);
    }
};

const youtuberSubject = {
    observers: [],
    notifyObservers: id => {
        youtuberSubject.observers.forEach(observer => {
            observer.notify(id);
        });
    },

    addObserver: observer => {
        youtuberSubject.observers.push(observer);
    },

    deleteObserver: observer => {
        youtuberSubject.observers = youtuberSubject.observers.filter(obs => obs !== observer);
    }
};

console.log('---開始---')

youtuberSubject.notifyObservers(1);

youtuberSubject.addObserver(observerA);
youtuberSubject.notifyObservers(2);

