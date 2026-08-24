const validateSignup = (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || username.trim().length < 3) {
        return res.status(400).json({
            success: false,
            error: "Username must be at least 3 characters long",
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            error: "Please enter a valid email address",
        });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({
            success: false,
            error: "Password must be at least 6 characters long",
        });
    }

    next();
};

const validateLogin = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: "Email and password are required",
        });
    }

    next();
};

module.exports = { validateSignup, validateLogin };