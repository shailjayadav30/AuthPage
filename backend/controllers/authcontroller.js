const usermodel=require("..//models/user")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
// console.log(usermodel)
const signup=async(req,res)=>{
try {
    const {name,email,password}=req.body
    const user= await usermodel.findOne({email})
    if(user){
        return res.status(409)
        .json({message:"user allready exists",success:false})
    }
    const newuser=new usermodel({name,email,password})
    newuser.password=await bcrypt.hash(password,10)
    await newuser.save();
    res.status(201)
    .json({message:"Signup successful",
        succes:true
    })
} catch (err) {
res.status(500).json({
    message:"internal server errror",
    succes:false
})
    
}
}



const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user= await usermodel.findOne({email})
        const errormsg="authentication failed email pass is wrong "
        if(!user){
            return res.status(403)
            .json({message:"user not signup",success:false})
        }
        const ispassequal=await bcrypt.compare(password,user.password)
    if(!ispassequal){
        return res.status(403)
            .json({message:errormsg,success:false})
    }

    const jwttoken=jwt.sign(
        {email:user. email ,_id:user._id},
    process.env.JWT_SECRET,
    {expiresIn:"24h"}
    )
        res.status(201)
        .json({message:"Login successful",
            succes:true,
            jwttoken,
            email,
            name:user.name
        })
    } catch (err) {
    res.status(500).json({
        message:"internal server errror",
        succes:false
    })
        
    }
    }
 module.exports={signup,login} 