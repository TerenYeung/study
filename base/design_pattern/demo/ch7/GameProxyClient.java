// interface IGamePlayer {
//     public void login(String user, String password);
//     public void killBoss();
//     public void upgrade();
// }

// class GamePlayer implements IGamePlayer {
//     private String name = "";
//     public GamePlayer(String _name) {
//         this.name = _name;
//     }
//     public void login(String user, String password) {
//         System.out.println("登录名为 " + user + " 的用户：" + this.name + " 登录成功！");
//     }
//     public void killBoss() {
//         System.out.println(this.name + " kills Boss!");
//     }
//     public void upgrade() {
//         System.out.println(this.name + " upgrades one level!");
//     }
// }

// class GamePlayerProxy implements IGamePlayer {
//     private IGamePlayer gamePlayer = null;

//     public GamePlayerProxy(IGamePlayer _gamePlayer) {
//         this.gamePlayer = _gamePlayer;
//     }

//     public void login(String user, String password) {
//         this.gamePlayer.login(user, password);
//     }

//     public void killBoss() {
//         this.gamePlayer.killBoss();
//     }

//     public void upgrade() {
//         this.gamePlayer.upgrade();
//     }
// }

// public class GameProxyClient {
//     public static void main(String[] args) {
//         IGamePlayer teren = new GamePlayer("TY");
//         IGamePlayer proxy = new GamePlayerProxy(teren);
//         proxy.login("teren", "123456");
//         proxy.killBoss();
//         proxy.upgrade();
//     }
// }