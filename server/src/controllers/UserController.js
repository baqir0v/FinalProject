import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import path from "path"
import upload from "../middleware/multer.js";

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await UserModel.find({}).populate("inWishList")
            res.send(allUsers)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getUserByID: async (req, res) => {
        try {
            const getByID = await UserModel.findById(req.params.id).populate("inWishList")
            res.send(getByID)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
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
            const findEmail = await UserModel.findOne({ email })
            if (!findUser) {
                res.status(404).json({ error: "User not found" });
            }
            if (!findEmail) {
                res.status(404).json({ error: "Email not found" });
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
    },
    updateWishlist: async (req, res) => {
        try {
            const { id } = req.params
            const { movieId } = req.body
            const findUser = await UserModel.findById(id)
            const isMovieAlreadyInWishlist = findUser.inWishList.includes(movieId);

            if (isMovieAlreadyInWishlist) {
                findUser.inWishList.splice(findUser.inWishList.indexOf(movieId), 1);
            }
            else {
                findUser.inWishList.push(movieId);
            }
            await findUser.save()
            res.send(findUser)
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateImage: async (req, res) => {
        try {
            upload.fields([{ name: "image" }])(req, res, async function (err) {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ message: err.message });
                }
    
                const { id } = req.params;
                const imageFile = req.files['image'][0]; // Get the uploaded image file
                const image = imageFile.path; // Path of the uploaded image file
    
                // Upload the new image to Cloudinary
                const cloudinaryResult = await cloudinary.uploader.upload(image, {
                    folder: 'users',
                });
    
                // Update the user document with the new Cloudinary URL
                const updatedUser = await UserModel.findByIdAndUpdate(
                    id,
                    { image: cloudinaryResult.secure_url },
                    { new: true } // Returns the updated user
                );
    
                if (updatedUser) {
                    res.send(updatedUser);
                } else {
                    res.status(404).send('User not found');
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

}

export default userController