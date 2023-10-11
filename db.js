const Pool=require("pg").Pool;
const pool=new Pool({
    user:"postgres",
    password:"neethu123",
    host:"localhost",
    port:5432,
    database:"callerslist"
})
module.exports=pool;