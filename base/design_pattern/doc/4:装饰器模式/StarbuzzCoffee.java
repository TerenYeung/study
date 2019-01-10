/*
* @description 抽象组件类
* */
abstract class Beverage {
    protected String size;
    protected String description = "Unknown Bverage";

    public String getDescription() {
        return description;
    }

    public abstract double cost();
    
    public String getSize() {
        return size;
    }
    
    public abstract void setSize(String size);
}

/*
* @description 抽象装饰类
* */
abstract class CondimentDecorator extends Beverage {
    public abstract String getDescription();
}

/*
* @description 具体饮料类
* */
class Espresso extends Beverage {
    public Espresso() {
        description = "Espresso";
    }

    public double cost() {
        return 1.99;
    }
}

class HouseBlend extends Beverage {
    public HouseBlend() {
        description = "House Blend Coffee";
    }

    public double cost() {
        return .89;
    }
}

/*
* @description 具体装饰类
* */
class Mocha extends CondimentDecorator {
    Beverage beverage;

    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }

    public String getDescription() {
        return beverage.getDescription() + ", Mocha";
    }

    public double cost() {
        return beverage.cost() + .20;
    }
}

public class StarbuzzCoffee {
    public static void main(String[] args) {
        Beverage espresso = new Espresso();
        System.out.println(espresso.getDescription() + " $" + espresso.cost());
        espresso = new Mocha(espresso);
        System.out.println(espresso.getDescription() + " $" + espresso.cost());

        Beverage houseBlend = new HouseBlend();
        houseBlend = new Mocha(houseBlend);
        System.out.println(houseBlend.getDescription() + " $" + houseBlend.cost());
    }
}