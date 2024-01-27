
export class Std{
    constructor(lastName,firstName, id){
        this.lastName = lastName;
        this.firstName = firstName;
        this.id = id;
    }

    toString(){
        var str = "student: ";
        str += this.lastName + ", " + this.firstName + ", " + this.id;
        return str;
    }
}

export class FrStd extends Std{
    constructor(lastName, firstName, id, nationality){
        super(lastName, firstName, id);
        this.nationality = nationality;

    }
    
    toString(){
        return super.toString() + ", "+ this.nationality;
    }

}

