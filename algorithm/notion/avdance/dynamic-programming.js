var recurFib = n => {
  if (n < 2) {
    return n;
  }

  return recurFib(n - 1) + recurFib(n - 2);
}
var dynFib = n => {
  var data = [];
  for (var i = 0; i <= n; i++) {
    data[i] = 0;
  }

  if (n == 1 || n == 2) {
    return 1;
  } else {
    data[1] = 1;
    data[2] = 2;

    for (var i = 3; i <=n;i++) {
      data[i] = data[i-1] + data[i-2];
    }

    return data[n-1];
  }
}

var iterFib = n => {
  if (n < 2) return n;

  var prev = 1;
  var next = 1;
  var result = 1;

  for (var i = 2; i < n; i++) {
    result = prev + next;
    prev = next;
    next = result;
  }

  return result
}

var longestCommonSubString = (w1, w2) => {
  var max = 0;
  var index = 0;
  var lcsarr = Array(w1.length + 1);

  for (var i = 0; i <= w1.length + 1; i++) {
    lcsarr[i] = Array(w2.length + 1);
    for (var j = 0; j <= w2.length + 1; j++) {
      lcsarr[i][j] = 0;
    }
  }

  for (var k = 0; k <= w1.length; k++) {
    for (var l = 0; l <= w2.length; l++) {
      if (k == 0 || l == 0) {
        lcsarr[k][l] = 0;
      } else {
        if (w1[k-1] == w2[l-1]) {
          lcsarr[k][l] = lcsarr[k-1][l-1];
        } else {
          lcsarr[k][l] = 0;
        }
      }

      if (max < lcsarr[k][l]) {
        max = lcsarr[k][l];
        index = k;
      }
    }
  }

  var str = '';
  if (max == 0) {
    return '';
  } else {
    for (var i = index - max; i <= max; i++) {
      str += w2[i];
    }
  }

  return str;
}

var climbStairs = n => {
  if (n === 1) return 1;
  var dp = Array(n+1);
  dp[1] = 1;
  dp[2] = 2;

  for (var i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }

  return dp[n];
}

// 最少硬币找零
var minCoinChange = (coins, amount) => {
  var f= Array(amount + 1);
  f[0] = 0;

  for (var i = 1; i <= amount; i++) {
    f[i] = Number.MAX_VALUE;
    // f[i] = Math.min(f[i-coins[0]] + 1,...,f[i-coins[n-1]] + 1);
    for (var j = 0; j < coins.length; j++) {
      if (i >= coins[j] && f[i-amount[j]] != Number.MAX_VALUE) {
        f[i] = Math.min(f[i-coins[j]] + 1, f[i]);
      }
    }
  }

  if (f[amount] == Number.MAX_VALUE) {
    f[amount] = -1;
  }

  return f[amount];
}




// amount = 10 newAmount = 10
// min
// coins: 10 * 1 / 5 * 2 / 1 * 10
// return Math.min(10, 2, 1);


function minCoinChange(coins, amount) {
  function makeChange(value) {
    var ret = [];



    return ret;
  }


  return makeChange(amount);
}
values: [1, 2, 3, 4,5,6,7,8];
result: [1, [1,1], [1,1,1], [1,1,1,1], [5], [5,1], [5,1,1]]

minCoins(amount) = minCoins(amount + )



minCoinChange(coins, amount) =
minDist[i][j] = matrix[i][j] + Math.min(minDist(i-1,j), minDist(i, j - 1));

// 多阶段决策最优解
// 重叠子问题
// 最优子结构
// 状态转移方程

function minDist(matrix, i, j) {
  if (i > matrix.length) return null;
  if (j > matrix[0].length) return null;
  if (i == 0 && j == 0) return matrix[0][0];
  var cache = Array(matrix.length);
  for (var k = 0; k < matrix[0].length; k++) {
    cache[k] = [];
  }

  if (cache[i][j] != null) return cache[i][j];
  var minLeft = Number.MAX_VALUE;
  if (j-1>=0) {
    minLeft = minDist(matrix, i, j-1);
  }
  var minUp = Number.MAX_VALUE;
  if (i-1>=0) {
    minUp = minDist(matrix, i-1, j);
  }

  var currMinDist = matrix[i][j] + Math.min(minLeft, minUp);

  return cache[i][j] = currMinDist;
}

var dynFib = n => {
  if (n == 1 || n == 2) return 1;
  var data = [];
  data[0] = 0;
  data[1] = 1;
  data[2] = 1;

  for (var i = 3; i <= n; i++) {
    data[i] = data[i-1] + data[i-2];
  }
  return data[n-1];
}



var matrix = [[1，3，5，9], [2，1，3，4]，[5，2，6，7]，[6，8，4，3]];
var n = 4;
var mem = [[],[],[],[]];
// 最低路径
function minDist(i, j) { // 调用minDist(n-1, n-1);
  if (i == 0 && j == 0) return matrix[0][0];
  if (mem[i][j] > 0) return mem[i][j];
  var minLeft = Number.MAX_VALUE;
  if (j-1 >= 0) {
    minLeft = minDist(i, j-1);
  }
  var minUp = Number.MAX_VALUE;
  if (i-1 >= 0) {
    minUp = minDist(i-1, j);
  }

  var currMinDist = matrix[i][j] + Math.min(minLeft, minUp);
  mem[i][j] = currMinDist;
  return currMinDist;
}
// 走到 [i][j] 有多少种方式
function countingDist(m, n) {
  var matrix = Array(m);

  for (var k = 0; k < n; k++) {
    matrix[k] = [];
  }

  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      if (i == 0 || j == 0) {
        matrix[i][j] = 1;
      } else {
        matrix[i][j] = matrix[i-1][j] + matrix[i][j-1];
      }
    }
  }

  return matrix[m-1][n-1];
}



// 动态规划类型：计数型 最值型 存在型

// 1-确定状态
// 2-确定状态转移方程
// 3-初始条件和边界情况



// state f[x][y]表示位置为{x,y}总共有多少种走法
// state fn f[m][n] = f[m][n-1] + f[m-1][n]
// initial f[0][0] = 1; f[0][n] = 1; f[m][1] = 1;
function countingDist(m, n) {
  var matrix = Array(m);
  for (var i = 0; i < n; i++) {
    matrix[i] = [];
  }

  for (var j = 0; j < m; j++) {
    for (var k = 0; k < n; k++) {
      if (j == 0 || k == 0) {
        matrix[j][k] = 1;
      } else {
        matrix[j][k] = matrix[j][k-1] + matrix[j-1][k];
      }
    }
  }

  return matrix[m-1][n-1];
}

//
var path = [
  [1, 3, 5, 9],
  [2, 1, 3, 4],
  [5, 2, 6, 7],
  [6, 8, 4, 3],
];

// f[i][j] 位置为 {i,j} 时的最小值
// state fn f[m][n] = Math.min(f[m][n-1], f[m-1][n]) + matrix[m][n]
// initial f[0][0] matrix[0][0]
function minDist(matrix, m, n) {
  if (m == 0 && n == 0) return matrix[0][0];

  var minLeft = Number.MAX_VALUE;
  var minUp = Number.MAX_VALUE;

  if (m-1 >= 0) {
    minUp = minDist(matrix, m-1, n);
  }

  if (n-1 >= 0) {
    minLeft = minDist(matrix, m, n-1);
  }

  return Math.min(minLeft, minUp) + matrix[m][n];
}
// f[amount] 在特定数额下的最小找零数量
// state fn f[amount] = Math.min(f[amount-coins[0]] + 1, f[amount-coins[1]] + 1, ..., f[amount-coins[n]] + 1)
// initial f[0] = 0 f[-x] = Number.MAX_VALUE
function minCoinChange(coins, amount) {
  var f = Array(amount + 1);
  f[0] = 0;
  var map = {
    0: [0],
  };

  for (var i = 1; i <= amount; i++) {
    f[i] = Number.MAX_VALUE;
    for (var j = 0; j < coins.length; j++) {
      if (i-coins[j] >= 0 && f[i-coins[j]] != Number.MAX_VALUE) {
        f[i] = Math.min(f[i-coins[j]] + 1, f[i]);
      }
    }
  }

  if (f[amount] == Number.MAX_VALUE) {
    f[amount] = -1;
  }

  console.log('ret', map[amount]);

  return f[amount];
}
// nums = [1,2,3,4,5]
// 连续子数组的最大和
// state dp[i] 以元素 num[i] 结尾的连续子数组最大和
// state fn
// dp[i-1] <= 0  dp[i] = nums[i]
// dp[i-1] > 0 dp[i] = nums[i] + dp[i-1]
// initial dp[0] = nums[0]
function maxSubArray(nums) {
  var dp = Array(nums.length);
  dp[0] = nums[0];

  for (var i = 1; i < nums.length; i++) {
    if (dp[i-1] <= 0) {
      dp[i] = nums[i];
    } else {
      dp[i] = nums[i] + dp[i-1];
    }
  }

  return Math.max.apply(null, dp);
}

