const userModel = require('../../models/user..model')
const { passwordEncryption } = require('../../utils/passwordEncryption')
const userRegister = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).send({
            success: false,
            message: "All fields are required"
        })
    }
    if (password.length < 6) {
        return res.status(400).send({
            success: false,
            message: "Password must be at least 6 characters"
        })
    }

    try {
        const findUser = await userModel.findOne({ email: email })
        if (findUser) {
            return res.status(409).send({
                success: false,
                message: "User Already Exist"
            })
        }

        const encryptedPassword = await passwordEncryption(password)
        const createdUser = await userModel.create({
            name,
            email,
            password: encryptedPassword
        })
        return res.status(201).send({
            success: true,
            Message: " User Created Succesfully",
        })

    }
    catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Server error"
        })
    }
}

module.exports = { userRegister }