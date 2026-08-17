const { axios, APS, twoLegged, account, buildCompanyPayload, error } = require('../../lib/_lib');

module.exports = async (req, res) => {
  try {
    const token = await twoLegged('account:write');
    const accountId = account(req.body.hubId);
    if (!accountId) return res.status(400).json({ message: 'Hub is required.' });

    const payload = (req.body.companies || [])
      .map(buildCompanyPayload)
      .filter(Boolean)
      .slice(0, 50);

    if (!payload.length) return res.status(400).json({ message: 'No valid company names found in this batch.' });

    const response = await axios.post(
      `${APS}/hq/v1/accounts/${accountId}/companies/import`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      accountId,
      batchNumber: req.body.batchNumber,
      totalBatches: req.body.totalBatches,
      sentItems: payload.length,
      ...response.data
    });
  } catch (err) {
    error(res, err);
  }
};
