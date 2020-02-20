import ContextStrategy from './db/base/contexStrategy'
import MongoDb from './db/mongodb'
import Postgres from './db/postgres'

const ContextMongodb = new ContextStrategy(new MongoDb())
ContextMongodb.create()

const ContexPostgres = new ContextStrategy(new Postgres())
ContexPostgres.create()