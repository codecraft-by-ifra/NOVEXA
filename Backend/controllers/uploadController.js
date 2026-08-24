const uploadImage = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: 0, error: "No file uploaded" });
    }

   res.json({
        success: 1,
        image_url: req.file.path,
    });
};

module.exports = { uploadImage };