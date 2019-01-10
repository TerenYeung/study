interface Human {
    public void getColor();
    public void talk();
}

class BlackHuman implements Human {
    public void getColor() {
        System.out.println("黑色人种的皮肤颜色是黑色的！");
    }

    public void talk() {
        System.out.println("黑人会说话，一般人听不懂。");
    }
}

class YellowHuman implements Human {
    public void getColor() {
        System.out.println("黄色人种的皮肤颜色是黄色的！");
    }

    public void talk() {
        System.out.println("黄人会说话，一般说的都是双字节。");
    }
}

class WhiteHuman implements Human {
    public void getColor() {
        System.out.println("白色人种的皮肤颜色是白色的！");
    }

    public void talk() {
        System.out.println("白色人种会说话，一般说的都是单字节。");
    }
}

/**
 * @description 工厂模式
 */
/*
abstract class AbstractHumanFactory {
    public abstract <T extends Human> T createHuman(Class<T> c);
}

class HumanFactory extends AbstractHumanFactory {
    public <T extends Human> T createHuman(Class<T> c) {
        Human human = null;
        try {
            human = (T)Class.forName(c.getName()).newInstance();
        } catch (Exception e) {
            System.out.println("人种生成错误！");
        }
        return (T)human;
    }
}

class NvWa {
    public static void main(String[] args) {
        AbstractHumanFactory YinYangLu = new HumanFactory();
        System.out.println("--造出的第一批人是白色人种--");
        Human whiteHuman = YinYangLu.createHuman(WhiteHuman.class);
        whiteHuman.getColor();
        whiteHuman.talk();
        System.out.println("\n--造出的第二批人是黑色人种--");
        Human blackHuman = YinYangLu.createHuman(BlackHuman.class);
        blackHuman.getColor();
        blackHuman.talk();
        System.out.println("\n--造出的第三批人是黄色人种--");
        Human yellowHuman = YinYangLu.createHuman(YellowHuman.class);
        yellowHuman.getColor();
        yellowHuman.talk();
    }
}*/

/**
 * @description 简单工厂模式
 */
/*
class HumanFactory {
    public static <T extends Human> T createHuman(Class<T> c) {
        Human human = null;
        try {
            human = (T)Class.forName(c.getName()).newInstance();
        } catch(Exception e) {
            System.out.println("人种生成错误...");
        }
        return (T)human;
    }
}

class NvWa {
    public static void main(String[] args) {
        Human whiteHuman = HumanFactory.createHuman(WhiteHuman.class);
        whiteHuman.getColor();
        whiteHuman.talk();
    }
}*/

/**
 * @description 多工厂模式
 * 抽象工厂类的 createHuman 中不需要传递相关参数，因为每个具体工厂类都明确自己的职责；
 */
abstract class AbstractHumanFactory {
    public abstract Human createHuman();
}

class BlackHumanFactory extends AbstractHumanFactory {
    public Human createHuman() {
        return new BlackHuman();
    }
}

class WhiteHumanFactory extends AbstractHumanFactory {
    public Human createHuman() {
        return new WhiteHuman();
    }
}

public class NvWa {
    public static void main(String[] args) {
        Human whiteHuman  = (new WhiteHumanFactory()).createHuman();
        whiteHuman.getColor();
        whiteHuman.talk();
        Human blackHuman = (new BlackHumanFactory()).createHuman();
        blackHuman.getColor();
        blackHuman.talk();
    }
}