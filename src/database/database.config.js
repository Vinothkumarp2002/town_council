
const mssql = require("mssql");
const dotenv =require('dotenv')
dotenv.config();

const config = {
    server: process.env.SERVER,
    database: process.env.DATABASE,
    user: process.env.USER, 
    password: process.env.PASSWORD,
    options: {
        trustedConnection: false,
        enableArithAbort: true,
        encrypt: false, 
        trustServerCertificate: true,

    }
}


// mssql.connect(config, function(err) {
//     if(err) {
//         console.log("err", err)
//     }
//     else{
//         console.log("connected")
//     }
// })

module.exports = config;