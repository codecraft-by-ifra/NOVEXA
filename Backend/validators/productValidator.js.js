const validateAddProduct = (req, res, next) => {
    const { name, category, image, new_price, old_price, quantity } = req.body;

    if (!name || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            error: "Product name must be at least 2 characters long",
        });
    }

    if (!category || category.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: "Category is required",
        });
    }

    if (!image) {
        return res.status(400).json({
            success: false,
            error: "Product image is required",
        });
    }

    if (new_price === undefined || isNaN(new_price) || Number(new_price) <= 0) {
        return res.status(400).json({
            success: false,
            error: "New price must be a positive number",
        });
    }

    if (old_price === undefined || isNaN(old_price) || Number(old_price) <= 0) {
        return res.status(400).json({
            success: false,
            error: "Old price must be a positive number",
        });
    }

    if (quantity === undefined || isNaN(quantity) || Number(quantity) < 0) {
        return res.status(400).json({
            success: false,
            error: "Quantity must be zero or a positive number",
        });
    }

    next();
};

const validateUpdateProduct = (req, res, next) => {
    const { name, category, image, new_price, old_price, quantity } = req.body;

    if (!name || name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            error: "Product name must be at least 2 characters long",
        });
    }

    if (!category || category.trim().length === 0) {
        return res.status(400).json({
            success: false,
            error: "Category is required",
        });
    }

    if (!image) {
        return res.status(400).json({
            success: false,
            error: "Product image is required",
        });
    }

    if (new_price === undefined || isNaN(new_price) || Number(new_price) <= 0) {
        return res.status(400).json({
            success: false,
            error: "New price must be a positive number",
        });
    }

    if (old_price === undefined || isNaN(old_price) || Number(old_price) <= 0) {
        return res.status(400).json({
            success: false,
            error: "Old price must be a positive number",
        });
    }

    if (quantity === undefined || isNaN(quantity) || Number(quantity) < 0) {
        return res.status(400).json({
            success: false,
            error: "Quantity must be zero or a positive number",
        });
    }

    next();
};

module.exports = { validateAddProduct, validateUpdateProduct };