// interface IGamePlayer {
//     public void login(String user, String password);
//     public void killBoss();
//     public void upgrade();
// }

// class GamePlayer implements IGamePlayer {
//     private String name = "";
//     public GamePlayer(IGamePlayer _gamePlayer, String _name) throws Exception {
//         if (_gamePlayer == null) {
//             throw new Exception("不能创建真实角色！");
//         } else {
//             this.name = _name;
//         }
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
//     public GamePlayerProxy(String name) {
//         try {
//             this.gamePlayer = new GamePlayer(this, name);
//         } catch(Exception e) {

//         }
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

// /**
//  * @description
//  * 普通代理模式下，调用者只需知道代理而不用知道真实角色是谁，屏蔽真实角色变动对高层模块的影响；
//  */
// public class GameNormalProxyClient {
//     public static void main(String[] args) {
//         IGamePlayer proxy = new GamePlayerProxy("TY");
//         proxy.login("teren", "123456");
//         proxy.killBoss();
//         proxy.upgrade();
//     }
// }