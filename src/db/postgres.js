import Icrud from './interface/interface'

class Postgres extends Icrud {
    constructor() {
        super()
    }

    create() {
        console.log('Usuario cadastrado com sucesso no Postgres')
    }
}

export default Postgres