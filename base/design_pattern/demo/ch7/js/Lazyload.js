var myImg = (function() {
    var imgNode = ducument.createElement('img')
    document.body.appendChild(imgNode)

    return {
        setSrc: function(src) {
            imgNode.src = src
        }
    }
})()

var proxyImg = (function() {
    var preloadImg = new Image()
    preloadImg.onload = function() {
        // 当资源加载完毕后，再设置到目标 img 元素
        myImg.setSrc(this.src)
    }

    return {
        setSrc: function(src) {
            // 一开始目前元素展示 loading 图片
            myImg.setSrc('file://loading.gif')
            // 通过代理 img 加载图片资源
            preloadImg.src = src
        }
    }
})()

proxyImg.setSrc('http://demo.jpg')

var mult = function() {
    var args = arguments, ret = 1;
    for (var i = 0, l = args.length; i < l; ++i) {
        ret *= args[i];
    }

    return ret
}

var createProxyFactory = function(fn) {
    var cache = {}
    return function() {
        var id = Array.prototype.join.call(arguments, ',')
        if (cache[id]) return cache[id]

        return cache[id] = fn.apply(this, arguments)
    }
}

var proxyMult = createProxyFactory(mult)