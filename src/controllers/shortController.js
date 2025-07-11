const { v4: uuidv4 } = require('uuid');
const Log = require('../../../logging-middleware/log');

const urlDatabase = {}; 

const createShortURL = async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;


    if (!url || typeof url !== 'string' || !url.startsWith('http')) {
      await Log('backend', 'error', 'controller', 'Invalid URL format');
      return res.status(400).json({ error: 'Invalid or missing URL' });
    }

    let code = shortcode || uuidv4().slice(0, 6);

    if (urlDatabase[code]) {
      await Log('backend', 'warn', 'controller', 'Shortcode already exists');
      return res.status(409).json({ error: 'Shortcode already in use' });
    }


    const minutes = validity && Number.isInteger(validity) ? validity : 30;
    const createdAt = new Date();
    const expiry = new Date(createdAt.getTime() + minutes * 60000);


    urlDatabase[code] = {
      originalUrl: url,
      createdAt,
      expiry,
      clicks: [],
    };

    const shortLink = `http://localhost:3000/${code}`; 

    await Log('backend', 'info', 'controller', `Short URL created for ${url}`);

    return res.status(201).json({
      shortLink,
      expiry: expiry.toISOString(),
    });
  } catch (err) {
    await Log('backend', 'fatal', 'controller', 'Server error in createShortURL');
    return res.status(500).json({ error: 'Server error' });
  }
};



const getShortURLStats = async (req, res) => {
  const { shortcode } = req.params;
  const data = urlDatabase[shortcode];

  if (!data) {
    await Log('backend', 'warn', 'controller', `Stats requested for non-existent shortcode: ${shortcode}`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  const stats = {
    originalUrl: data.originalUrl,
    createdAt: data.createdAt.toISOString(),
    expiry: data.expiry.toISOString(),
    clickCount: data.clicks.length,
    clicks: data.clicks
  };

  await Log('backend', 'info', 'controller', `Stats retrieved for shortcode: ${shortcode}`);
  return res.status(200).json(stats);
};


const redirectToOriginalURL = async (req, res) => {
  const { shortcode } = req.params;
  const data = urlDatabase[shortcode];

  if (!data) {
    await Log('backend', 'warn', 'controller', `Shortcode not found: ${shortcode}`);
    return res.status(404).json({ error: 'Shortcode not found' });
  }

  const now = new Date();
  if (now > data.expiry) {
    await Log('backend', 'info', 'controller', `Shortcode expired: ${shortcode}`);
    return res.status(410).json({ error: 'Shortcode has expired' });
  }

  
  data.clicks.push({
    timestamp: now.toISOString(),
    referrer: req.get('Referrer') || 'direct',
    location: req.ip 
  });

  await Log('backend', 'info', 'controller', `Redirected: ${shortcode}`);

  return res.redirect(data.originalUrl);
};


module.exports = {
  createShortURL,
  getShortURLStats,           
  redirectToOriginalURL       
};


