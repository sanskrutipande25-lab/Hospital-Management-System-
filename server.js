const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/sales', (req, res) => {
    db.all(`SELECT * FROM monthly_sales`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.post('/api/sales', (req, res) => {
    const { month, revenue, expenses } = req.body;
    db.run(`INSERT INTO monthly_sales (month, revenue, expenses) VALUES (?, ?, ?)`, [month, revenue, expenses], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ id: this.lastID, month, revenue, expenses });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log('Server running on http://localhost:3000'));