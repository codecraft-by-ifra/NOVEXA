const express = require("express");
const router = express.Router();
const upload = require("../config/multer");
const { uploadImage } = require("../controllers/uploadController");

router.post("/upload", (req, res) => {
    upload.single("product")(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: 0, error: err.message });
        }
        uploadImage(req, res);
    });
});

module.exports = router;