const db = require('./database');

// Try to add missing columns to the topics table
const queries = [
    "ALTER TABLE topics ADD COLUMN type TEXT DEFAULT 'text';",
    "ALTER TABLE topics ADD COLUMN content TEXT DEFAULT '';",
];

let completed = 0;
queries.forEach((q) => {
    db.run(q, (err) => {
        if (err) {
            console.log(`Migration step skipped or failed (might already exist): ${err.message}`);
        } else {
            console.log(`Migration step succeeded: ${q}`);
        }
        completed++;
        if (completed === queries.length) {
            db.close();
        }
    });
});
