# 第二章 this All Makes Sense Now!

> this is a binding made for each function invocation, based entirely on its call-site (how the function is called).

## Call-site

调用点是调用函数时在代码中的位置（不是声明的位置）

## 在函数执行期间，调用点是如何决定 this 的指向

有以下四条规则：

### Default Binding

独立的函数执行，this 将会绑定到全局对象 window 上（非严格模式）；

```js
function foo() {
    console.log(this.a);
}

var a = 1;
foo(); // 2
```

### Implicit Binding

调用点如果有上下文对象，则会隐式将 this 绑定到该对象