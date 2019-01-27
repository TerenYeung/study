/*
* @description 启动和关闭家庭影院需要各个子组件相互配合才能完成工作
* 但是各个子组件的接口繁杂，每次启动需要用户进行许多操作
* 通过外观模式，可以对用户提供一个统一的启动和关闭的接口，简化用户操作
* */

class Amplifier {
    public void on() {
        System.out.println("Amplifier on");
    }
    public void off() {
        System.out.println("Amplifier off");
    }
}
class Tuner {
    public void on() {
        System.out.println("Tuner on");
    }
    public void off() {
        System.out.println("Tuner off");
    }
}

class DVDPlayer {
    public void on() {
       System.out.println("DVDPlayer on");
    }
    public void off() {
       System.out.println("DVDPlayer off");
    }
}
class CDPlayer {
    public void on() {
        System.out.println("CDPlayer on");
    }
    public void off() {
       System.out.println("CDPlayer on");
    }
}
class Light {
    public void on() {
        System.out.println("Light on");
    }
    public void off() {
       System.out.println("Light off");
    }
}
class Screen {
    public void on() {
       System.out.println("Screen on");
    }
    public void off() {
       System.out.println("Screen off");
    }
}

class HomeTheather {
    Amplifier amp;
    Tuner tuner;
    DVDPlayer dvdPlayer;
    CDPlayer cdPlayer;
    Light light;
    Screen screen;

    public HomeTheather(
            Amplifier amp,
            Tuner tuner,
            DVDPlayer dvdPlayer,
            CDPlayer cdPlayer,
            Light light,
            Screen screen
    ) {
        this.amp = amp;
        this.tuner = tuner;
        this.dvdPlayer = dvdPlayer;
        this.cdPlayer = cdPlayer;
        this.light = light;
        this.screen = screen;
    }

    public void watchMovie() {
        amp.on();
        tuner.on();
        dvdPlayer.on();
        cdPlayer.on();
        light.on();
        screen.on();
    }

    public void endMovie() {
        amp.off();
        tuner.off();
        dvdPlayer.off();
        cdPlayer.off();
        light.off();
        screen.off();
    }
}

public class HomeTheatherClient {
    public static void main(String[] args) {
       HomeTheather homeTheather = new HomeTheather(
               new Amplifier(),
               new Tuner(),
               new DVDPlayer(),
               new CDPlayer(),
               new Light(),
               new Screen()
       );
       homeTheather.watchMovie();
       homeTheather.endMovie();

    }
}