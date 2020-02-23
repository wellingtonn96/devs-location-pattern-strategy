const Sequelize = require('sequelize');

const sequelize = new Sequelize('dev_location', 'postgres', 1234, {
    host: 'localhost',
    dialect: 'postgres'
})

async function main() {
    const Devs = sequelize.define('TB_DEV', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },    
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        github_username: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        bio: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        avatar_url: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        techs: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        location: {
            type: Sequelize.ARRAY(Sequelize.FLOAT),
        },

        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },

        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
        },
    }, {
        tableName: 'TB_DEVS',  
        freezeTableName: false,
        timestamps: false
    })

    await Devs.sync()

    await Devs.create({
        name: 'fsfd',
        github_username: 'dfsf',
        bio: 'fsdfd',
        avatar_url: 'fsfd',
        techs: 'fsfffd',
        location: [1.545, 1.545],
        created_at: new Date(),
        updated_at: new Date()
    })

    const results = await Devs.findAll({ raw: true })
    console.log('results', results)
}

main()