interface IDriver {
    public void drive(ICar car);
}

class Driver implements IDriver {
    public void drive(ICar car) {
        car.run();
    }
}

interface ICar {
    public void run();
}

class Benz implements ICar {
    public void run() {
        System.out.println("奔驰车开始运行...");
    }
}

class BMW implements ICar {
    public void run() {
        System.out.println("宝马汽车开始运行...");
    }
}

// public class Client {
//     public static void main(String[] args) {
//         IDriver teren = new Driver();
//         ICar benz = new Benz();
//         teren.drive(benz);
//     }
// }