# Into Promramming

## Code

程序通常指的是源代码或是代码（静态的），是一组告诉计算机如何执行任务的特殊指令；

## Statements

语句是一组实现特定任务的 words、number 和 operators；

```js
// word operator word operator number
var a = b + 1
```

程序就是语句的集合；

## Expressions

语句由一个或多个表达式组成，一个表达式可以是 variable、value 或是由 variable 或 value 和 operator 组成的集合；

```js
/**
* b 是 variable expression
* 2 是 literal value expression
* b * 2 是算术表达式
* a = b * 2 是赋值表达式
*/
var a = b * 2;
```

## Excuting a Program

程序需要运行以告诉计算机需要执行的任务内容，但是源代码只有利于开发者阅读，计算机无法识别，因此需要一种"特殊的工具"（编译器或解释器）将源代码转化为计算机可以识别的指令；

对于一些编程语言，在源代码运行过程中将语句自顶而下、一行接一行的翻译成计算机指令的这个过程就是解释代码的过程；

对于另一些编程语言，源码的翻译是提前的，当程序运行时实际运行的是编译后的指令；

JavaScript 引擎采用了 JIT 技术，是兼具编译和解释特点的编程语言；

