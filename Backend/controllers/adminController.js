const Admin = require("../models/Admin");
const authService = require("../services/authService");

const adminLogin = async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email });
        if (!admin) {
            return res.status(400).json({ success: false, error: "Wrong email or password" });
        }

        const passwordMatch = await authService.comparePassword(req.body.password, admin.password);
        if (!passwordMatch) {
            return res.status(400).json({ success: false, error: "Wrong email or password" });
        }

        const token = authService.generateToken({ admin: { id: admin.id } });

        res.json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { adminLogin };