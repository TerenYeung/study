class Set {
    constructor(vals) {
        this.items = {}
        // 注意这里需要增加重复元素判断
        if (vals) {
            for (let val of vals) {
                this.items[val] = val
            }
        }
    }
    has(val) {
        // return val in this.items
        return this.items.hasOwnProperty(val)
    }
    add(val) {
        if (!this.has(val)) {
            this.items[val] = val
            return true
        }
        return false
    }
    delete(val) {
        if (this.has(val)) {
            delete this.items[val]
            return true
        }
        return false
    }
    clear() {
        this.items = {}
    }
    size() {
        // return Object.keys(this.items).length
        let count = 0
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                ++count
            }
        }
        return count
    }
    values() {
        // return Object.values(this.items)
        let vals = []
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                vals.push(this.items[key])
            }
        }
        return vals
    }
    toString() {
        // return Object.values(this.items).join(', ')
        let str = ''
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                str += this.items[key] + ', '
            }
        }
        return str.substring(0, str.length - 1)
    }
    union(otherSet) {
        let unionSet = new Set()
        let vals = [...this.values(), ...otherSet.values()]
        for (let val of vals) {
            unionSet.add(val)
        }
        return unionSet
    }
    insersection(otherSet) {
        let insersectionSet = new Set()
        let vals = this.values()
        for (let val of vals) {
            if (otherSet.has(val)) {
                insersectionSet.add(val)
            }
        }
        return insersectionSet
    }
    difference(otherSet) {
        let differenceSet = new Set()
        for (let val of this.values()) {
            if (!otherSet.has(val)) differenceSet.add(val)
        }
        return differenceSet
    }
    subset(otherSet) {
        if (this.size() > otherSet.size()) return false
        else {
            for (let val of this.values()) {
                if (!otherSet.has(val)) return false
            }
            return true
        }
    }
}

let setA = new Set([1, 2, 3])
setA.add(4)
setA.add(5)
setA.delete(5)
console.log(setA.toString())
console.log(setA.values())

let setB = new Set([4,5,6])
console.log(setA.union(setB).values())
console.log(setA.insersection(setB).values())
console.log(setA.difference(setB).values())

let setC = new Set([1,2])
console.log('setC is subset of setA: ', setC.subset(setA))
console.log('setB is subset of setA: ', setB.subset(setA))