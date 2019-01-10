/**
 * @description 抽象产品类
 */
abstract class Product {
    public abstract void beProducted();
    public abstract void beSelled();
}

/**
 * @description 产品实现类：House
 */
class House extends Product {
    public void beProducted() {
        System.out.println("生产的房子是这样的...");
    }
    public void beSelled() {
        System.out.println("生产的房子卖出去了...");
    }
}

/**
 * @description 产品实现类：IPod
 */
class IPod extends Product {
    public void beProducted() {
        System.out.println("生产的 iPod 是这样的...");
    }
    public void beSelled() {
        System.out.println("生产的 iPod 卖出去了...");
    }
}

/**
 * @description 抽象公司类
 */
abstract class Corp {
    private Product product;
    public Corp(Product product) {
        this.product = product;
    }
    public void makeMoney() {
        this.product.beProducted();
        this.product.beSelled();
    }
}

/**
 * @description 公司实现类：HouseCorp
 */
class HouseCorp extends Corp {
    public HouseCorp(House house) {
        super(house);
    }
    public void makeMoney() {
        super.makeMoney();
        System.out.println("房地产公司赚大钱了...");
    }
}

class ShanZhaiCorp extends Corp {
    public ShanZhaiCorp(Product product) {
        super(product);
    }
    public void makeMoney() {
        super.makeMoney();
        System.out.println("我赚钱啦...");
    }
}

public class ProductClient {
    public static void main(String[] args) {
        House house = new House();
        HouseCorp houseCorp = new HouseCorp(house);
        houseCorp.makeMoney();
        ShanZhaiCorp shanZhaiCorp = new ShanZhaiCorp(new IPod());
        shanZhaiCorp.makeMoney();
    }
}