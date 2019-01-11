class Map {
    constructor() {
        this.items = {}
    }
    has(key) {
        return this.items.hasOwnProperty(key)
    }
    set(key, val) {
        this.items[key] = val
    }
    delete(key) {
        if (this.has(key)) {
            delete this.items[key]
            return true
        }
        return false
    }
    get(key) {
        return this.has(key) ? this.items[key] : undefined
    }
    keys() {
        return Object.keys(this.items)
    }
    values() {
        return Object.values(this.items)
    }
    getMap() {
        return this.items
    }
    size() {
        return this.keys().length
    }
}

module.exports = Map
// let map1 = new Map()
// map1.set('1', 'xxx')
// map1.set('2', 'yyy')
// map1.set('3', 'zzz')
// console.log(map1.getMap())
// console.log(map1.keys())
// console.log(map1.values())
// console.log(map1.delete(2))
// console.log(map1.get(1))
// console.log(map1.get(2))

