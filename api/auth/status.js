const { getSession } = require('../_lib');
module.exports = (req,res) => { const sess=getSession(req); res.json({authenticated:!!(sess&&sess.access_token),expiresAt:sess&&sess.expires_at||null}); };
