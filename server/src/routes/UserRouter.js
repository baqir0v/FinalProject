import express from "express"
import userController from "../controllers/UserController.js";
import upload from "../middleware/multer.js";
const userRouter = express.Router()

userRouter.get("/",userController.getAllUsers)
userRouter.get("/:id",userController.getUserByID)
// userRouter.post("/register",upload.fields([{ name: 'image' }])
// ,userController.registerUser)
// Remove the upload middleware from the route
userRouter.post("/register", userController.registerUser);
userRouter.post("/login",userController.loginUser)
userRouter.delete("/:id",userController.deleteUser)
userRouter.put("/:id",userController.updateUser)
userRouter.put("/:id",userController.updateAdmin)
userRouter.put("/addWishlist/:id",userController.updateWishlist)
userRouter.put("/updateImage/:id",userController.updateImage)
userRouter.put("/updateWatched/:id",userController.updateWatched)
userRouter.put("/deleteWatched/:id",userController.deleteWatched)
userRouter.put("/updatePassword/:id",userController.updatePassword)

export default userRouter