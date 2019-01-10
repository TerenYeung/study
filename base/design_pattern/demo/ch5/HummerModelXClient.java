import java.util.*;
import java.io.*;

abstract class HummerModel {
    protected abstract void start();
    protected abstract void stop();
    protected abstract void alarm();
    protected abstract void engineBoom();
    // 钩子方法，默认喇叭会响
    protected boolean isAlarm() {
        return true;
    }
    final public void run() {
        this.start();
        this.engineBoom();
        if (this.isAlarm())
            this.alarm();
        this.stop();
    }
}

class HummerH1Model extends HummerModel {
    private boolean alarmFlag = true;
    protected void alarm() {
        System.out.println("悍马 H1 鸣笛...");
    }
    protected void engineBoom() {
        System.out.println("悍马 H1 引擎声音是这样的...");
    }
    protected void start() {
        System.out.println("悍马 H1 发动...");
    }
    protected void stop() {
        System.out.println("悍马 H1 停车...");
    }
    protected boolean isAlarm() {
        return this.alarmFlag;
    }
    public void setAlarm(boolean isAlarm) {
        this.alarmFlag = isAlarm;
    }
}

class HummerH2Model extends HummerModel {
    protected void alarm() {
        System.out.println("悍马 H2 鸣笛...");
    }
    protected void engineBoom() {
        System.out.println("悍马 H2 引擎声音是这样的...");
    }
    protected void start() {
        System.out.println("悍马 H2 发动...");
    }
    protected void stop() {
        System.out.println("悍马 H2 停车...");
    }

    protected boolean isAlarm() {
        return false;
    }
}

public class HummerModelXClient {
    public static void main(String[] args) throws IOException {
        System.out.println("---H1 型号悍马---");

        HummerH1Model h1 = new HummerH1Model();
        h1.setAlarm(false);
        h1.run();
        System.out.println("\n--- H2 型号悍马 ---");
        HummerH2Model h2 = new HummerH2Model();
        h2.run();
    }
}