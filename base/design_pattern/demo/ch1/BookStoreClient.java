import java.util.*;
import java.text.*;

interface IBook {
    String getName();
    int getPrice();
    String getAuthor();
}

class NovelBook implements IBook {
    private String name;
    private int price;
    private String author;
    public NovelBook(String _name, int _price, String _author) {
        this.name = _name;
        this.price = _price;
        this.author = _author;
    }
    public String getName() {
        return this.name;
    }

    public int getPrice() {
        return this.price;
    }
    public String getAuthor() {
        return this.author;
    }
}

/**
 * @description 如果增加打折需求
 * 为了满足开闭原则，可以设计一个子类去覆写父类的 getPrice() 方法，从而实现软件实体的扩展
 */
class OffNovelBook extends NovelBook {
    public OffNovelBook(String _name, int _price, String _author) {
        super(_name, _price, _author);
    }

    @Override
    public int getPrice() {
        int selfPrice = super.getPrice();
        int offPrice = 0;
        if (selfPrice > 4000)
            offPrice = selfPrice * 90/100;
        else
            offPrice = selfPrice * 80/100;
        return offPrice;
    }
}

interface IComputerBook extends IBook {
    public String getScope();
}

class ComputerBook implements IComputerBook {
    private String name;
    private String scope;
    private String author;
    private int price;
    public ComputerBook(String _name, int _price, String _author, String _scope) {
        this.name = _name;
        this.price = _price;
        this.author = _author;
        this.scope = _scope;
    }

    public String getScope() {
        return this.scope;
    }

    public String getAuthor() {
        return this.author;
    }

    public String getName() {
        return this.name;
    }

    public int getPrice() {
        return this.price;
    }
}

class BookStore {
    private final static ArrayList<IBook> bookList = new ArrayList<IBook>();

    static {
        bookList.add(new NovelBook("天龙八部", 3200, "金庸"));
        bookList.add(new NovelBook("巴黎圣母院", 5600, "雨果"));
        bookList.add(new NovelBook("悲惨世界", 3500, "雨果"));
        bookList.add(new NovelBook("金瓶梅", 4300, "兰陵笑笑生"));
        bookList.add(new OffNovelBook("傲慢与偏见", 8000, "简·奥斯汀"));
        bookList.add(new ComputerBook("Think in Java", 4300, "Bruce Eckel", "编程"));
    }

    public static ArrayList<IBook> getBookList() {
        return bookList;
    }
}

public class BookStoreClient {
    public static void main(String[] args) {
        NumberFormat formatter = NumberFormat.getCurrencyInstance();
        formatter.setMaximumFractionDigits(2);
        ArrayList<IBook> bookList = BookStore.getBookList();
        System.out.println("---书店卖出去的书籍记录如下：---");
        for(IBook book:bookList) {
            System.out.println("书籍名称：" + book.getName() + "\t书籍作者：" + book.getAuthor() + "\t书籍价格：" + formatter.format(book.getPrice() / 100.0) + "元");
        }
    }
}