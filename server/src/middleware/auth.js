import jwt from "jsonwebtoken"

export default (req,res,next)=>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodeToken = jwt.verify(token,"secretKey")
        req.userData = {userId:decodeToken.userId}
        next()
    } catch (error) {
        res.status(500).json({ message: error });
    }
}