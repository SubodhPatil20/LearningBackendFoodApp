const userModels = require("../models/userModels");

const getUserController =async (req,res)=>{
    try {
        const user_id =  req.user.id
        console.log(user_id,"user_iduser_id");
        
        const userActive = await userModels.findById(user_id);
        if(userActive && userActive.status ==="inactive"){
            return res.json({
                status:404,
                success:false,
                message:"You are inactive"
            })
        }

        res.status(201).send({
            success:true,
            data:userActive
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"some error in get user data api"
        })
    }
}

const updateUserController =async (req,res)=>{
try {
    console.log(req.user,"all req dta");
    const user_id =req.user.id;

    const user_data= await userModels.findById({_id:user_id});
    if(!user_data){
        res.status(404).send({
            success:false,
            message:"User does not exist",
        })
    }
    else{
const allowedFields = ["userName", "address", "phone","userType"];
         // extend this list as needed
        // ✅ Iterate and update only allowed fields
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                user_data[field] = req.body[field];
            }
        });

       await user_data.save();

        res.status(201).send({
            success:true,
            message:"User Data is Updated"
        })
    }
} catch (error) {
    res.status(500).send({
        success:false,
        message:"Error in update user api",
        error
    })
}
}

module.exports={getUserController,updateUserController}