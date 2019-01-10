/**
 * v1
 * @description 观察者模式
*/
var Emitter = {
    // 订阅者回调队列
    listener: {},
    // 注册订阅回调时间
    listen: function(evt, fn) {
        if (!this.listener[evt]) {
            this.listener[evt] = []
        }
        this.listener[evt].push(fn);
    },
    // 取消订阅事件
    off: function(evt, fn) {
        var fns = this.listener[evt]
        if (!fns) return false;
        if(!fn) {
            fns.length = 0;
        } else {
            // 反向遍历回调数组，删除最晚注册的事件回调
            for (var i = fns.length - 1; i >=0; i--) {
                if (fns[i] === fn) {
                    fns.splice(i, 1)
                }
            }
        }
        return true
    },
    // 发布事件
    emit: function() {
        var evt = Array.prototype.shift.call(arguments);
        var fns = this.listener[evt];
    
        for (var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    },
    install: function(obj) {
        for (var key in Emitter) {
            obj[key] = Emitter[key]
        }
        delete obj['install']
        return obj
    }
} // 发布者
// Emitter.listener = {} // 订阅者回调队列
// Emitter.listen = function(evt, fn) {
//     if (!this.listener[evt]) {
//         this.listener[evt] = []
//     }
//     this.listener[evt].push(fn);
// }
// 发布者发布方法
// Emitter.emit = function() {
//     var evt = Array.prototype.shift.call(arguments);
//     var fns = this.listener[evt];

//     for (var i = 0, fn; fn = fns[i++];) {
//         fn.apply(this, arguments);
//     }
// }

Emitter.listen('xiaohong', function(price, sm) {
    console.log('xiaohong: price = %d, squaremeter = %d', price, sm);
})
Emitter.listen('xiaoming', function(price, sm) {
    console.log('xiaoming: price = %d, squaremeter = %d', price, sm);
})

Emitter.emit('xiaohong', 800, 1000);
