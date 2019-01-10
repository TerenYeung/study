import java.util.Observable;
import java.util.Observer;

interface IHanFeiZi {
    public void haveBreakfast();
    public void haveFun();
}

class HanFeiZi extends Observable implements IHanFeiZi {
    public void haveBreakfast() {
        System.out.println("韩非子：开始吃饭了...");
        // 通知所有的观察者
        super.setChanged();
        super.notifyObservers("韩非子在吃饭...");
    }
    public void haveFun() {
        System.out.println("韩非子：开始娱乐了...");
        super.setChanged();
        super.notifyObservers("韩非子在娱乐...");
    }
}

class LiSi implements Observer {
    public void update(Observable observable, Object data) {
        System.out.println("李斯：观察到韩非子在活动，开始向老板汇报了...");
        this.reportToQinShiHuang(data.toString());
        System.out.println("李斯：汇报完毕...");
    }
    private void reportToQinShiHuang(String context) {
        System.out.println("李斯：报告，秦老板！韩非子有活动了--->" + context);
    }
}

public class ObserverClient {
    public static void main(String[] args) {
        LiSi liSi = new LiSi();
        HanFeiZi hanFeiZi = new HanFeiZi();

        hanFeiZi.addObserver(liSi);
        hanFeiZi.haveBreakfast();
        hanFeiZi.haveFun();
    }
}