// backend/routes/profile.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth'); // We'll create this

// GET user profile
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-_id -__v');
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// TEMP: Initialize user with fake ID (for demo)
router.post('/init', async (req, res) => {
    try {
        const fakeId = '675f8a1b2c3d4e5f6a7b8c9d';
        const existing = await User.findById(fakeId);
        if (existing) return res.json({ message: 'User already exists', user: existing });

        const user = new User({
            _id: fakeId,
            githubUsername: 'demo-user',
            skills: []
        });
        await user.save();
        res.json({ message: 'Demo user created', user });
    } catch (err) {
        res.status(500).json({ message: 'Init failed', error: err.message });
    }
});

// UPDATE user profile
router.put('/', auth, async (req, res) => {
    const { githubUsername, skills } = req.body;

    try {
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update fields
        user.githubUsername = githubUsername;
        user.skills = skills;

        await user.save();
        res.json({ message: 'Profile updated', user });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;