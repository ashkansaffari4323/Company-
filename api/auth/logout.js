const{clearCookie}=require('../../lib/_lib');module.exports=(req,res)=>{clearCookie(res,'autodesk_session');res.json({authenticated:false})};