var prices = [6,2,1,3,4,7,5,2];
// state dp[i] 第 i 天卖出时获取的最大利润
var maxProfit = function(prices) {

};
// state: dp[n] 爬到第 n 阶时的方法总数
// state fn: dp[n] = dp[n-1] + dp[n-2]
// dp[0] = 0 dp[1]=1 dp[2] = 2
var climbStairs = n => {

  if (n <= 2) return n;

  var dp = Array(n+1);
  dp[0] = 0;
  dp[1] = 1;
  dp[2] = 2;

  for (var i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }


  return dp[n];
}

// 'abc' 'adbedc'
var isSubsequence = function(s, t) {

};

// state: dp[i][j] 是以下标 i-1 结尾的 A 和下标 j-1 结尾的 B，最长重复子数组长度为 dp[i][j]
// state fn: dp[i][j] = dp[i-1][j-1] + 1
// initial dp[i][0] = 0 dp[0][j] = 0;
// 最长重复子串
function findLength(A, B) {
  var dp = Array(A.length + 1).fill([]);
  for (var i = 0; i < B.length; i++) {
    for (var j = 0; j < B.length; j++) {
      dp[i][j] = 0;;
    }
  }




  var result = 0;
  dp[0][0] = 0;

  for (var j = 1; j <= A.length; j++) {
    for (var k = 1; k <= B.length; k++) {
      if (A[i-1] == B[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
      }

      if (dp[i][j] > result) {
        result = dp[i][j];
      }
    }
  }

  return result;
}

function findLength(A, B) {
  var ret = 0;
  for (var i = 0; i < A.length; i++) {
    var k = 0;
    for (var j = 0; j < B.length; j++) {
      while (A[i+k] == B[j+k]) {
        k++;
      }
      ret = Math.max(ret, k);
    }
  }

  return ret;
}
// state dp[i][j] 表示位置{i, j} 时的最长公共子串
// state fn dp[i][j] = d[i+1][j+1] + 1   A[i] == B[j]
//          dp[i][j] = 0 A[i] != B[j]
// initial
function findLength(A, B) {
  var ret = 0;
  var m = A.length, n = B.length;
  // var dp = Array.from(new Array(m + 1),() => new Array(n + 1).fill(0));

  var dp = Array(m+1).fill([]);
  for (var i = 0; i <= m; i++) {
    for (var j = 0; j <= n; j++) {
      dp[i][j] = 0;
    }
  }


  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      if (A[i-1] === B[j-1]) {
        dp[i][j] = dp[i-1][j-1] + 1;
        ret = Math.max(ret, dp[i][j]);
      }
    }
  }

  return ret;
}

// 贪心算法
// 将问题分解为若干个规模递减的子问题，每个子问题都选择当前状态下的局部最优解，最后得出整体最优解。
// 钱币找零
function minCoinChange(coins, amount) {
  var ret = 0;

}

var singleNumber = function(nums) {
  var ret = 0;
  for (var i = 0; i < nums.length; i++) {
      ret ^= nums[i];
  }

  return ret;
};

var findRepeatNumber = function(nums) {
  var temp

  for (var i = 0; i < nums.length; i++) {
      // 下标与数组元素未能一一对应
      while (nums[i] != i) {
          // 判断调整后的数组元素是否已包含该值
          if (nums[i] == nums[nums[i]]) {
              return nums[i]
          }

          // 不包含，则需要调整排序
          //   nums[nums[i]]       nums[i]
          //   nums[i]              i
          temp = nums[i]
          nums[i] = nums[temp]
          nums[temp] = temp;
      }
  }

      return -1;
};

function isValid(s) {
  var map = {
    ']': '[',
    ')': '(',
    '}': '{'
  }
  var queue = [];
  var left = Object.values(map);

  for (var i = 0; i < s.length; i++) {
    if (left.includes(s[i])) {
      queue.push(s[i]);
    } else {
      if (map[s[i]] != queue.pop()) return false;
    }
  }

  return queue.length == 0;
}
// 2
// 1 -> 2 -> 3 -> 4 -> 5

function removeNthFromEnd( head ,  n ) {
  // write code here
  if (!head) return null;

  var dummy = new ListNode(0);
  dummy.next = head;
  var current = dummy;
  var next = head;

  for (var i = 0; i < n; i++) {
      next = next.next;
  }

  while (next) {
      next = next.next;
      current = current.next;
  }

  current.next = current.next.next;

  return dummy.next;
}

function removeNthFromEnd(head, n) {
  if (!head) return null;
  var dummy = new ListNode(null);
  dummy.next = head;
  var current = dummy;
  var next=  head;

  for (var i = 0; i < n; i++) {
    next = next.next;
  }

  // 1-2-3-4
  while (next) {
    next = next.next;
    current = current.next;
  }

  current.next = current.next.next;

  return dummy.next;
}

function solve( s ,  t ) {
  // write code here
  const len = Math.max(s.length, t.length)
  s = s.padStart(len, '0').split('').reverse()
  t = t.padStart(len, '0').split('').reverse()
  let add = 0
  for (let i = 0; i < len; i++) {
      let tmp = +s[i] + +t[i] + add
      s[i] = tmp % 10
      add = tmp > 9 ? 1 : 0
  }
  if (add > 0) {
      s.push(1)
  }
  return s.reverse().join('')
}
/**
          1
      2       3
    3  4     5  6
 */

function zigzagLevelOrder( root ) {
  // write code here
  if (root == null) return [];

  var queue = [root];
  var temp;
  var layer = 0;
  var ret = [];

  function pushToBox(node) {
    if (ret[layer] == null) {
      ret[layer] = [];
    }

    if (layer % 2 == 0) {
      ret[layer].push(node.val);
    } else {
      ret[layer].unshift(node.val);
    }
  }

  while (queue && queue.length > 0) {
    temp = [];

    for (var node of queue) {

      pushToBox(node);
      node.left && temp.push(node.left);
      node.right && temp.push(node.right);
    }
    queue = temp;
    layer++;
  }

  return ret;
}
//
function LCS( str1 ,  str2 ) {
  // write code here
}

// dp[i][j]
// dp[0][j] = 0 dp[i][0] = 0;
//


 function LCS( str1 ,  str2 ) {
  // write code here
  if(str1.length > str2.length) [str1, str2] = [str2, str1];
  let maxLen = 0, res = '';
  for(let i = 0; i < str1.length; i++) {
      // '1234' '124456'
      let temp = str1.slice(i - maxLen, i + 1);
      if(str2.indexOf(temp) !== -1) {
          res = temp;
          maxLen++;
      }
  }
  return res;
}

function LCS(s1, s2) {
  if (s1.length > s2.length) {
    [s1, s2] = [s2, s1];
  }

  var maxLen = 0, res = '';
  for (var i = 0; i < s1.length; i++) {
    var temp = s1.slice(i-maxLen, i+1);
    if (s2.indexof(temp) != -1) {
      res = temp;
      maxLen++;
    }
  }

  return res;
}



class Solution {
  public int longestCommonSubsequence(String text1, String text2) {
      int m = text1.length(), n = text2.length();
      int[][] dp = new int[m + 1][n + 1];
      for(int i = 1; i <= m; i++){
          for(int j = 1; j <= n; j++){
              if(text1.charAt(i - 1) == text2.charAt(j - 1)){
                  dp[i][j] = dp[i - 1][j - 1] + 1;
              }else{
                  dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
              }
          }
      }
      return dp[m][n];
  }
}

