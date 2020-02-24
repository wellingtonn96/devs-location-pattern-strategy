const Sequelize = require('sequelize')

const schemaDevs = {
    tableName: 'TB_DEVS',
    schema: {
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
            allowNull: false,
        },
    
        created_at: {
            type: Sequelize.DATE,
            defaultValue: new Date()
        },
    
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: new Date()
        }
    },
    options: {
        tableName: 'TB_DEVS',  
        freezeTableName: false,
        timestamps: false
    }
} 

module.exports = schemaDevs