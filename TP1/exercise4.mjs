import {Std, FrStd} from "./exercise3.mjs";
import fs from 'fs';
// Question 4: Create a module for a Promo class. An object of the Promo class may contain any number of Std or FrStd objects

export class Promo{
    constructor(){
       this.students = [];
    }
    add(student){
        if (student instanceof Std || student instanceof FrStd){
            this.students.push(student);
        }else{
            console.log("Not a student");
        }
    }

    size(){
        return this.students.length;
    }
    get(i){
        return this.students[i].toString();
    }
    print(){
        for (var i = 0; i <this.students.length; i++){
            console.log(this.students[i].toString());
        }
    }

    write(){
        return JSON.stringify(this.students.map(student => ({
            type: student.constructor.name,
            data: student
        })));
    }

    read(str) {
        let studentsArr = JSON.parse(str);
        this.students = studentsArr.map(student => {
            if (student.nationality) {
                return new FrStd(student.lastName, student.firstName, student.id, student.nationality);
            } else {
                return new Std(student.lastName, student.firstName, student.id);
            }
        });
    }

    saveTo(fileName) {
        fs.writeFileSync(fileName, this.write());
    }

    readFile(fileName) {
        let data = fs.readFileSync(fileName, 'utf8');
        this.read(data);
    }
};