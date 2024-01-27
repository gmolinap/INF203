"use strict"

//counting the number of words in a string
export function wc(texte){
    var texte1=texte.replace(/[,:;.?!'*/+|$%&^_()[\]]|\n/g, " ");
    var words=texte1.split(' ');
    var occurence={};

    for (var i in words){
        var word=words[i];
        if (occurence[word]){
            occurence[word]+=1;
        }
        else{
            occurence[word]=1;
        }
    }
    return occurence;
}


export function WList (string){
    this.words = wc(string);

    this.getWords= function() {
        var res=[];
        for (var i in this.words){
            res.push(i);
        }
        return res.sort();
    }

    this.maxCountWord=function(){
        var word_max_occ= Object. keys(this.words)[0];
        var max_occ = this.words[word_max_occ];

        for(var i in this.words){
            var number = this.words[i];
            if (number >max_occ || number==max_occ && i<word_max_occ){
                max_occ=number;
                word_max_occ=i;
            }
        }
        return word_max_occ;
    }

    this.minCountWord=function(){
        var word_min_occ= Object. keys(this.words)[0];
        var min_occ = this.words[word_min_occ];

        for(var i in this.words){
            var number = this.words[i];
            if (number <min_occ || number==min_occ && i<word_min_occ){
                min_occ=number;
                word_min_occ=i;
            }
        }
        return word_min_occ;
    }

    this.getCount=function(word){
        return this.words[word.toLowerCase()];
    }

    this.applyWordFunc = function (f) {
        return this.getWords().map(f);
    }
}






//console.log(wc('fish bowl fish bowl fish fish bowl fish bowl fish'));
//var classe = new WList("javascript utilise le point-virgule pour séparer les déclarations de variables et les instructions");
//console.log(classe.words);
//console.log(classe.getWords());
//console.log(classe.maxCountWord());
//console.log(classe.minCountWord());
//console.log(classe.getCount("javascript"));

//function f (word) {return word.length;}
//console.log(classe.applyWordFunc(f));
