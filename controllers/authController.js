const { token } = require("morgan");
const userModels = require("../models/userModels");
const bcrypt =require('bcryptjs');
const jwt =require('jsonwebtoken');
const registerController =async  (req , res)=>{
    try {
        const {userName, email, password, phone, address ,userType} =req.body;

        if(!userName || !email || !password || !phone || !address){
           return res.status(500).send({
            success:false,
            message:"All fielda are required"
           })
        }

        if(userType && !['client','admin','vendor','driver'].includes(userType))
        {
             return res.json({
            success:false,
            status:404,
            message:"Enter valid usertype"
           })
        }
        
        const existing = await userModels.findOne({email});
        if(existing)
        {
            return res.json({
                status:500,
                success:false,
                message:"email already exist"
            })
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPasspord= await bcrypt.hash(password,salt);
        const user = await userModels.create({
            userName,
            email,
            password:hashPasspord,
            phone,
            address,
            userType
        })
        if (!user){
            return res.json({
                status:400,
                message:"something went wrong",
                success:false
            })
        }

        return res.json({
            status:200,
            success:true,
            message:"User is registred successfully"
        })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"error in registerController api",
            error
        })
    }
};

const loginController=async (req,res)=>{
try {
     const {email , password} =req.body;
    if(!email || !password)
    {
        return res.json({
            status:500,
            success:false,
            message:"Please inseart all Fields"
        })
    }

    const existingEmail = await userModels.findOne({email});

    if(!existingEmail)
    {
        return res.json({
            status:500,
            success:false,
            message:"Email does not exist"
        })
    }
    else{
        const isMatch =await bcrypt.compare(password ,existingEmail.password);
        if(isMatch)
        {
            return res.json({
                status:500,
                success:false,
                message:"Enter a valid password"
            })
        }
        else{
            const payload = {email:existingEmail.email , password:existingEmail.password};
        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY , {
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        });
        console.log( process.env.TOKEN_SECRET_KEY , {
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        })
            return res.json({
                status:201,
                success:true,
                message:"Login successfully",
                token
            })
        }
    }
} catch (error) {
    res.json({
        status:500,
        success:false,
        message:"Error in Login api",
        error
    })
}
   
}




module.exports ={registerController,loginController};
