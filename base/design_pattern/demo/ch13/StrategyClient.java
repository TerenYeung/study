interface IStrategy {
    public void operate();
}

class BackDoor implements IStrategy {
    public void operate() {
        System.out.println("找乔国老帮忙，让吴国太给孙权施加压力");
    }
}

class GivenGreenLight implements IStrategy {
    public void operate() {
        System.out.println("求吴国太开绿灯，放行！");
    }
}

class BlockEnemy implements IStrategy {
    public void operate() {
        System.out.println("孙夫人断后，挡住追兵");
    }
}

class Context {
    private IStrategy strategy;
    public Context(IStrategy strategy) {
        this.strategy = strategy;
    }
    public void operate() {
        this.strategy.operate();
    }
}

public class StrategyClient {
    public static void main(String[] args) {
        Context context;
        System.out.println("--刚刚到吴国的时候拆第一个--");
        context = new Context(new BackDoor());
        context.operate();
        System.out.println("\n\n\n");
        System.out.println("--刘备乐不思蜀，拆开第二个--");
        context = new Context(new GivenGreenLight());
        context.operate();
        System.out.println("\n\n\n");
        System.out.println("--孙权追兵来了，咋办？拆第三个--");
        context = new Context(new BlockEnemy());
        context.operate();
    }
}