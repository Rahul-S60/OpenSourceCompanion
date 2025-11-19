// backend/middleware/auth.js
// TEMP: Mock auth — replace with JWT later
module.exports = (req, res, next) => {
    // For demo: hardcode a user ID
    req.user = { id: '675f8a1b2c3d4e5f6a7b8c9d' }; // fake MongoID
    next();
};