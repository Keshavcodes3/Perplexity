import jwt from 'jsonwebtoken'

export const IdentifyUser=async(req,res,next)=>{
    let decoded;
    const {token}=req.cookies
    if(!token){
        return res.status(401).json({
            message:"User Not authorized",
            success:false
        })
    }
    try{
        decoded=await jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return res.status(400).json({
            message:"Error encountered",
            success:false
        })
    }
    req.user=decoded
    next()
}