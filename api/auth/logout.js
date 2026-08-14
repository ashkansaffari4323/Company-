const { clearCookie } = require('../_lib');
module.exports = (req,res) => { clearCookie(res,'autodesk_session'); res.json({authenticated:false}); };
