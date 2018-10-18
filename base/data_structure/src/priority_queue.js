/**
 * 优先队列：队列成员包含权重信息
 * 例子：
 * 1. 航班中的头等舱和商务舱通道
 * 2. 老人、孕妇和普通人群的队列
 */

class PriorityQueue {
    constructor(compareFn) {
        this.items = []
        this.compareFn = compareFn
    }

    getQueueMinIndex() {
        let priorities = this.items.map(item => item.Priority)
        let minPriority = Math.min.apply(null, priorities)
        return priorities.indexOf(minPriority)
    }

    enqueue(obj) {
        let idx = this.compareFn(obj, this.items)
        return this.items.splice(idx, 0, obj)
    }
    dequeue() {
        let idx = this.getQueueMinIndex()
        return this.items.splice(idx,1)
    }
}

let priorityQueue = new PriorityQueue(function(elem, elems) {
    let priorities = elems.map(item => item.Priority)
        // let minPriority = Math.min.apply(null, priorities)
        return priorities.indexOf(elem.priority)
})

