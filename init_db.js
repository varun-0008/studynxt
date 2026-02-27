const db = require('./database');

const initSql = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'student',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subjects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    branch TEXT NOT NULL,
    year INTEGER NOT NULL,
    semester INTEGER NOT NULL,
    subject_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    subject_id INTEGER NOT NULL,
    co_title TEXT NOT NULL,
    FOREIGN KEY(subject_id) REFERENCES subjects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS topics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    co_id INTEGER NOT NULL,
    topic_title TEXT NOT NULL,
    link TEXT,
    pdf_file TEXT,
    FOREIGN KEY(co_id) REFERENCES cos(id) ON DELETE CASCADE
);
`;

db.exec(initSql, (err) => {
    if (err) {
        console.error('Error initializing DB:', err.message);
    } else {
        console.log('Database initialized successfully with tables users, subjects, cos, topics.');
    }
    db.close();
});
