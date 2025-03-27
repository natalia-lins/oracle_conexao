const { connect } = require('../config/database');

async function getUsers() {
    let connection;
    try {
        connection = await connect();
        const result = await connection.execute("SELECT * FROM USERS");
        return result.rows;
    } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        throw err;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

async function createUser(nome, email) {
    let connection;
    try {
        connection = await connect();
        const sql = "INSERT INTO USERS (NOME, EMAIL) VALUES (:nome, :email)";
        await connection.execute(sql, [nome, email], { autoCommit: true });
    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        throw err;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
}

module.exports = { getUsers, createUser };
