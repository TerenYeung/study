# Object

## in vs hasOwnProperty

in 判断对象属性是否存在实例属性或原型属性

hasOwnProperty 判断对象属性是否存在实例属性

```js
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    say() {
        console.log(`I'm ${this.name} and ${this.age} years old.`)
    }
}

let Tom = new Person('Tom', 18)
'name' in Tom // true
Tom.hasOwnProperty
('name') // true

'say' in Tom // true
Tom.hasOwnProperty('say') // false
```