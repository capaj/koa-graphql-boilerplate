import Koa from 'koa'
import KoaRouter from 'koa-router'
import koaBody from 'koa-bodyparser'
import { graphqlKoa } from 'graphql-server-koa'
import { makeExecutableSchema } from 'graphql-tools'
import fs from 'fs'
import koaLogger from 'koa-logger'
import dotenv from 'dotenv'
import graphiqlMiddleware from './graphiql-middleware'
import resolvers from './resolvers'
dotenv.config()

const app = new Koa()
app.use(koaLogger())
const router = new KoaRouter()
const {PORT} = process.env

router.get('/graphiql', graphiqlMiddleware(async (ctx) => {
  return {
    url: '/graphql'
  }
}))

app.use(koaBody())

const schema = makeExecutableSchema({
  typeDefs: fs.readFileSync('./src/schema.graphql').toString(),
  resolvers
})

router.post('/graphql', graphqlKoa({ schema: schema }))
router.get('/graphql', graphqlKoa({ schema: schema }))

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT)
