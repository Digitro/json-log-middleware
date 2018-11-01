const JsonLog = require('./json-log')
const uuidv1 = require('uuid/v1')
const LOG_CONSTANTS = require('./log-constants')

const logRequest = (app, service, generateValId) => {
  const logger = new JsonLog(service)

  app.get('/log/:logLevel', (req, res) => {
    JsonLog.setLogLevel(req.params.logLevel)
    res.sendStatus(200)
  })

  return function(req, res, next) {
    //identificador da requisição
    let valId = req.header(LOG_CONSTANTS.TRACE_HEADER)
    if(!valId && generateValId){
      valId = uuidv1()
      req.headers[LOG_CONSTANTS.TRACE_HEADER] = valId
    }
    if(valId){
      res.set(LOG_CONSTANTS.TRACE_HEADER, valId)
    }
    //logando as informações
    const tags = {url: req.url, params: req.params, method:req.method, valId:valId}
    logger.debug('rest request => ' + valId, tags)
    next()
  }
}

module.exports = logRequest