import java.util.Random;

/**
 * @description 这里 Wizard 对外暴露太多 public 方法，容易造成强耦合
 */
/*
class Wizard {
    private Random rand = new Random(System.currentTimeMillis());

    public int first() {
        System.out.println("执行第一个方法...");
        return rand.nextInt(100);
    }

    public int second() {
        System.out.println("执行第二个方法...");
        return rand.nextInt(100);
    }

    public int third() {
        System.out.println("执行第三个方法...");
        return rand.nextInt(100);
    }
}

class InstallSoftware {
    public void installWizard(Wizard wizard) {
        int first = wizard.first();

        if (first > 50) {
            int second = wizard.second();
            if (second > 50) {
                int third = wizard.third();
                if (third > 50) {
                    wizard.first();
                }
            }
        }
    }
}
*/

class Wizard {
    private Random rand = new Random(System.currentTimeMillis());

    private int first() {
        System.out.println("执行第一个方法...");
        return rand.nextInt(100);
    }

    private int second() {
        System.out.println("执行第二个方法...");
        return rand.nextInt(100);
    }

    private int third() {
        System.out.println("执行第三个方法...");
        return rand.nextInt(100);
    }

    public void installWizard() {
        int first = this.first();
        if (first > 50) {
            int second = this.second();
            if (second > 50) {
                int third = this.third();
                if (third > 50) {
                    this.first();
                }
            }
        }
    }
}

class InstallSoftware {
    public void installWizard(Wizard wizard) {
        wizard.installWizard();
    }
}

public class InstallWizardClient {
    public static void main(String[] args) {
        InstallSoftware invoker = new InstallSoftware();
        invoker.installWizard(new Wizard());
    }
}