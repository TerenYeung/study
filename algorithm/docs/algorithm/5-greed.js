/**
 * 贪心算法
 * @description
 * 输入需要补给给顾客的金额，然后计算出金额由那些面额的人民币组成
 * 人民币有 100、50、10、5、2、1、0.5、0.2、0.1
 * @anaylsis
 * 假设人民币的组合仅从付给顾客的钱的张数最少考虑，这样优先给予大面额的人民币
*/
let money = [10000, 5000, 1000, 500, 200, 100, 50, 10];
function exchange(num) {
  num *= 100;

  let ret = [];

  let i = 0;

  for (; i < money.length; i++) {
    if (num >= money[i]) break;
  }

  while (num > 0 && i < money.length) {
    if (num >= money[i]) {
      num -= money[i];
      ret[i] = ret[i] ? ret[i] + 1 : 1;
    } else if (num < 10 && num >= 5) {
      ret[money.length] = ret[money.length] ? ret[money.length] + 1 : 1;
      break;
    } else {
      i++;
    }
  }

  return ret;
}

function run() {
  const ret = exchange(68.33);
  console.log(ret);
  for (i = 0; i < money.length; i++) {
    if (ret[i] > 0) {
      console.log('%f: %d 张\n', money[i] / 100.0, ret[i]);
    }
  }
}

run();