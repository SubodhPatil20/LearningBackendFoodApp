const resturantModel = require("../models/resturantModel");

const createResturantController =async (req,res)=>{
    try {
        const {title, imgUrl,foods,time, pickup, delivery, isOpen, rating, ratingCount, logoUrl, code, coords} =req.body;
      if(!title || !coords)
      {
        res.status(404).send({
            success:false,
            message:"please enter title and address"
        })
      }
     
      const newResturant = new resturantModel({
        title, imgUrl,foods,time, pickup, delivery, isOpen, rating, ratingCount, logoUrl, code, coords
      });
      await newResturant.save()
      res.status(201).send({
        success:true,
        message:"new resturant is created"
      })
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in create resturant api"
        })
    }
}

const getAllResturantController  = async(req,res)=>{
try {
    const restuantData= await resturantModel.find({});
    if(!restuantData)
    {
        res.status(404).send({
            success:false,
            message:"No Available Resturant"
        })
    }

    res.status(201).send({
        success:true,
        totalCount:restuantData.length,
        restuantData
    })
} catch (error) {
    res.status(500).send({
        message:"Error in API of get All restuant "
    })
}
}


module.exports={createResturantController ,getAllResturantController}