function longestCommonSubString(str1, str2) {
  var m = str1.length, n = str2.length;
  var dp = Array(m+1);
  for (var i = 0; i < dp.length; i++) {
    dp[i] = Array(n+1).fill(0);
  }

  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      if (str1.charAt(i-1) == str2.charAt(j-1)) {
        dp[i][j] = dp[i-1][j-1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
      }
    }
  }

  return dp[m][n];

}

function LCS(s1, s2) {
  if (s1.length > s2.length) {
    [s1, s2] = [s2, s1];
  }

  var ret = '', maxLen = 0;

  for (var i = 0; i < s1.length; i++) {
    var temp = s1.slice(i-maxLen, i+1);
    if (s2.indexOf(temp) != -1) {
      res = temp;
      maxLen++;
    }
  }

  return ret;
}

function LCS(s1, s2) {
  if (s1.length > s2.length) {
    [s1, s2] = [s2, s1];
  }

  var ret = '', maxLen = 0;

  for (var i = 0; i < s1.length; i++) {
    var temp = s1.slice(i-maxLen, i+1);

    if (s2.indexOf(temp) != -1) {
      res = temp;
      maxLen++;
    }
  }

  return ret;
}

function FindFirstCommonNode(pHead1, pHead2)
{
    // write code here
    var top = pHead1;
    var bottom = pHead2;

    while (top != bottom) {
      top = top == null ? pHead2 : top.next;
      bottom = bottom == null ? pHead1 : bottom.next;
    }

    return top;

}

var getIntersectionNode = function(headA, headB) {
  var top = headA;
  var bottom = headB;

  while (top != bottom) {
      top = top == null ? headB : top.next;
      bottom = bottom == null ? headA : bottom.next;
  }

  return top;





  var top = headA;
  var bottom = headB;

  while (top != bottom) {
      top = top == null ? headB : top.next;
      bottom = bottom == null ? headA : bottom.next;
  }

  return top;
};

function addInList( head1 ,  head2 ) {
  // write code here
}

/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */

function addInList( head1 ,  head2 ) {
  function reverseList(head){
    let prev=null
    let cur=head
    while(cur){
        let nextHead=cur.next
        cur.next=prev
        prev=cur
        cur=nextHead
    }
      return prev
  }

  function computeValue(head1,head2){
      let head11=reverseList(head1)
      let head12=reverseList(head2)
      let res=[]
      let bit=0
      while(head11!==null&&head12!==null){
          let sum=bit===1?head11.val+head12.val+1:head11.val+head12.val
          if(sum>=10){
              sum=sum%10
              res.push(sum)
              bit=1
          }else{
              res.push(sum)
              bit=0
          }
          head11=head11.next
          head12=head12.next
      }
      while(head11!==null){
        let sum
        if(bit===1){
            sum=head11.val+1
            if(sum>=10){
                res.push(sum%10)
                if(head11.next===null){
                  res.push(parseInt(sum/10))
                }
                bit=1
            }else{
                bit=0
                res.push(sum)
            }
        }
          else{
              res.push(head11.val)
          }
        head11=head11.next
      }
      while(head12!==null){
          let sum
        if(bit===1){
            sum=head12.val+1
            if(sum>=10){
                res.push(sum%10)
              if(head12.next===null){
                  res.push(parseInt(sum/10))
                }
                bit=1
            }else{
                bit=0
                res.push(sum)
            }
        }
          else{
              res.push(head12.val)

          }
          head12=head12.next
      }

    return res.reduce((prev,cur)=>({val:cur,next:prev}),null)
  }

  let headNew=computeValue(head1,head2)

  return headNew
}
module.exports = {
   addInList : addInList
};

function solve( str ) {
  // write code here
  // var start = 0;
  // var end = str.length - 1;

  // while (start < end) {
  //   [s[start], s[end]] = [s[end], s[start]];
  //   start++;
  //   end--;
  // }

  // return s;

  var stack = [];

  for (var i = 0; i < str.length; i++) {
    stack.push(srt[i]);
  }
  var ret = '';
  while (stack.length > 0) {
    ret += stack.pop();
  }

  return ret;
}

class Solution {
  public void reverseString(char[] s) {
      int n = s.length;
      for (int left = 0, right = n - 1; left < right; ++left, --right) {
          char tmp = s[left];
          s[left] = s[right];
          s[right] = tmp;
      }
  }
}

[[1,2,3],[4,5,6],[7,8,9]]
function spiralOrder(matrix) {
  if (matrix.length == 0) return [];

  var l = 0;
  var t = 0;
  var r = matrix[0].length - 1;
  var b = matrix.length - 1;
  var ret = [];
  var index = 0;

  while (true) {
    for (var i = l; i <= r; i++) {
      ret[index++] = matrix[t][i];
    }

    if (++t > b) break;

    for (var i = t; i <= b; i++) {
      ret[index++] = matrix[i][r];
    }

    if (--r < l) break;

    for (var i = r; i >= l; i--) {
      ret[index++] = matrix[b][i];
    }

    if (--b < t) break;

    for (var i = b; i >= t; i--) {
      ret[index++] = matrix[i][l];
    }

    if (++l > r) break;
  }

  return ret;
}


var spiralOrder = function(matrix) {

  if (matrix.length == 0) return [];
  var l = 0;
  var t = 0;
  var r = matrix[0].length - 1;
  var b = matrix.length - 1;
  var ret = [];
  var x = 0;

  while (true) {
      for (var i = l; i <= r; i++) {
          ret[x++] = matrix[t][i];
      }

      if (++t > b) break;

      for (var i = t; i <= b; i++) {
          ret[x++] = matrix[i][r];
      }

      if (--r < l) break;

      for (var i = r; i >= l; i--) {
          ret[x++] = matrix[b][i];
      }

      if (--b < t) break;

      for (var i = b; i >= t; i--) {
          ret[x++] = matrix[i][l];
      }

      if (++l > r) break;
  }

  return ret;
};
// 0 1 1 2
// dp[i]
// state fn: dp[i] = dp[i-1] + dp[i-2]

