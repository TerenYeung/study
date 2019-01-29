# What is Scope?

## 目录

- 作用域

- 作用域链

- 查找策略

- 作用域的访问

JavaScript 是一门编译语言，但是与传统的编译语言不通，它不是提前编译，它大部分情况下是发生在代码执行前的期间；

一个语句的处理涉及 JavaScript 引擎、编译器和作用域三个实体；

例如，
```js
var a = 2;
```

对它的处理分为由编译器在编译时处理，由引擎在运行时处理两部分；

1. 遇到 var a，编译器会询问作用域是否已经有一个该名称的变量存在于同一个作用域的集合，如果是则编译器会忽略该声明，继续编译；否则它会要求在当前作用域集合中声明一个新的变量并命名为 a；

2. 接下来编译器会为引擎生成运行时所需的代码，这些代码别用来处理 a = 2 这个赋值操作，引擎运行时会首先询问作用域(作用域链)是否存在一个叫做 a 的变量，如果引擎最终找到则会将 2 赋值给 a，否则会抛出异常；

[note]

**LHS & RHS**

引擎在执行期间需要查询变量（无论是赋值操作还是查询操作），查询的方式包括 LHS（左侧查询）和RHS（非左侧查询）；

LHS 指的是赋值操作的目标，RHS 指的是赋值操作的源头

> who's the target of the assignment (LHS)" and "who's the source of the assignment (RHS)

区分 LHS 和 RHS 的一个重要意义在于：

当使用 RHS 查询之前未声明的变量时，会抛出 **ReferenceError** 异常，而 LHS 则在未声明的变量时，非严格模式下会自动创建变量并赋值；

## 作用域

作用域是指程序源代码中定义变量的区域，它规定了如何查找变量或说当前执行上下文对变量的访问权限；如果查找的目的是赋值可以采用 LHS 查询，如果是取值则可采用 RHS 查询；

JavaScript 作用域采用的是词法作用域，即静态作用域；

静态作用域是函数的作用域在定义时就确定了，而动态作用域则是在函数调用是才决定；

```js
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar(); // 1
```

上述代码片段执行后，由于 JavaScript 所采用的是词法作用域，所以当在 bar 函数内调用 foo 函数时，foo 函数内部的 value 变量会去采用 RHS 策略查询自身 foo 的作用域以及其上一级即 global 的作用域；

## 作用域链

变量存储在作用域当中，并且不同层级的作用域会形成一个自顶而下所包含的作用域链的数据结构

引擎访问变量的规则就是有当前执行作用域由内向外查询变量的过程，直至到达全局作用域；

## 参考文章

[JavaScript深入之词法作用域和动态作用域 ](https://github.com/mqyqingfeng/Blog/issues/3)