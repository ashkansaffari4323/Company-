const { axios, APS, twoLegged, account, buildCompanyPayload, error } = require('../_lib');

function chunks(items, size) {
  const output = [];
  for (let index = 0; index < items.length; index += size) output.push(items.slice(index, index + size));
  return output;
}

module.exports = async (req, res) => {
  try {
    const token = await twoLegged('account:write');
    const accountId = account(req.body.hubId);
    if (!accountId) return res.status(400).json({ message: 'Hub is required.' });

    const payloads = (req.body.companies || [])
      .map(buildCompanyPayload)
      .filter(Boolean);

    if (!payloads.length) return res.status(400).json({ message: 'No valid company names found.' });

    const results = [];
    let success = 0;
    let failure = 0;

    for (const [batchIndex, batch] of chunks(payloads, 50).entries()) {
      try {
        const response = await axios.post(
          `${APS}/hq/v1/accounts/${accountId}/companies/import`,
          batch,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        success += response.data.success || 0;
        failure += response.data.failure || 0;
        results.push({ batch: batchIndex + 1, ...response.data });
      } catch (err) {
        failure += batch.length;
        results.push({ batch: batchIndex + 1, status: 'failed', failure: batch.length, error: err.response?.data || err.message });
      }
    }

    res.json({
      accountId,
      totalCompanies: payloads.length,
      batches: results.length,
      success,
      failure,
      results
    });
  } catch (err) {
    error(res, err);
  }
};
