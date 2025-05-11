const db = require("./db");

async function cleanup() {
    try {
        const users = await new Promise((resolve, reject) => {
            db.query("SELECT id, last_code_sent_at FROM users WHERE verified = false", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        const cutoff = Date.now() - 5 * 60 * 1000; // 5 minutes ago
        const staleUserIds = users
            .filter(user => !user.last_code_sent_at || new Date(user.last_code_sent_at).getTime() < cutoff)
            .map(user => user.id);

        if (staleUserIds.length > 0) {
            await new Promise((resolve, reject) => {
                db.query("DELETE FROM users WHERE id IN (?)", [staleUserIds], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            console.log(`Cleanup complete. Deleted ${staleUserIds.length} unverified users.`);
        } else {
            console.log("Cleanup complete. No unverified users found.");
        }
    } catch (error) {
        console.error("Error during cleanup:", error);
    }
}

module.exports = cleanup;