
## String.prototype.methods

### substring, substr, slice

- substring

> str.substring(indexStart[, indexEnd])


substring 提取从 indexStart 到 indexEnd（不包括）之间的字符

[note]

任何 index 小于 0 会被当做 0；

- substr

> str.substr(start[, length])

substr() 方法返回一个字符串中从指定位置开始到指定字符数的字符。

[note]
如果 start < 0 , 则从字符串末尾开始计数

如果 length <= 0，则返回空字符串

- slice

> slice(start,end)返回指定下标间的字符，可以为负数

```js
let str = 'hello,'
str.substring(0, str.length -1) // hello
str.substr(-1, 1) // ','
str.substr(0, -1) // ''
str.substr(0, str.length - 1)
str.slice(0, -1) // 'hello' 提取从 index = 0 到倒数第二的字符串
```