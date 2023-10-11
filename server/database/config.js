const mysql = require('mysql2')

function exec(query) {
    return new Promise((res, rej) => {
        const con = mysql.createConnection({
            host: 'localhost',
            user: 'aluno',
            password: 'aluno',
            database: 'Blunt'
        })

        con.connect();

        con.query(query, (e, results) => {
            con.end()
            e ? rej(e) : res(results)
        })
    })
}

module.exports = { exec }