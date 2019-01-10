import java.util.ArrayList;
import java.util.Random;

abstract class Handler {
    public final static int FATHER_LEVEL_REQUEST = 1;
    public final static int HUSBAND_LEVEL_REQUEST = 2;
    public final static int SON_LEVEL_REQUEST = 3;

    private int level = 0;
    // 责任传递，下一个责任人是谁
    private Handler nextHandler;// 每个类说明一下自己能处理那些请求
    public Handler(int _level) {
        this.level = _level;
    }
    public final void handleMessage(IWomen women) {
        if (women.getType() == this.level) {
            this.response(women);
        } else {
            if (this.nextHandler != null) {
                this.nextHandler.handleMessage(women);
            } else {
                System.out.println("--没有地方可请示，按照不同意处理--\n");
            }
        }
    }
    public void setNext(Handler _handler) {
        this.nextHandler = _handler;
    }
    protected abstract void response(IWomen women);
}

class Father extends Handler {
    public Father() {
        super(Handler.FATHER_LEVEL_REQUEST);
    }
    protected void response(IWomen women) {
        System.out.println("---女儿向父亲请示---");
        System.out.println(women.getRequest());
        System.out.println("---父亲的答复是：同意\n---");
    }
}

class Husband extends Handler {
    public Husband() {
        super(Handler.HUSBAND_LEVEL_REQUEST);
    }
    protected void response(IWomen women) {
        System.out.println("---妻子向父亲请示---");
        System.out.println(women.getRequest());
        System.out.println("---丈夫的答复是：同意\n---");
    }
}

class Son extends Handler {
    public Son() {
        super(Handler.SON_LEVEL_REQUEST);
    }
    protected void response(IWomen women) {
        System.out.println("---母亲向儿子请示---");
        System.out.println(women.getRequest());
        System.out.println("---儿子的答复是：同意\n---");
    }
}

interface IWomen {
    public int getType();
    public String getRequest();
}

class Women implements IWomen {
    /**
     * type 描述妇女个人状况
     * 1--未出嫁
     * 2--出嫁
     * 3--夫死
     */
    private int type = 0;
    private String request = "";
    public Women(int _type, String _request) {
        this.type = _type;
        switch (this.type) {
            case 1:
                this.request = "女儿的请求是：" + _request;
                break;
            case 2:
                this.request = "妻子的请求是：" + _request;
                break;
            case 3:
                this.request = "母亲的请求是：" + _request;
                break;
            default:
                break;
        }
    }
    public int getType() {
        return this.type;
    }
    public String getRequest() {
        return this.request;
    }
}

public class ChainOfResponsibilityClient {
    public static void main(String[] args) {
        Random rand = new Random();
        ArrayList<IWomen> arrayList = new ArrayList();
        for (int i = 0; i<5; i++) {
            arrayList.add(new Women(rand.nextInt(4), "我要去逛街"));
        }
        // 先设置好责任链
        Handler father = new Father();
        Handler husband = new Husband();
        Handler son = new Son();
        father.setNext(husband);
        husband.setNext(son);
        // 然后从最先责任人开始传递目标对象的请求
        // 遍历整个责任链直至找到对应责任人为止；
        for (IWomen women:arrayList) {
            father.handleMessage(women);
        }
    }
}