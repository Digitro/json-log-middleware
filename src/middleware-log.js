const JsonLog = require('./json-log')

const logRequest = (service) => {
  //TODO recuperar o log level da API
  const logLevel = 'INFO'
  const logger = new JsonLog('queue-service', logLevel)
  return function(req, res, next) {
    //identificador da requisição
    const valId = req.headers['X-VAL-ID'] || Math.random();
    req.headers['X-VAL-ID'] = valId;
    res.set('X-VAL-ID', valId);
    //logando as informações
    const tags = {url: req.url, params: req.params, body:req.body, method:req.method, valId:valId}
    logger.debug('rest request => ' + valId, tags)
    next();
  }
}

module.exports = logRequest