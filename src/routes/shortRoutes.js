const express = require('express');
const router = express.Router();

const {
  createShortURL,
  getShortURLStats,
  redirectToOriginalURL,
} = require('../controllers/shortController');


router.post('/shorturls', createShortURL);
router.get('/shorturls/:shortcode', getShortURLStats);
router.get('/:shortcode', redirectToOriginalURL);

module.exports = router;
