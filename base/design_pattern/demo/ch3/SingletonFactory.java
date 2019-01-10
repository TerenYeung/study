class Singleton {
    private Singleton() {}
    public void doSomething() {}
}

public class SingletonFactory {
    private static Singleton singleton;
    static {
        try {
            Class cl = Class.forName(Singleton.class.getName());
            Constructor constructor = cl.getDeclaredConstructor();
            constructor.setAccessible(true);
            singleton = (Singleton)constructor.newInstance();
        } catch(Exception e) {}
    }

    public static Singleton getSingleton() {
        return singleton;
    }
}