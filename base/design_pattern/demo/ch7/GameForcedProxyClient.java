interface IGamePlayer {
    public void login(String user, String password);
    public void killBoss();
    public void upgrade();
    public IGamePlayer getProxy();
}

interface IProxy {
    // 升级计算费用
    public void count();
}

class GamePlayer implements IGamePlayer {
    private String name = "";
    private IGamePlayer proxy = null;
    public GamePlayer(String _name) {
        this.name = _name;
    }
    public IGamePlayer getProxy() {
        this.proxy = new GamePlayerProxy(this);
        return this.proxy;
    }
    public void login(String user, String password) {
        if (this.isProxy()) {
            System.out.println(this.name + " logins!");
        } else {
            System.out.println("请使用指定代理访问");
        }
    }
    public void killBoss() {
        if (this.isProxy()) {
            System.out.println(this.name + " kills boss!");
        } else {
            System.out.println("请使用指定代理访问");
        }
    }
    public void upgrade() {
        if (this.isProxy()) {
            System.out.println(this.name + " upgrades!");
        } else {
            System.out.println("请使用指定代理访问!");
        }
    }
    private boolean isProxy() {
        if (this.proxy == null) {
            return false;
        } else {
            return true;
        }
    }
}

class GamePlayerProxy implements IGamePlayer {
    private IGamePlayer gamePlayer = null;
    public GamePlayerProxy(IGamePlayer _gamePlayer) {
        this.gamePlayer = _gamePlayer;
    }

    public void count() {
        System.out.println("升级费用是：150 元");
    }

    public void login(String user, String password) {
        this.gamePlayer.login(user, password);
    }

    public void killBoss() {
        this.gamePlayer.killBoss();
    }

    public void upgrade() {
        this.gamePlayer.upgrade();
        this.count();
    }
    // 代理的代理暂时没有，就是自己
    public IGamePlayer getProxy() {
        return this;
    }
}

public class GameForcedProxyClient {
    public static void main(String[] args) {
        IGamePlayer ty = new GamePlayer("TY");
        IGamePlayer proxy = ty.getProxy();
        proxy.login("teren", "123456");
        proxy.killBoss();
        proxy.upgrade();
    }
}