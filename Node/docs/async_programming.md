# 异步编程

## 实现思路

### Promise

### Generator

- Generator 的理解

一种状态机，封装多个内部状态；

iterator 生成函数，调用 Generator 函数后并不马上执行，返回的是 iterator 对象；

```js
var gen = function* () {
  console.log('head')
  yield 1
  console.log('middle')
  yield 2
  console.log('tail')
  yield 3
  console.log('end')
  return 4
}
```

从状态机的角度理解 generator，gen.next() 是抵达下一个状态的方法，yield 既是状态暂停点又是状态返回值

- next 方法

iterator.next() 方法是抵达下一个状态的方法，还可以向 next 方法传递参数，该参数将作为上一个 yield 的返回值；

也就是说，iterator.next() 可以将 generator 内部的值返回到外部，next(参数)可以将外部的值传递到内部

```js
function* gen() {
	let a = yield 1
	let b = a + 1
	yield b
	return 'finish'
}

let g = gen()
g.next() // {value: 1, done: false}
g.next(4) // {value: 5, done: false}
g.next() // {value: "finish", done: true}
```

- yield 表达式

当 iterator 调用 next 方法是将返回 yield 后面的值，通过给 next、throw等方法传参，可以为上一步 yield 赋值；

如果在一个 generator 内部“释放” iterator 内部的各个状态，可以使用 yield\*

```js
function g* (){yield 1; yield [1,2,3]; yield 4}
for (let v of g()) {console.log(v)}
/*
1
[1, 2, 3]
4
*/

function g2* () {yield 1; yield* [1,2,3]; yield 4}
for (let v of g2()) {console.log(v)}
/*
1
1
2
3
4
*/
```

```js
function* gen() {yield 1; yield gen2(); yield 4;}
function* gen2() {yield 5; yield 5;}
for (let v of gen()) {console.log(v)}
/*
1
gen2()
4
*/

function* gen (){yield 1; yield* gen2(); yield 4}
for (let v of gen()) {console.log(v)}
/*
1
5
6
4
*/
```



- Generator.prototype.throw() 和 Generator.prototype.return()


**Generator.prototype.throw**

Generator 返回的 iterator 有一个 throw 方法，可以在函数体外抛出错误，在函数体内捕获，如果函数体内没有捕获，那么可以在外部进行捕获，如果内外部均没有部署 try...catch 代码，那么程序将报错中断

```js
var g = function*() {
	try {
		yield 1
	} catch (e) {console.log('内部捕获', e)}
}
var i = g()
i.next() // 注意在调用 i.throw 之前必须先调用一次 i.next()，因为首先要执行一次内部的代码才会启动内部捕获，否则将直接在外部报错

try {
	i.throw('a');i.throw('b')
} catch (e) {console.log('外部捕获', e)}

/*
内部捕获 a
外部捕获 b
*/

```

Generator.prototype.return 方法将返回给定值给 iterator 并终止迭代

```js
function* gen() {yield 1; yield 2; yield 3;}
var g = gen()
g.next() // {value: 1, done: false}
g.return('teren') // {value: 'teren', done: true}
g.next() // {value: undefined, done: true}
```

如果 Generator 函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。

```js
function* numbers () {
  yield 1;
  try {
    yield 2;
    yield 3;
  } finally {
    yield 4;
    yield 5;
  }
  yield 6;
}
var g = numbers();
g.next() // { value: 1, done: false }
g.next() // { value: 2, done: false }
g.return(7) // { value: 4, done: false }
g.next() // { value: 5, done: false }
g.next() // { value: 7, done: true }
```

next(), throw() 和 return() 三者都是向 generator 内部的 yield 传值，其中 next(1) 相当于 yield = 1，throw(1) 相当于 yield = throw(new Error(1))，return(1) 相当于 yield = return 1

- **generator 的应用场景**

**异步操作同步化表达**

Generator 具有暂停执行效果，因此可以将异步操作放到 yield 后，通过 next() 执行完异步操作后，再进行后续操作；

从 Generator 的代码书写形式看是“同步”执行代码

```js
function* loadUI() {
  showLoading()
  yield axios.get('http://api.example.com')
  hideLoading()
}

let loader = loadUI()

// 执行 loading，并发起 ajax 请求
var after = loader.next().value
// 加载完数据后，隐藏 loading
after.then(res => {
  loader.next()
})
loader.next()

// 或者是
function* loadUI(url, iterator) {
  showLoading()
  let res = yield request(url, iterator)
  console.log(res)
  hideLoading()
}

function request(url, it) {
  axios.get(url)
    .then(res => it.next(res))
    .catch(err => it.throw(err))
}

var run = loadUI()
run.next()
```
**控制流管理**

**部署 Iterator 接口**

**类数组的数据结构**

- generator 的异步应用

**函数与高阶函数**

**curry 与 thunk 函数**

柯里化的本质是将函数的部分实参临时存储下来，直到实参个数与形参个数相等时才执行函数；

