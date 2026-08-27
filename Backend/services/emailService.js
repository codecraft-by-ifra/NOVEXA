const transporter = require("../config/email");

const sendOrderConfirmationEmail = async (userEmail, order) => {
    const itemsHtml = order.items
        .map(
            (item) =>
                `<tr>
                    <td style="padding: 8px 0;">${item.name} × ${item.quantity}</td>
                    <td style="padding: 8px 0; text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
                </tr>`
        )
        .join("");

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #e11d48;">Order Confirmed!</h2>
            <p>Thank you for your order. Here are your order details:</p>
            <p style="color: #666; font-size: 14px;">Order ID: ${order._id}</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                ${itemsHtml}
                <tr style="border-top: 1px solid #eee; font-weight: bold;">
                    <td style="padding: 12px 0;">Total</td>
                    <td style="padding: 12px 0; text-align: right;">$${order.amount}</td>
                </tr>
            </table>

            <p style="margin-top: 24px; color: #666; font-size: 14px;">
                Shipping to: ${order.address.name}, ${order.address.street}, ${order.address.city}
            </p>

            <p style="margin-top: 24px; color: #999; font-size: 12px;">
                We'll notify you when your order status changes.
            </p>
        </div>
    `;

    await transporter.sendMail({
        from: `"Your Store" <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: "Order Confirmation",
        html: html,
    });
};

module.exports = { sendOrderConfirmationEmail };