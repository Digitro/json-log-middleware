const JsonLog = require('./json-log')
const uuidv1 = require('uuid/v1')

const logRequest = (app, service) => {
  const logger = new JsonLog('queue-service')

  app.get('/log/:logLevel', (req, res) => {
    JsonLog.setLogLevel(req.params.logLevel)
    res.sendStatus(200)
  })

  return function(req, res, next) {
    //identificador da requisição
    const valId = req.headers['X-VAL-ID'] || uuidv1()
    req.headers['X-VAL-ID'] = valId
    res.set('X-VAL-ID', valId)
    //logando as informações
    const tags = {url: req.url, params: req.params, method:req.method, valId:valId}
    logger.debug('rest request => ' + valId, tags)
    next()
  }
}

module.exports = logRequest