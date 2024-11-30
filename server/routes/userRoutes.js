import express from 'express'
import auth from '../middleware/auth.js';  
import isAdminUser from '../middleware/admin.js'; 
import { login, register } from '../controllers/userController.js';

const router = express.Router()

router.post("/", register)
router.post("/login", login)

router.get('/protected', auth, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

router.get('/admin', auth, isAdminUser, (req, res) => {
    res.status(200).json({ message: 'Admin access granted', user: req.user });
});

export default router;