const { Sequelize } = require('sequelize');

const db = {
    name: process.env.WEBAPP_DB_NAME || "Login",
    user: process.env.WEBAPP_DB_USER || "Test",
    pass: process.env.WEBAPP_DB_PASSWORD || "test1234",
    host: process.env.POSTGRES_HOST || "localhost"
}

class Database extends Sequelize {
    constructor() {
        super(db.name,db.user,db.pass, {
            host: db.host,
            dialect: "postgres",
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
    }

    async init() {
        try {
            await super.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            throw new Error(`Unable to connect to the database: ${JSON.stringify(error)}`);
        }
    }
}

module.exports = Database;