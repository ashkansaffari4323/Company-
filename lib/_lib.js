const axios = require('axios');
const crypto = require('crypto');
const APS = 'https://developer.api.autodesk.com';

function requireConfig() {
  const missing = [];
  for (const key of ['APS_CLIENT_ID', 'APS_CLIENT_SECRET', 'APS_CALLBACK_URL', 'SESSION_SECRET']) {
    if (!process.env[key]) missing.push(key);
  }
  if (missing.length) {
    const error = new Error('Missing environment variables: ' + missing.join(', '));
    error.status = 400;
    throw error;
  }
}

function basic() {
  return Buffer.from(`${process.env.APS_CLIENT_ID}:${process.env.APS_CLIENT_SECRET}`).toString('base64');
}

function key() {
  return crypto.createHash('sha256').update(process.env.SESSION_SECRET).digest();
}

function enc(obj) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', key(), iv);
  const data = Buffer.concat([cipher.update(JSON.stringify(obj), 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, data]).toString('base64url');
}

function dec(value) {
  try {
    const buffer = Buffer.from(value || '', 'base64url');
    const iv = buffer.subarray(0, 12);
    const tag = buffer.subarray(12, 28);
    const data = buffer.subarray(28);
    const decipher = crypto.createDecipheriv('aes-256-gcm', key(), iv);
    decipher.setAuthTag(tag);
    return JSON.parse(Buffer.concat([decipher.update(data), decipher.final()]).toString());
  } catch {
    return null;
  }
}

function setCookie(res, name, value) {
  res.setHeader('Set-Cookie', `${name}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`);
}

function clearCookie(res, name) {
  res.setHeader('Set-Cookie', `${name}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`);
}

function getSession(req) {
  const match = (req.headers.cookie || '').match(/(?:^|; )autodesk_session=([^;]+)/);
  return dec(match && match[1]);
}

async function refresh(session) {
  const body = new URLSearchParams();
  body.set('grant_type', 'refresh_token');
  body.set('refresh_token', session.refresh_token);
  body.set('scope', 'data:read account:read account:write');
  const response = await axios.post(`${APS}/authentication/v2/token`, body, {
    headers: {
      Authorization: `Basic ${basic()}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return {
    access_token: response.data.access_token,
    refresh_token: response.data.refresh_token || session.refresh_token,
    expires_at: Date.now() + ((response.data.expires_in || 3600) - 60) * 1000
  };
}

async function userToken(req, res) {
  requireConfig();
  let session = getSession(req);
  if (!session) {
    const error = new Error('Autodesk is not connected.');
    error.status = 401;
    throw error;
  }
  if (Date.now() >= session.expires_at) {
    session = await refresh(session);
    setCookie(res, 'autodesk_session', enc(session));
  }
  return session.access_token;
}

async function twoLegged(scope = 'account:read account:write') {
  requireConfig();
  const body = new URLSearchParams();
  body.set('grant_type', 'client_credentials');
  body.set('scope', scope);
  const response = await axios.post(`${APS}/authentication/v2/token`, body, {
    headers: {
      Authorization: `Basic ${basic()}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data.access_token;
}

function account(hubId) {
  return hubId && hubId.startsWith('b.') ? hubId.slice(2) : hubId || '';
}

function clean(value) {
  const stringValue = String(value ?? '').trim();
  if (!stringValue) return undefined;
  const lower = stringValue.toLowerCase();
  if (['0', '0.0', 'n/a', 'na', 'null', 'undefined', 'none', '-', '--', '#n/a'].includes(lower)) return undefined;
  return stringValue;
}

function cleanName(value) {
  const cleaned = clean(value);
  return cleaned || undefined;
}

function cleanTrade(value) {
  const cleaned = clean(value);
  return cleaned || process.env.DEFAULT_TRADE || 'Corporate & Professional Services';
}

function cleanCountry(value) {
  return clean(value);
}

function state(country, value) {
  const cleaned = clean(value);
  if (!cleaned) return undefined;
  const countryValue = String(country || '').trim().toLowerCase();
  if (countryValue === 'australia' || countryValue === 'au') {
    const map = {
      ACT: 'Australian Capital Territory',
      NSW: 'New South Wales',
      NT: 'Northern Territory',
      QLD: 'Queensland',
      SA: 'South Australia',
      TAS: 'Tasmania',
      VIC: 'Victoria',
      WA: 'Western Australia'
    };
    return map[cleaned.toUpperCase()] || cleaned;
  }
  return cleaned;
}

function compact(obj) {
  const out = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined && value !== null && value !== '') out[key] = value;
  }
  return out;
}

function buildCompanyPayload(company) {
  const name = cleanName(company.name);
  if (!name) return null;

  const country = cleanCountry(company.country);

  return compact({
    name,
    trade: cleanTrade(company.trade),
    address_line_1: clean(company.address_line_1),
    address_line_2: clean(company.address_line_2),
    city: clean(company.city),
    postal_code: clean(company.postal_code),
    state_or_province: state(country, company.state_or_province),
    country,
    phone: clean(company.phone),
    website_url: clean(company.website_url),
    description: clean(company.description),
    erp_id: clean(company.erp_id),
    tax_id: clean(company.tax_id)
  });
}

function error(res, err) {
  res.status(err.status || err.response?.status || 500).json({
    message: err.response?.data?.developerMessage || err.response?.data?.message || err.message || 'Server error',
    details: err.response?.data || null
  });
}

module.exports = {
  axios,
  APS,
  requireConfig,
  basic,
  enc,
  setCookie,
  clearCookie,
  getSession,
  userToken,
  twoLegged,
  account,
  state,
  clean,
  cleanTrade,
  buildCompanyPayload,
  error
};
