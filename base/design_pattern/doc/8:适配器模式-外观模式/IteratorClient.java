/*
* @description Java 使用枚举器兼容迭代器
* 将 Enumeration 的接口通过适配器转换为目标适配对象 Iterator 的接口
* 使得用户感知的只是 Iterator 的接口，而实际调用的是 Enumeration 的接口
* */
import java.util.Iterator; // 适配对象
import java.util.Enumeration; // 被适配者
import java.util.Vector;

// 适配器
class EnumerationIterator implements Iterator {
    Enumeration elem;

    public EnumerationIterator(Enumeration elem) {
        this.elem = elem;
    }

    public boolean hasNext() {
        return elem.hasMoreElements();
    }

    public Object next() {
        return elem.nextElement();
    }

    public void remove() {
        throw new UnsupportedOperationException();
    }
}

public class IteratorClient {
    public static void main(String[] args) {
        Enumeration<String> days;
        Vector<String> dayNames = new Vector<String>();
        dayNames.add("Sunday");
        dayNames.add("Monday");
        dayNames.add("Tuesday");
        dayNames.add("Wednesday");
        dayNames.add("Thursday");
        dayNames.add("Friday");
        dayNames.add("Saturday");
        days = dayNames.elements();
        EnumerationIterator iterator = new EnumerationIterator(days);
        System.out.println("days has next: " + iterator.hasNext());
        System.out.println("days next elem: " + iterator.next());
        iterator.remove();
    }
}
