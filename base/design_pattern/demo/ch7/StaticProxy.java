// interface Sell {
//     public void sell();
//     public void ad();
// }

// class Vendor implements Sell {
//     public void sell() {
//         System.out.println("sell...");
//     }

//     public void ad() {
//         System.out.println("ad...");
//     }
// }

// class BusinessAgents implements Sell {
//     private Sell vendor = null;
//     public BusinessAgents(Sell vendor) {
//         this.vendor = vendor;
//     }
//     public void sell() {
//         System.out.println("before...");
//         this.vendor.sell();
//         System.out.println("after...");
//     }
//     public void ad() {
//         System.out.println("before...");
//         this.vendor.ad();
//         System.out.println("after...");
//     }
// }

// public class StaticProxy {
//     public static void main(String[] args) {
//         Sell vendor = new Vendor();
//         Sell businessAgent = new BusinessAgents(vendor);
//         businessAgent.sell();
//         businessAgent.ad();
//     }
// }