function Fibonacci(n)
{
    // write code here
    if (n < 2) return n;
    var dp = Array(n+1);
    dp[0] = 0;
    dp[1] = 1;
    dp[2] = 1;

    for (var i = 3; i <= n; i++) {
      dp[i] = dp[i-1] + dp[i-2];
    }

    return dp[n];
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
 var threeSum = function(nums) {
  let res = []
  for (let i = 0; i < nums.length - 2; i++) { // 每个人
    for (let j = i + 1; j < nums.length - 1; j++) { // 依次拉上其他每个人
      for (let k = j + 1; k < nums.length; k++) { // 去问剩下的每个人
        if (nums[i] + nums[j] + nums[k] === 0) { // 我们是不是可以一起组队
          res.push([nums[i], nums[j], nums[k]])
        }
      }
    }
  }
  return res
}

var threeSum = function(nums) {
  let res = []
  let hash = {}
  for (let i = 0; i < nums.length - 2; i++) { // 每个人
    for (let j = i + 1; j < nums.length - 1; j++) { // 依次拉上其他每个人
      if (hash[nums[j]] !== undefined) { // 已经有合适自己的两人组
        res.push([nums[j]].concat(hash[nums[j]]))
        hash[nums[j]] = undefined
      } else { // 没有合适自己的两人组
        let mark = 0 - nums[i] - nums[j]
        hash[mark] = [nums[i], nums[j]]
      }
    }
  }
  return res
} // 示意代码 未AC



var threeSum = function(nums) {
  var ret = [];
  var hash = {};
  for (var i = 0; i < nums.length - 2; i++) {
    for (var j = i + 1; j < nums.length - 1; j++) {
      if (hash[nums[j]] != null) {
        res.push([nums[j]].concat(hash[nums[j]]));
      } else {
        var mark = 0 - nums[i] - nums[j];
        hash[mark] = [nums[i], nums[j]];
      }
    }
  }

  return ret;
}

var threeSum = function (nums) {
  let res = []
  let length = nums.length;
  nums.sort((a, b) => a - b) // 先排个队，最左边是最弱（小）的，最右边是最强(大)的
  if (nums[0] <= 0 && nums[length - 1] >= 0) { // 优化1: 整个数组同符号，则无解
    for (let i = 0; i < length - 2;) {
      if (nums[i] > 0) break; // 优化2: 最左值为正数则一定无解
      let first = i + 1
      let last = length - 1
      do {
        if (first >= last || nums[i] * nums[last] > 0) break // 两人选相遇，或者三人同符号，则退出
        let result = nums[i] + nums[first] + nums[last]
        if (result === 0) { // 如果可以组队
          res.push([nums[i], nums[first], nums[last]])
        }
        if (result <= 0 ) { // 实力太弱，把菜鸟那边右移一位
          while (first < last && nums[first] === nums[++first]){} // 如果相等就跳过
        } else { // 实力太强，把大神那边右移一位
          while (first < last && nums[last] === nums[--last]) {}
        }
      } while (first < last)

      while (nums[i] === nums[++i]) {}
    }
  }
  return res
}

function threeSum(num) {
  let res = [];
  // 先排序
  num.sort((a, b) => a - b);
  let len = num.length;
  // 先确定一个数
  for (let i = 0; i < len - 2; i++) {
    // 第二个数，方向往后面移动
    let head = i + 1;
    // 第三个数，方向往前面移动
    let tail = len - 1;
    // 相遇判定，退出条件
    while (head < tail) {
      let sum = num[i] + num[head] + num[tail];
      // 如果结果太大，尾部收缩
      if (sum > 0) tail--;
      // 如果结果太小，头部推进
      else if (sum < 0) head++;
      // 相等则写入结果并去重
      else {
        res.push([num[i], num[head], num[tail]]);
        // 头部去重（如果后面一个数跟当前的数字相等，则代表有重复的结果生成，跳过）
        while (head + 1 < tail && num[head + 1] === num[head]) head++;
        // 尾部去重（如果前面一个数跟当前的数字相等，则代表有重复的结果生成，跳过）
        while (tail - 1 > head && num[tail - 1] === num[head]) tail--;
        // 继续往后推进
        head++;
        // 继续往前推进
        tail--;
      }
    }
    // 为什么是 < len - 2 是因为最少要三个数组合
    while (i < len - 2 && num[i + 1] === num[i]) i++;
  }
  return res;
}

function threeSum(num) {
  var ret = [];
  num.sort((a, b) => a - b);
  var len = num.length;
  for (var i = 0; i < len - 2; i++) {
    var head = i + 1;
    var tail = len - 1;

    while (head < tail) {
      var sum = num[i] + num[head] + num[tail];

      if (sum > 0) {
        tail--
      } else if (sum < 0) {
        head++;
      } else {
        ret.push([num[i], num[head], num[tail]]);
        while (head + 1 < tail && num[head+1] == num[head]) head++;
        while (tail - 1 > head && num[tail-1] == num[head]) tail--;
        head++;
        tail--;
      }
    }

    while (i < len - 2 && num[i+1] === num[i]) i++;
  }

  return ret;
}

function threeSum(num) {
  var ret = [];
  var len = num.length;
  for (var i = 0; i < len - 2; i++) {
    var head = i + 1;
    var tail = len - 1;

    while (head < tail) {
      var sum = num[i] + num[head] + num[tail];

      if (sum > 0) {
        tail--;
      } else if (sum < 0) {
        head++;
      } else {
        ret.push([num[i], num[head], num[tail]]);
        while (head + 1 < tail && num[head+1] === num[head]) head++;
        while (tail - 1 > head && num[tail-1] === num[head]) tail--;
        head++;
        tail--;
      }
    }
    while(i < len - 2 && num[i+1] === num[i]) i++;
  }

  return ret;
}


function threeSum(num) {
  var ret = [];
  var len = num.length;
  num.sort((a,b) => a - b)

  for (var i = 0; i < len - 2; i++) {
    var head = i + 1;
    var tail = len - 1;

    while (head < tail) {
      var sum = num[i] + num[head] + num[tail];

      if (sum > 0) {
        tail--;
      } else if (sum < 0) {
        head++;
      } else {
        ret.push([num[i], num[head], num[tail]]);

        while (head + 1 < tail && num[head+1] == num[head]) head++;
        while (tail - 1 > head && num[tail-1] == num[head]) tail--;

        head++;
        tail--;
      }
    }

    while (i+1 < len-2 && num[i+1] == num[i]) i++;
  }

  return ret;
}

/**
 * lru design
 * @param operators int整型二维数组 the ops
 * @param k int整型 the k
 * @return int整型一维数组
 */

//  设计LRU缓存结构，该结构在构造时确定大小，假设大小为K，并有如下两个功能
//  set(key, value)：将记录(key, value)插入该结构
//  get(key)：返回key对应的value值
//  [要求]
//  set和get方法的时间复杂度为O(1)
//  某个key的set或get操作一旦发生，认为这个key的记录成了最常使用的。
//  当缓存的大小超过K时，移除最不经常使用的记录，即set或get最久远的。
//  若opt=1，接下来两个整数x, y，表示set(x, y)
//  若opt=2，接下来一个整数x，表示get(x)，若x未出现过或已被移除，则返回-1
//  对于每个操作2，输出一个答案
// [[1,1,1],[1,2,2],[1,3,2],[2,1],[1,4,4],[2,2]],3

function LRU(operators, k) {
  var ret = [];
  var map = new Map();

  for (var i = 0; i < operators.length; i++) {
    var [op, key, value] = operators[i];
    if (op === 1) {
      if (map.size >= k) {
        map.delete(map.keys().next().value);
        map.set(key, value);
      } else {
        if (map.has(key)){
          map.delete(key);
        }
        map.set(key, value);
      }
    } else if (op === 2) {
      if (!map.has(key)) {
        ret.push(-1);
      } else {
        var value = map.get(key);
        ret.push(value);
        map.delete(key);
        map.set(key, value);
      }
    }
  }

  return ret;
}


 function LRU( operators ,  k ) {
  // write code here
  let res = [];
  let map = new Map();
  for(let i = 0; i < operators.length; i++){
      let [op, key, value] = operators[i];
      if(op === 1) {
          if(map.size >= k) {
              map.delete(map.keys().next().value)
              map.set(key, value);
          } else {
              if(map.has(key)) {
                  map.delete(key)
              }
              map.set(key, value);
          }
      } else if(op === 2) {
          if(!map.has(key)) {
              res.push(-1);
          } else {
              let value = map.get(key);
              res.push(value);
              map.delete(key);
              map.set(key, value);
          }
      }
  }
  return res;
}
module.exports = {
  LRU : LRU
};

// 给定一个数组arr，返回arr的最长无的重复子串的长度(无重复指的是所有数字都不相同)
function maxLength( arr ) {
  // write code here
  // [2,2,4,4]
  var map = new Map();
  var max = 1;
  for (var start = 0, end = 0; end < arr.length; end++) {
      if(map.has(arr[end])) {
          // start = 0 1
          start = Math.max(start, map.get(arr[end]) + 1);
      }
      max = Math.max(max, end-start+1);
      {2: 0, }
      map.set(arr[end], end);
  }

  return max;
}

function maxLength(arr) {
  var map = new Map();
  var max = 1;
  for (var start = 0, end = 0; end < arr.length; end++) {
    if (map.has(arr[end])) {
      start = Math.max(start, map.get(arr[end]) + 1);
    }

    max = Math.max(max, end-start+1);
    map.set(arr[end], end);
  }

  return max;
}


function sortInList( head ) {
  // write code here
}

// 有三种操作种类，op1表示push，op2表示pop，op3表示getMin。你需要返回和op3出现次数一样多的数组，表示每次getMin的答案
// [[1,3],[1,2],[1,1],[3],[2],[3]]

// 实现一个特殊功能的栈，在实现栈的基本功能的基础上，再实现返回栈中最小元素的操作。
/**
 * return a array which include all ans for op3
 * @param op int整型二维数组 operator
 * @return int整型一维数组
 */
 function getMinStack( op ) {
  // write code here
}

function maxDepth( root ) {
  // write code here
  if (root == null) return 0;
  var queue = [root];
  var temp;
  var count = 0;

  while (queue && queue.length > 0) {
    temp = [];

    for (var node of queue) {
      node.left && temp.push(node.left);
      node.right && temp.push(node.right);
    }

    count++;
    queue = temp;
  }

  return count;
}

function IsBalanced_Solution(pRoot)
{
    // write code here
    if (pRoot == null) return true;

    return Math.abs(getNodeHeight(pRoot.left) - getNodeHeight(pRoot.right)) < 2;
}

function getNodeHeight(node) {
  if (node == null) return 0;

  return Math.max(getNodeHeight(node.left), getNodeHeight(node.right)) + 1;
}

// state dp[i][j] {i,j} 的最小路径和
// state fn dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + matrix[i][j]
// state initial: dp[0][j] = dp[0][j-1] + matrix[0][j]
function minPathSum( matrix ) {
  // write code here
  var m = matrix.length - 1;
  var n = matrix[0].length - 1;
  var dp = Array(m+1).fill([]);

  console.log('dp', dp);

  for (var i = 0; i <= m; i++) {
    for (var j = 0; j <= n; j++) {
      if (i == 0 || j == 0) {
        if (i == 0 && j != 0) {
          dp[i][j] = dp[0][j-1] + matrix[0][j];
        } else if (i != 0 && j == 0) {
          dp[i][j] = dp[i-1][0] + matrix[i][0];
        } else {
          dp[i][j] = matrix[0][0];
        }
      } else {
        dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + matrix[i][j];
      }
    }
  }

  console.log('dp2', dp);

  return dp[m][n];
}

function minDist(matrix, m, n) {
  if (m == 0 && n == 0) return matrix[0][0];

  var minLeft = Number.MAX_VALUE;
  var minUp = Number.MAX_VALUE;

  if (m - 1 >= 0) {
    minUp = minDist(matrix, m - 1, n);
  }

  if (n - 1 >= 0) {
    minLeft = minDist(matrix, m, n - 1);
  }

  return Math.min(minUp, minLeft) + matrix[m][n];
}

//请写一个整数计算器，支持加减乘三种运算和括号。
// 1 + 2 * 3
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 返回表达式的值
 * @param s string字符串 待计算的表达式
 * @return int整型
 */
 function solve( s ) {
  // write code here
}

function isPail( head ) {
  // write code here
}

// [[10,30],[20,60],[80,100],[150,180]]
// [[10,60],[80,100],[150,180]]

function merge( intervals ) {
  // write code here

}
// tail [1,1,2,3,4,4]

function deleteDuplicates( head ) {
  // write code here
  if (!head) return null;

  var dummy = new ListNode(null);
  var current = head;

  while (current && current.next) {
    if (current.val == current.next.val) {
      current = current.next.next;
    } else {
      current = current.next;
    }
  }

  return dummy.next;
}

function pushNode(newNode, head) {
  var current = head;

  while (current.next != null) {
    current = current.next;
  }

  current.next = newNode;
}
// tail [1,1,1,2,3,4,4]
function deleteDuplicates( head ) {
  // write code here
 if (!head || !head.next) return head;
 const dummy = {};
  dummy.next = head;
  let cur = dummy;

  while(cur.next && cur.next.next) {
      if (cur.next.val === cur.next.next.val) {
          let val = cur.next.val;
          while(cur.next && cur.next.val === val) {
              cur.next = cur.next.next;
          }
      } else {
          cur = cur.next;
      }
  }

  return dummy.next;
}

function isSys(root) {
  if (root == null) return true;

  function walk(left, right) {
    if (left == null && right == null) return true;
    if (left == null || right == null || left.val != right.val) return false;

    return walk(left.left, left.right) && walk(right.left, left.right);
  }

  return walk(root.left, root.right);
}

// [1, 1, 1, 2, 3, 4, 5]
function deleteDuplicates( head ) {
  // write code here
  if (!head || head.next == null) return head;

  var current = head;

  while (current && current.next) {
    if (current.val == current.next.val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }

  return head;
}
// dfs
function hasPathSum( root ,  sum ) {
  // write code here
  if (root == null) return false;

  function preOrder(node, sum) {
    if (!node) return false;
    sum -= node.val;
    if (node.left == null && node.right == null && sum === 0) return true;
    return preOrder(node.left, sum) || preOrder(node.right, sum);
  }

  return preOrder(root, sum);
}

class Solution {
  public:
      /**
       *
       * @param root TreeNode类
       * @param sum int整型
       * @return bool布尔型
       */
      bool hasPathSum(TreeNode* root, int sum) {
          // write code here
          if (!root) return false;
          return preOrder(root, sum, 0);
      }

      bool preOrder(TreeNode *root, int &sum, int current) {
          if (!root) return false;
          current += root->val;
          if (!root->left && !root->right && sum == current) return true;
          return preOrder(root->left, sum, current) || preOrder(root->right, sum, current);
      }
  };

// 编写一个函数来查找字符串数组中的最长公共前缀。
// ["abca","abc","abca","abc","abcc"]
// "abc"

function longestCommonPrefix( strs ) {
  // write code here
}

/*
请实现有重复数字的升序数组的二分查找
给定一个 元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1
[1,2, 2,3,4,5] 2
(0 + 5) / 2 = 2
*/
function search( nums ,  target ) {
  // write code here
  var left = 0;
  var right = nums.length - 1;

  while (left <= right) {
    var mid = (left + right) >> 1;

    if (nums[mid] > target) {
      right = mid - 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      while (mid != 0 && (nums[mid-1] == nums[mid])) {
        mid--;
      }
      return mid;
    }
  }

  return -1;
}


function search(nums, target) {
  var left = 0;
  var right = nums.length - 1;
  var mid = 0;

  while (left <= right) {
    mid = (left + right) >> 1;

    if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    } else {
      while (
        mid > 0 && nums[mid] === nums[mid-1]
      ) {
        mid--;
      }

      return mid;
    }
  }
}

/**
给定一个数组由一些非负整数组成，现需要将他们进行排列并拼接，使得最后的结果最大，返回值需要是string类型 否则可能会溢出
[30,1]  "301"
[10, 1, 3]
*/
function insertionSort(data) {
  for (var i = 1; i < nums.length; i++) {
    var target = nums[i];

    for (var j = i - 1; j>=0 && data[j] < target; j--) {
      data[j+1] = data[j];
    }

    data[j+1] = target;
  }

  return data;
}

function quickSort(nums) {
  return _quick(nums, 0, nums.length - 1);
}

function _quick(data, left, right) {
  if (data.length > 1) {
    var midIndex = _partition(data, left, right);

    if (left < midIndex - 1) {
      _quick(data, left, midIndex - 1);
    }

    if (midIndex < right) {
      _quick(data, midIndex, right);
    }
  }

  return data;
}

function _partition(data, left, right) {
  var mid = (left + right) >> 1;
  var pivot = data[mid];

  while (left <= right) {
    while (data[left] > pivot) {
      left++;
    }

    while (data[right] < pivot ) {
      right--;
    }

    if (left <= right) {
      var temp = data[left];
      data[left] = data[right];
      data[right] = temp;
      left++;
      right--;
    }
  }

  return left;
}

function solve( nums ) {
  // write code here
  var N = nums.length;
  // [3,2,1];



  if (N <= 100) {
    insertionSort(nums);
  } else {
    quickSort(nums);
  }

  return nums.join('');
}

/*
输入一个链表，输出该链表中倒数第k个结点。
如果该链表长度小于k，请返回空。
// [1,2,3,4,5]
{1,2,3,4,5},6
*/

function FindKthToTail( pHead ,  k ) {

    // write code here
    if (pHead == null) return null;
    var len = 0;

    var current = pHead;
    while (current) {
      len++;
      current = current.next;
    }

    if (len < k) return null;


    var fast = pHead;
    var slow = pHead;

    for (var i = 0; i < k; i++) {
      fast = fast.next;
    }

    while (fast) {
      fast = fast.next;
      slow = slow.next;
    }

    return slow;

}

/*
给定数组arr，arr中所有的值都为正整数且不重复。每个值代表一种面值的货币，每种面值的货币可以使用任意张，再给定一个aim，代表要找的钱数，求组成aim的最少货币数。

*/
// state dp[i] 最少货币数
// state fn: dp[i] = Math.min(dp[i-arr[0]], dp[i-arr[1],...,dp[i-arr[n]]]) + 1;
function minMoney( arr ,  aim ) {
  // write code here
  var dp = Array(aim + 1);
  dp[0] = 0;

  for (var i = 1; i <= aim; i++) {
    dp[i] = Number.MAX_VALUE;
    for (var j = 0; j < arr.length; j++) {

      if (i-arr[j] >= 0 && dp[i-arr[j]] != Number.MAX_VALUE) {
        dp[i] = Math.min(dp[i], dp[i-arr[j]] + 1);
      }
    }
  }

  if (dp[aim] === Number.MAX_VALUE) {
    dp[aim] = -1;
  }

  return dp[aim];
}

// 山峰元素是指其值大于或等于左右相邻值的元素。给定一个输入数组nums，任意两个相邻元素值不相等，数组可能包含多个山峰。找到索引最大的那个山峰元素并返回其索引。
// [2,4,1,2,7,8,4]   5
// [2,4,1]
function solve( a ) {
  // write code here

  if (a.length < 3) return -1;
  var maxIndex = -1;
  var max = -1;
  var currentIndex;
  var current, left, right;

  for (var i = 1; i < a.length - 1; i++) {
    current = a[i];
    currentIndex = i;
    left = a[i-1];
    right = a[i+1];

    if (current >= left && current >= right) {
      maxIndex = currentIndex > maxIndex ? currentIndex : maxIndex;
    }
  }

  return maxIndex;
}

function searchMatrix( matrix ,  target ) {
  // write code here
  var curr = next = undefined;

  for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
          curr = matrix[i][j];
          next = matrix[i][j+1];

          if (target == curr) return true;
          if (target > curr && target < next) {
              break;
          }
      }
  }

  return false;
}

