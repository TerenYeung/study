var each = function(obj, cb) {
    for (var key in obj) {
        cb.call(obj[key], obj[key], key)
    }
}

each([1,2,3], function(item, index) {
    console.log(item)
})

var Iterator = function(arr) {
    var index = -1;
    var done = false;

    var next = function() {
        if (arr[++index] === undefined) {
            return undefined
        }
        return arr[index]
    }

    var done = function() {
        return index >= arr.length
    }
    return {
        next: next,
        done: done,
    }
}

/**
 * @example 迭代具有使用顺序的业务场景
*/

var getActiveUploadObj = function() {}

var getHtml5UploadObj = function() {}

var getFormUploadObj = function() {}

var iteratorUploadObj = function() {
    var uploadObj
    for (var i = 0, fn; fn = arguments[i];) {
        uploadObj = fn()

        if (uploadObj !== false) {
            return uploadObj
        }
    }
}

var uploadObj = iteratorUploadObj(getActiveUploadObj, getHtml5UploadObj, getFormUploadObj)