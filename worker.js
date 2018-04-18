console.log('Worker is starting, pid:', process.pid)
setInterval(function tantra () {
  console.log('Worker still alive, pid:', process.pid)
}, 2000)
