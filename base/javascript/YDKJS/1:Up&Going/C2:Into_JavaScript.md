# Into JavaScript

## Values & Types

JavaScript 中只有值有类型，变量只是存放值得简单容器；

内置的类型包括：

- number
- string
- boolean
- object
- undefined and null
- symbol

```js
var a;
typeof a;				// "undefined"

a = "hello world";
typeof a;				// "string"

a = 42;
typeof a;				// "number"

a = true;
typeof a;				// "boolean"

a = null;
typeof a;				// "object" -- weird, bug

a = undefined;
typeof a;				// "undefined"

a = { b: "c" };
typeof a;				// "object"

a = []
typeof a;               // "object"

a = function(){}        
typeof a;               // "function"

a = Symbol();
typeof a;               // "symbol"
```
JavaScript 提供 typeof 操作符去检测一个值的类型；