function searchMatrix(matrix, target) {
  var curr = next = undefined;

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[0].length; j++) {
      curr = matrix[i][j];
      next = matrix[i][j+1];

      if (target === curr) return true;
      if (target > curr && target < next) break;
    }
  }

  return false;
}

function Mirror( pRoot ) {
  // write code here
  if (pRoot == null) return null;

  var temp = pRoot.left;
  pRoot.left = pRoot.right;
  pRoot.right = temp;

  Mirror(pRoot.left);
  Mirror(pRoot.right);

  return pRoot;
}

function mergeTrees(t1, t2) {
  if (t1 == null) return t2;
  if (t2 == null) return t1;
  var merged = new TreeNode(t1.val + t2.val);

  merged.left = mergeTrees(t1.left, t2.left);
  merged.right = mergeTrees(t1.right, t2.right);

  return merged;
}

function mergeTrees(t1, t2) {
  if (t1 == null) return t2;
  if (t2 == null) return t1;
  var merged = new TreeNode(t1.val + t2.val);
  merged.left = mergeTrees(t1.left, t2.left);
  merged.right = mergeTrees(t1.right, t2.right);

  return merged;
}

// 假设链表中每一个节点的值都在 0 - 9 之间，那么链表整体就可以代表一个整数。
// 给定两个这种链表，请生成代表两个整数相加值的结果链表。
// 例如：链表 1 为 9->3->7，链表 2 为 6->3，最后生成新的结果链表为 1->0->0->0。
function addInList( head1 ,  head2 ) {
  // write code here
  var stack1 = [];
  var stack2 = [];

  while (head1 || head2) {
    if (head1) {
      stack1.push(head1.val);
      head1 = head1.next;
    }

    if (head2) {
      stack2.push(head2.val);
      head2 = head2.next;
    }
  }

  var dummy = new ListNode(null);
  var carry = 0;

  while (
    stack1.length != 0 || stack2.length != 0 || carry != 0
  ) {
    var a = b = 0;

    if (stack1.length != 0) {
      a = stack1.pop();
    }

    if (stack2.length != 0) {
      b = stack2.pop();
    }

    var sum = a + b + carry;
    var ans = sum % 10;
    carry = Math.floor(sum / 10);
    var cur = new ListNode(ans);
    cur.next = dummy.next;
    dummy.next = cur;
  }

  return dummy.next;
}

