interface Function {
    name: string;
}

interface Human {
    getColor(): void;
    talk(): void;
}

class BlackHuman implements Human{
    public getColor():void {
        console.log('黑色人种的皮肤是黑色的！');
    }

    public talk():void {
        console.log('黑人会说话，一般人听不懂。')
    }
}

class WhiteHuman implements Human{
    public getColor():void {
        console.log('白色人种的皮肤是白色的！');
    }

    public talk():void {
        console.log('白色人会说话，一般一个字节。')
    }
}

abstract class AbstractHumanFactory {
    // ts 无法识别泛型类，只能将 className 定义为 any 类型，但实际为 ConcreteHumanClass
    abstract createHuman<T extends Human>(ConcreteHumanClass : any): T;
}

class HumanFactory extends AbstractHumanFactory {
    public createHuman<T extends Human>(ConcreteHumanClass: any): T {
        let human:Human = null;
        try {
            human = <T>new ConcreteHumanClass();

        } catch (e) {
            throw new Error(e);
        }
        return <T>human;
    }
}

export default class NvWa {
    public static start(): void {
         let YinYangLu:AbstractHumanFactory = new HumanFactory();
        console.log('--造出的第一批是黑色人种--');
        let blackHuman: Human = YinYangLu.createHuman(BlackHuman);
        blackHuman.getColor();
        blackHuman.talk();
        console.log('--造出的第二批是黑色人种--');
        let whiteHuman: Human = YinYangLu.createHuman(WhiteHuman);
        whiteHuman.getColor();
        whiteHuman.talk();
    }
}

NvWa.start();