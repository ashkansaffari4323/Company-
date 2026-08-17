const{getSession}=require('../_lib');module.exports=(req,res)=>{const s=getSession(req);res.json({authenticated:!!s,expiresAt:s?.expires_at||null})};
