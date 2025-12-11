import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    'Thread_database',
    'root',
    'root',
    {
        host : '127.0.0.1',
        dialect: 'mysql'
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