"use strict";

// programming with a loop
export function fibIt(n) {
    let a = 0, b = 1, c = 0;
    for (let i=0; i < n; i++){
        c = a + b; 
        a = b;
        b = c;
    }
    return a;   
}


// 8
// fib(n) = fib(n-1) + fib(n-2)
// 13 = fib(7) + fib(6)
// 11 = fib(6) + fib(5)
// recursive function
export function fibRec(n) {
    if (n < 2) return n;
    return fibRec(n-1) + fibRec(n-2);
}


// use a loop
export function fibArr(t) {
    for (var i= 0; i < t.length ;i++){
        t[i] = fibRec(t[i]);
    }
    return t;
}



// no loop
export function fibo_map(t) {
    return t.map(fibRec);
}