
// // import {fibIt,fibRec,fibArr,fibo_map} from "./exercise1.mjs";
// import {fibIt, fibRec,fibArr,fibo_map} from "./exercise1.mjs";

// console.log("Loop fib:");
// console.log(fibIt(7)); 
// console.log(fibIt(3)); 
// console.log(fibIt(8)); 
// // do more that one test per function
// console.log("Recursivity:");
// console.log(fibRec(8));

// console.log("Fibonacci Array:");
// console.log(fibArr([8,5]));

// console.log("Fibonacci Map:");
// console.log(fibo_map([8,5]));
// //...

// NUMERO 2

// import {wordCount, WList} from "./exercise2.mjs";

// // console.log("Word Count:");
// // console.log(wordCount("Hello World Hello World Hello World"));

// const us = new WList("fish bowl am am am fish bowl fish");
// us.getWords();
// us.maxCountWord();

// const fruit = new WList("apple banana apple banana cherry zapo zapo");
// fruit.getWords();
// fruit.maxCountWord();


// const animal = new WList("cat dog cat cat dog dog ant ant ant");
// animal.getWords();
// animal.maxCountWord();
// animal.minCountWord();
// animal.getCountWord("cat");

// function f (animal) {return animal.length;}

// wordList.applyWordFunc(f)

// NUMERO 3

import {FrStd, Std} from "./exercise3.mjs";

// var student = new Std("Dupond", "John", 1835);
// console.log(student.toString());

// var student = new FrStd("Dupond", "John", 1835, "American");
// console.log(student.toString());

// NUMERO 4

import {Promo} from "./exercise4.mjs";

let promo = new Promo();
promo.add(new Std("Dupond", "John", 1835));
promo.add(new Std("Molina", "Gabriel", 2019));
console.log(promo.size());
console.log(promo.get(0));
console.log(promo.write());
promo.read('[{"lastName":"Dupond","firstName":"John","id":1835},{"lastName":"Molina","firstName":"Gabriel","id":2019}]');

