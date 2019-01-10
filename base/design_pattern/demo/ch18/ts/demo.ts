/// <reference path="demo.d.ts"/>


// import { Person, A, Dog, greet, SomeType, SomeVar, Box } from './demo.d';
// import * as Demo from './demo.d';

let obj:A = {
    b: 1,
    c: "hello"
}

let dog:Dog = {
    weight: 123,
    height: 123,
    leg: 123,
}

let teren:Person = {
    name: 'teren',
    age: 18,
}


// let x:Demo.SomeVar = {
//     a: {
//         count: 123
//     }
// }
let we = Box.x;
console.log(we);

// import { SomeType, SomeVar } from './demo.d';
// class Animal {
//     private name: string;
//     constructor(theName: string) { this.name = theName; }
// }

// class Rhino extends Animal {
//     constructor() { super("Rhino"); }
// }

// class Employee {
//     private name: string;
//     constructor(theName: string) { this.name = theName; }
// }

// let animal = new Animal("Goat");
// let rhino = new Rhino();
// let employee = new Employee("Bob");

// interface IAdd {
//     x:number;
//     y:number
// }

// // let add:(x: number, y: number) => number = (x: number, y:number):number => x + y 
// // console.log(add(1,2));

// // function buildName(firstName: number, lastName: number): number;
// // function buildName(firstName: string, lastName: string): string;
// // function buildName(firstName: any, lastName: any):any {
// //     if (typeof firstName == 'number' && typeof lastName == 'number') {
// //         return firstName+lastName
// //     } else {
// //         return firstName + lastName
// //     }
// // }



// interface Add<T> {
//     (x: T, y: T): T
// }

// function addFunc(a, b) {
//     return a + b;
// }

// let add:Add<number> = addFunc

// // add(1,2)
// function buildName<T>(firstName: T, lastName: T):void {

// }

// // console.log(add(1,2))
// // console.log(add('teren', 'yeung'))
// // console.log(buildName<string>("teren", "yeung"))
// // console.log(buildName<number>(1, 2));


