import java.util.*;
/*
* v1
* @description 根据客户下的订单制作不同类型的 pizza
* 这种创建对象的方式依赖于具体类，随着不同种类的披萨增加，需要侵入代码内部去修改，破坏了开闭原则；
* */
/*abstract class Pizza {
    protected void prepare() {
        System.out.println("准备调料");
    }
    
    protected void bake() {
        System.out.println("开始烘烤");
    }
    
    protected void cut() {
        System.out.println("披萨切片");
    }
    
    protected void box() {
        System.out.println("包装打包");
    }
}
class CheesePizza extends Pizza {}
class ClamPizza extends Pizza {}

class PizzaStore {
    public PizzaStore() {}
    public Pizza orderPizza(String type) {
        Pizza pizza = null;
        if (type.equals("cheese")) {
            pizza = new CheesePizza();
        } else if (type.equals("clam")) {
            pizza = new ClamPizza();
        }

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
        return pizza;
    }
}*/



/*
* @description 简单工厂方法模式
* 将上述依赖于具体披萨类的创建对象过程封装成单独的工厂方法类，客户不需要知道具体有哪些披萨具体类，只需要通过调用简单工厂方法（参数化工厂方法）去创建具体披萨对象
* */
/*
class SimplePizzaFactory {
    public Pizza createPizza(String type) {
        Pizza pizza = null;
        if (type.equals("cheese")) {
            pizza = new CheesePizza();
        } else if (type.equals("clam")) {
            pizza = new ClamPizza();
        }

        return pizza;
    }
}

class PizzaStore {
    SimplePizzaFactory factory;

    public PizzaStore(SimplePizzaFactory factory) {
        this.factory = factory;
    }

    public Pizza orderPizza(String type) {
        Pizza pizza = factory.createPizza(type);
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;
    }
}*/

/*
* @description 工厂方法模式
* 定义一个抽象的创建者类和抽象的产品类
* 具体的创建者将针对具体的产品类进行创建对象
*
* 假设现在有按区域划分的两个披萨店，每个披萨店会生成满足区域口味的披萨
* */
/*
// 抽象创建者
abstract class PizzaStore {
    Pizza pizza;

    public Pizza orderPizza(String type) {
        Pizza pizza;
        pizza = createPizza(type);
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;
    }

    abstract Pizza createPizza(String type);
}

// 具体创建者 1
class NYPizzaStore extends PizzaStore {
    Pizza createPizza(String type) {
        if (type.equals("cheese")) {
            return new NYStyleCheesePizza();
        } else if (type.equals("clam")) {
            return new NYStyleClamPizza();
        } else {
            return null;
        }
    }
}

// 具体创建者 2
//class ChicagoStore extends PizzaStore {}

// 抽象产品类
abstract class Pizza {
    String name;
    String dough;
    String sauce;
    ArrayList toppings = new ArrayList();

    void prepare() {
        System.out.println("Preparing" + name);
        System.out.println("Tossing dough...");
        System.out.println("Adding sauce...");
        System.out.println("Adding toppings");
        for (int i = 0; i < toppings.size(); i++) {
            System.out.println(" " + toppings.get(i));
        }
    }

    void bake() {
        System.out.println("Bake for 25 minutes at 350");
    }

    void cut() {
        System.out.println("Cutting the pizza into diagonal slices");
    }

    void box() {
        System.out.println("Place pizza in official PizzaStore box");
    }

    public String getName() {
        return name;
    }
}

// 具体产品类
class NYStyleCheesePizza extends Pizza {
    public NYStyleCheesePizza() {
        name = "NY Style sauce and Cheese Pizza";
        dough = "Thin Crust Dough";
        sauce = "Marinara Sauce";

        toppings.add("Grated Reggiano Cheese");
    }
}

class NYStyleClamPizza extends Pizza {
    public NYStyleClamPizza() {
        name = "NY Style sauce and clam Pizza";
        dough = "Thin Crust Dough";
        sauce = "Marinara Sauce";

        toppings.add("Grated Reggiano Clam");
    }
}
*/

