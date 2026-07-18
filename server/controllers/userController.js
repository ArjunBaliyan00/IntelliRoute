const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt");

const {
    findUserByEmail,
    createUser
} = require("../models/userModel");

// ================= REGISTER =================

const registerUser = (req, res) => {

    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    findUserByEmail(email, async (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        createUser(
            {
                full_name,
                email,
                password: hashedPassword,
                role: "user"
            },
            (err, data) => {

                if (err) {
                    return res.status(500).json({
                        success: false,
                        message: err.message
                    });
                }

                const token = generateToken({
                    user_id: data.insertId,
                    email,
                    role: "user"
                });

                res.status(201).json({
                    success: true,
                    message: "User Registered Successfully",
                    token
                });

            }
        );

    });

};

// ================= LOGIN =================

const loginUser = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are required"
        });
    }

    findUserByEmail(email, async (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const user = result[0];

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }

        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token
        });

    });

};

module.exports = {
    registerUser,
    loginUser
};