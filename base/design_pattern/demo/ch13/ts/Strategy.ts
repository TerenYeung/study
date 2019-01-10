interface IStrategy {
    operate(): void;
}

class BackDoor implements IStrategy {
    public operate(): void {
        console.log('找乔国老帮忙，让吴国太给孙权施加压力');
    }
}

class GivenGreenLight implements IStrategy {
    public operate(): void {
        console.log('求吴国太开绿灯，放行！');
    }
}

class BlockEnemy implements IStrategy {
    public operate(): void {
        console.log("孙夫人断后，挡住追兵");
    }
}

class Context {
    private strategy: IStrategy;
    public constructor(strategy: IStrategy) {
        this.strategy = strategy;
    }
    public operate(): void {
        this.strategy.operate();
    }
}

let context: Context;
context = new Context(new BackDoor());
context.operate();
context = new Context(new GivenGreenLight());
context.operate();
context = new Context(new BlockEnemy());
context.operate();