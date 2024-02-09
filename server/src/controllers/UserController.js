import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import path from "path"
import upload from "../middleware/multer.js";

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await UserModel.find({})
            res.send(allUsers)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getUserByID: async (req, res) => {
        try {
            const getByID = await UserModel.findById(req.params.id)
            res.send(getByID)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    // registerUser: async (req, res) => {
    //     try {
    //         const { nickname, email, password, isAdmin } = req.body
    //         console.log(req.body);
    //         // let imagePath = image

    //         const nicknameExist = await UserModel.findOne({ nickname })
    //         const emailExist = await UserModel.findOne({ email })

    //         if (nicknameExist) {
    //             res.status(400).send("Nickname already exist")
    //         }
    //         if (emailExist) {
    //             res.status(400).send("Email already exist")
    //         }
    //         // if (!image.startsWith("http")) {
    //         //     console.log(image);
    //         //     // const _dirname = path.resolve()
    //         //     imagePath = image.replace(/\\/g, '/');
    //         //     console.log(imagePath);
    //         // }

    //         const result = await cloudinary.uploader.upload(
           
    //         req.files['image'][0].path,{
    //             folder:"users"
    //         }

    //         )
    //         console.log(result,"Axhmed");
    //         const hashedPassword = await bcrypt.hash(password, 10)

    //         console.log(nickname);

    //         const newUser = new UserModel({
    //             nickname,
    //             email,
    //             password: hashedPassword,
    //             image: result.secure_url,

    //             // {
    //             //     public_id: result.public_id,
    //             //     url: result.secure_url
    //             // },
    //             isAdmin
    //         })

    //         await newUser.save()
    //         res.send(newUser)
    //     } catch (error) {
    //         res.status(500).json({ message: error.message })
    //     }
    // },

    registerUser: async (req, res) => {
        try {
            // Use upload.fields middleware directly in the controller
            upload.fields([{ name: 'image' }])(req, res, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ message: err.message });
                }
    
                const { nickname, email, password, isAdmin } = req.body;
    
                const nicknameExist = await UserModel.findOne({ nickname });
                const emailExist = await UserModel.findOne({ email });
    
                if (nicknameExist) {
                    return res.status(400).send("Nickname already exists");
                }
                if (emailExist) {
                    return res.status(400).send("Email already exists");
                }
    
                const imageResult = req.files['image'][0];
    
                // Upload the image to Cloudinary
                const cloudinaryResult = await cloudinary.uploader.upload(imageResult.path, {
                    folder: "users",
                });
    
                const hashedPassword = await bcrypt.hash(password, 10);
    
                const newUser = new UserModel({
                    nickname,
                    email,
                    password: hashedPassword,
                    image: cloudinaryResult.secure_url,
                    isAdmin,
                });
    
                await newUser.save();
                return res.send(newUser);
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { nickname, email, password } = req.body
            const findUser = await UserModel.findOne({ nickname })
            if (!findUser) {
                res.status(404).json({ error: "User not found" });
            }
            if (!(bcrypt.compare(password, findUser.password))) {
                res.status(404).json({ error: "Password is not Correct" });
            }
            const token = jwt.sign({ userId: findUser._id, email: findUser.email, nickname: findUser.nickname, isAdmin: findUser.isAdmin, image: findUser.image }, "secretKey", {
                expiresIn: "1h",
            });
            res.status(200).json(token)

        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    deleteUser: async (req, res) => {
        try {
            const deleteUserByID = await UserModel.findByIdAndDelete(req.params.id)
            res.send(`${deleteUserByID.nickname} deleted`)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    updateUser: async (req, res) => {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                req.params.id,
                {
                    nickname: req.body.nickname,
                    email: req.body.email,
                    password: req.body.password,
                    isAdmin: req.body.isAdmin,
                    image: req.body.image,
                }
            );

            if (updatedUser) {
                res.send(`${updatedUser.nickname} changed`);
            } else {
                res.status(404).send("User not found");
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateAdmin: async (req, res) => {
        try {
            const newAdmin = await UserModel.findByIdAndUpdate(req.params.id, {
                isAdmin: req.body.isAdmin
            })
            res.send(newAdmin)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export default userController