abstract class SchoolReport {
    public abstract void report();
    public abstract void sign(String name);
}

class FouthGradeSchoolReport extends SchoolReport {
    public void report() {
        System.out.println("尊敬的 XXX 家长：");
        System.out.println(" ......");
        System.out.println("    语文 62 数学 65 体育 98 自然 63");
        System.out.println("            家长签名：");
    }
    public void sign(String name) {
        System.out.println("家长签名为：" + name);
    }
}

abstract class Decorator extends SchoolReport {
    private SchoolReport sr;
    public Decorator(SchoolReport sr) {
        this.sr = sr;
    }
    public void report() {
        this.sr.report();
    }
    public void sign(String name) {
        this.sr.sign(name);
    }
}

/**
 * @description 最高成绩装饰类
 */
class HighScoreDecorator extends Decorator {
    public HighScoreDecorator(SchoolReport sr) {
        super(sr);
    }
    private void reportHighScore() {
        System.out.println("这次考试语文最高是 75，数学是 78，自然是 80");
    }
    @Override
    public void report() {
        this.reportHighScore();
        super.report();
    }
}

/**
 * @description 排名情况修饰类
 */
class SortDecorator extends Decorator {
    public SortDecorator(SchoolReport sr) {
        super(sr);
    }
    private void reportSort() {
        System.out.println("我是排名第 38 名...");
    }
    @Override
    public void report() {
        super.report();
        this.reportSort();
    }
}

public class DecoratorClient {
    public static void main(String[] args) {
        SchoolReport sr;
        sr = new FouthGradeSchoolReport();
        sr = new HighScoreDecorator(sr);
        sr = new SortDecorator(sr);
        sr.report();
        sr.sign("teren");
    }
}