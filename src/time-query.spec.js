import {Lokka} from 'lokka'
import {Transport} from 'lokka-transport-http'
import test from 'ava'
import './server'

const client = new Lokka({
  transport: new Transport(`http://localhost:${process.env.PORT}/graphql`)
})

test('can query time', async (t) => {
  const time = await client.query('{time}')
  t.truthy(time)
})
