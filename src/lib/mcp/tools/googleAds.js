/**
 * Google Ads MCP — Read-only tools for fetching ad data and account info.
 * Uses shared helpers from googleAdsHelpers.js for auth and API calls.
 */
import { BASE_URL, buildHeaders, getAccessToken, getCustomerIds, query } from './googleAdsHelpers'

/**
 * Fetch Google Ads campaign data for a date range.
 * @param {{ startDate?: string, endDate?: string }} opts
 * @returns {Promise<Array>} rows of campaign/ad data
 */
export async function getGoogleAdsData({ startDate, endDate } = {}) {
	const now = new Date()
	if (!startDate) startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
	if (!endDate) endDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

	const accessToken = await getAccessToken()
	const customerIds = await getCustomerIds(accessToken)
	const headers = buildHeaders(accessToken)

	const gaql = `
		SELECT
			segments.date,
			campaign.id,
			campaign.name,
			campaign.status,
			ad_group_ad.ad.id,
			ad_group_ad.ad.final_urls,
			metrics.cost_micros,
			metrics.impressions,
			metrics.clicks,
			metrics.conversions
		FROM ad_group_ad
		WHERE segments.date BETWEEN '${startDate}' AND '${endDate}'
		ORDER BY segments.date DESC
	`

	const allData = []
	for (const customerId of customerIds) {
		try {
			const resp = await fetch(`${BASE_URL}/customers/${customerId}/googleAds:search`, {
				method: 'POST',
				headers,
				body: JSON.stringify({ query: gaql }),
			})
			if (!resp.ok) {
				console.warn('[Google Ads MCP]', customerId, resp.status, await resp.text())
				continue
			}
			const data = await resp.json()
			for (const row of (data.results || [])) {
				const campaign = row.campaign || {}
				const ad = row.adGroupAd?.ad || {}
				const metrics = row.metrics || {}
				const segments = row.segments || {}
				allData.push({
					customer_id: customerId,
					date: segments.date ?? '',
					campaign_id: campaign.id ?? '',
					campaign_name: campaign.name ?? '',
					campaign_status: campaign.status ?? '',
					ad_id: ad.id ?? '',
					url: ad.finalUrls?.[0] ?? '',
					cost: Number(metrics.costMicros ?? 0) / 1_000_000,
					impressions: Number(metrics.impressions ?? 0),
					clicks: Number(metrics.clicks ?? 0),
					conversions: Number(metrics.conversions ?? 0),
				})
			}
		} catch (e) {
			console.warn('[Google Ads MCP]', customerId, e?.message || e)
		}
	}
	return allData
}

/**
 * List accessible Google Ads customer accounts.
 */
export async function listGoogleAdsAccounts() {
	const accessToken = await getAccessToken()
	const ids = await getCustomerIds(accessToken)
	return ids
}

/**
 * Get campaign performance summary grouped by campaign.
 */
export async function getGoogleAdsCampaignSummary({ startDate, endDate } = {}) {
	const rows = await getGoogleAdsData({ startDate, endDate })
	// Group by campaign_name
	const map = {}
	for (const r of rows) {
		const key = r.campaign_name || r.campaign_id
		if (!map[key]) {
			map[key] = { campaign: key, status: r.campaign_status, cost: 0, impressions: 0, clicks: 0, conversions: 0 }
		}
		map[key].cost += r.cost
		map[key].impressions += r.impressions
		map[key].clicks += r.clicks
		map[key].conversions += r.conversions
	}
	const campaigns = Object.values(map).map(c => ({
		...c,
		cost: Math.round(c.cost * 100) / 100,
	}))
	return { startDate, endDate, total_campaigns: campaigns.length, campaigns }
}

/**
 * Get performance breakdown by geography (country/region) using geographic_view.
 * @param {{ campaign_id?: string, startDate?: string, endDate?: string }} opts
 */
export async function getGeoPerformance({ campaign_id, startDate, endDate } = {}) {
	const now = new Date()
	if (!startDate) startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
	if (!endDate) endDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

	let where = `segments.date BETWEEN '${startDate}' AND '${endDate}'`
	if (campaign_id) where += ` AND campaign.id = ${campaign_id}`

	const rows = await query(`
		SELECT
			campaign.id,
			campaign.name,
			geographic_view.country_criterion_id,
			geographic_view.location_type,
			metrics.cost_micros,
			metrics.impressions,
			metrics.clicks,
			metrics.conversions,
			metrics.conversions_value
		FROM geographic_view
		WHERE ${where}
		ORDER BY metrics.cost_micros DESC
	`)
	return rows.map(r => {
		const c = r.campaign || {}
		const geo = r.geographicView || {}
		const m = r.metrics || {}
		return {
			campaign_id: c.id,
			campaign_name: c.name,
			country_criterion_id: geo.countryCriterionId,
			location_type: geo.locationType,
			cost: Number(m.costMicros || 0) / 1_000_000,
			impressions: Number(m.impressions || 0),
			clicks: Number(m.clicks || 0),
			conversions: Number(m.conversions || 0),
			conversions_value: Number(m.conversionsValue || 0),
		}
	})
}

/**
 * Get performance breakdown by device (mobile/desktop/tablet).
 * @param {{ campaign_id?: string, startDate?: string, endDate?: string }} opts
 */
export async function getDevicePerformance({ campaign_id, startDate, endDate } = {}) {
	const now = new Date()
	if (!startDate) startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`
	if (!endDate) endDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

	let where = `segments.date BETWEEN '${startDate}' AND '${endDate}'`
	if (campaign_id) where += ` AND campaign.id = ${campaign_id}`

	const rows = await query(`
		SELECT
			campaign.id,
			campaign.name,
			segments.device,
			metrics.cost_micros,
			metrics.impressions,
			metrics.clicks,
			metrics.conversions,
			metrics.conversions_value,
			metrics.average_cpc
		FROM campaign
		WHERE ${where}
		ORDER BY metrics.cost_micros DESC
	`)
	return rows.map(r => {
		const c = r.campaign || {}
		const seg = r.segments || {}
		const m = r.metrics || {}
		return {
			campaign_id: c.id,
			campaign_name: c.name,
			device: seg.device,
			cost: Number(m.costMicros || 0) / 1_000_000,
			impressions: Number(m.impressions || 0),
			clicks: Number(m.clicks || 0),
			conversions: Number(m.conversions || 0),
			conversions_value: Number(m.conversionsValue || 0),
			average_cpc: Number(m.averageCpc || 0) / 1_000_000,
		}
	})
}
