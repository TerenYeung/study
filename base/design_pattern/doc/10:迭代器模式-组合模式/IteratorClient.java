import java.util.ArrayList;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.*;


/*
* @description
* 对于采用不同数据结构的存储菜单项的菜单，需要为各种异构菜单实现统一的 iterator 接口，以供服务员去遍历菜单项
* */
// 菜单提供一个统一的创建 iterator 的接口
interface Menu {
    public Iterator createIterator();
}


// 菜单项
class MenuItem {
    String name;
    String description;
    boolean vegetarian;
    double price;

    public MenuItem(
            String name,
            String description,
            boolean vegetarian,
            double price
    ) {
        this.name = name;
        this.description = description;
        this.vegetarian = vegetarian;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public boolean isVegetarian() {
        return vegetarian;
    }

    public double getPrice() {
        return price;
    }
}

class DinnerMenuIterator implements Iterator {
    MenuItem[] list;
    int position = 0;

    public DinnerMenuIterator(MenuItem[] list) {
        this.list = list;
    }

    public Object next() {
        MenuItem menuItem = list[position];
        position = position + 1;
        return menuItem;
    }

    public boolean hasNext() {
        if (position >= list.length || list[position] == null) {
            return false;
        } else {
            return true;
        }
    }

    public void remove() {
        throw new UnsupportedOperationException();
    }
}

// 煎饼屋菜单
class PancakeHouseMenu implements Menu {
    ArrayList menuItems;

    public PancakeHouseMenu() {
        menuItems = new ArrayList();

        addItem("A", "Good", true, 2.99);
        addItem("B", "Normal", true, 2.23);
        addItem("C", "Bad", false, 3.22);
        addItem("D", "Good", true, 1.95);
    }

    public void addItem(
            String name,
            String description,
            boolean isVegetarian,
            double price
    ) {
        MenuItem menuItem = new MenuItem(name, description, isVegetarian, price);
        menuItems.add(menuItem);
    }

    public Iterator createIterator() {
        return menuItems.iterator();
    }
}

class DinnerMenu implements Menu {
    static final int MAX_ITEMS = 6;
    int numberOfItems = 0;
    MenuItem[] menuItems;

    public DinnerMenu() {
        menuItems = new MenuItem[MAX_ITEMS];

        addItem("E", "Well", false, 7.12);
        addItem("F", "Medium", true, 2.22);
        addItem("G", "Vamos", true, 5.56);
        addItem("H", "Excellent", false, 9.12);
    }

    public void addItem(
            String name,
            String description,
            boolean isVegetarian,
            double price
    ) {
        MenuItem menuItem = new MenuItem(name, description, isVegetarian, price);
        if (numberOfItems >= MAX_ITEMS) {
            System.err.println("Soory, menu is full! Can't add item to menu!");
        } else {
            menuItems[numberOfItems] = menuItem;
            numberOfItems = numberOfItems + 1;
        }
    }

    public Iterator createIterator() {
        return new DinnerMenuIterator(menuItems);
    }
}

// 新添加的晚餐的菜单
class CafeMenu implements Menu {
    Hashtable menuItems = new Hashtable();

    public CafeMenu() {
        addItem("I", "Good", false, 8.32);
        addItem("J", "Bad", false, 2.22);
        addItem("K", "Slient", true, 5.32);
        addItem("L", "Sweet", false, 9.31);
    }

    public void addItem(
            String name,
            String description,
            boolean isVegetarian,
            double price
    ) {
        MenuItem menuItem = new MenuItem(name, description, isVegetarian, price);
        menuItems.put(menuItem.getName(), menuItem);
    }

    public Iterator createIterator() {
        return menuItems.values().iterator();
    }
}

class Waitress {
     Menu pancakeHouseMenu;
     Menu dinnerMenu;
     Menu cafeMenu;

    public Waitress(Menu pancakeHouseMenu, Menu dinnerMenu, Menu cafeMenu) {
        this.pancakeHouseMenu = pancakeHouseMenu;
        this.dinnerMenu = dinnerMenu;
        this.cafeMenu = cafeMenu;
    }

    public void printMenu() {
        Iterator pancakeIterator = pancakeHouseMenu.createIterator();
        Iterator dinnerIterator = dinnerMenu.createIterator();
        Iterator cafeMenuIterator = cafeMenu.createIterator();
        System.out.println("Menu:Breakfast");
        printMenu(pancakeIterator);
        System.out.println("Menu:Lunch");
        printMenu(dinnerIterator);
        System.out.println("Menu:Dinner");
        printMenu(cafeMenuIterator);
    }

    public void printMenu(Iterator iterator) {
        while(iterator.hasNext()) {
            MenuItem menuItem = (MenuItem)iterator.next();
            System.out.println(menuItem.getName() + ", ");
            System.out.println(menuItem.getPrice() + ", ");
            System.out.println(menuItem.getDescription() + ".");
        }
    }
}

public class IteratorClient {
    public static void main(String[] args) {
        Menu pancakeHouseMenu = new PancakeHouseMenu();
        Menu dinnerMenu = new DinnerMenu();
        Menu cafeMenu = new CafeMenu();
        Waitress waitress = new Waitress(pancakeHouseMenu, dinnerMenu, cafeMenu);
        waitress.printMenu();
    }
}
