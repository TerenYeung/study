/**
 * 递推算法(归纳法)
 * @description
 * 利用递推算法解决斐波那契数列问题
 * @analysis
 * F0 = 1
 * F1 = 1
 * F2 = F1 + F0 = 2
 * F3 = F2 + F1 = 2 + 1 = 3
 * F4 = F3 + F2 = 3 + 2 = 5
 * ...
 * Fn = Fn-1 + Fn-2
*/

exports.fib = function fib(num) {
  if (num == 0 || num == 1) {
    return 1;
  } else {
    return fib(num - 1) + fib( num-2);
  }
}

/**
 * @param {n} 需要求取斐波那契数列的位数
 * @param {n1} 最终返回的结果值
 * @param {n2} 计算后的值
 */
exports.fib2 = function fib2(n, n1 = 0, n2 = 1) {
  return n == 0 ? n1 : fib2(n-1, n2, n1 + n2);
}