// 给定一棵二叉树以及这棵树上的两个节点 o1 和 o2，请找到 o1 和 o2 的最近公共祖先节点。
/**
 *
 * @param root TreeNode类
 * @param o1 int整型
 * @param o2 int整型
 * @return int整型
 */
function lowestCommonAncestor( root ,  o1 ,  o2 ) {
  // write code here

}

var lowestCommonAncestor = function(root, p, q) {
  let ans;
  const dfs = (root, p, q) => {
      if (root === null) return false;
      const lson = dfs(root.left, p, q);
      const rson = dfs(root.right, p, q);
      if ((lson && rson) || ((root.val === p.val || root.val === q.val) && (lson || rson))) {
          ans = root;
      }
      return lson || rson || (root.val === p.val || root.val === q.val);
  }
  dfs(root, p, q);
  return ans;
};

// 请根据二叉树的前序遍历，中序遍历恢复二叉树，并打印出二叉树的右视图
// [1,2,4,5,3],[4,2,5,1,3]
// [1,3,5]

/*

            1
        2     4
      5  3

      1
    2   3
  4   5
*/

function solve( xianxu ,  zhongxu ) {
  // write code here
}

// 先序确定根节点，中序确定左右子树；

// 左右子树又可以继续拆分，继续确定子树的根节点及左右子；


public TreeNode reBuild (int[] preOrder, int[] inOrder) {

  if (preOrder == null || preOrder.length == 0) return null;

  int val = preOrder[0], pos = 0, len = preOrder.length;
  TreeNode root = new TreeNode(val);

  // 找到中序数组中根节点位置
  for(; pos < len; pos++){
      if (inOrder[pos] == val) break;
  }
  // 左右子树继续拆分，递归重构
  // 此处 Arrays.copyOfRange 方法起点为 len 不抛异常，返回[]，对应递归结束条件。
  root.left = reBuild(Arrays.copyOfRange(preOrder, 1, pos + 1),
          Arrays.copyOfRange(inOrder, 0, pos));
  root.right = reBuild(Arrays.copyOfRange(preOrder, pos + 1, len),
          Arrays.copyOfRange(inOrder, pos + 1, len));

  return root;
}

function lowestCommonAncestor(root, p, q) {
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q)
  }

  if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q)
  }

  return root;
}

/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 * 求二叉树的右视图
 * @param xianxu int整型一维数组 先序遍历
 * @param zhongxu int整型一维数组 中序遍历
 * @return int整型一维数组
 */
 function solve( xianxu ,  zhongxu ) {
  // write code here
  function buildTree(preorder, inorder) {
      if (!preorder.length) return null
      const rootVal = preorder[0]
      const root = new ListNode(rootVal)
      const rootIndex = inorder.indexOf(rootVal)
      const left = inorder.slice(0, rootIndex)
      const right = inorder.slice(rootIndex + 1)
      if (left.length) {
          root.left = buildTree(preorder.slice(1, left.length + 1), left)
      }
      if (right.length) {
          root.right = buildTree(preorder.slice(left.length + 1), right)
      }
      return root
  }
  const root = buildTree(xianxu, zhongxu)
  /**
       1
    2     3
  4
   */
  let queue = [root]
  const res = []
  while(queue.length) {
      const newQueue = []
      const len = queue.length
      for (let i = 0; i < len; i++) {
          const root = queue[i]
          if (i === queue.length - 1) res.push(root.val)
          root.left && newQueue.push(root.left)
          root.right && newQueue.push(root.right)
      }
      queue = newQueue
  }
  return res
}

function buildTree(preOrder, inOrder) {
  if (preOrder.length == 0) return null;
  var rootVal = preOrder[0];
  var root = new ListNode(rootVal);
  var rootIndex = inOrder.indexOf(rootVal);
  var left = inOrder.slice(0, rootIndex);
  var right = inOrder.slice(rootIndex+1);
  if (left.length > 0) {
    root.left = buildTree(preOrder.slice(1, left.length + 1), left);
  }
  if (right.length > 0) {
    root.right = buildTree(preOrder.slice(left.length + 1), right);
  }

  return root;
}


