const JWT = require("jsonwebtoken")

const tokenCheck = async (req, res, next) => {
  try {
    const authHeader = req?.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token missing or malformed",
      });
    }
console.log(token,"recieved token")
    JWT.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized token",
        });
      }
      console.log(decoded,"decodeddecodeddecodeddecoded");
      
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Token check error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during token validation",
    });
  }
};

module.exports ={tokenCheck};











// export const auth = async (req, res, next) => {
//   const token = req.get("Authorization")?.split(" ")[1];
//   if (!token) {
//     return res.json({
//       status: 400,
//       success: "false",
//       message: "provide token in Authorization",
//     });
//   }

//   try {
//     let decodedToken;
//     decodedToken = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
//     if (!decodedToken) {
//       return res.json({
//         status: 400,
//         success: "false",
//         message: "Invalid token",
//       });
//     }
//     const id = decodedToken.userId
//     const userDetails= await currentUserDataHelper(id)
//     if(!userDetails){
//       return res.json({
//         status:401,
//         success:false,
//         message:"User is not available"
//       })
//     }
//     if(userDetails?.status=="inactive"){
//       return res.json({
//         status:401,
//         success:false,
//         message:"You are inactive,please contact to admin "
//       })
//     }

//     req.UserData = decodedToken;
//     next();
//   } catch (error) {
//     res.json({
//       status: 401,
//       success:false,
//       message: "Token expired,please login again.",
//     });
//   }
// };