// /**
//  * 试探算法
//  * @description
//  * 八皇后问题
//  * 在 8x8 的国际象棋上摆放 8 个皇后，任意两个皇后不能处于同行、同列和同一斜线
// */
// function queens() {
//   backtrack(0);
// }

// let sols = 0;
// let count = 0;
// let N = 8;
// let solution = Array(N); // 某一行的棋子排布

// function place(row, col) {
//   for (let j = 0; j < row; j++) {
//     if (
//       // 不得处于同一斜线
//       row - j == Math.abs(solution[row] - solution[j]) ||
//       // 当前行元素的位置与先前位置的元素处于同一列
//       solution[j] == solution[row]
//     ) {
//       return false;
//     }
//   }

//   return true;
// }

// function backtrack(row) {
//   count++;

//   if (row == N) {
//     sols++;
//     show(solution);
//     // console.log(solution)
//     console.log('\n');
//     // for (let  k = 0; k < N; k++) {
//       // console.log(solution.join('\t'));

//     // }
//   } else {
//     // 遍历棋盘处于当前行的各个列
//     for (let i = 0; i < N; i++) {
//       // [ 0, 4, 7, 5, 2, 6, 1, 3]
//       // solution = [0]
//       // solution = [0, 0];
//       // solution = [0, 1];
//       // 把棋子放置到第 row 行的第 i列
//       solution[row] = i;

//       // 判断是否放置棋子到这个位置，如果是则继续向前试探
//       if (place(row, i)) {
//         backtrack(row + 1); // 候选解除不满足问题规模外，其他都能满足，则继续扩大候选解规模，继续向前试探，即回溯
//       }
//     }
//   }
// }

// function show(x) {
//   for (let i = 0; i < N; i++) {
//     console.log(
//       '.'.repeat(x[i]) + 'X' + '.'.repeat((N - x[i] - 1))
//     );
//   }
// }

// function main() {
//   queens();
//   console.log('总方案：%d\n', sols);
// }

// main();
const N = 8;
// index 表示行数，value 表示列数
// [ 0, 4, 7, 5, 2, 6, 1, 3]
let solution = Array(N);

function main() {
  queens();
}

main();

function queens() {
  backtrack(0);
}



function backtrack(row) {
  if (row == N) {
    show(solution);
    console.log('\n')
  } else {
    for (let i = 0; i < N; i++) {
      solution[row] = i;

      if (place(row)) {
        // 候选解满足出问题规模外的情形，所以继续寻找下一个候选解
        backtrack(row + 1)
      }
    }
  }
}

function place(row) {
  // 比对之前行所在的棋子的位置
  for (let j = 0; j < row; j++) {
    if (
      // 位于同一列
      solution[row] == solution[j] ||
      // 位于同一斜线
      row - j == Math.abs(solution[row] - solution[j])
    ) {
      return false;
    }
  }

  return true;
}

function show(sol) {
  for (let k = 0; k < sol.length; k++) {
    let val = sol[k];
    console.log(
      '.'.repeat(val) + 'X' + '.'.repeat(N - val - 1)
    );
  }
}