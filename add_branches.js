const db = require('./database');

// Add branches table and seed with existing branches
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS branches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )`, (err) => {
        if (err) {
            console.error('Error creating branches table:', err.message);
            return;
        }
        console.log('Branches table created (or already exists).');

        // Seed default branches only if table is empty
        db.get(`SELECT COUNT(*) as count FROM branches`, [], (err, row) => {
            if (err) { console.error(err); return; }
            if (row.count === 0) {
                const defaultBranches = ['CSE', 'CPS', 'EI', 'ES', 'AI', 'EC', 'EV', 'CCB', 'BM'];
                const stmt = db.prepare(`INSERT OR IGNORE INTO branches (name) VALUES (?)`);
                defaultBranches.forEach(b => stmt.run(b));
                stmt.finalize(() => {
                    console.log('Default branches seeded:', defaultBranches.join(', '));
                    db.close();
                });
            } else {
                console.log(`Branches table already has ${row.count} entries. Skipping seed.`);
                db.close();
            }
        });
    });
});
