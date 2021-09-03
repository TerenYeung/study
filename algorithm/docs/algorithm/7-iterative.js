/**
 * 迭代算法
 * @description
 * 给定任意数，求其平方根
 * @analysis
 * 平方根的迭代表达式为 x1 = x0 + (A / xn - xn) / 2
*/

function sqrt(A) {
  // x0 这里需要设置初始值作为 A 的平方根值，这个值是近似值，一般取其中间值；
  let x0 = A / 2;
  let x1 = x0 + (A / x0 - x0) / 2 // 迭代表达式，其中 x1 为迭代变量

  do {
    x0 = x1;
    x1 = x0 + (A / x0 - x0) / 2;
  } while (Math.abs(x1 - x0) >= 1e-6);

  console.log(`The sqrt of ${A} is: ${x1}`);
}

sqrt(4);