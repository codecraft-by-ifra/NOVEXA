const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = { hashPassword, comparePassword, generateToken };