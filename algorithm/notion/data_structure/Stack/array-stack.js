/**
 * @desc 数组栈
 */
function ArrayStack() {
  this.data = [];
  this.push = push;
  this.pop = pop;
  this.peek = peek;
  this.isEmpty = isEmpty;
  this.clear = clear;
  this.size = size;
}

function push(elem) {
  return this.data.push(elem);
}

function pop() {
  return this.data.pop();
}

function peek() {
  return this.data[this.data.length - 1];
}

function isEmpty() {
  return this.data.length === 0;
}

function clear() {
  this.data.length = 0;
}

function size() {
  return this.data.length;
}

function isPalindrome(word) {
	var stack = new ArrayStack();

	for (var i = 0; i < word.length; i++) {
		stack.push(word[i]);
	}

	var newWord = '';
	while (!stack.isEmpty()) {
		newWord += stack.pop();
  }

  return word === newWord;
}

console.log(isPalindrome('123'));

function fact(n) {
  var stack = new ArrayStack();

  while (n>1) {
    stack.push(n--);
  }

  var ret = 1;
  while (!stack.isEmpty()) {
    ret *= stack.pop();
  }

  return ret
}

console.log(fact(34))