interface IteratorObj {
    value: any;
    done: any;
}

interface Iterator<T> {
    next(): T;
}

class List implements Iterator<IteratorObj> {
    private value:number = 0;
    private stop:number = 0;
    constructor(start:number, stop:number) {
        this.value = start;
        this.stop = stop;
    }
    [Symbol.iterator]() { return this; }
    public next():IteratorObj {
        let value = this.value;
        if (value < this.stop) {
            this.value++;
            return {
                done: false,
                value: value,
            }
        }
        return {
            done: true,
            value: undefined
        }
    }
}

let list:List = new List(0, 3);
for (let l of list) {
    console.log(l);
}
