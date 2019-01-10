interface Subject {
    public void request();
}

class RealSubject implements Subject {
    public void request() {}
}

class Proxy implements Subject {
    private Subject subject = null;
    // 默认被代理者
    public Proxy() {
        this.subject = new Proxy();
    }
    // 通过构造函数传递代理者
    public Proxy(Object...objects) {}

    public void request() {
        this.before();
        this.subject.request();
        this.after();
    }
    // 预处理
    private void before() {}
    // 后处理
    private void after() {}
}