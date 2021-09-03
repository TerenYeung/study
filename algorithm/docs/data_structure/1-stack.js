/**
 * 栈
 * @description
 * @ADT
 * push(elem)
 * pop()
 * peek()
 * clear()
*/
class Stack {
  constructor() {
    this._data = [];
  }
  push(elem) {
    return this._data.push(elem);
  }
  pop() {
    return this._data.pop();
  }
  peek() {
    return this._data[this._data.length - 1];
  }
  clear() {
    this._data = [];
  }
  isEmpty() {
    return this._data.length === 0;
  }
  size() {
    return this._data.length;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
stack.push(4);
// console.log(stack.isEmpty());
// console.log(stack._data);
stack.pop();
stack.pop();
// console.log(stack.size());
// console.log(stack._data);

const NUM = 3;
// 进制准换
function systemConverter(num, base) {
  // 迭代算法与栈数据结构运用；
  const stack = new Stack();
  do {
    stack.push(num % base);
    num = Math.floor(num / base);
  } while(num > 0)

  let ret = '';
  while (!stack.isEmpty()) {
    ret += stack.pop();
  }
  return ret;
}

// console.log(systemConverter(NUM, 2));

// 回文测试
var WORD = 'hi';
function isPlalindrome(word) {
  const stack = new Stack();
  for (let i = 0; i < word.length; i++) {
    stack.push(word[i]);
  }

  let ret = '';
  while (!stack.isEmpty()) {
    ret += stack.pop();
  }

  return word === ret;
}
// console.log(isPlalindrome(WORD));