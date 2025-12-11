import {db} from './config.mjs';
import { Sequelize, DataTypes } from 'sequelize';

export async function loadSequelize() {

    try {
        const sequelize = new Sequelize
            (db.database,
                db.user,
                db.password,
                {
                    host: db.host,
                    dialect: db.dialect
                });


    } catch (error) {

        console.error(error);
        throw Error("Échec du chargement de Sequelize");
    }
}