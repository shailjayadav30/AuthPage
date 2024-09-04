const ensureauthenticated = require("../middlewares/Auth");

const router=require("express").Router()
router.get("/",ensureauthenticated,(req,res)=>{
    res.status(200).json([{
        name:"mobile",
        price:10000
    },
    {
        name:"tv",
        price:2000
    }
])
})

module.exports=router;