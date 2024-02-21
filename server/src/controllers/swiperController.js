import upload from "../middleware/multer.js";
import swiperModel from "../models/swiperModel.js";
import cloudinary from "../utils/cloudinary.js";

const swiperController = {
    getAll: async (req, res) => {
        try {
            const all = await swiperModel.find({})
            res.send(all)
        } catch (error) {
            res.status(500).json({ message: error })

        }
    },
    getByID: async (req, res) => {
        try {
            const all = await swiperModel.find({})
            res.send(all)
        } catch (error) {
            res.status(500).json({ message: error })

        }
    },
    createNew: async (req, res) => {
        try {
            upload.fields([{ name: "swiperimage" }])(req, res, async (err) => {
                if (err) {
                    console.error(err);
                    return res.status(400).json({ message: err.message });
                }
                const { swipername } = req.body

                const imageResult = req.files['swiperimage'][0];

                const cloudinaryResult = await cloudinary.uploader.upload(imageResult.path, {
                    folder: "swiper",
                });

                const newSwiper = new swiperModel({
                    swipername,
                    swiperimage: cloudinaryResult.secure_url
                })

                await newSwiper.save()
                return res.send(newSwiper)
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}

export default swiperController