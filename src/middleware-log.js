const JsonLog = require('./json-log')

const logRequest = (app, service) => {
  let logLevel = 'INFO'
  const logger = new JsonLog('queue-service', logLevel)

  app.get('/log/:level', (req, res) => {
    logLevel = req.params.level || logLevel
    logger.setLogLevel(logLevel)
    res.sendStatus(200)
  })

  return function(req, res, next) {
    //identificador da requisição
    const valId = req.headers['X-VAL-ID'] || Math.random();
    req.headers['X-VAL-ID'] = valId;
    res.set('X-VAL-ID', valId);
    //logando as informações
    const tags = {url: req.url, params: req.params, method:req.method, valId:valId}
    logger.debug('rest request => ' + valId, tags)
    next();
  }
}

module.exports = logRequest