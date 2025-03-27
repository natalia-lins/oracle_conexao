require('dotenv').config();
const oracledb = require('oracledb');

oracledb.initOracleClient(); // Necessário se estiver usando o Instant Client

async function connect() {
    try {
        const connection = await oracledb.getConnection({
            user: process.env.ORACLE_USER,
            password: process.env.ORACLE_PASSWORD,
            connectionString: process.env.ORACLE_CONNECTION_STRING
        });
        console.log("✅ Conexão bem-sucedida com o Oracle!");
        return connection;
    } catch (err) {
        console.error("❌ Erro ao conectar ao Oracle:", err);
        throw err;
    }
}

module.exports = { connect };

