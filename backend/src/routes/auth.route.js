import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)
//we use post in login and logout in order remove the caching

export default router;