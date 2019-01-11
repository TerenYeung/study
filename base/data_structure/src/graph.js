const Map = require('./dictionary')
const Queue = require('./queue')
class Graph {
    constructor() {
        this.vertices = []
        this.adjList = new Map()
        this.time = 0 // DFS 计算顶点 discovery 和 finish 时间
    }
    addVertext(v) {
        this.vertices.push(v)
        this.adjList.set(v, [])
    }
    /**
     *
     *
     * @param {*} v one vertex
     * @param {*} w another vertex
     * @memberof Graph
     */
    addEdge(v, w) {
        this.adjList.get(v).push(w)
        this.adjList.get(w).push(v)
    }
    /**
     *
     * @description marking the vertices that we have already visited, use three colors to reflect their status:
     *  White: represents that the vertex has not been visited
     *  Grey: represents that the vertext has been visited but not explored
     *  Black: represents that the vertext has been completely explored
     * @returns color
     * @memberof Graph
     */
    _initializeColor() {
        let color = []
        for (let i = 0, len = this.vertices.length; i < len; ++i) {
            color[this.vertices[i]] = 'white'
        }
        return color
    }
    /**
     *
     *  @description 广度优先搜索，先遍历图的横向顶点
     * @param {*} v
     * @param {*} callback
     * @memberof Graph
     */
    bfs(v, callback) {
        let color = this._initializeColor()
        let queue = new Queue()
        queue.enqueue(v)
        while(!queue.isEmpty()) {
            let u = queue.dequeue()
            let neighbors = this.adjList.get(u)
            // 实现去重操作
            for (let val of neighbors) {
                if (color[val] === 'white') {
                    color[val] = 'grey'
                    queue.enqueue(val)
                }
            }
            color[u] = 'black'
            callback && callback(u)
        }
    }
    /**
     * @description 获取顶点间的距离和路径
     *
     * @param {*} v
     * @memberof Graph
     */
    BFS(v) {
        let color = this._initializeColor()
        let queue = new Queue()
        let d = [] // 各个顶点距离初始顶点的距离
        let pred = [] // 各个顶点的前任顶点

        queue.enqueue(v)

        for (let val of this.vertices) {
            d[val] = 0
            pred[val] = null
        }

        while(!queue.isEmpty()) {
            let u = queue.dequeue()
            let neighbors = this.adjList.get(u)
            color[u] = 'grey'

            for (let val of neighbors) {
                if (color[val] === 'white') {
                    color[val] = 'grey'
                    d[val] = d[u] + 1
                    pred[val] = u
                    queue.enqueue(val)
                }
            }

            color[u] = 'black'
        }

        return {
            distance: d,
            predecessors: pred
        }
    }
    toString() {
        let ret = ''
        for (let ver of this.vertices) {
            ret += ver + '-> '
            let neighbors = this.adjList.get(ver)
            ret += neighbors.join(' ') + '\n'
        }
        return ret
    }
    dfs(callback) {
        let color = this._initializeColor()
        for (let val of this.vertices) {
            if (color[val] === 'white') {
                this._dfsVisit(val, color, callback)
            }
        }
    }
    _dfsVisit(u, color, callback) {
        color[u] = 'grey'
        if (callback) {
            callback(u)
        }

        let neighbors = this.adjList.get(u)

        for (let v of neighbors) {
            if (color[v] === 'white') {
                this._dfsVisit(v, color, callback)
            }
        }
        color[u] = 'black'
    }
    DFS() {
        let color = this._initializeColor()
        let d = [] // discovery time
        let f = [] // finished time
        let p = [] // predecessors
        for (let val of this.vertices) {
            f[val] = 0
            d[val] = 0
            p[val] = null
        }
        
        for (let val of this.vertices) {
            if (color[val] === 'white') {
                this._DFSVisit(val, color, d, f, p)
            }
        }

        return {
            discovery: d,
            finished: f,
            predecessors: p
        }
    }
    _DFSVisit(u, color, d, f, p) {
        console.log('discovered ' + u)
        color[u] = 'grey'
        d[u] = ++this.time
        let neighbors = this.adjList.get(u)
        for (let val of neighbors) {
            if (color[val] === 'white') {
                p[val] = u
                this._DFSVisit(val, color, d, f, p)
            }
        }
        color[u] = 'black'
        f[u] = ++this.time
        console.log('explored ' + u)
    }
}

let graph = new Graph()

let vertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']

for (let val of vertices) {
    graph.addVertext(val)
}

graph.addEdge('A', 'B')
graph.addEdge('A', 'C')
graph.addEdge('A', 'D')
graph.addEdge('B', 'E')
graph.addEdge('B', 'F')
graph.addEdge('C', 'D')
graph.addEdge('C', 'G')
graph.addEdge('D', 'G')
graph.addEdge('D', 'H')
graph.addEdge('E', 'I')
// console.log(graph.toString())
// graph.bfs(vertices[2], val => console.log('Visited vertex: ' + val))

// let shortestPathA = graph.BFS(vertices[0])
// console.log(shortestPathA)

// graph.dfs(val => console.log('Visited vertex: ' + val))
console.log(graph.DFS())