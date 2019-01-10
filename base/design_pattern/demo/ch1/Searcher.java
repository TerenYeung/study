
/**
 * @description 满足美女条件的接口
 * 假设满足美女的条件为：天使面孔、魔鬼身材和优雅气质
 */
interface IPettyGirl {
    public void goodLooking();

    public void niceFigure();

    public void greatTemperament();
}

/**
 * @description 美女实现类
 */
class PettyGirl implements IPettyGirl {
    private String name;

    public PettyGirl(String _name) {
        this.name = _name;
    }

    public void goodLooking() {
        System.out.println(this.name + "---脸蛋很漂亮！");
    }

    public void niceFigure() {
        System.out.println(this.name + "---身材非常棒！");
    }

    public void greatTemperament() {
        System.out.println(this.name + "---气质非常好！");
    }
}

/**
 * @description 星探抽象类
 */
abstract class AbstractSearcher {
    protected IPettyGirl pettyGirl;

    public AbstractSearcher(IPettyGirl _pettyGirl) {
        this.pettyGirl = _pettyGirl;
    }

    // 搜索美女，列出美女信息
    public abstract void show();
}


public class Searcher extends AbstractSearcher {
    public Searcher(IPettyGirl _pettyGirl) {
        super(_pettyGirl);
    }

    public void show() {
        System.out.println("---美女信息如下：---");
        super.pettyGirl.goodLooking();
        super.pettyGirl.niceFigure();
        super.pettyGirl.greatTemperament();
    }

    public static void main(String[] args) {
        IPettyGirl lin = new PettyGirl("志玲");
        AbstractSearcher searcher = new Searcher(lin);
        searcher.show();
    }
}

/**
 * 随着审美的变迁，人们可能对美女的定义有不一样的看法，可分为外形美女和气质型美女
 */
/*
interface IGoodBodyGirl {
    public void goodLooking();
    public void niceFigure();
}

interface IGreatTemperamentGril {
    public void greatTemperament();
}

class PettyGirl implements IGoodBodyGirl, IGreatTemperamentGril {
    // ...
}
*/
