/**
 * @description 抽象享元角色
 * 一个产品的抽象类，同时定义出对象的外部状态和内部状态的接口或实现
 */
abstract class Flyweight {
    // 内部状态
    private String intrinsic;
    // 外部状态
    protected final String extrinsic;
    // 要求享元角色必须接受外部状态
    public Flyweight(String _extrinsic) {
        this.extrinsic = _extrinsic
    }
    public abstract void operate();
    public String getIntrinsic() {
        return intrinsic;
    }
    public void setIntrinsic(String intrinsic) {
        this.intrinsic = intrinsic;
    }
}
/**
 * @description 具体享元角色
 * 具体的一个产品类，实现抽象角色定义的业务
 */
class ConcreteFlyweight1 extends Flyweight {
    public ConcreteFlyweight1(String _extrinsic) {
        super(_extrinsic);
    }
    public void operate() {}
}

class ConcreteFlyweight2 extends Flyweight {
    public ConcreteFlyweight2(String _extrinsic) {
        super(_extrinsic);
    }
    public void operate() {}
}

/**
 * @description 享元工厂
 * 构造一个池容器，从池中获得对象的方法
 */
class FlyweightFactory {
    private static HashMap<String, Flyweight> pool = new HashMap<String, Flyweight>();
    public static Flyweight getFlyweight(String extrinsic) {
        Flyweight flyweight = null;
        if (pool.containsKey(extrinsic)) {
            flyweight = pool.get(extrinsic);
        } else {
            flyweight = new ConcreteFlyweight1(extrinsic);
            pool.put(extrinsic, flyweight);
        }
        return flyweight;
    }
}