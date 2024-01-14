
export function wordCount(s){
    var items = s.split(" ");
    var object = {};
    for (var i = 0; i < items.length; i++){
        if (items[i] in object){
            object[items[i]] += 1;
        }
        else{
            object[items[i]] = 1;
        }
    }
    return object;
}


export class WList {
    constructor(str) {
        this.str = str;
        this.words = this.wordCount();
    }

    wordCount() {
        var items = this.str.split(/\s+/);
        var object = {};
        for (var i = 0; i < items.length; i++) {
            if (items[i] in object) {
                object[items[i]] += 1;
            } else {
                object[items[i]] = 1;
            }
        }
        return object;
    }

    getWords() {
        return Object.keys(this.words).sort();
    }

    maxCountWord() {
        let sortedWords = this.getWords();
        let maxWord = sortedWords[0];
        for (let word of sortedWords) {
            if (this.words[word] > this.words[maxWord]) {
                maxWord = word;
            }
        }
        return maxWord;
    }

    minCountWord() {
        let sortedWords = this.getWords();
        let minWord = sortedWords[0];
        for (let word of sortedWords) {
            if (this.words[word] < this.words[minWord]) {
                minWord = word;
            }
        }
        return minWord;
    }

    getCount(word) {
        return this.words[word] || 0;
    }

    applyWordFunc(f) {
        return this.getWords().map(word => f(word));
    }
}
