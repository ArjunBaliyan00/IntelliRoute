const db = require("../config/db");

const findUserByEmail = (email, callback) => {
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], callback);
};

const createUser = (user, callback) => {

    const sql = `
        INSERT INTO users
        (full_name, email, password, role)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            user.full_name,
            user.email,
            user.password,
            user.role || "user"
        ],
        callback
    );
};

module.exports = {
    findUserByEmail,
    createUser
};