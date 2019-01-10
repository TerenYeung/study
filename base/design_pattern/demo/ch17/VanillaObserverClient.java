// import java.util.ArrayList;

// interface Observable {
//     public void addObserver(Observer observer);
//     public void deleteObserver(Observer observer);
//     public void notifyObservers(String context);
// }

// interface IHanFeiZi {
//     public void haveBreakfast();
//     public void haveFun();
// }

// class HanFeiZi implements Observable, IHanFeiZi {
//     private ArrayList<Observer> observerList = new ArrayList<Observer>();
//     public void addObserver(Observer observer) {
//         this.observerList.add(observer);
//     }
//     public void deleteObserver(Observer observer) {
//         this.observerList.remove(observer);
//     }
//     public void notifyObservers(String context) {
//         for (Observer observer:observerList) {
//             observer.update(context);
//         }
//     }
//     public void haveBreakfast() {
//         System.out.println("韩非子：开始吃饭...");
//         this.notifyObservers("韩非子开始吃饭");
//     }
//     public void haveFun() {
//         System.out.println("韩非子：开始娱乐了...");
//         this.notifyObservers("韩非子开始娱乐");
//     }
// }

// interface Observer {
//     public void update(String context);
// }

// class LiSi implements Observer {
//     public void update(String context) {
//         System.out.println("李斯：观察到韩非子活动，开始向老板汇报了...");
//         this.reportToQinShiHuang(context);
//         System.out.println("李斯：汇报完毕...\n");
//     }
//     private void reportToQinShiHuang(String context) {
//         System.out.println("李斯：报告，秦老板！韩非子有活动了-->" + context);
//     }
// }

// class WangSi implements Observer {
//     public void update(String context) {
//         System.out.println("王思：观察到韩非子活动，自己也开始活动了...");
//         this.cry(context);
//         System.out.println("王思：哭死了...\n");
//     }
//     private void cry(String context) {
//         System.out.println("王思：因为" + context + "，所以我悲伤~");
//     }
// }

// public class VanillaObserverClient {
//     public static void main(String[] args) {
//         Observer liSi = new LiSi();
//         Observer wangSi = new WangSi();
//         HanFeiZi hanFeiZi = new HanFeiZi();
//         hanFeiZi.addObserver(liSi);
//         hanFeiZi.addObserver(wangSi);
//         hanFeiZi.haveBreakfast();
//         hanFeiZi.haveFun();
//     }
// }