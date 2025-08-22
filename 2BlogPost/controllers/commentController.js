const commentModels = require("../models/commentModels");
const postModels = require("../models/postModels");
const userModels = require("../models/userModels");
const mongoose =require("mongoose");
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

const getAllCommentonPost =async (req, res)=>{
    try {
        console.log("api is hitted")
        const {post_id} =req.params;
        if(!post_id)
        {
            return res.status(404).send({
                success:false,
                message:"post id is missing"
            })
        }

        const allcomments = await commentModels.find({post_id});
        if(!allcomments || allcomments?.length ===0)
        {
            return res.status(404).send({
                 success:false,
                message:"No comments on this post" 
            })
        }

        res.status(201).send({
            success:true,
            data:allcomments
        })
    } catch (error) {
           res.status(500).send({
        success:false,
        message:"error in api of get all comments",
        error
    })
    }
}

// const getAllBlogAndCommentOfUser=async (req,res)=>{
//     try {
//         const {id} =req.params;
//         const getUserDetail = await userModels.findById(id,{password:0});
//         const allpostDetails= await postModels.find({content_creator:id});
//         if(allpostDetails.length>0)
//         {
//             let allIds = allpostDetails.map(ele=>ele._id);
//             const allcommentsDeatils = await commentModels.countDocuments({post_id:{$in:allIds}})
//             console.log(allcommentsDeatils,"all ids")
//         }
//         console.log(getUserDetail,allpostDetails);
//         res.status(201).send({
//             success:true,
//             message:"successfull retrieved data"
//         })
        
//     } catch (error) {
// res.status(500).send({
//     success:false,
//     message:"error in Api of get all blog and comment of User",
//     error
// })        
//     }
// }
const getAllBlogAndCommentOfUser = async (req, res) => {
  try { 
    const { id} = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    // Validate userId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID format"
      });
    }

    // Get total count for pagination
    const totalPosts = await postModels.countDocuments({
      content_creator: id,
      status: "active"
    });

    // Calculate pagination values
    const skip = (page - 1) * limit;

    // Fetch paginated posts
    const posts = await postModels.find({
      content_creator: id,
      status: "active"
    })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!posts || posts.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No posts found for this user"
      });
    }

    // Get comments and likes count for each post
    const postsWithStats = await Promise.all(
      posts.map(async (post) => {
        const commentsCount = await commentModels.countDocuments({
          post_id: post._id
        });

        const likesCount = post.liked_by ? post.liked_by.length : 0;

        return {
          _id: post._id,
          title: post.title,
          content: post.content,
          createdAt: post.createdAt,
          updatedAt: post.updatedAt,
          likesCount: likesCount,
          commentsCount: commentsCount
        };
      })
    );

    res.status(200).json({
      success: true,
      message: "User posts retrieved successfully",
      page,
      limit,
      totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
      data: postsWithStats
    });

  } catch (error) {
    console.error("Error in getUserPostsWithStats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error
    //   error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


const getPostWithParentComments = async (req, res) => {
  try {
    const { id:postId } = req.params;

    // Validate postId format
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid post ID format"
      });
    }

    // 1. Get the post
    const post = await postModels.findById(postId)
      .populate('content_creator', 'userName profile')
      .populate('liked_by', 'userName profile');

    if (!post || post.status === "inactive") {
      return res.status(404).json({
        success: false,
        message: "Post not found or unavailable"
      });
    }

    // 2. Get all comments for this post
    const comments = await commentModels.find({ 
      post_id: postId,
      status: 'active' // Only active comments
    })
    .populate('comment_by', 'userName profile')
    .populate('liked_by', 'userName profile')
    .sort({ createdAt: 1 }); // Oldest first for proper threading

    // 3. Organize comments into parent-child structure
    const commentMap = {};
    const rootComments = [];

    // First pass: Create a map of all comments
    comments.forEach(comment => {
      commentMap[comment._id] = {
        ...comment.toObject(),
        replies: []
      };
    });

    // Second pass: Build the tree structure
    comments.forEach(comment => {
      if (comment.parent_comment_id) {
        // This is a reply, add it to its parent's replies
        if (commentMap[comment.parent_comment_id]) {
          commentMap[comment.parent_comment_id].replies.push(commentMap[comment._id]);
        }
      } else {
        // This is a root-level comment
        rootComments.push(commentMap[comment._id]);
      }
    });

    // 4. Calculate stats
    const likesCount = post.liked_by ? post.liked_by.length : 0;
    const commentsCount = comments.length;

    // 5. Prepare response
    const response = {
      post: {
        _id: post._id,
        title: post.title,
        content: post.content,
        content_creator: post.content_creator,
        likes_count: likesCount,
        liked_by: post.liked_by,
        comments_count: commentsCount,
        status: post.status,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt
      },
      comments: rootComments,
      pagination: {
        total_comments: commentsCount,
        total_root_comments: rootComments.length,
        total_replies: commentsCount - rootComments.length
      }
    };

    res.status(200).json({
      success: true,
      message: "Post and comments retrieved successfully",
      data: response
    });

  } catch (error) {
    console.error("Error in getPostWithComments:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


module.exports={createComment,getAllCommentonPost,getAllBlogAndCommentOfUser,getPostWithParentComments};