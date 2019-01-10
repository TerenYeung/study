abstract class HummerModel {
    protected abstract start(): void;
    protected abstract stop(): void;
    protected abstract alarm(): void;
    protected abstract engineBoom(): void;
    public run(): void {
        this.start();
        this.engineBoom();
        this.alarm();
        this.stop();
    }
}

class HummerH1Model extends HummerModel {
    protected start(): void {
        console.log("悍马 H1 启动...");
    }

    protected stop():void {
        console.log("悍马 H1 停车...");
    }

    protected alarm():void {
        console.log("悍马 H1 鸣笛...");
    }

    protected engineBoom():void {
        console.log("悍马 H1 引擎轰轰...");
    }
}

class HummerH2Model extends HummerModel {
    protected start(): void {
        console.log("悍马 H2 启动...");
    }

    protected stop():void {
        console.log("悍马 H2 停车...");
    }

    protected alarm():void {
        console.log("悍马 H2 鸣笛...");
    }

    protected engineBoom():void {
        console.log("悍马 H2 引擎轰轰...");
    }
}

class HummerModelClient {
    public static start():void {
        let h1:HummerModel = new HummerH1Model();
        h1.run();
        let h2:HummerModel = new HummerH2Model();
        h2.run();
    }
}

HummerModelClient.start();