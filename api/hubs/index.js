const { axios, APS, userToken, account, error } = require('../_lib');
module.exports = async (req,res) => { try { const t=await userToken(req,res); const r=await axios.get(`${APS}/project/v1/hubs`,{headers:{Authorization:`Bearer ${t}`}}); res.json({hubs:(r.data.data||[]).map(h=>({id:h.id,name:h.attributes?.name||h.id,accountId:account(h.id)}))}); } catch(e){ error(res,e); } };