function solve(xianxu, zhongxu) {
  var root = buildTree(xianxu, zhongxu);
  var queue = [root];
  var temp;
  var ret = [];

  while (queue && queue.length > 0) {
    temp = [];

    for (var i = 0; i < queue.length; i++) {
      var node = queue[i];
      if (i == queue.length - 1) ret.push(node.val);
      node.left && temp.push(node.left);
      node.right && temp.push(node.right);
    }

    queue = temp;
  }

  return ret;
}


function solve(xianxu, zhongxu) {
  function buildTree(preorder, inorder) {
    if (preorder.length == 0) return null;
    var rootVal = preorder[0];
    var root = new ListNode(rootVal);
    var rootIndex = inorder.indexOf(rootVal);
    var left = inorder.slice(0, rootIndex);
    var right = inorder.slice(rootIndex+1);
    if (left.length > 0) {
      root.left = buildTree(preorder.slice(1, left.length + 1), left);
    }

    if (right.length > 0) {
      root.right = buildTree(preorder.slice(left.length+1), right);
    }

    return root;

  }

  var root = buildTree(xianxu, zhongxu);

  var queue = [root];
  var temp = [];
  var ret = [];

  while (queue && queue.length > 0) {
    temp = [];

    for (var i = 0; i < queue.length; i++) {
      var node = queue[i];

      if (i === queue.length - 1) ret.push(node.val);

      node.left && temp.push(node.left);
      node.right && temp.push(node.right);
    }

    queue = temp;
  }

  return ret;
}

/*
 * function TreeNode(x) {
 *   this.val = x;
 *   this.left = null;
 *   this.right = null;
 * }
 */

/**
 *
 * @param root TreeNode类
 * @param o1 int整型
 * @param o2 int整型
 * @return int整型
 */
 function dfs(root,o1,o2){
  if(root == null || root.val == o1 || root.val == o2){
          return root;
  }
  //递归遍历左子树
  let left = dfs(root.left,o1,o2);
  //递归遍历右子树
  let right = dfs(root.right,o1,o2);
  //如果left、right都不为空，那么代表o1、o2在root的两侧，所以root为他们的公共祖先
  if(left && right) return root;
  //如果left、right有一个为空，那么就返回不为空的那一个
  return left != null? left : right;
}

function lowestCommonAncestor( root ,  o1 ,  o2 ) {
  // write code here

}

/*
最近公共祖先和o1,o2有三种关系：
o1,o2分别在祖先左右两侧
祖先是o1，o2在祖先左/右侧
祖先是o2，o1在祖先左/右侧
使用dfs深度遍历，如果节点为o1,o2中其中一个直接返回，如果节点超过叶子节点也返回

*/

public int lowestCommonAncestor (TreeNode root, int o1, int o2) {
  return CommonAncestor(root, o1, o2).val;
}
public TreeNode CommonAncestor (TreeNode root, int o1, int o2) {
  if (root == null || root.val == o1 || root.val == o2) { // 超过叶子节点，或者root为p、q中的一个直接返回
      return root;
  }
  TreeNode left = CommonAncestor(root.left,o1,o2); // 返回左侧的p\q节点
  TreeNode right = CommonAncestor(root.right,o1,o2); // 返回右侧的p\q节点
  if (left == null) {  // 都在右侧
      return right;
  }
  if (right == null) { // 都在左侧
      return left;
  }
  return root; // 在左右两侧
}

function lowestCommonAncestor(root, o1, o2) {
  if (root == null) return null;
  function walk(node, o1, o2) {
    if (node == null || node.val == o1 || node.val == o2) return node;

    var left = walk(node.left, o1, o2);
    var right = walk(node.right, o1, o2);

    if (left == null) return right;
    if (right == null) return left;

    return node;
  }

  return walk(root, o1, o2).val;
}


function lowestCommonAncestor(root, o1, o2) {
  if (root == null) return null;

  function commonAncestor(node, o1, o2) {
    if (node == null || node.val == o1 || node.val == o2) return node;

    var left = commonAncestor(node.left, o1, o2);
    var right= commonAncestor(node.right, o1, o2);

    if (left == null) return right;
    if (right == null) return left;

    return node;
  }

  return commonAncestor(root, o1, o2);
}

function judge( str ) {
  // write code here

  var start = 0, end = str.length - 1;

  while (start <= end) {
    if (str[start] != str[end]) return false;
    start++;
    end--;
  }

  return true;

  // var stack = [];
  // for (var i = 0; i < str.length; i++) {
  //   stack.push(str[i]);
  // }

  // var newStr = '';

  // while (stack && stack.length > 0) {
  //   newStr += stack.pop();
  // }

  // return str === newStr;
}
// 12
/**
 * 进制转换
 * @param M int整型 给定整数
 * @param N int整型 转换到的进制
 * @return string字符串
 */
function solve( M ,  N ) {
  // write code here
  var val = M;
  var dev = N;
  var mod = 0;
  var res = [];
  var nums = '0123456789ABCDEF';

  while (val != 0) {
    mod = val % dev;
    val = Math.floor(val / dev);
    res.unshift(nums[mod]);
  }

  return res.join('');
}

public String solve (int M, int N) {
  // write code here
  if(M == 0)  return "0";
  String s = "0123456789ABCDEF";
  StringBuffer sb = new StringBuffer();
  boolean f = false;
  if(M < 0){
      f = true;
      M = -M;
  }
  while(M != 0){
      sb.append(s.charAt(M%N));
      M /= N;
  }
  if(f) sb.append("-");
  return sb.reverse().toString();
}

function solve(M, N) {
  if (M == 0) return '0';
  var nums = '0123456789ABCDEF';
  var ret = [];

  while (M != 0) {
    ret.unshift(nums.charAt(Math.floor(M%N)));
    M = Math.floor(M/N);
  }

  return ret.join('');
}

/*

给定String类型的数组strArr，再给定整数k，请严格按照排名顺序打印 出次数前k名的字符串。
[要求]
如果strArr长度为N，时间复杂度请达到

输出K行，每行有一个字符串和一个整数（字符串表示）。
你需要按照出现出现次数由大到小输出，若出现次数相同时字符串字典序较小的优先输出
["1","2","3","4"],2
[["1","1"],["2","1"]]

*/

function MoreThanHalfNum_Solution(numbers)
{
    // write code here
    var len = numbers.length;
    var half = len >> 1;

    var map = {};

    for (var i = 0; i < len; i++) {
      var elem = numbers[i];
      if (map[elem] == null) {
        map[elem] = 1;
      } else {
        map[elem]++;

        if (map[elem] > hafl) {
          return
        }
      }
    }
}

function merge(l1, l2) {
  if (l1 == null) return l2;
  if (l2 == null) return l1;

  var dummy = new ListNode(null);
  var current= dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }

    current = current.next;
  }

  current.next = l1 == null ? l2 : l1;

  return dummy.next;
}

function two(numbers, target) {
  var map = new Map();


  for (var i = 0; i < numbers.length; i++) {
    if (map.has(target-numbers[i])) {
      return [map.get(target-numbers[i]), i+1];
    }
    map.set(numbers[i], i+1);
  }
}

function push(node) {
  stack1.push(node)
}

function pop() {
  if (stack2.length == 0) {
    while (stack1.length > 0) {
      stack2.push(stack1.pop());
    }
  }

  if (stack2.length == 0) return null;

  return stack2.pop();
}

// state: dp[i] floor(i) contains numbers;
// state fn: dp[i] = dp[i-1] + dp[i-2];
// initial: dp[0] = 0, dp[1] = 1, dp[2] = 2;
function levelOrder( root ) {
  // write code here
  if (root == null) return null;
  var ret = [];
  var queue = [root];
  var tmp;

  while (queue && queue.length > 0) {
    tmp = [];
    var box = [];
    for (var node of queue) {
      box.push(node.val);
      node.left && tmp.push(node.left);
      node.right && tmp.push(node.right);
    }
    queue = tmp;
    ret.push(box);
  }

  return ret;
}

function findKth( a ,  n ,  K ) {
  // write code here
  for (var i = 0; i < a.length - 1; i++) {
    var minIndex = i;
    for (var j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIndex]) {
        minIndex = j;
      }
    }

    var tmp = a[i];
    a[i] = a[minIndex];
    a[minIndex] = tmp;
  }

  return a[K-1];
}

