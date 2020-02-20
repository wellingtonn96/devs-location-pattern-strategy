import Icrud from './interface/interface'

class MongoDb extends Icrud {
    constructor() {
        super()
    }

    create() {
        console.log('Usuario cadastrado com sucesso no MongoDb!')
    }
}

export default MongoDb