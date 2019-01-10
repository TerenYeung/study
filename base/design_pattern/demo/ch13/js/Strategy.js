/**
 * @description 策略模式：构造函数实现
 * @senario 缓动动画类型选取策略、表单校验规则策略
 */
function BackDoor() {}

BackDoor.prototype.operate = function() {
    console.log('找乔国老帮忙，让吴国太给孙权施加压力');
}

function GivenGreenLight() {}

GivenGreenLight.prototype.operate = function() {
    console.log('求吴国太开绿灯，放行！');
}

function BlockEnemy() {}

BlockEnemy.prototype.operate = function() {
    console.log('孙夫人断后，挡住追兵');
}

var Context = function(strategy) {
    this.strategy = strategy;
}

Context.prototype.operate = function() {
    this.strategy.operate();
}

let context;

context = new Context(new BackDoor());
context.operate();
context = new Context(new GivenGreenLight());
context.operate();

/**
 * @description 策略模式：map 实现
*/
var strategies = {
    BackDoor: (...rest) =>  console.log('找乔国老帮忙，让吴国太给孙权施加压力'),
    GivenGreenLight: (...rest) => console.log('求吴国太开绿灯，放行！'),
    BlockEnemy: (...rest) => console.log('孙夫人断后，挡住追兵')
}

var use = function(type, ...rest) {
    return strategies[type](...rest);
}

use('BackDoor');
use('GivenGreenLight');

// var Event = (function() {
//     var env = window.attachEvent ? 'ie' : 'others'
//     var eventStrategies= {
//         ie: [attachevent, detatchEvent],
//         other: [addEventListener, removeEventListener]
//     }

//     var addEvent = function(evt, cb,useCapture) {
//         return eventStrategies[env][0](evt, cb, useCapture)
//     }

//     var removeEvent = function(evt, cb) {
//         return eventStrategies[env][1](evt, cb, useCapture)
//     }
//     }

//     return {
//         addEvent: addEvent,
//         removeEvent: removeEvent
//     }
// })()