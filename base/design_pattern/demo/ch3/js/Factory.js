class Human {
    getColor() {}
    talk() {}
}

class BlackHuman extends Human {
    getColor() {
        console.log('黑色肌肤');
    }
    talk() {
        console.log('黑人说话');
    }
}

class AbstractHumanFactory {
    createHuman() {}
}

class HumanFactory extends AbstractHumanFactory {
    createHuman(className) {
        let human = null;
        try {
            human = new className();
        } catch(e) {
            throw new Error(e);
        }
        return human;
    }
}

class NvWa {
    start() {
        let YinYangLu = new HumanFactory();
        let blackHuman = YinYangLu.createHuman(BlackHuman);
        blackHuman.getColor();
        blackHuman.talk();
    }
}


new NvWa().start();