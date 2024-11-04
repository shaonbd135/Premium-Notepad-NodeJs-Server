const bcrypt = require("bcrypt");

const passwordEncryption = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
};


const comparePassword = async (password, hashedPassword) => {
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
    return isPasswordMatch;
};

module.exports = { passwordEncryption, comparePassword };