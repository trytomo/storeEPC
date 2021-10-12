const express = require("express");

const mysql = require("mysql")
const app = express();

app.use(express.json());
const port = process.env.port || 8080;

// var con = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:"smpn12",
//     database:"singgalang"
// });

app.listen(port,()=>{
    console.log(`Bisa run di ${port}`);
});

// con.connect(function(err){
//     if (err) throw err;
//     console.log("Connected Mysql")
// })

app.get("/", async (req, res) => {
    res.json({message:"Welcome World"});
})

app.get("/:data_epc",async (req, res) =>{
    const query = "SELECT * FROM storeEpc WHERE id = ?";
    pool.query(query, [req.params.data_epc],(error, results)=>{
        if (!results[0]){
            res.json({message:"No Data"})
        } else {
            res.json(results[0]);
        }
    });
});

const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"smpn12",
    database:"singgalang"
});

app.post("/",async(req, res) =>{
    const data = {
        id:req.body.id,
        data_epc: req.body.data_epc,
        timestamp:req.body.timestamp
    }
    const query = "INSERT INTO storeEpc VALUES (?,?,?)"
    pool.query(query, Object.values(data), (error)=>{
        if (error){
            res.json({message:"fail", reason:error.code});
        } else {
            res.json({message:"success", data:data});
        }
    });
});