// utils/sendNotification.js
import nodemailer from "nodemailer";
import User from "../models/User.js"; // Adjust path if needed

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.SMTP_AUTH, // Your email address
        pass: process.env.SMTP_PASSWORD
    }
});

export default async function sendNotification({ userId, productName, expiresOn }) {
    try {
        const user = await User.findById(userId);
        if (!user || !user.email) {
            console.log(`❌ User or email not found for ID ${userId}`);
            return;
        }

        const mailOptions = {
            from: process.env.SMTP_AUTH,
            to: user.email,
            subject: `Expiry Reminder: ${productName}`,
            text: `Hi ${user.name || 'there'},\n\nYour product "${productName}" will expire on ${expiresOn.toDateString()}.\n\nPlease take necessary action.\n\nRegards,\nYour Team`
        };

        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${user.email} for ${productName}`);
    } catch (error) {
        console.error("❌ Failed to send email:", error.message);
    }
}
