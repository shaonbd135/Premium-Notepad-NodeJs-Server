const userModel = require("../../models/user..model")
const { comparePassword } = require("../../utils/passwordEncryption")
const { generateToken } = require("../../utils/authToken");


const userLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
            success: false,
            message: "All Fields required"
        })
    }

    try {
        const findUser = await userModel.findOne({ email: email }).populate('Notes');
        if (!findUser) {
            return res.status(404).send({
                success: false,
                message: "User Not Found"
            })
        }

        const isPasswordMatch = await comparePassword(password, findUser.password)
        if (!isPasswordMatch) {
            return res.status(401).send({
                success: false,
                message: "Email or Password is Incorrect"
            })
        }

        const token = generateToken(findUser._id, findUser.email);
        res.cookie("token", token)
        return res.status(200).send({
            success: true,
            message: " Successfully Logged In",
            user: {
                name: findUser.name,
                email: findUser.email,
                userStatus: findUser.userStatus,
                subscription: findUser.subscription,
                Notes: findUser.Notes

            },
            token: token
        })
    }
    catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            message: "Server Error"
        })
    }
}

module.exports = { userLogin }