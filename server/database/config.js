const mysql = require('mysql2')

function exec(query) {
    return new Promise((res, rej) => {
        const con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '1234',
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