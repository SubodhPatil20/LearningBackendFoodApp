
export const auth = async (req, res, next) => {
  const token = req.get("Authorization")?.split(" ")[1];
  if (!token) {
    return res.json({
      status: 400,
      success: "false",
      message: "provide token in Authorization",
    });
  }

  try {
    let decodedToken;
    decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    if (!decodedToken) {
      return res.json({
        status: 400,
        success: "false",
        message: "Invalid token",
      });
    }
    const id = decodedToken.userId
    const userDetails= await currentUserDataHelper(id)
    if(!userDetails){
      return res.json({
        status:401,
        success:false,
        message:"User is not available"
      })
    }
    if(userDetails?.status=="inactive"){
      return res.json({
        status:401,
        success:false,
        message:"You are inactive,please contact to admin "
      })
    }

    req.UserData = decodedToken;
    next();
  } catch (error) {
    res.json({
      status: 401,
      success:false,
      message: "Token expired,please login again.",
    });
  }
};