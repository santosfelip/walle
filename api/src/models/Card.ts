import Sequelize from 'sequelize';
import { conection } from '../db/conection';

export const Card = conection.define('card', {
    id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
    },
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    conteudo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lista: {
        type: Sequelize.STRING,
        allowNull: false
    }
});