process.nextTick(() => {
  console.log('nextTick')
});


require('fs').readFile('./sorting/test', () => {
  console.log('FileIO')
});


setTimeout(() => {
  console.log('timer');
  process.nextTick(() => {
    console.log('timer:nextTick')
  })
}, 0);

setImmediate(() => {
  console.log('immediate');

});


Promise.resolve().then(() => {
  console.log('microTask')
});