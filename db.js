const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sales.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS monthly_sales (id INTEGER PRIMARY KEY AUTOINCREMENT, month TEXT, revenue INTEGER, expenses INTEGER)`);

    db.get(`SELECT COUNT(*) AS count FROM monthly_sales`, (err, row) => {
        if (row.count === 0) {
            const seedData = [['Jan', 12000, 8000], ['Feb', 15000, 9000], ['Mar', 14000, 8500], ['Apr', 18000, 10000], ['May', 21000, 12000], ['Jun', 19000, 11000]];
            const stmt = db.prepare(`INSERT INTO monthly_sales (month, revenue, expenses) VALUES (?, ?, ?)`);
            seedData.forEach(d => stmt.run(d));
            stmt.finalize();
        }
    });
});

module.exports = db;