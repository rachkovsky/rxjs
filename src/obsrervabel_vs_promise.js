import { Observable } from 'rxjs';


// Creation:

const observable1 = new Observable(subscriberFunc);
function subscriberFunc(observer) {
    observer.next('value1 from observable 1');
    //observer.error('error');
    observer.complete();
}

const promise1 = new Promise(executorFunc);
function executorFunc(resolve, reject) {
    resolve('value from promise 1');
    reject('error from promise 1');
}




// Usage

observable1.subscribe(nextFunc);
function nextFunc(value) {
    console.log(value);
}


promise1.then(onFulfilled).catch(onRejected);
function onFulfilled(value) {
    console.log(value);
}
function onRejected(error) {
    console.log(error);
}








// Single Value vs. Multiple Values
    // A promise can only emit a single value. 
    // An observables can emit any number of values.


    const promise2 = new Promise(resolve => {
        resolve(1);
        resolve(2);
        resolve(3);
    });
    promise2.then(result => console.log(result));
    // This prints: 1


    const observable2 = new Observable(observer => {
        observer.next(1);
        observer.next(2);
        observer.next(3);
    });
    observable2.subscribe(result => console.log(result));
     // This prints: 1 2 3





//Eager vs. Lazy
    // Promises are eager: the executor function is called as soon as the promise is created.
    // Observables are lazy: the subscriber function is only called when a client subscribes to the observable.

    
    // Promise

    const promise3 = new Promise(resolve => {
        console.log("- Executing");
        resolve();
    });
    console.log("- Subscribing");
    promise3.then(() => console.log("- Handling result"));

    // This prints:
       // - Executing
       // - Subscribing
       // - Handling result




    // Observable

    const observable3 = new Observable(observer => {
        console.log("- Executing");
        observer.next();
    });
    console.log("- Subscribing");
    observable3.subscribe(() => console.log("- Handling result"));

    //This prints:
        // - Subscribing
        // - Executing
        // - Handling result








    //Non-Cancellable vs. Cancellable

    // Promises:
    const promise4 = new Promise(resolve => {
        setTimeout(() => {
            console.log("Async task done");
            resolve();
        }, 2000);
    });
    promise4.then(() => console.log("Handler"));
    // Can't prevent handler from being executed anymore.

    // This prints (after 2 seconds):
        // Async task done
        // Handler


    
    


    
    //Observables:
    const observable4 = new Observable(observer => {
        setTimeout(() => {
            console.log("Async task done");
            observer.next();
        }, 2000);
    });
    const subscription = observable4.subscribe(() => console.log("Handler"));
    subscription.unsubscribe();

    //This prints (after 2 seconds):
    //Async task done









    // Multicast vs. Unicast

    //Promises:

    const promise5 = new Promise(resolve => {
        console.log("Executing...");
        resolve(Math.random());
    });
    promise5.then(result => console.log(result));
    promise5.then(result => console.log(result));
    
    //This prints (for example):
    // Executing...
    // 0.1951561731912439
    // 0.1951561731912439



    // Observables:

    const observable5 = new Observable(observer => {
        console.log("Executing...");
        observer.next(Math.random());
    });
    observable5.subscribe(result => console.log(result));
    observable5.subscribe(result => console.log(result));
    
    // This prints (for example):
    // Executing...
    // 0.5884515904517829
    // Executing...
    // 0.7974144930327094





    