/*
* @description 抽象工厂方法模式
* 抽象工厂方法模式相当于工厂方法模式的增强版，在工厂方法接口时，创建对象的工厂方法针对于不同的产品有多个
*
* 假设现在仍然有按区域划分的两个披萨店，不同披萨店按区域口味生成不同区域风格的披萨，而不同区域风格的披萨所应用到的原料不同
* */

// 原料工厂接口
interface PizzaIngredientFactory {
    public Dough createDough();
    public Sauce createSauce();
    public Cheese createCheese();
}

// 原料具体工厂了
class NYPizzaIngredientFactory implements PizzaIngredientFactory {
    public Dough createDough() {
        return new ThickCrusDough();
    }
    public Sauce createSauce() {
        return new SweetSauce();
    }
    public Cheese createCheese() {
        return new PrueCheese();
    }
}

class ChicagoPizzaIngredientFactory implements PizzaIngredientFactory {
    public Dough createDough() {
        return new ThinCrusDough();
    }
    public Sauce createSauce() {
        return new AcidSauce();
    }
    public Cheese createCheese() {
        return new YoghurtCheese();
    }
}

// 原料接口
interface Dough {}
interface Sauce {}
interface Cheese {}

// 原料具体类
class ThickCrusDough implements Dough {}
class ThinCrusDough implements Dough {}

class SweetSauce implements Sauce {}
class AcidSauce implements Sauce {}

class YoghurtCheese implements Cheese {}
class PrueCheese implements Cheese {}

abstract class PizzaStore {
    public Pizza orderPizza(String type) {
        Pizza pizza = createPizza(type);
        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();
        
        return pizza;
    }
    
    protected abstract Pizza createPizza(String type);
}

class NYPizzaStore extends PizzaStore {
    
    protected Pizza createPizza(String type) {
        Pizza pizza = null;
        // 对于预期短期内不会发生改变的业务，可以直接在内部进行依赖注入
        PizzaIngredientFactory ingredientFactory = new NYPizzaIngredientFactory();
        
        if (type.equals("cheese")) {
            pizza = new CheesePizza(ingredientFactory);
        } else if (type.equals("clam")) {
            pizza = new ClamPizza(ingredientFactory);
        }
        
        return pizza;
    }
}

abstract class Pizza {
    String name;
    Dough dough;
    Sauce sauce;
    Cheese cheese;
    
    abstract void prepare();
    
    void bake() {
        System.out.println("Bake for 25 minutes at 350");
    }

    void cut() {
        System.out.println("Cutting the pizza into diagonal slices");
    }

    void box() {
        System.out.println("Place pizza in official PizzaStore box");
    }
}

class CheesePizza extends Pizza {
    PizzaIngredientFactory ingredientFactory;

    public CheesePizza(PizzaIngredientFactory ingredientFactory) {
        this.ingredientFactory = ingredientFactory;
    }

    void prepare() {
        System.out.println("Preparing Cheese");

        dough = ingredientFactory.createDough();
        sauce = ingredientFactory.createSauce();
        cheese = ingredientFactory.createCheese();
    }
}

class ClamPizza extends Pizza {
    PizzaIngredientFactory ingredientFactory;

    public ClamPizza(PizzaIngredientFactory ingredientFactory) {
        this.ingredientFactory = ingredientFactory;
    }

    void prepare() {
        System.out.println("Preparing Cheese Clam");

        dough = ingredientFactory.createDough();
        sauce = ingredientFactory.createSauce();
        cheese = ingredientFactory.createCheese();
    }
}

public class PizzaClient {
    public static void main(String[] args) {
        // 简单工厂方法
        /*SimplePizzaFactory factory = new SimplePizzaFactory();
        Pizza cheesePizza = new PizzaStore(factory).orderPizza("cheese");*/

        // 工厂方法模式
        /*
        NYPizzaStore nyPizzaStore = new NYPizzaStore();
        Pizza nyStyleCheesePizza = nyPizzaStore.orderPizza("cheese");*/
        NYPizzaStore nyPizzaStore = new NYPizzaStore();
        nyPizzaStore.orderPizza("cheese");
        nyPizzaStore.orderPizza("clam");
    }
}