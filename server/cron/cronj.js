import cron from 'node-cron';
import ExpirySchedule from '../models/Expiry.js';
import sendNotification from './notification.js';

// Runs every day at midnight (00:00)
cron.schedule('08 9 * * *', async () => {
    console.log("⏰ Running expiry reminder cron at 9:00 AM");

    try {
        const now = new Date();
        const in48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000); // now + 48 hours

        const expiringSoon = await ExpirySchedule.find({
            expiresOn: { $gt: now, $lt: in48Hours },
            notified: false
            
        });

        for (const item of expiringSoon) {
            await sendNotification({
                userId: item.userId,
                productName: item.productName,
                expiresOn: item.expiresOn
            });

            item.notified = true;
            await item.save();
        }

        console.log(`🔔 Notified ${expiringSoon.length} expiring products.`);
    } catch (error) {
        console.error("❌ Cron job error:", error.message);
    }
});
