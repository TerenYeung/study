
class HashTable {
    constructor() {
        this.table = []
    }
    _loseloseHashCode(key) {
        let hashValue = 0
        for (let i = 0; i < key.length; ++i) {
            hashValue += key.charCodeAt(i)
        }
        // 这里对 hashValue 与随意一个质数进行取模操作，结果的值域为 [0, 37 -1]，质数的选取取决于你想要生成的 hashValue 的范围
        return hashValue % 37
    }
    put(key, val) {
        let hashValue = this._loseloseHashCode(key)
        console.log(key + '-' + hashValue)
        this.table[hashValue] = val
    }
    remove(key) {
        let hashValue = this._loseloseHashCode(key)
        this.table[hashValue] = undefined
    }
    get(key) {
        return this.table[this._loseloseHashCode(key)]
    }
}

let hash = new HashTable()
hash.put('Teren', 'terenyeung@gmail.com')
hash.put('Food', 'foodcook@gmail.com')
hash.put('Kate', 'kateSally@gmail.com')
hash.remove('Kate')
console.log(hash.get('Teren'))


const LinkedList = require('./linked_list')

class ValuePair {
    constructor(key, val) {
        this.key = key
        this.val = val
    }
    toString() {
        return `[${this.key} - ${this.val}]`
    }
}

/**
 * HashTable with separate chaining for fixing up hash collision
 */
class HashTableSC {
    constructor() {
        this.table = []
    }
    _loseloseHashCode(key) {
        let hashValue = 0
        for (let i = 0; i < key.length; ++i) {
            hashValue += key.charCodeAt(i)
        }
        // 这里对 hashValue 与随意一个质数进行取模操作，结果的值域为 [0, 37 -1]，质数的选取取决于你想要生成的 hashValue 的范围
        return hashValue % 37
    }
    put(key, val) {
        let hashValue = this._loseloseHashCode(key)
        console.log(key + '-' + hashValue)
        if (!this.table[hashValue]) {
            this.table[hashValue] = new LinkedList()
        }
        this.table[hashValue].append(new ValuePair(key, val))
    }
    get(key) {
        let hashValue = this._loseloseHashCode(key)
        if (this.table[hashValue]) {
            let current = this.table[hashValue].getHead()
            while(current.next) {
                if (current.elem.key === key) return current.elem.val
                current = current.next
            }
            // check in case first or last element
            if (current.elem.key === key) return current.elem.val
        }
        return undefined
    }
    remove(key) {
        let hashValue = this._loseloseHashCode(key)
        if(this.table[hashValue]) {
            let current = this.table[hashValue].getHead()
            while(current.next) {
                if (current.elem.key === key) {
                    this.table[hashValue].remove(current.elem)
                }
                current = current.next
            }
            if (current.elem.key === key) {
                this.table[hashValue].remove(current.elem)
                this.table[hashValue] = undefined
            }
        }
        return false
    }
}
console.log('-----------')
let hash2 = new HashTableSC()
hash2.put('teren', '123')
hash2.put('john', '777')

hash2.put('kate', '456')
hash2.put('cook', '789')
console.log(hash2.get('cook'))
hash2.remove('kate')
console.log('hash2', hash2)

/**
 * HashTable with linear probing for fixing up hash collision
 */
class HashTableLP {
    constructor() {
        this.table = []
    }
    _loseloseHashCode(key) {
        let hashValue = 0
        for (let i = 0; i < key.length; ++i) {
            hashValue += key.charCodeAt(i)
        }
        // 这里对 hashValue 与随意一个质数进行取模操作，结果的值域为 [0, 37 -1]，质数的选取取决于你想要生成的 hashValue 的范围
        return hashValue % 37
    }
    put(key, val) {
        let hashValue = this._loseloseHashCode(key)
        if (!this.table[hashValue]) {
            this.table[hashValue] = new ValuePair(key, val)
        } else {
            let index = ++hashValue
            while(this.table[index] != undefined) {
                ++index
            }
            this.table[index] = new ValuePair(key, val)
        }
    }
    get(key) {
        let hashValue = this._loseloseHashCode(key)
        if (this.table[hashValue]) {
            if (this.table[hashValue].key === key) {
                return this.table[hashValue].val
            } else {
                let index = ++hashValue
                while(this.table[index] === undefined || this.table[index].key !== key) {
                    ++index
                }
                if (this.table[index].key === key) return this.table[index].val
            }
        }
        return undefined
    }
    remove(key) {
        let hashValue = this._loseloseHashCode(key)
        if (this.table[hashValue]) {
            if (this.table[hashValue].key === key) {
               this.table[hashValue] = undefined
            } else {
                let index = ++hashValue
                while(this.table[index] === undefined || this.table[index].key !== key) {
                    ++index
                }
                if (this.table[index].key === key) this.table[index] = undefined
            }
            return true
        }
        return false
    }
}

// create better hash functions
// lose lose 哈希函数并不是一个好的哈希函数，一个好的哈希函数包括以下因素：插入和获取元素的时间；低概率的哈希碰撞
// djb2 是社区推荐度较高的哈希函数
let djb2HashCode = key => {
    let hash = 5381
    for (let i = 0; i < key.length; ++i) {
        hash = hash * 33 + key.charCodeAt(i)
    }
    return hash % 1013
}