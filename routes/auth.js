// routes/auth.js
const router = require('express').Router();
const passport = require('passport');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Login with Google OAuth
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google login
 */
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback URL
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects after successful login
 */
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.json({ message: 'Login successful', user: req.user });
  }
);

/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Logout the current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: 'Logout error', error: err.message });
    res.json({ message: 'Logged out successfully' });
  });
});

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Get current logged in user profile
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Returns logged in user info
 *       401:
 *         description: Not authenticated
 */
router.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: 'Not logged in' });
  }
  res.status(200).json({ user: req.user });
});

module.exports = router;