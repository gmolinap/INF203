"use strict"

import {Student, ForeignStud} from "./exercise3.mjs";
import fs from 'fs';

export class Promotion {
    constructor() {
      this.students = [];
    }

    add(student) {
        this.students.push(student);
    }

    size() {
        return this.students.length;
    }

    get(i) {
        return this.students[i];
    }

    print() {
        var result = "";
        for (var i in this.students){
          result += this.students[i].toString() + '\n';}
        return result;
    }


    write() {
        return JSON.stringify(this.students);
    }

    read(str) {
        const Array = JSON.parse(str);
        this.students = Array.map(studentData => {
          if (studentData.nationality) {
            return new ForeignStud(studentData.lastName, studentData.firstName, studentData.id, studentData.nationality);
          } else {
            return new Student(studentData.lastName, studentData.firstName, studentData.id);
          }
        });
    }

    saveF(fileName) {
        const jsonStr = this.write();
        fs.writeFileSync(fileName, jsonStr);
    }
    
    readF(fileName) {
        const jsonStr = fs.readFileSync(fileName, 'utf8');
        this.read(jsonStr);
    }

}

/*let student1 = new Student("Dupond", "John", 1835);
let foreignStudent = new ForeignStud("Doe", "John", 432, "American");


let promotion = new Promotion();
promotion.add(student1);
promotion.add(foreignStudent);

// Test the methods
console.log(promotion.size()); // Output: 2
console.log(promotion.get(0)); // Output: Student { lastName: 'Dupond', firstName: 'John', id: 1835 }
console.log(promotion.print()); // Output: student: Dupond, John, 1835\nstudent: Doe, John, 432, American
console.log(promotion.write()); 
console.log(promotion.read()); 
*/






