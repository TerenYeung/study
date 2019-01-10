import java.util.*;

/**
 * @description 枪支抽象类
 */
abstract class AbstractGun {
    public abstract void shoot();
}

/**
 * @description 手枪、步枪和机枪的实现类
 */
class Handun extends AbstractGun {
    @Override
    public void shoot() {
        System.out.println("手枪射击...");
    }
}

class Rifle extends AbstractGun {
    @Override
    public void shoot() {
        System.out.println("步枪射击...");
    }
}

class MachineGun extends AbstractGun {
    @Override
    public void shoot() {
        System.out.println("机枪扫射...");
    }
}



/**
 * @description 枪支的具体型号
 */

class AUG extends Rifle {
    public void zoomOut() {
        System.out.println("通过望远镜看敌人...");
    }

    public void shoot() {
        System.out.println("AUG 射击...");
    }
}



class Snipper extends Soldier {
    private AUG aug;

    public void setRifle(AUG _aug) {
        this.aug = _aug;
    }

    public void killEnemy() {
        aug.zoomOut();
        aug.shoot();
    }
}

interface GunOperation {
    public void setGun(AbstractGun gun);
}

interface SoldierSkills {
    public void killEnemy();
}

/**
 * @description 士兵的实现类
 * 注意：
 * 在类中调用其他类时务必使用父类或接口，如果不使用父类或接口（只有使用了父类的接口，那么才可以使用子类进行替换，因为子类继承了父类的接口，即使发生替换，仍不会报错），则说明类的设计已违背 LSP 原则；
 *
 * 本例中：
 * 在 Soldier 类中的调用 AbstractGun 类时，使用的是具体枪类的父类 Abstract，调用的也是父类的方法 shoot()；
 */
class Soldier implements GunOperation, SoldierSkills {
    private AbstractGun gun;

    public void setGun(AbstractGun _gun) {
        this.gun = _gun;
    }

    public void killEnemy() {
        System.out.println("士兵开始杀敌人...");
        gun.shoot();
    }
}

/**
 * @description 不同的兵种
 */
// class Snipper extends Soldier {
//     private Rifle rifle;

//     public void setGun(Rifle _rifle) {
//         this.rifle = _rifle;
//     }

//     public void killEnemy() {
//         rifle.zoomOut();
//         rifle.shoot();
//     }
// }


// class Father {
//     public Collection doSomething(HashMap map) {
//         System.out.println("父类被执行...");
//         return map.values();
//     }
// }

// class Son extends Father {
//     public Collection doSomething(Map map) {
//         System.out.println("子类被执行...");
//         return map.values();
//     }
// }

/**
 * @description 场景类
 */
public class Client {
    // public static void invoker() {
    //     // Father f = new Father();
    //     // HashMap map = new HashMap();
    //     // f.doSomething(map);
    //     Son f = new Son();
    //     HashMap map = new HashMap();
    //     f.doSomething(map);
    // }

    public static void main(String[] args) {
        Soldier sanMao = new Soldier();
        sanMao.setGun(new Rifle());
        sanMao.killEnemy();

        Snipper spider = new Snipper();
        spider.setRifle(new AUG());
        spider.killEnemy();

        // invoker();
    }
}