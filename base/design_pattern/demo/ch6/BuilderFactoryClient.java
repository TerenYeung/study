import java.util.*;
/**
 * @description 车辆模型的抽象类
 */
abstract class CarModel {
    // 各个基本方法的执行序
    private ArrayList<String> sequence = new ArrayList<String>();
    protected abstract void start();
    protected abstract void stop();
    protected abstract void alarm();
    protected abstract void engineBoom();
    final public void run() {
        for (int i=0; i < this.sequence.size(); i++) {
            String actionName = this.sequence.get(i);
            if (actionName.equalsIgnoreCase("start")) {
                this.start();
            } else if (actionName.equalsIgnoreCase("stop")) {
                this.stop();
            } else if (actionName.equalsIgnoreCase("alarm")) {
                this.alarm();
            } else if (actionName.equalsIgnoreCase("engine boom")) {
                this.engineBoom();
            }
        }
    }
    final public void setSequence(ArrayList sequence) {
        this.sequence = sequence;
    }
}

/**
 * @description 奔驰模型实现类
 */
class BenzModel extends CarModel {
    protected void start() {
        System.out.println("Benz start...");
    }
    protected void stop() {
        System.out.println("Benz stop...");
    }
    protected void engineBoom() {
        System.out.println("Benz engine boom...");
    }
    protected void alarm() {
        System.out.println("Benz alarm...");
    }
}

/**
 * @description 宝马模型实现类
 */
class BMWModel extends CarModel {
    protected void start() {
        System.out.println("BMW start...");
    }
    protected void stop() {
        System.out.println("BMW stop...");
    }
    protected void engineBoom() {
        System.out.println("BMW engine boom...");
    }
    protected void alarm() {
        System.out.println("BMW alarm...");
    }
}

/**
 * @description 汽车组装者抽象类
 */
abstract class CarBuilder {
    public abstract void setSequence(ArrayList<String> sequence);
    public abstract CarModel getCarModel();
}

/**
 * @description 奔驰车组装者实现类
 */
class BenzBuilder extends CarBuilder {
    private BenzModel benz = new BenzModel();
    public CarModel getCarModel() {
        return this.benz;
    }
    public void setSequence(ArrayList<String> sequence) {
        this.benz.setSequence(sequence);
    }
}

/**
 * @description 宝马车组装者实现类
 */
class BMWBuilder extends CarBuilder {
    private BMWModel bmw = new BMWModel();
    public CarModel getCarModel() {
        return this.bmw;
    }
    public void setSequence(ArrayList<String> sequence) {
        this.bmw.setSequence(sequence);
    }
}

/**
 * @description 导演类
 * 用于发号施令，向具体的汽车组装类发出建造特定型号汽车的命令
 */
class Director {
    private ArrayList<String> sequence = new ArrayList();
    private CarBuilder benzBuilder = new BenzBuilder();
    private CarBuilder bmwBuilder = new BMWBuilder();
    // A 型奔驰车
    public CarModel getABenzModel() {
        this.sequence.clear();
        this.sequence.add("start");
        this.sequence.add("stop");
        this.benzBuilder.setSequence(this.sequence);
        return (BenzModel)this.benzBuilder.getCarModel();
    }
    // B 型奔驰车
    public CarModel getBBenzModel() {
        this.sequence.clear();
        this.sequence.add("engine boom");
        this.sequence.add("start");
        this.sequence.add("stop");
        this.benzBuilder.setSequence(this.sequence);
        return (BenzModel)this.benzBuilder.getCarModel();
    }
    // C 型宝马车
    public CarModel getCBMWModel() {
        this.sequence.clear();
        this.sequence.add("alarm");
        this.sequence.add("start");
        this.sequence.add("stop");
        this.bmwBuilder.setSequence(this.sequence);
        return (BMWModel)this.bmwBuilder.getCarModel();
    }
    // D 型宝马车
    public CarModel getDBMWModel() {
        this.sequence.clear();
        this.sequence.add("start");
        this.bmwBuilder.setSequence(this.sequence);
        return (BMWModel)this.bmwBuilder.getCarModel();
    }
}

public class BuilderFactoryClient {
    public static void main(String[] args) {
        Director director = new Director();
        CarModel benzA = director.getABenzModel();
        benzA.run();
        CarModel benzB = director.getBBenzModel();
        benzB.run();
        CarModel bmwC = director.getCBMWModel();
        bmwC.run();
        CarModel bmwD = director.getDBMWModel();
        bmwD.run();
    }
}