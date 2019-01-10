import java.util.*;
// import java.lang.reflect.*;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

interface Sell {
    public void sell();
    public void ad();
}

class Vendor implements Sell {
    public void sell() {
        System.out.println("sell...");
    }

    public void ad() {
        System.out.println("ad...");
    }
}

/**
 * @description 中介类
 * 中介类必须实现 InvocationHandler 接口，作为调用处理器拦截对代理类的方法的调用
 */
class DynamicProxy implements InvocationHandler {
    // sell 为委托类对象
    private Object obj = null;
    public DynamicProxy(Object obj) {
        this.obj = obj;
    }
    // invoke 方法将调用委托类的相关方法，并定义相关预处理和后处理逻辑
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("before...");
        Object result = method.invoke(this.obj, args);
        return result;
    }
}
/**
 * @description
 * 1. 通过 Proxy.newProxyInstance 方法获取代理类的实例
 * 2. 通过代理类实例调用代理类方法
 * 3. 对代理类方法的调用实例调用中介类（调用处理器）的 invoke 方法
 * 4. 中介类的 invoke 方法调用委托类的相应方法，并添加中介类的处理逻辑
 */
public class DynamicProxyClient {
    public static void main(String[] args) {
        Sell vendor = new Vendor();
        InvocationHandler handler = new DynamicProxy(vendor);
        System.getProperties().put("sun.misc.ProxyGenerator.saveGeneratedFiles","true");

        ClassLoader cl = vendor.getClass().getClassLoader();
        Sell proxy = (Sell)(Proxy.newProxyInstance(cl, new Class[]{Sell.class}, handler));
        proxy.sell();
        proxy.ad();
    }
}