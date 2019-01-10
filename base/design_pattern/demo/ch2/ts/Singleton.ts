1
class Singleton {
    private static count:number = 0;
    private static readonly singleton:Singleton = new Singleton()
    private constructor() {}
    public static getSingleton():Singleton {
        return Singleton.singleton;
    }
    public say():void {
        console.log('hello world');
    }
    public addCount():number {
        return ++Singleton.count;
    }
}

let singleton:Singleton = Singleton.getSingleton();
singleton.say();
let r:number = singleton.addCount();
console.log(r);
let singleton2:Singleton = Singleton.getSingleton();
let r2:number = singleton2.addCount();
console.log(r2);