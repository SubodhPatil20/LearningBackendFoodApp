const categoryModels = require("../models/categoryModels");

const createCategory =async (req,res)=>{
    try {
        const {title, imgUrl} =req.body;
        if(!title )
        {
            res.status(404).send({
                success:false,
                messge:"please provide title"
            })
        }

        const newCategory = new categoryModels({title,imgUrl});
        await newCategory.save();
        res.status(201).send({
            success:true,
            message:"Category is created",
            newCategory
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in api of create category",
            error
        })
        console.log("error in api of createCategory",error)
    }
};


const getAllCategory=async(req,res)=>{
    try {

        const allCategory = await categoryModels.find({},{status:0});
        if(!allCategory)
        res.status(404).send({
            success:false,
            message:"No category Found"
        })

        res.status(201).send({
            success:true,
            message:"Found multiple categories",
            allCategory
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in api of Get all Category"
        })
    }
}

const updateCategory=async(req,res)=>{
    try {
    const {title,imgUrl} =req.body;
       const {id} = req.params;
    
    const getOneCategory =await categoryModels.findByIdAndUpdate(id,{title,imgUrl},{new:true});

    if(!getOneCategory){
        res.status(404).send({
            success:false,
            message:"error in updating the category"
        })
    }

    res.status(201).send({
      success:true,
      message:"Category is Updated"
    })
    }
     catch (error) {
    res.status(500).send({
    success:false,
    message:"Error in api of update category"
});        
    }
}

module.exports ={createCategory, getAllCategory ,updateCategory}