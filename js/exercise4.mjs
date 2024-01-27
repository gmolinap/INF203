"use strict";

import {Std, FrStd} from "./exercise3.mjs";
import fs from 'fs';

export class Promo {
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
        let result = [];
        for (let i = 0; i < this.students.length; i++) {
            result += this.students[i].toString() + "\n";
        }
        console.log(result);
        return result;
    }

    write() {
        return JSON.stringify(this.students, null, 2);
    }

    read(str) {
        this.students = JSON.parse(str).map(s => {
            if (s.nationality) {
                return new FrStd(s.lastName, s.firstName, s.id, s.nationality);
            } else {
                return new Std(s.lastName, s.firstName, s.id);
            }
        });
    }

    saveTo(fileName) {
        fs.writeFileSync(fileName, this.write());
    }

    readFile(fileName) {
        this.read(fs.readFileSync(fileName));
    }
}