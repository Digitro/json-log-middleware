const {executionAsyncId, createHook} = require('async_hooks')
//const fs = require('fs');
const storage = new Map()

const asyncHooks = createHook({
  init(asyncId, type, triggerAsyncId, resource) {
    if (storage.has(triggerAsyncId)) {
      storage.set(asyncId, storage.get(triggerAsyncId))
      //fs.writeSync(1, `init ${storage.size}\n`)
    }
  },
  destroy(asyncId) {
    storage.delete(asyncId);
    //fs.writeSync(1, `destroy ${storage.size}\n`)
  }
}).enable()

const logContext = {
  startNewContext (data){
    storage.set(executionAsyncId(), {data})
  },
  getCurrentContext() {
    const context = storage.get(executionAsyncId())
    if(context && context.data){
      return context.data
    }
    return undefined
  }
}

module.exports = logContext