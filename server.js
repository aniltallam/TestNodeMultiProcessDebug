var cp = require('child_process')
var path = require('path')

var WORKER_PATH = path.resolve(__dirname, 'worker.js')
var WORKER_ARGS = []

console.log('Master starting...')

setTimeout(function () {
  console.log('Forking worker')

  var execArgv = process.execArgv.slice()
  var debugPort = process.debugPort + 1
  console.log('execArgv', JSON.stringify(execArgv, null, 2))
  for (var i = 0; i < execArgv.length; i++) {
    var match = execArgv[i].match(/^(--debug|--debug-brk)(=\d+)?$/)
    if (match) {
      execArgv[i] = match[1] + '=' + debugPort
      break
    }
  }
  console.log('execArgv', JSON.stringify(execArgv, null, 2))
  var options = { env: process.env, silent: false, execArgv: execArgv }
  var nodeFork = cp.fork(WORKER_PATH, WORKER_ARGS, options)
  console.log('Forked worker, pid:', nodeFork.pid)
}, 1000)

setInterval(function mantra () {
  console.log('Master still alive, pid:', process.pid)
}, 2000)
