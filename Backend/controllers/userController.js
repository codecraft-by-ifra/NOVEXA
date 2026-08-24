const User = require("../models/User");
const authService = require("../services/authService");

const signupUser = async (req, res) => {
    try {
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success: false, error: "User already exists with this email" });
        }

        const hashedPassword = await authService.hashPassword(req.body.password);

        const user = new User({
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        await user.save();

        const token = authService.generateToken({ user: { id: user.id } });

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const loginUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json({ success: false, error: "Wrong email or password" });
        }

        const passwordMatch = await authService.comparePassword(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, error: "Wrong email or password" });
        }

        const token = authService.generateToken({ user: { id: user.id } });

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { signupUser, loginUser };