import { Sequelize } from "sequelize";

import { db } from './config.mjs'

export const sequelize = new Sequelize(
    db.database,
    db.user,
    db.password,
    {
        host : db.host,
        dialect: db.dialect
    }
);

export async function testDBConnection() {
    try{
        await sequelize.authenticate();
        console.log("Connected");
    } catch(err){
        console.error(`Erreur DB : ${err}`)
    }
}
