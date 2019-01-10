/*
import java.util.*;

public class ProductFactory {
    private static final Map<String, Product> prMap = new HashMap();

    public static synchronized Product createProduct(String type) throws Exception {
        Product product = null;
        if (prMap.containsKey(type)) {
            product = prMap.get(type);
        } else {
            if (type.equals("Product1")) {
                product = new ConcreteProduct1();
            } else {
                product = new ConcreteProduct2();
            }
            prMap.put(type, product);
        }
        return product;
    }
}*/