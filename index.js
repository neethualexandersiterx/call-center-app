const express = require('express')
const cors=require('cors')
const app = express()
const port = 4000
app.use(express.json())
const pool = require('./db');
//middleware
app.use(cors()); 
app.use(express.json());

//create a user
app.post("/addcaller", async (req, res) => {
    try {
        const { name, phone, email, address } = req.body;
        console.log({
            name,
            phone,
            email,
            address
        });

        if (!name || !phone || !email || !address) {
            return res.status(400).json({ message: "Please enter all the fields" });
        }

        const newCaller = await pool.query(
            'INSERT INTO calllist (name, phone, email, address) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, phone, email, address]
        );

        res.json(newCaller.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal server error" });
    }
});


    //get all callers

    app.get("/callers",async(req,res)=>{
        try{
          const allcallers=await pool.query("SELECT * FROM calllist");
        res.json(allcallers.rows);
        }catch(err){
          console.error(err.message);
        }
      })
    //search users by name/phone
    app.post("/callers/search", async (req, res) => {
        try {
          const { searchTerm, searchBy } = req.body;
          console.log(searchTerm, searchBy);
          // Check if searchBy is "Name" or "Phone" and construct the appropriate SQL query
          let sqlQuery;
          if (searchBy === "Name") {
            sqlQuery = "SELECT * FROM calllist WHERE Name ILIKE $1";
          } else if (searchBy === "Phone") {
            console.log("enter into phne");
            sqlQuery = "SELECT * FROM calllist WHERE phone ILIKE $1";
          } else {
            // Handle invalid searchBy criteria here, if needed.
            res.status(400).json({ error: "Invalid searchBy criteria" });
            return;
          }
      
          const searchResult = await pool.query(sqlQuery, [`%${searchTerm}%`]);
          res.json(searchResult.rows);
        } catch (err) {
          console.error(err.message);
          res.status(500).json({ error: "Internal server error" });
        }
      });
      app.get('/callers/:id',async(req,res)=>{
          try{
            const {id}=req.params;
            const callers=await pool.query("SELECT * FROM calllist WHERE caller_id=$1",[id])
            res.json(callers.rows[0]);

          } catch(err){
            console.log(err.message);
          }
      })
      



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))