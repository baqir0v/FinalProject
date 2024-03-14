import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import path from "path"
import upload from "../middleware/multer.js";

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await UserModel.find({}).populate("inWishList").populate("isWatched")
            res.send(allUsers)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getUserByID: async (req, res) => {
        try {
            const getByID = await UserModel.findById(req.params.id).populate("inWishList").populate("isWatched")
            res.send(getByID)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    registerUser: async (req, res) => {
        try {
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
            const { email, nickname, password } = req.body;
    
            // Find a user by both email and nickname
            const user = await UserModel.findOne({ email, nickname });
    
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
    
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(404).json({ error: "Invalid password" });
            }
    
            const token = jwt.sign(
                { userId: user._id, email: user.email, nickname: user.nickname, isAdmin: user.isAdmin, image: user.image },
                "secretKey",
                {
                    expiresIn: "1h",
                }
            );
    
            res.status(200).json(token);
        } catch (error) {
            res.status(500).json({ message: error.message });
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
                    isSuperAdmin: req.body.isSuperAdmin,
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
                isAdmin: req.body.isAdmin,
                isSuperAdmin: req.body.isSuperAdmin
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
    updateWatched: async (req, res) => {
        try {
            const { id } = req.params;
            const { movieId } = req.body;
            const findUser = await UserModel.findById(id);

            if (!findUser) {
                return res.status(404).json({ message: 'User not found' });
            }

            const isAlreadyWatched = findUser.isWatched.includes(movieId);

            if (isAlreadyWatched) {
                return res.status(400).json({ message: 'Movie is already marked as watched.' });
            }

            findUser.isWatched.push(movieId);
            await findUser.save();
            res.send(findUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log(error);
        }
    },

    deleteWatched: async (req, res) => {
        try {
            const { id } = req.params;
            const { movieId } = req.body;
            const findUser = await UserModel.findById(id);
            console.log(typeof movieId);
            console.log(findUser.isWatched);
            findUser.isWatched = findUser.isWatched.filter(watchedMovieId => watchedMovieId.toString() !== movieId);
            await findUser.save();
            res.send(findUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
            console.log(error);
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
                const imageFile = req.files['image'][0];
                const image = imageFile.path;

                const cloudinaryResult = await cloudinary.uploader.upload(image, {
                    folder: 'users',
                });

                const updatedUser = await UserModel.findByIdAndUpdate(
                    id,
                    { image: cloudinaryResult.secure_url },
                    { new: true }
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
    },
    updatePassword: async (req, res) => {
        try {
            const { id } = req.params;
            const { currentPassword, newPassword } = req.body;

            // Find the user by ID
            const user = await UserModel.findById(id);

            // Verify if the current password matches the user's stored password
            const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Current password is incorrect" });
            }

            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password with the new hashed password
            user.password = hashedNewPassword;
            await user.save();

            res.status(200).json({ message: "Password updated successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
    }

}

export default userController