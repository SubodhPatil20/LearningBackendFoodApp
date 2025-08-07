const getUserController =async (req,res)=>{
    console.log(req?.user,"our iddddddddddddddddddd")
    res.status(200).send("get user is working");
}

module.exports={getUserController}