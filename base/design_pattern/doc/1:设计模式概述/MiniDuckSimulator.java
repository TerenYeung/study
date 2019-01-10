/**
 * v1
 * 1. 增加所有鸭子飞行的功能
 */
/*
abstract class Duck {
    // 所有鸭子都会叫，由子类继承
    public void quack() {
        System.out.println("Duck quack.");
    }
    // 所有鸭子都会游泳，由子类继承
    public void swim() {
        System.out.println("Duck swim.");
    }
    // 每只鸭子的外观不同，需要子类覆写
    public  void display() {}

    // 1:增加鸭子飞行功能，然而并非所有鸭子都会飞，例如小黄鸭就不会飞，为了实现复用而使用继承，导致子类出现不必要的功能，只能通过覆写去并不完美解决；
    public void fly() {
        System.out.println("Duck fly.");
    }
}

class MallardDuck extends Duck {
    public MallardDuck() {}

    @Override
    public void display() {
        System.out.println("I'm green head.");
    }
}

class RedheadDuck extends Duck {
    public RedheadDuck() {}

    @Override
    public void display() {
        System.out.println("I'm red head.");
    }
}

class RubberDuck extends Duck {
    public RubberDuck() {}

    @Override
    public void display() {
        System.out.println("I'm rubber head.");
    }

    @Override
    public void fly() {
        System.out.println("Rubber cannot fly.");
    }
}
*/

/**
 * v2
 * 将飞行行为从超类中剥离，因为有些鸭子会飞，有些不会，同样有些鸭子会叫有些也不会（发现变化，并封装变化）
 *
 * 然而，如果现实中大量的鸭子都是会飞的，将飞行行为单独抽离出来，需要不同类型的鸭子都要实现可能同一种飞行行为，代码的复用性下降了；
 */
/*
interface Flyable {
    public void fly();
}

interface Quackable {
    public void quack();
}

abstract class Duck {
    public void swim() {
        System.out.println("Duck swim.");
    }

    public abstract void display();
}

class MallardDuck extends Duck implements Flyable, Quackable {
    public void display() {
        System.out.println("I'm green head.");
    }

    public void quack() {
        System.out.println("I can quack");
    }

    public void fly() {
        System.out.println("I can fly");
    }
}

class RubberDuck extends Duck {
    public void display() {
        System.out.println("I'm yellow head.");
    }
}*/



/**
 * v3
 * 将飞行、叫喊行为抽象为接口，并通过不同的子类去实现不同类型的飞行行为和叫声
 * 鸭子的超类包含了所有鸭子的行为和设置飞行、叫喊行为的 setter
 * 鸭子子类根据自身特点去继承鸭子超类，并在构造器中声明各自飞行和叫喊的依赖类
 * 这样一来，每一种鸭子实例既能享受继承带来的代码复用性，又能通过构造器中声明的细粒度的飞行和叫喊行为实现对变化的反应；
 * 一旦有新的鸭子类型或新的鸭子行为，只需增加鸭子子类或是增加接口对有需要该行为的鸭子进行依赖注入，符合开闭原则预期
 */

interface FlyBehavior {
    public void fly();
}

class FlyWithWings implements FlyBehavior {
    public void fly() {
        System.out.println("I'm flying!");
    }
}

class FlyNoWay implements FlyBehavior {
    public void fly() {
        System.out.println("I can't fly");
    }
}

class FlyRocketPowered implements FlyBehavior {
    public void fly() {
        System.out.println("I'm flying with a rocket");
    }
}

interface QuackBehavior {
    public void quack();
}

class Quack implements QuackBehavior {
    public void quack() {
        System.out.println("Quack");
    }
}

class MuteQuack implements QuackBehavior {
    public void quack() {
        System.out.println("Silence");
    }
}

class Squeak implements QuackBehavior {
    public void quack() {
        System.out.println("Squeak");
    }
}

abstract class Duck {
    FlyBehavior flyBehavior;
    QuackBehavior quackBehavior;

    public Duck() {}

    public void setFlyBehavior(FlyBehavior fb) {
        flyBehavior = fb;
    }

    public void setQuackBehavior(QuackBehavior qb) {
        quackBehavior = qb;
    }

    public abstract void display();

    public void performFly() {
        flyBehavior.fly();
    }

    public void performQuack() {
        quackBehavior.quack();
    }

    public void swim() {
        System.out.println("All ducks float, even decoys!");
    }
}

class MallardDuck extends Duck {
    public MallardDuck() {
        quackBehavior = new Quack();
        flyBehavior = new FlyWithWings();
    }

    public void display() {
        System.out.println("I'm a real Mallard duck");
    }
}

class ModelDuck extends Duck {
    public ModelDuck() {
        flyBehavior = new FlyNoWay();
        quackBehavior = new Quack();
    }

    public void display() {
        System.out.println("I'm a model duck");
    }
}

public class MiniDuckSimulator {
    public static void main(String[] args) {
        Duck mallard = new MallardDuck();
        mallard.performFly();
        mallard.performQuack();
        Duck model = new ModelDuck();
        model.performFly();
        model.setFlyBehavior(new FlyRocketPowered());
        model.performFly();
    }
}