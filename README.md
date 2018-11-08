# Biblioteca para log

Biblioteca para log que tem como objetivo:
- Estruturar os logs em formato JSON;
- Disponibilizar um middleware para o Express para realizar automaticamente o log das requisições REST
- Disponibilizar mecanismo de rastreio para os logs realizados dentro de um mesmo contexto

## Logar as informações
```
# criar o objeto que será utilizado para logar
const {JsonLog} = require('json-log-middleware')
const logger = new JsonLog(SERVICE_NAME)

#logar
logger.log('MENSAGEM', OBJETO_JSON_TAGS(OPCIONAL))
logger.debug('MENSAGEM', OBJETO_JSON_TAGS(OPCIONAL))
logger.error('MENSAGEM'(OPCIONAL), ERROR(OBJETO DE ERRO DO JAVASCRIPT), OBJETO_JSON_TAGS(OPCIONAL)(OPCIONAL))
```

## Middleware para logar as requisições REST
```
const {logMiddleware} = require('json-log-middleware')
//Booleano para informar se deve gerar ou não um código de rastreio caso não receba um no header
router.use(logMiddleware(app, SERVICE_NAME, false))
```

## Mecanismo de rastreio
```
# Iniciar um novo contexto de rastreio manualmente, a partir desse ponto todas as requisições logadas terão esse código
const {logContext} = require('json-log-middleware')
logContext.startNewContext(CODIGO_RASTREIO)

```