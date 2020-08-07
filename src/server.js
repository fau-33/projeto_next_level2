

//Servidor
const express = require('express')
const server = express()

const { 
  pageLanding,
  pageStudy,
  pageGiveClasses
} = require('./pages')


//Configurar o nunjucks(template enginers)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
})
//Inicio e configuração do servidor
server
//Configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))

//Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
//start do servidor
.listen(5500)