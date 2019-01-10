import java.lang.*;
import java.util.*;

abstract class AbstractMediator {
    protected Purchase purchase;
    protected Sale sale;
    protected Stock stock;
    public AbstractMediator() {
        purchase = new Purchase(this);
        sale = new Sale(this);
        stock = new Stock(this);
    }
    // 处理多个对象间的事务
    public abstract void execute(String str, Object...objects);
}

class Mediator extends AbstractMediator {
    public void execute(String str, Object...objects) {
        if(str.equals("purchase.buy")) {
            // 采购部门采购电脑
            this.buyComputer((Integer)objects[0]);
        } else if(str.equals("sale.sell")) {
            // 销售部门销售电脑
            this.sellComputer((Integer)objects[0]);
        } else if(str.equals("sale.offsell")) {
            this.offSell();
        } else if(str.equals("stock.clear")) {
            this.clearStock();
        }
    }
    private void buyComputer(int number) {
        int saleStatus = super.sale.getSaleStatus();
        if (saleStatus > 80) {
            System.out.println("采购 IBM 电脑：" + number + "台");
            super.stock.increase(number);
        } else {
            // 折半采购
            int buyNumber = number / 2;
            System.out.println("采购 IBM 电脑：" + buyNumber + "台");
            super.stock.increase(buyNumber);
        }
    }
    private void sellComputer(int number) {
        if (super.stock.getStockNumber() < number) {
            super.purchase.buyComputer(number);
        }
        super.stock.decrease(number);
    }
    private void offSell() {
        System.out.println("折价销售 IBM 电脑" + super.stock.getStockNumber() + "台");
    }
    private void clearStock() {
        super.sale.offSell();
        super.purchase.refuseBuyComputer();
    }
}

abstract class AbstractColleague {
    protected AbstractMediator mediator;
    public AbstractColleague(AbstractMediator _mediator) {
        this.mediator = _mediator;
    }
}

class Purchase extends AbstractColleague {
    public Purchase(AbstractMediator _mediator) {
        super(_mediator);
    }
    public void buyComputer(int number) {
        super.mediator.execute("purchase.buy", number);
    }
    public void refuseBuyComputer() {
        System.out.println("不再采购 IBM 电脑");
    }
}

class Stock extends AbstractColleague {
    public Stock(AbstractMediator _mediator) {
        super(_mediator);
    }
    private static int COMPUTER_NUMBER = 100;
    public void increase(int number) {
        COMPUTER_NUMBER += number;
        System.out.println("库存数量为：" + COMPUTER_NUMBER);
    }
    public void decrease(int number) {
        COMPUTER_NUMBER -= number;
        System.out.println("库存数量为：" + COMPUTER_NUMBER);
    }
    public int getStockNumber() {
        return COMPUTER_NUMBER;
    }
    public void clearStock() {
        super.mediator.execute("stock.clear");
        System.out.println("清理库存数量为：" + COMPUTER_NUMBER);
    }
}

class Sale extends AbstractColleague {
    public Sale(AbstractMediator _mediator) {
        super(_mediator);
    }
    public void sellComputer(int number) {
        super.mediator.execute("sale.sell", number);
    }
    public int getSaleStatus() {
        Random rand = new Random(System.currentTimeMillis());
        int saleStatus = rand.nextInt(100);
        System.out.println("IBM 电脑销售状况为：" + saleStatus);
        return saleStatus;
    }
    public void offSell() {
        super.mediator.execute("sale.offsell");
    }
}

public class MediatorClient {
    public static void main(String[] args) {
        AbstractMediator mediator = new Mediator();
        Purchase purchase = new Purchase(mediator);
        purchase.buyComputer(100);
        Sale sale = new Sale(mediator);
        sale.sellComputer(1);
        Stock stock = new Stock(mediator);
        stock.clearStock();
    }
}