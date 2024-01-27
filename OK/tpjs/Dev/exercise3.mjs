"use strict"

export class Student{
    constructor(lastName, firstName, id){
        this.lastName=lastName;
        this.firstName=firstName;
        this.id=id;
    }

    toString() {
        return `student: ${this.lastName}, ${this.firstName}, ${this.id}`;
      }
}


export class ForeignStud extends Student {
    constructor(lastName, firstName, id, nationality) {
      super(lastName, firstName, id);
      this.nationality = nationality;
    }
  
    toString() {
      return `${super.toString()}, ${this.nationality}`;
    } 
}



//var student = new Student("Dupond", "John", 1835);
//console.log(student);
//console.log(student.toString());

//var foreign_student= new ForeignStud("Doe", "John", 432, " American")
//console.log(foreign_student);
//console.log(foreign_student.toString());



