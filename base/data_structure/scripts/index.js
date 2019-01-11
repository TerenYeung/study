const {fork} = require('child_process')
const path = require('path')
const filename = process.argv[2] || ''
const pathname = path.resolve(__dirname, `../src/${filename}.js`)

fork(pathname)
