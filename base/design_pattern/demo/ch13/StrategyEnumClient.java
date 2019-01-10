import java.lang.*;

/**
 * @description 策略枚举
 */
enum Strategy {
    BackDoor() {
        public void operate() {
            System.out.println("找乔国老帮忙，让吴国太给孙权施加压力");
        }
    },
    GivenGreenLight() {
        public void operate() {
            System.out.println("求吴国太开绿灯，放行！");
        }
    },
    BlockEnemy() {
        public void operate() {
            System.out.println("孙夫人断后，挡住追兵");
        }
    };
    public abstract void operate();
}

public class StrategyEnumClient {
    public static void main(String[] args) {
        System.out.println("--刚刚到吴国的时候拆第一个--");
        Strategy.BackDoor.operate();
        System.out.println("\n\n\n");
        System.out.println("--刘备乐不思蜀，拆开第二个--");
        Strategy.GivenGreenLight.operate();
        System.out.println("\n\n\n");
        System.out.println("--孙权追兵来了，咋办？拆第三个--");
        Strategy.BlockEnemy.operate();
    }
}