/**
 * @description 单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点
 * @scenario 线程池、全局缓存、浏览器的 window 对象、Storage 对象、全局弹窗等
*/

/**
 * v1
 * @description 单例模式：基于原型实现
 * @优点：实现简单
 * @缺点：类“不透明”（创建单例必须使用 getInstance），使用者必须知道这是一个单例类，调用 getInstance 获取单例对象，而不能使用 new 去获取单例；
*/
var Singleton = function(name) {
    this.name = name;
    this.instance = null;
}

Singleton.prototype.getName = function() {
    return this.name;
}

Singleton.getInstance = function(name) {
    if (!this.instance) {
        return this.instance = new Singleton(name);
    }
    return this.instance;
}

var s1 = Singleton.getInstance('teren');
var s2 = Singleton.getInstance('yeung');
console.log(s1 === s2); // true

/**
 * v1
 * @description 单例模式：基于原型+闭包实现
*/
var Singleton2 = function(name) {
    this.name = name;
    this.instance = null;
}

Singleton2.prototype.getName = function() {
    return this.name;
}

Singleton2.getInstance = (function() {
    var instance = null;
    return function(name) {
        if (!instance) {
            return instance = new Singleton2(name)
        }
        return instance
    }
})();

var s3 = Singleton2.getInstance('teren');
var s4 = Singleton2.getInstance('yeung');
console.log(s3 === s4); // true

/**
 * v3
 * @example 创建页面中唯一的 div 节点
 * @description 单例模式：透明的单例（使用 new 创建单例）
 * @优点 创建单例变得透明
 * @缺点 违背单一职责原则，CreateDiv 应该只负责创建 div 节点职责，应该有一个专门的类实现单例逻辑
*/
var CreateDiv = (function() {
    var instance;

    var CreateDiv = function(html) {
        if (instance) return instance;

        this.html = html;
        this.init();
        return instance = this;
    }

    CreateDiv.prototype.init = function() {
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }
    return CreateDiv;
})();

// var div1 = new CreateDiv('div1');
// var div2 = new CreateDiv('div2');
// console.log(div1=== div2) // true

/**
 * v4
 * @example 创建页面中唯一的 div 节点
 * @description 单例模式：代理实现透明单例（使用 new 创建单例）
*/

var CreateDiv2 = function(html) {
    this.html = html;
    this.init();
}

CreateDiv2.prototype.init = function() {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
}

var ProxySingleton = (function() {
    var instance;
    return function(Delegator, ...rest) {
        if (instance) return instance;
        return instance = new Delegator(...rest)
    }
})();

// var div3 = new ProxySingleton(CreateDiv2, 'div3')

// var div4 = new ProxySingleton(CreateDiv2, 'div4')

// console.log(div3 === div4) // true

/**
 * v5
 * @description 单例模式：全局唯一变量创建
*/

var App = {}

App.namespace = function(name) {
    var parts = name.split('.');
    var current = App;
    for (let i in parts) {
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
}

App.namespace('event');
App.namespace('dom.style');

console.log(App)

/**
 * @description 单例模式：惰性单例
*/
var getSingleton = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}