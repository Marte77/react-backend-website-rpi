const maria = require('mariadb')

const pool = maria.createPool({
    host: 'localhost',
    user: 'vscode',
    password:'vscode123',
    connectionLimit: 5,
    database: 'base_dados_website',
    port:3306
});

async function query(stringquery) {
    let conn;
    if(stringquery[stringquery.length-1] !== ';'){
        throw 'NAO TERMINA COM ;'
    }
    try {
        conn = await pool.getConnection();
        var rows = await conn.query(stringquery);
        console.log()
    } catch (err) {
        throw err;
    } finally {
        if (conn) conn.release(); //release to pool
        if (conn) return rows
    }
}

module.exports = query
