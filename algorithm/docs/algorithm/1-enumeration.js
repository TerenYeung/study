/**
 * 枚举算法
 * @description
 * 在下面的算式中添加 + - * / 运算符，使得等式成立
 * 5 5 5 5 5 = 5
 * @analysis
 * 1. 如何处理四则运算的优先级
 * 2. / 右边不得为 0
 * @example
 *  5 + 5 + 5 + 5 + 5
    5 * 5 + 5 + 5 + 5
    5 + 5 * 5 + 5 + 5
    5 * 5 * 5 + 5 + 5
*/
const arr = [5, 5, 5, 5, 5];
const opers = ['+', '-', '*', '/']
const result = 5;
let count = 0;
