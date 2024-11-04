const noteModel = require("../../models/note.model");
const userModel = require("../../models/user..model");


const userNote = async (req, res) => {

    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).send({
            success: false,
            message: "All fields are required"
        })
    }

    try {

        const createdNote = await noteModel.create({
            title,
            description,
            user: req.user._id
        })
        
        await userModel.findByIdAndUpdate(req.user._id, {
            $push: { Notes: createdNote._id }
        })

        return res.status(200).send({
            success: true,
            message: "Note created successfully",
            data: createdNote
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "Internal server error"
        })
    }
    
}
module.exports = { userNote }