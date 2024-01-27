"use strict";

// programming with a loop
export function fiboIt(n) {
    var fib=[];
    fib[0]=0;
    fib[1]=1;
    while (n>=0){
        if (n==0) {
            return (fib[0]);
        }
         else if (n==1){
            fib[1]=1;
            return(1);
        }
        else{
            for (var i=2; i<n+1; i++){
            fib[i]=fib[i-1]+fib[i-2];
            }
            return(fib[n]);
        }
    }
}

// recursive function
export function fiboRec(n) {
    if (n==0){
        return 0;
    }
    else if (n==1){
        return 1;
    }
    else{
        return (fiboRec(n-1)+fiboRec(n-2));
    }

}

// process array, no map
export function fiboArr(t) {
    var i;
    var res=[];
    for (i=0; i<t.length;i++){
        res[i]=fiboIt(t[i]); 
    }
    return res;
    
}

// use of map
export function fibMap(t) {
    return t.map(fiboRec);
}