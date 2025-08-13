const testController =(req,res)=>{
    try {
        res.status(200).send({
            success:true,
            data:"All data is updated"

        })
        
    } catch (error) {
        console.log("error in api" ,error  )
    }
};

module.exports ={testController}