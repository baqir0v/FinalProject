import categoriesModel from "../models/categoriesModel.js";

const categoriesController = {
    getAllCategories:async (req,res)=>{
        try {
            const allCategories = await categoriesModel.find({})
            res.send(allCategories)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    },
    getCategoriesByID:async (req,res)=>{
        try {
            const getByID = await categoriesModel.findById(req.params.id)
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
    }
}

export default categoriesController