// backend/models/User.js
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    language: { type: String, required: true },
    frameworks: [{ type: String }],
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true }
});

const userSchema = new mongoose.Schema({
    githubUsername: { type: String, required: true, unique: true },
    skills: [skillSchema],
    points: { type: Number, default: 0 },
    badges: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);