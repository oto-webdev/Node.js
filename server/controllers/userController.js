import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import expressAsyncHandler from 'express-async-handler'
import User from '../models/User.js'

export const register = expressAsyncHandler(async (req, res) => {
    const {username, email, password, role} = req.body;
    if (!username || !email || !password || !role) {
        return res.status(400).json({message: "All fields are required"});
    }

    const salt = await bcrypt.genSalt();
    const hashed = await bcrypt.hash(password, salt);

    const exists = await User.findOne({email});
    if (exists) {
        return res.status(409).json({message: "Email already exists"});
    }

    try {
        const user = await User.create({
            username,
            email,
            password: hashed,
            role: role || 'user',
        });
        return res.status(201).json({message: "New User created", user});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});

export const login = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({message: "All fields are required"});
    }

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(404).json({ message: "Invalid username" });
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
        return res.status(401).json({ message: "Password does not match" });
    }

    try {
        const accessToken = jwt.sign(
            { userId: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "15m" }
        );

        return res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                accessToken,
            },
        });
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
});
