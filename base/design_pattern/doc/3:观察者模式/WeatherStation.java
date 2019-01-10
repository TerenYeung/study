import java.util.*;
/**
 * v1
 * 气象站应用
 * 当气象指标：温度、湿度和压力发生改变时，将信息发送到不同类型的布告板；
 * 下面代码存在以下缺陷：
 * 1. 未能符合发现变化、封装变化的设计原则，当气象指标参数发生改变，需要修改类内部代码，也不符合开闭原则；布告板的类型可以有多种，应当抽象出来；
 * 2. 针对实现编程，而非接口编程，实现类内置在 WeatcherData 类中，对象之间存在强耦合；
 */
/*
 class WeatherData {
    public void measurementsChanged() {
        float temp = getTemperature();
        float humidity = getHumidity();
        float pressure = getPressure();

        currentConditionsDisplay.update(temp, humidity, pressure);
        statisticsDisplay.update(temp, humidity, pressure);
        forecastDisplay.update(temp, humidity, pressure);
    }
}*/

/**
 * v2 自己实现观察者模式接口
 */
/*
interface Observable {
    public void registerObserver(Observer observer);
    public void removeObserver(Observer observer);
    public void notifyObservers();
}

interface Observer {
    public void update(float temp, float humidity, float pressure);
}

interface DisplayElement {
    public void display();
}

class WeatherData implements Observable {
    private ArrayList observers;
    private float temp;
    private float humidity;
    private float pressure;

    public WeatherData() {
        observers = new ArrayList();
    }

    public void registerObserver(Observer observer) {
        observers.add(observer);
    }

    public void removeObserver(Observer observer) {
        int index = observers.indexOf(observer);

        if (index >= 0) {
            observers.remove(index);
        }
    }

    public void notifyObservers() {
        for (int i = 0; i < observers.size(); i++) {
            Observer observer = (Observer)observers.get(i);
            // 主动将消息推送至观察者
            observer.update(temp, humidity, pressure);
        }
    }

    public void measurementsChanged() {
        notifyObservers();
    }

    public void setMeasurements(float temp, float humidity, float pressure) {
        this.temp = temp;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();
    }
}

class CurrentConditionsDisplay implements Observer, DisplayElement {
    private float temp;
    private float humidity;
    private Observable weatherData;

    public CurrentConditionsDisplay(Observable weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    public void update(float temp, float humidity, float pressure) {
        this.temp = temp;
        this.humidity = humidity;
        display();
    }

    public void display() {
        System.out.println("Current conditions: " + temp + "F degrees and " + humidity + "% humidity");
    }
}

public class WeatherStation {
  public static void main(String[] args) {
      WeatherData weatherData = new WeatherData();

      CurrentConditionsDisplay currentConditionDisplay = new CurrentConditionsDisplay(weatherData);

      weatherData.setMeasurements(80, 65, 30.4f);
      weatherData.setMeasurements(82, 70, 29.2f);
  }
}*/

/**
 * v3 使用 Java 内置的观察者模式
 * 缺点：
 * 1. Observable 是一个类，由于 Java 不支持多继承，所以会在一定程度上限制 Observable 的使用范围
 * */
import java.util.Observable;
import java.util.Observer;

interface DisplayElement {
    public void display();
}

class WeatherData extends Observable {
    private float temp;
    private float humidity;
    private float pressure;

    public WeatherData() {}

    public void setMeasurements(float temp, float humidity, float pressure) {
        this.temp = temp;
        this.humidity = humidity;
        this.pressure = pressure;
        measurementsChanged();
    }

    public void measurementsChanged() {
        setChanged();
        notifyObservers();
    }

    public float getTemp() {
        return temp;
    }

    public float getHumidity() {
        return humidity;
    }

    public float getPressure() {
        return pressure;
    }
}

class CurrentConditionsDisplay implements Observer, DisplayElement {
    private float temp;
    private float humidity;
    Observable observable;

    public CurrentConditionsDisplay(Observable obs) {
        this.observable = obs;
        obs.addObserver(this);
    }

    public void update(Observable obs, Object arg) {
        if (obs instanceof WeatherData) {
            WeatherData weatherData = (WeatherData)obs;
            this.temp = weatherData.getTemp();
            this.humidity = weatherData.getHumidity();
            display();
        }
    }

    public void display() {
        System.out.println("Current conditions: " + temp + " F degrees and " + humidity + "% humidity");
    }
}

public class WeatherStation {
    public static void main(String[] args) {
        WeatherData weatherData = new WeatherData();

        CurrentConditionsDisplay currentConditionsDisplay = new CurrentConditionsDisplay(weatherData);

        weatherData.setMeasurements(80, 65, 30.4f);
        weatherData.setMeasurements(82, 70, 29.2f);
    }
}