// [1,2,3,4]    5
function twoSum(numbers, target) {
  var map = {};
  for (var i = 0; i < numbers.length; i++) {
    var rest = target - numbers[i];

    if (map[rest]) {
      return [map[rest], i+1]
    } else {
      map[numbers[i]] = i + 1;
    }
  }

  return []
}

/*
    1 -> 2 -> 3
cur
    2 -> 4 -> 7

*/
function mergeTwoLists( l1 ,  l2 ) {
  if (l1 == null) return l2;
  if (l2 == null) return l1;

  var dummy = new ListNode(null);
  var cur = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }

    cur = cur.next;
  }

  cur.next = l1 == null ? l2 : l1;

  return dummy.next;
}

function mergeTwoLists(l1, l2) {
  if (l1 == null) return l2;
  if (l2 == null) return l1;

  var dummy = new ListNode(null);
  var cur = dummy;

  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }

    cur = cur.next;
  }

  cur.next = l1 == null ? l2 : l1;

  return dummy.next;
}

var stack1 = [];
var stack2 = [];
// [1,2,3,4]
function push(val) {
  stack1.push(val);
};

function pop() {
  if (stack2.length === 0) {
    while (stack1.length > 0) {
      stack2.push(stack1.pop());
    }
  }

  if (stack2.length == 0) return null;

  return stack2.pop();
}

// state: dp[i] i floors have methos
// state fn: dp[i] = dp[i-1] + dp[i-2]
// dp[0] = 0, dp[1] = 1, dp[2] = 2
function climbStairs(n) {
  if (n <= 2) return n;

  var dp[0] = 0, dp[1] = 1, dp[2] = 2;

  for (var i = 3; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }

  return dp[n];
}
// 1 -> 2 -> 3 -> 4 -> 5
// 2 -> 1 -> 4 -> 3 -> 5
function reverseKGroup( head ,  k ) {
  // write code here

}

// 给定一个数组arr，返回子数组的最大累加和
// 例如，arr = [1, -2, 3, 5, -2, 6, -1]，所有子数组中，[3, 5, -2, 6]可以累加出最大的和12，所以返回 12.
//
function maxsumofSubarray( arr ) {
  // write code here

}

// 给定一棵二叉树以及这棵树上的两个节点 o1 和 o2，请找到 o1 和 o2 的最近公共祖先节点。

function lowestCommonAncestor( root ,  o1 ,  o2 ) {
  // write code here
if (root == null) return null;

function walk(node, o1, o2) {
  if (node == null || node.val == o1 || node.val == o2) return node;

  var left = walk(node.left, o1, o2);
  var right = walk(node.right, o1, o2);

  if (left == null) return right;
  if (right == null) return left;

  return node;
}

return walk(root, o1, o2).val;
}
/*        1
      2      3
  4        5
*/
function lowestCommonAncestor(root, o1, o2) {
  if (root == null) return null;

  function walk(node, o1, o2) {
    if (node == null || node.val == o1.val || node.val == o2.val) return node;

    var left = walk(node.left, o1, o2);
    var right = walk(node.right, o1, o2);

    if (left == null) return right;
    if (right == null) return left;

    return node;
  }

  return walk(root, o1, o2).val;
}


function lowestCommonAncestor(root, o1, o2) {
  if (root == null) return null;

  function getCommonAncestor(node, o1, o2) {
    if (node == null || node.val == o1.val || node.val == o2.val) return node;

    var left = getCommonAncestor(node, o1, o2);
    var right = getCommonAncestor(node, o1, o2);

    if (left == null) return right;
    if (right == null) return left;

    return node;
  }

  return getCommonAncestor(root, o1, o2).val;
}

function solve( str ) {
  // write code here
  var ret = '';

  for (var i = 0; i < str.length; i++) {
    var char = str[i];
    ret = char + ret;
  }

  return ret;
}
// [[1,2,3],[4,5,6],[7,8,9]]

function spiralOrder( matrix ) {
  // write code here
  if (matrix.length == 0) return [];
  var l = 0;
  var t = 0;
  var r = matrix[0].length - 1;
  var b = matrix.length - 1;
  var ret = [];
  var index = 0;

  while (true) {
    for (var i = l; i <= r; i++) {
      ret[index++] = matrix[t][i];
    }

    if (++t > b) break;

    for (var i = t; i <= b; i++) {
      ret[index++] = matrix[i][r];
    }

    if (--r < l) break;

    for (var i = r; i >= l; i--) {
      ret[index++] = matrix[b][i];
    }

    if (--b < t) break;

    for (var i = b; i >= t; i--) {
      ret[index++] = matrix[i][l];
    }

    if (++l > r) break;
  }

  return ret;
}

function spiralOrder(matrix) {
  if (matrix.length == 0) return [];
  var l = 0;
  var t = 0;
  var r = matrix[0].length - 1;
  var b = matrix.length - 1;
  var ret = [];
  var index = 0;

  while (true) {
    for (var i = l; i <= r; i++) {
      ret[index++] = matrix[t][i];
    }

    if (++t > b) break;

    for (var i = t; i <= b; i++) {
      ret[index++] = matrix[i][r];
    }

    if (--r < l) break;

    for (var i = r; i >= l; i--) {
      ret[index++] = matrix[b][i];
    }

    if (--b < t) break;

    for (var i = b; i >= t; i--) {
      ret[index++] = matrix[i][l];
    }

    if (++l > r) break;
  }

  return ret;
}



function sprialOrder(matrix) {
  if (matrix.length == 0) return [];
  var l = 0;
  var t = 0;
  var r = matrix[0].length - 1;
  var b = matrix.length - 1;
  var ret = [];

  while (true) {
    for (var i = l; i <= r; i++) {
      ret[index++] = matrix[t][i];
    }

    if (++t > b) break;

    for (var i = t; i <= b; i++) {
      ret[index++] = matrix[i][r];
    }

    if (--r < l) break;

    for (var i = r; i >= l; i--) {
      ret[index++] = matrix[b][r];
    }

    if (--b < t) break;

    for (var i = b; i >= t; i--) {
      ret[index++] = matrix[i][l];
    }

    if (++l > r) break;
  }

  return ret;
}
// 0 1 1 2 3
// state: dp[i]
// state fn: dp[i] = dp[i-1] + dp[i-2]
// initial: dp[0] = 0, dp[1] = 1;
// dp method
function dyFibonacci(n)
{
    // write code here
    if (n < 2) return n;
    var dp = Array(n+1);
    dp[0] = 0;
    dp[1] = 1;

    for (var i = 2; i <= n; i++) {
      dp[i] = dp[i-1] + dp[i-2];
    }

    return dp[n];
}

// 迭代
function iterFibonacci(n) {
  if (n < 2) return n;
  var cur = 0;
  var next = 1;
  var index = 1;
  //  4
  while (index < n) {
    var tmp = next;
    next = cur + next;
    cur = tmp;
    index++;
  }

  return next;
}

function recurFib(n) {
  if (n < 2) return n;

  return recurFib(n-1) + recurFib(n-2);
}

// 对于一个字符串，请设计一个高效算法，计算其中最长回文子串的长度。

// 给定字符串A以及它的长度n，请返回最长回文子串的长度。

// "abc1234321ab",12   7
function getLongestPalindrome(A: string, n: number): number {
  // write code here

}


function threeSum(num) {
  // write code here
  var ret = [];
  var len = num.length;
  num.sort((a,b) => a - b)

  for (var i = 0; i < len - 2; i++) {
    var head = i + 1;
    var tail = len - 1;

    while (head < tail) {
      var sum = num[i] + num[head] + num[tail];

      if (sum > 0) {
        tail--;
      } else if (sum < 0) {
        head++;
      } else {
        ret.push([num[i], num[head], num[tail]]);

        while (head + 1 < tail && num[head+1] == num[head]) head++;
        while (tail - 1 > head && num[tail-1] == num[head]) tail--;

        head++;
        tail--;
      }
    }

    while (i+1 < len-2 && num[i+1] == num[i]) i++;
  }

  return ret;
}

