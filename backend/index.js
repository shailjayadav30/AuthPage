const   express = require('express')
const app  = express();
const bodyparser=require("body-parser")
const cors=require("cors");
const Authrouter=require("./routes/Authrouter")
const Productrouter =require(".//routes/Productrouter")
require('dotenv').config();
require("./models/db")

const PORT = process.env.PORT ||  8080;
 

app.get('/',(req, res)=> 
    {res.send("shailja")    })
app.use(bodyparser.json());
app.use(cors())
app.use("/auth",Authrouter)
app.use("/products",Productrouter)

app.listen(PORT,()=>{
    console.log('server is running ')
})