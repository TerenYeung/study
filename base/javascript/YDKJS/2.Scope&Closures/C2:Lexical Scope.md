# Lexical Scope

作用域是引擎通过标识符在当前或上层嵌套作用域查找变量的规则，作用域主要有两种工作模型，一种是大部分编程语言使用的词法作用域（静态作用域），另一个是一些语言（bash 脚本或 Perl 中的一些模式）使用的动态作用域；

## 词法作用域

词法作用域是在词法分析阶段所定义的作用域，换句话说词法作用域是由你写代码时将变量和块作用域写在哪里来决定；

```js
function foo() {
    console.log(value)
}

function bar() {
    var value = 'bar'
    foo()
    console.log(value)
}

var value = 'global'
bar() // global bar
```

```bash
value = 1
function foo() {
    echo $value;
}

function bar() {
    local value = 2;
    foo;
}

bar // 2
```

作用域有一个很重要的规则是：

> 在多层嵌套的作用域中可以定义同名的标识符，作用域查找会找到第一个匹配的标识符时停止，这种规则叫做 "Shadow"，即内部的标识符遮蔽了外部的标识符；

另一个规则是词法作用域只会查找一级标识符，例如代码引用 foo.bar.baz，词法作用域只会试图查找 foo 标识符；

## 欺骗词法作用域

JavaScript 有两种机制能够在运行时改变词法作用域，但是会导致代码执行的性能下降；

### eval

一个是 eval，能够将字符串形式的代码作为参数传入 evel 函数中，然后在运行时**修改编译阶段形成的词法作用域**，但是在严格模式下，eval 有自己的词法作用域，因此在严格模式下使用 eval 进行赋值操作，并且在内部使用 RHS 查询会导致 ReferenceError

```js
function foo(str, a) {
    eval(str)
    console.log(a, b)
}

var b = 2

foo('var b = 3', 1) // 1 3
```

```js
function foo(str) {
    'use strict'
    eval(str)
    console.log(a)
}
foo('var a = 1')
```

### with

with 通常用作重复引用同一个对象的多个属性的快捷方式

```js
var obj = {
    a: 1,
    b: 2,
    c: 3
}

obj.a = 2
obj.b = 3
obj.c = 4

with (obj) {
    a = 2
    b = 3
    c = 4
}
```

with 声明将传递给它的对象凭空创建一个全新的词法作用域，如果在该作用域内进行 LHS 查找过程中，如果属性存在该作用域直接进行赋值，如果没有找到，则向上一级的作用继续进行 LHS 查找；

```js
var o1 = {
    a: 3
}

var o2 = {
    b: 3
}

function foo(obj) {
    with(obj) {
        a = 2
    }
}

foo(o1)
console.log(o1.a) // 2
foo(o2)
console.log(o2.a) // undefined
console.log(a) // 2
```

上述代码表明当在新创建的 o2 作用域内没有找到 a 变量时会继续向上进行 LHS 操作，直至全局作用域下也没找到，则将其赋值到全局作用域下；

注意，尽管 with 块为一个对象创建新的词法作用域，但是这个块内部正常的 var 声明不会添加到该作用域中，而是加到 with 所在函数的作用域中；

```js
function foo(obj) {
    with (obj) {
        var a = 1
        b = 2
        console.log(b)
    }
    console.log(a)
}

foo({b:3}) // 2 1
```

eval 或 with 会在运行时修改或创建词法作用域，但是由于 JavaScript 引擎会在编译阶段进行代码的性能优化，而有些优化依赖于代码静态分析的结果（根据词法预先所处位置在运行时更快速的找到标识符），一旦引擎在运行过程中发现 eval 或 with 关键字时，它只能悲观认为之前关于标识符的位置的判断是无效的，无法信任之前所做的优化工作，因此这会导致代码运行效率下降；