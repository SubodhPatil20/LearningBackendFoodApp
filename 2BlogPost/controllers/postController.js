const postModels =require("../models/postModels");


const createPost=async(req,res)=>{
    try {
        const {title,content} = req?.body;
        if(!title || !content)
        {
            res.status(404).send({
                success:false,
                message:"Tilte or content is missing"
            })
        }
        console.log(req.user.id,"all user id");
        const postData = new postModels({title,content,content_creator:req.user.id,status:"active"});
        await postData.save();
            res.status(201).send({
            status:true,
            message:"Data has been stored successfully"
        })
    } 
    catch (error) {
            res.status(500).send({
            success:false,
            message:"some error in create post api",
            error
        })   
    }
}

const likeUnlikePost=async(req,res)=>{
    try {
        // console.log(req.params)
        const {post_id} =req.params;
        console.log(post_id,"fdjsd")
        if(!post_id )
        {
            res.status(401).send({
                success:false,
                message:"post Id is missing"
            })
        }
        const post_data = await postModels.findById(post_id)
        console.log(post_data,"post_data");
        
        if(!post_data)
        {
            res.status(401).send({
                success:false,
                message:"Enter a valid post id"
            })
        }
 
        let checkLiked=post_data.liked_by.indexOf(post_id);
        console.log(checkLiked,"all checked list")
        if(checkLiked !==-1)
        {
        post_data.liked_by.splice(checkLiked, 1); 
        await post_data.save();
        res.status(201).send({
            success:true,
            message:"post unliked"
        })
        }
        else{
        post_data.liked_by.push(post_id);
        await post_data.save();
         res.status(201).send({
            success:true,
            message:"post is liked"
        })
        }        
    } catch (error) {
        res.status(500).send({
        status:false,
        error,
        message:"error in api of like post"
        })
    }
}

module.exports ={createPost, likeUnlikePost};