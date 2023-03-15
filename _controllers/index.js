const router = require('express').Router();
const apiRoutes = require('./api');
const homeRouts = require('./homeRoutes');

router.use('/api', apiRoutes);

module.exports = router;
