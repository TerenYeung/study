// abstract class HummerModel {
//     protected abstract void start();
//     protected abstract void stop();
//     protected abstract void alarm();
//     protected abstract void engineBoom();
//     final public void run() {
//         this.start();
//         this.engineBoom();
//         this.alarm();
//         this.stop();
//     }
// }

// class HummerH1Model extends HummerModel {
//     protected void start() {
//         System.out.println("悍马 H1 启动...");
//     }

//     protected void stop() {
//         System.out.println("悍马 H1 停车...");
//     }

//     protected void alarm() {
//         System.out.println("悍马 H1 鸣笛...");
//     }

//     protected void engineBoom() {
//         System.out.println("悍马 H1 引擎轰轰...");
//     }
// }

// class HummerH2Model extends HummerModel {
//     protected void start() {
//         System.out.println("悍马 H2 启动...");
//     }

//     protected void stop() {
//         System.out.println("悍马 H2 停车...");
//     }

//     protected void alarm() {
//         System.out.println("悍马 H2 鸣笛...");
//     }

//     protected void engineBoom() {
//         System.out.println("悍马 H2 引擎轰轰...");
//     }
// }

// public class HummerModelClient {
//     public static void main(String[] args) {
//         HummerModel h1 = new HummerH1Model();
//         h1.run();

//         HummerModel h2 = new HummerH2Model();
//         h2.run();
//     }
// }