```js
// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
const curry = (fn) => {
  // 计算形参的个数
  const arity = fn.length;
  
  // 返回柯里化后的函数
  return function $curry(...args) {
    // 如果实参个数小于形参，则继续返回柯里化后的函数
    if (args.length < arity) {
      return $curry.bind(null, ...args);
    }
    
    // 直到实参与形参相等时，执行函数
    return fn.call(null, ...args);
  };
};

function sum (x ,y, z) {let arr = Array.from(arguments) return arr.reduce((acc, cur) => acc + cur)}

sum(1,2,3) // 6
let currySum = curry(sum)
currySum(1)(2)(3) // 6
```

thunk 函数是柯里化在异步编程中的一种实践，可以实现异步接口的参数“分步骤传递”

```
// 案例一
var fs = require('fs');
var thunkify = require('thunkify');
var readFileThunk = thunkify(fs.readFile);

var gen = function* (){
  var r1 = yield readFileThunk('/etc/fstab');
  console.log(r1.toString());
  var r2 = yield readFileThunk('/etc/shells');
  console.log(r2.toString());
};
// 通过回调函数，手动执行任务流
var g = gen();

var r1 = g.next();
r1.value(function (err, data) {
  if (err) throw err;
  var r2 = g.next(data);
  r2.value(function (err, data) {
    if (err) throw err;
    g.next(data);
  });
});

// 案例二
基于回调函数通过自动执行器，自动执行任务流
function run(fn) {
  var gen = fn()
  function next(err, data) {
    var result = gen.next(data)
    if (result.done) return
    result.value(next)
  }

  next()
}

run(g)
// co 模块是一个 generator 自动执行器
var gen = function* () {
  var f1 = yield readFile('/etc/fstab');
  var f2 = yield readFile('/etc/shells');
  console.log(f1.toString());
  console.log(f2.toString());
};
var co = require('co');
co(gen);

//co 模块其实就是将两种自动执行器（Thunk 函数和 Promise 对象），包装成一个模块。使用 co 的前提条件是，Generator 函数的yield命令后面，只能是 Thunk 函数或 Promise 对象。如果数组或对象的成员，全部都是 Promise 对象，也可以使用 co。
```

