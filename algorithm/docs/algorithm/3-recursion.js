/**
 * 递归算法
 * @description
 * 利用递归算法解决阶乘问题
 * @analysis
 * F0 = 0! = 1;
 * F1 = 1! = 1;
 * F2 = 2! = 1 * 2 = 2;
 * F3 = 3! = 1 * 2 * 3 = 6;
 * ...
 * Fn = n! = 1 * 2 * 3 ... * n = n * Fn-1;
*/
exports.fac1 = function(n) {
  return n == 0 ? 1 : n * fac1(n - 1);
}

exports.fac2 = function(n, total = 1) {
  return n == 0 ? total : fac2(n - 1, n * total);
}