import { Observable, fromEvent, timer, interval } from 'rxjs';
import { map, switchMap, mergeMap, mapTo, take  } from 'rxjs/operators';


const prom = new Promise((resolve, reject) => {
    let q = Math.random();
    resolve(q);
});


const obs$ = new Observable((observer) => {
    let a = setInterval(() => {
        observer.next(Math.random());
    },1000);
    // observer.complete();
    // observer.error('text error');
    return () =>  clearInterval(a) 

});

let a = obs$.subscribe((res) => {
    console.log(res);
}, (err) => {
    console.log(err)
}, () => {
    console.log('complete');
})



