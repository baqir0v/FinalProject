import categoriesModel from "../models/categoriesModel.js";

const categoriesController = {
    getAllCategories:async (req,res)=>{
        try {
            const allCategories = await categoriesModel.find({}).populate("movies")
            res.send(allCategories)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getCategoriesByID:async (req,res)=>{
        try {
            const getByID = await categoriesModel.findById(req.params.id).populate("movies")
            res.send(getByID)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    addCategory:async (req,res)=>{
        try {
            const {categoryname} = req.body
            const newCategory = new categoriesModel({
                categoryname:categoryname
            })
            await newCategory.save()
            res.send(newCategory)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    deleteCategoryByID:async (req,res)=>{
        try {
            const deleteByID = await categoriesModel.findByIdAndDelete(req.params.id)
            res.send(`${deleteByID.categoryname} Deleted`)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }
}

export default categoriesController