[example](http://es6.ruanyifeng.com/#docs/generator-async)

### Async && Await

async 函数本质上是 Generator 函数的语法糖

```js
const co = require('co')

// Generator
const readFile = function(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) return reject(error)
      resolve(data)
    })
  })
}

const gen = function* () {
  const f1 = yield readFile('/etct/f1')
  const f2 = yield readFile('/etc/f2')
  console.log(f1.toString())
  console.log(f2.toString())
}

co(gen).then(() => {console.log('finished')})
```

```js
const asyncReadFile = async function() {
  const f1 = await readFile('/etc/f1')
  const f2 = await readFile('/etc/f2')
  console.log(f1.toString())
  console.log(f2.toString())
}

asyncReadFile()
```

通过对比 async 与 generator 可发现，async函数就是将 Generator 函数的星号（\*）替换成async，将yield替换成await。

async 函数特征是：

1. async 执行后返回一个 Promise 实例；
2. await 后面可跟原始类型值或 Promise 对象，而 co 模块约定 yield 后面只能跟 thunk 化函数或 Promise 对象
3. async 函数内置自动执行器，而 Generator 函数自动执行需依靠特定的自动执行器，如 co；

- 错误处理

可以通过把 await 命令放在 try...catch 代码中进行错误捕获，并且不会影响后续代码的执行

```js
async function a() {
  try {
    await Promise.reject(1)
  } catch (err) {
    console.log(err)
  }
  console.log(2)
  return 3
}

a().then(v => console.log(v))
/*
1
2
3
*/
```

- 串行与并行执行

如果多个 await 命令后面存在异步操作；

多个异步操作不存在依赖关系，可以并行执行以缩短执行时间

```js
async Parallel() {
  let [x, y] = await Promise.all([getX(), getY()])
  console.log(x)
  console.log(y)
}
```

如果存在依赖关系，则应串行执行；

```js
async Series() {
  let x = await getX()
  let y = await getY()
  console.log(x)
  console.log(y)
}
```
- async 函数实现原理

async 函数就是将 Generator 函数和自动执行器包装在一个函数

```
async function fn(args) {
}

// 等同于

function spawn(gen) {
  // async 函数执行后返回一个 Promise 实例
  return new Promise((resolve, reject) => {
    const g = gen()
    function step(nextGen) {
      let next
      try {
        next = nextGen()
      } catch (e) {
        return reject(e)
      }
      
      if (next.done) return resolve(next.value)
      // 将 await 里的 Promise 操作传入 Promise.resolve，直到异步操作状态发送变化时，再将 value 通过 g.next 传递回给 async 函数中
      Promise.resolve(next.value)
        .then(v => {
          step(() => g.next(v))
        })
        .catch(e => {
          step(() => g.throw(e))
        })
    }
    step(() => g.next(undefined))
  })
}

function fn(args) {
  return spawn(function* () {})
}
```

上面的 spawn 函数是自动执行器

### co lib

### Iterator

JavaScript 提供一种统一的接口机制来处理不同的数据结构（Array、Object、Map 和 Set, String）；

Iterator 生成函数用于将不同的数据结构部署 Iterator 接口，使该数据结构成为可遍历，并返回 Iterator 遍历器对象；

Iterator 遍历器对象提供 next 方法用于访问该数据结构的成员值；

```js
const iterator = makeIterator([1, 2])

function makeIterator(arr) {
  let nextIndex = 0
  return {
    next: function() {
      return nextIndex < arr.length
        ? {value: arr[nextIndex++], done: false}
        : {value: undefined, done: true}
    }
  }
}

iterator.next()
iterator.next()
iterator.next()
```

ES6 规定，默认将 Iterator 生成函数部署在数据结构口的 Symbol.iterator 属性, ES6 部分数据结构原生部署 Iterator 接口，例如 Array，Set，WeakSet，Map，WeakMap, String, TypeArray，arguments 和 NodeList，凡是部署了 Iterator 接口的数据结构均可以被 for...of 遍历


```
const arr = [1, 2, 3]
const arrIt = arr[Symbol.iterator]()
arrIt.next() // {value: 1, done: false}
arrIt.next() // {value: 2, done: false}
arrIt.next() // {value: 3, done: false}
arrIt.next() // {value: undefined, done: true}
```

为类部署 Iterator 接口，模拟 Set

```js

class MockSet {
  constructor(arr) {
    this.value = arr
    this.count = 0
  }

  [Symbol.iterator]() {return this}

  next() {
    let value = this.value
    if (this.count < value.length) {
      this.count++
      return {value: value[this.count - 1], done: false}
    }
    return {
      value: undefined,
      done: true
    }
  }
}

let ms = new MockSet([1, 2, 3])
for (let val of ms) {
  console.log(val)
}
```

为对象部署 Iterator 接口

```js
var o = {
	data: [1, 2, 3],
	[Symbol.iterator]() {
		const self = this
		let index = 0
	
		return {
			next() {
				if (index < self.data.length) return {value: self.data[index++], done: false}
				else return {value: undefined, done: true}		
			}
		}
	}
}

for (let val of o) {console.log(val)}
```

Iterator 接口部署后可供 for...of 消费

- 调用 Iterator 场景

**扩展运算符**

例如上述的 ms ，使用扩展运算符后会遍历部署了 iterator 接口的数据结构，并将 next().value 返回

```js
var ms = new MockSet([1, 2, 3])
var s = [...ms] // [1, 2, 3]
```

**解构赋值**
```js
var [x, y] = ms
```

**generator yield**

```js
let gen = function* () {
  yield 1
  yield 2
  yield [3,4,5]
  yield* [6,7,8]
  return 9
}

let it = gen()
it.next()

// 注意 for...of 在遇到 done 为 true 时，遍历就会终止，并不包含 {value: xxx, done: true} 的 value 值

for (let val of it) {
  console.log(val)
}
```

**一般场景**

凡是涉及数组的遍历都会调用遍历器接口

for...of
for...of 作为遍历所有数据结构的统一方法，只要一个数据接口部署了 Symbol.iterator 属性，就可以用 for...of 进行遍历

Array.from
Map, Set
Promise.all / Promise.trace

- 实现 Iterator 接口

**基于 Generator 实现 Iterator**

Generator 函数可以创建 Iterator 生成函数，结合 yield 关键字可以生成可迭代的数据列表

```
// 创建一个 iterator 生成函数
let gen = function* () {
  yield 1
  yield 2
}

let it = gen()
it.next() // {value: 1, done: false}
it.next() // {value: 2, done: false}
it.next() // {value: undefined, done: true}
```

上面的代码指明当调用 iterator.next() 时，就会将 yield 后跟随的值包装为 {value: '1', done: false} 的形式返回

基于 Genrator 这一特性，可在任何对象中部署 iterator 接口；

```js
var obj = {
  
}
```

*Iterator 接口可部署 next(), return(), throw() 等方法*，其中 next 方法是必须的**

return 方法是在迭代中遇到错误或是 break 时才调用

```js
var obj = {
	[Symbol.iterator]: function() {
		return {
			next() {console.log('continue');return {done: false}},
			return() {console.log('break or error');return {done: true}}
		}
	}
}

for (let v of obj) {
  console.log(v)
  break;
  // throw new Error()
}
```

**计算生成的数据结构**

Array，Set, Map 部署了 entries，keys 和 values 等方法，均返回一个 iterator 对象；

entries 返回的 iterator 对象的数据结构为 {value: [key, value]}
keys 返回 {value: key}
values 返回 {value: value}


- 其他遍历方法

```js
// for
var arr = [1, 2, 3]
for (let i = 0, len = arr.length; i < len; ++i) {
  console.log(arr[i])
  // 支持 break
}

arr.forEach(v => console.log(v)) // 不支持 break

for...in // 会遍历手动添加的其他键，不保证遍历顺序

```
[example](http://es6.ruanyifeng.com/#docs/iterator)
