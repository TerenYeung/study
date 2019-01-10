import java.util.*;
/**
 * @description 单例模式-饿汉式单例
 */
/*
class Singleton {
    private static final Singleton singleton = new Singleton();
    private Singleton() {}
    public static Singleton getSingleton() {
        return singleton;
    }
}
*/

/**
 * @description 单例模式-懒汉式单例
 */
/*
class Singleton {
    private static Singleton singleton = null;
    private Singleton() {}
    public static synchronized Singleton getSingleton() {
        if (singleton == null)
            singleton = new Singleton();
        return singleton;
    }
}
*/

/**
 * @description 有上限的多例模式
 */
class Emperor {
    private static int maxNumOfEmperor = 2;
    private static ArrayList<String> nameList = new ArrayList<String>();
    private static ArrayList<Emperor> emperorList = new ArrayList<Emperor>();
    private static int countNumOfEmperor = 0;
    static {
        for (int i = 0; i < maxNumOfEmperor; i++) {
            emperorList.add(new Emperor("皇" + (i+1) + "帝"));
        }
    }
    private Emperor() {}
    private Emperor(String name) {
        nameList.add(name);
    }

    public static Emperor getInstance() {
        Random random = new Random();
        countNumOfEmperor = random.nextInt(maxNumOfEmperor);
        return emperorList.get(countNumOfEmperor);
    }

    public static void say() {
        System.out.println(nameList.get(countNumOfEmperor));
    }
}

public class Singleton {
    public static void main(String[] args) {
        int ministerNum = 5;
        for(int i = 0; i < ministerNum; i++) {
            Emperor emperor = Emperor.getInstance();
            System.out.print("第" + (i+1) + "个大臣参拜的是：");
            emperor.say();
        }
    }
}