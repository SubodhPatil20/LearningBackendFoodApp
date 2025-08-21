const commentModels = require("../models/commentModels");

const createComment = async(req,res)=>{
try {
    const {post_id,the_comment,parent_comment_id}=req.body;
    const userId =req.user.id;
    if(!post_id || !the_comment)
        {
            return res.status(404).send({
                success:false,
                message:"post_id or comment is missing"
            })
        }

const commentData = new commentModels({post_id,the_comment,comment_by:userId,parent_comment_id})
await commentData.save();
res.status(201).send({
        success:true,
        message:"Comment is created successfully"
    })
} catch (error) {
    res.status(500).send({
        success:false,
        message:"error in api of create comment",
        error
    })
}
}

module.exports={createComment};