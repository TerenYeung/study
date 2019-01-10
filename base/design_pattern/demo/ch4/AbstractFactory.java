interface IProduct {}

/**
 * @description 抽象产品类
 * 有两类产品 A 和 B
 */
abstract class AbstractProductA implements IProduct {
    public void shareMethod() {}
    public abstract void doSomething();
}

/**
 * @description 产品 A 的实现类 A1
 */
class ProductA1 extends AbstractProductA {
    public void doSomething() {
        System.out.println("产品 A1 的实现方法...");
    }
}

class ProductA2 extends AbstractProductA {
    public void doSomething() {
        System.out.println("产品 A2 的实现方法...");
    }
}

abstract class AbstractProductB implements IProduct {
    public void shareMethod() {}
    public abstract void doSomething();
}

/**
 * @description 产品 B 的实现类 B1
 */
class ProductB1 extends AbstractProductB {
    public void doSomething() {
        System.out.println("产品 B1 的实现方法...");
    }
}

class ProductB2 extends AbstractProductB {
    public void doSomething() {
        System.out.println("产品 B2 的实现方法...");
    }
}

/**
 * @description 抽象工厂类
 * 具有生产产品 A 和 B 的能力
 */
abstract class AbstractCreator {
    public abstract AbstractProductA createProductA();

    public abstract AbstractProductB createProductB();
}

/**
 * @description 工厂实现类
 * 具有生产特定分类下的特定等级产品
 */
class Creator1 extends AbstractCreator {
    public AbstractProductA createProductA() {
        return new ProductA1();
    }

    public AbstractProductB createProductB() {
        return new ProductB1();
    }
}

class Creator2 extends AbstractCreator {
    public AbstractProductA createProductA() {
        return new ProductA2();
    }

    public AbstractProductB createProductB () {
        return new ProductB2();
    }
}

public class AbstractFactory {
    public static void main(String[] args) {
        AbstractCreator creator1 = new Creator1();
        AbstractCreator creator2 = new Creator2();
        AbstractProductA a1 = creator1.createProductA();
        AbstractProductA a2 = creator2.createProductA();
        a1.doSomething();
        a2.doSomething();
        AbstractProductB b1 = creator1.createProductB();
        AbstractProductB b2 = creator2.createProductB();
        b1.doSomething();
        b2.doSomething();
    }
}