import express from 'express';
import { login, logout, signup, updateProfile } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../controllers/arcjet.middleware.js';

const router = express.Router();

router.use(arcjetProtection)//commonly use the arcject middleware for rate limiting
router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)
//we use post in login and logout in order remove the caching
router.put('/update-profile',protectRoute, updateProfile)

router.get('/check',protectRoute,(req,res)=>{
    res.status(200).json({req:req.user,message:"Protected route accessed successfully"})
})


export default router;