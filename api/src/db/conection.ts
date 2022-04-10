const { Sequelize } = require('sequelize');

export const conection = new Sequelize({
    dialect: 'sqlite',
    storage: './src/db/database.sqlite',
    logging: false
});