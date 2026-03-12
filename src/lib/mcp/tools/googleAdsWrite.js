/**
 * Google Ads MCP — Write tools for Budget, Campaign, AdGroup, Keyword, and Ad CRUD.
 * Covers Phase 1 (MVP) and Phase 2 (Management) from the spec.
 */
import { getMutateCustomerId, mutate, query } from './googleAdsHelpers'

// ─────────────────────────────────────────────
// 1. BUDGET OPERATIONS
// ─────────────────────────────────────────────

/** Create a campaign budget. Returns budget_resource_name. */
export async function createCampaignBudget({ name, amount_micros, delivery_method = 'STANDARD', shared = false }) {
	const cid = getMutateCustomerId()
	const result = await mutate('campaignBudgets', [{
		create: {
			name,
			amountMicros: String(amount_micros),
			deliveryMethod: delivery_method,
			explicitlyShared: shared,
		},
	}])
	const resourceName = result.results?.[0]?.resourceName
	return { ok: true, budget_resource_name: resourceName }
}

/** List existing campaign budgets with spend info. */
export async function listCampaignBudgets() {
	const rows = await query(`
		SELECT
			campaign_budget.resource_name,
			campaign_budget.id,
			campaign_budget.name,
			campaign_budget.amount_micros,
			campaign_budget.delivery_method,
			campaign_budget.explicitly_shared,
			campaign_budget.status,
			campaign_budget.total_amount_micros
		FROM campaign_budget
		WHERE campaign_budget.status != 'REMOVED'
		ORDER BY campaign_budget.name
	`)
	return rows.map(r => {
		const b = r.campaignBudget || {}
		return {
			resource_name: b.resourceName,
			id: b.id,
			name: b.name,
			amount_micros: b.amountMicros,
			amount_eur: Number(b.amountMicros || 0) / 1_000_000,
			delivery_method: b.deliveryMethod,
			shared: b.explicitlyShared,
			status: b.status,
		}
	})
}

/** Update daily amount on an existing budget. */
export async function updateCampaignBudget({ budget_id, amount_micros }) {
	const cid = getMutateCustomerId()
	const resourceName = budget_id.includes('/') ? budget_id : `customers/${cid}/campaignBudgets/${budget_id}`
	const result = await mutate('campaignBudgets', [{
		update: {
			resourceName,
			amountMicros: String(amount_micros),
		},
		updateMask: 'amount_micros',
	}])
	return { ok: true, resource_name: result.results?.[0]?.resourceName }
}

// ─────────────────────────────────────────────
// 2. CAMPAIGN OPERATIONS
// ─────────────────────────────────────────────

/** Create a new campaign (starts PAUSED by default for safety). */
export async function createCampaign({
	name,
	budget_id,
	channel_type = 'SEARCH',
	bidding_strategy = 'MAXIMIZE_CLICKS',
	target_cpa_micros,
	start_date,
	end_date,
	status = 'PAUSED',
	network_settings,
}) {
	const cid = getMutateCustomerId()
	const budgetResourceName = budget_id.includes('/') ? budget_id : `customers/${cid}/campaignBudgets/${budget_id}`

	// Build campaign object — containsEuPoliticalAdvertising required since Sep 2025
	const campaign = {
		name,
		campaignBudget: budgetResourceName,
		advertisingChannelType: channel_type,
		status,
		containsEuPoliticalAdvertising: 'DOES_NOT_CONTAIN_EU_POLITICAL_ADVERTISING',
	}

	// Bidding strategy (REST API v20 uses snake_case field names)
	switch (bidding_strategy) {
		case 'MAXIMIZE_CLICKS':
			campaign.maximize_clicks = {}
			break
		case 'MAXIMIZE_CONVERSIONS':
			campaign.maximize_conversions = {}
			break
		case 'TARGET_CPA':
			campaign.target_cpa = { target_cpa_micros: String(target_cpa_micros || 0) }
			break
		case 'MANUAL_CPC':
			campaign.manual_cpc = { enhanced_cpc_enabled: false }
			break
		default:
			campaign.maximize_clicks = {}
	}

	// Network settings (defaults for SEARCH)
	const nets = network_settings || {}
	campaign.networkSettings = {
		targetGoogleSearch: nets.search !== false,
		targetSearchNetwork: nets.partners || false,
		targetContentNetwork: nets.display || false,
	}

	// Dates
	if (start_date) campaign.startDate = start_date.replace(/-/g, '')
	if (end_date) campaign.endDate = end_date.replace(/-/g, '')

	const result = await mutate('campaigns', [{ create: campaign }])
	const resourceName = result.results?.[0]?.resourceName
	const campaignId = resourceName?.split('/').pop()
	return { ok: true, campaign_resource_name: resourceName, campaign_id: campaignId }
}

/** Update campaign settings. */
export async function updateCampaign({
	campaign_id,
	name,
	status,
	budget_id,
	bidding_strategy,
	target_cpa_micros,
	start_date,
	end_date,
}) {
	const cid = getMutateCustomerId()
	const resourceName = `customers/${cid}/campaigns/${campaign_id}`
	const update = { resourceName }
	const fields = []

	if (name) { update.name = name; fields.push('name') }
	if (status) { update.status = status; fields.push('status') }
	if (budget_id) {
		update.campaignBudget = budget_id.includes('/') ? budget_id : `customers/${cid}/campaignBudgets/${budget_id}`
		fields.push('campaign_budget')
	}
	if (bidding_strategy) {
		switch (bidding_strategy) {
			case 'MAXIMIZE_CLICKS': update.maximize_clicks = {}; fields.push('maximize_clicks'); break
			case 'MAXIMIZE_CONVERSIONS': update.maximize_conversions = {}; fields.push('maximize_conversions'); break
			case 'TARGET_CPA': update.target_cpa = { target_cpa_micros: String(target_cpa_micros || 0) }; fields.push('target_cpa'); break
			case 'MANUAL_CPC': update.manual_cpc = { enhanced_cpc_enabled: false }; fields.push('manual_cpc'); break
		}
	}
	if (start_date) { update.startDate = start_date.replace(/-/g, ''); fields.push('start_date') }
	if (end_date) { update.endDate = end_date.replace(/-/g, ''); fields.push('end_date') }

	if (fields.length === 0) throw new Error('No fields to update')

	const result = await mutate('campaigns', [{ update, updateMask: fields.join(',') }])
	return { ok: true, resource_name: result.results?.[0]?.resourceName }
}

/** Pause a campaign (convenience wrapper). */
export async function pauseCampaign({ campaign_id }) {
	return updateCampaign({ campaign_id, status: 'PAUSED' })
}

/** Enable a campaign (convenience wrapper). */
export async function enableCampaign({ campaign_id }) {
	return updateCampaign({ campaign_id, status: 'ENABLED' })
}

/** Soft-delete a campaign (sets status to REMOVED). */
export async function removeCampaign({ campaign_id }) {
	const cid = getMutateCustomerId()
	const resourceName = `customers/${cid}/campaigns/${campaign_id}`
	const result = await mutate('campaigns', [{ remove: resourceName }])
	return { ok: true, resource_name: result.results?.[0]?.resourceName }
}

/** List all campaigns with status, budget, and performance summary. */
export async function listCampaigns({ status_filter = 'ALL' } = {}) {
	let where = "campaign.status != 'REMOVED'"
	if (status_filter === 'ENABLED') where = "campaign.status = 'ENABLED'"
	else if (status_filter === 'PAUSED') where = "campaign.status = 'PAUSED'"

	const rows = await query(`
		SELECT
			campaign.id,
			campaign.name,
			campaign.status,
			campaign.advertising_channel_type,
			campaign.campaign_budget,
			campaign.start_date,
			campaign.end_date,
			campaign_budget.amount_micros,
			metrics.cost_micros,
			metrics.impressions,
			metrics.clicks,
			metrics.conversions
		FROM campaign
		WHERE ${where}
		ORDER BY campaign.name
	`)
	return rows.map(r => {
		const c = r.campaign || {}
		const b = r.campaignBudget || {}
		const m = r.metrics || {}
		return {
			id: c.id,
			name: c.name,
			status: c.status,
			channel_type: c.advertisingChannelType,
			budget_micros: b.amountMicros,
			budget_eur: Number(b.amountMicros || 0) / 1_000_000,
			start_date: c.startDate,
			end_date: c.endDate,
			cost: Number(m.costMicros || 0) / 1_000_000,
			impressions: Number(m.impressions || 0),
			clicks: Number(m.clicks || 0),
			conversions: Number(m.conversions || 0),
		}
	})
}

// ─────────────────────────────────────────────
// 3. AD GROUP OPERATIONS
// ─────────────────────────────────────────────

/** Create an ad group within a campaign. */
export async function createAdGroup({ campaign_id, name, cpc_bid_micros, status = 'ENABLED' }) {
	const cid = getMutateCustomerId()
	const campaignResourceName = `customers/${cid}/campaigns/${campaign_id}`
	const adGroup = {
		name,
		campaign: campaignResourceName,
		status,
		type: 'SEARCH_STANDARD',
	}
	if (cpc_bid_micros) adGroup.cpcBidMicros = String(cpc_bid_micros)

	const result = await mutate('adGroups', [{ create: adGroup }])
	const resourceName = result.results?.[0]?.resourceName
	const adGroupId = resourceName?.split('/').pop()
	return { ok: true, ad_group_resource_name: resourceName, ad_group_id: adGroupId }
}

/** Update ad group settings (name, bid, status). */
export async function updateAdGroup({ ad_group_id, name, cpc_bid_micros, status }) {
	const cid = getMutateCustomerId()
	const resourceName = `customers/${cid}/adGroups/${ad_group_id}`
	const update = { resourceName }
	const fields = []

	if (name) { update.name = name; fields.push('name') }
	if (status) { update.status = status; fields.push('status') }
	if (cpc_bid_micros) { update.cpcBidMicros = String(cpc_bid_micros); fields.push('cpc_bid_micros') }

	if (fields.length === 0) throw new Error('No fields to update')

	const result = await mutate('adGroups', [{ update, updateMask: fields.join(',') }])
	return { ok: true, resource_name: result.results?.[0]?.resourceName }
}

/** List ad groups for a campaign. */
export async function listAdGroups({ campaign_id }) {
	const cid = getMutateCustomerId()
	const rows = await query(`
		SELECT
			ad_group.id,
			ad_group.name,
			ad_group.status,
			ad_group.type,
			ad_group.cpc_bid_micros,
			metrics.cost_micros,
			metrics.impressions,
			metrics.clicks,
			metrics.conversions
		FROM ad_group
		WHERE campaign.id = ${campaign_id}
		  AND ad_group.status != 'REMOVED'
		ORDER BY ad_group.name
	`)
	return rows.map(r => {
		const ag = r.adGroup || {}
		const m = r.metrics || {}
		return {
			id: ag.id,
			name: ag.name,
			status: ag.status,
			type: ag.type,
			cpc_bid_micros: ag.cpcBidMicros,
			cpc_bid_eur: Number(ag.cpcBidMicros || 0) / 1_000_000,
			cost: Number(m.costMicros || 0) / 1_000_000,
			impressions: Number(m.impressions || 0),
			clicks: Number(m.clicks || 0),
			conversions: Number(m.conversions || 0),
		}
	})
}

// ─────────────────────────────────────────────
// 4. KEYWORD OPERATIONS (AdGroupCriterion)
// ─────────────────────────────────────────────

/** Add keywords to an ad group. */
export async function addKeywords({ ad_group_id, keywords }) {
	const cid = getMutateCustomerId()
	const adGroupResourceName = `customers/${cid}/adGroups/${ad_group_id}`

	const operations = keywords.map(kw => {
		const criterion = {
			adGroup: adGroupResourceName,
			keyword: {
				text: kw.text,
				matchType: kw.match_type || 'PHRASE',
			},
			status: 'ENABLED',
		}
		if (kw.cpc_bid_micros) criterion.cpcBidMicros = String(kw.cpc_bid_micros)
		if (kw.final_url) criterion.finalUrls = [kw.final_url]
		return { create: criterion }
	})

	const result = await mutate('adGroupCriteria', operations)
	const created = (result.results || []).map(r => r.resourceName)
	return { ok: true, count: created.length, resource_names: created }
}

/** Add negative keywords to a campaign or ad group. */
export async function addNegativeKeywords({ level, parent_id, keywords }) {
	const cid = getMutateCustomerId()

	if (level === 'CAMPAIGN') {
		// Campaign-level negative keywords use campaignCriteria
		const campaignResourceName = `customers/${cid}/campaigns/${parent_id}`
		const operations = keywords.map(kw => ({
			create: {
				campaign: campaignResourceName,
				negative: true,
				keyword: {
					text: kw.text,
					matchType: kw.match_type || 'EXACT',
				},
			},
		}))
		const result = await mutate('campaignCriteria', operations)
		return { ok: true, count: result.results?.length || 0 }
	} else {
		// Ad group level
		const adGroupResourceName = `customers/${cid}/adGroups/${parent_id}`
		const operations = keywords.map(kw => ({
			create: {
				adGroup: adGroupResourceName,
				negative: true,
				keyword: {
					text: kw.text,
					matchType: kw.match_type || 'EXACT',
				},
			},
		}))
		const result = await mutate('adGroupCriteria', operations)
		return { ok: true, count: result.results?.length || 0 }
	}
}

/** List keywords for an ad group with performance metrics. */
export async function listKeywords({ ad_group_id }) {
	const rows = await query(`
		SELECT
			ad_group_criterion.resource_name,
			ad_group_criterion.criterion_id,
			ad_group_criterion.keyword.text,
			ad_group_criterion.keyword.match_type,
			ad_group_criterion.status,
			ad_group_criterion.cpc_bid_micros,
			ad_group_criterion.final_urls,
			ad_group_criterion.negative,
			metrics.cost_micros,
			metrics.impressions,
			metrics.clicks,
			metrics.conversions
		FROM ad_group_criterion
		WHERE ad_group.id = ${ad_group_id}
		  AND ad_group_criterion.type = 'KEYWORD'
		  AND ad_group_criterion.status != 'REMOVED'
		ORDER BY ad_group_criterion.keyword.text
	`)
	return rows.map(r => {
		const c = r.adGroupCriterion || {}
		const kw = c.keyword || {}
		const m = r.metrics || {}
		return {
			resource_name: c.resourceName,
			criterion_id: c.criterionId,
			text: kw.text,
			match_type: kw.matchType,
			status: c.status,
			negative: c.negative || false,
			cpc_bid_micros: c.cpcBidMicros,
			final_urls: c.finalUrls,
			cost: Number(m.costMicros || 0) / 1_000_000,
			impressions: Number(m.impressions || 0),
			clicks: Number(m.clicks || 0),
			conversions: Number(m.conversions || 0),
		}
	})
}

/** Update bid or status of a keyword. */
export async function updateKeyword({ ad_group_id, criterion_id, cpc_bid_micros, status }) {
	const cid = getMutateCustomerId()
	const resourceName = `customers/${cid}/adGroupCriteria/${ad_group_id}~${criterion_id}`
	const update = { resourceName }
	const fields = []

	if (status) { update.status = status; fields.push('status') }
	if (cpc_bid_micros) { update.cpcBidMicros = String(cpc_bid_micros); fields.push('cpc_bid_micros') }

	if (fields.length === 0) throw new Error('No fields to update')

	const result = await mutate('adGroupCriteria', [{ update, updateMask: fields.join(',') }])
	return { ok: true, resource_name: result.results?.[0]?.resourceName }
}

/** Remove a keyword from an ad group. */
export async function removeKeyword({ ad_group_id, criterion_id }) {
	const cid = getMutateCustomerId()
	const resourceName = `customers/${cid}/adGroupCriteria/${ad_group_id}~${criterion_id}`
	const result = await mutate('adGroupCriteria', [{ remove: resourceName }])
	return { ok: true, resource_name: result.results?.[0]?.resourceName }
}

// ─────────────────────────────────────────────
// 5. AD OPERATIONS (AdGroupAd)
// ─────────────────────────────────────────────

/** Create a Responsive Search Ad (RSA). */
export async function createResponsiveSearchAd({
	ad_group_id,
	headlines,
	descriptions,
	final_url,
	path1,
	path2,
	pinned_headlines,
	pinned_descriptions,
}) {
	const cid = getMutateCustomerId()
	const adGroupResourceName = `customers/${cid}/adGroups/${ad_group_id}`

	// Build headline assets with optional pinning
	const headlineAssets = headlines.map((text, i) => {
		const asset = { text }
		if (pinned_headlines && pinned_headlines[String(i)] !== undefined) {
			asset.pinnedField = `HEADLINE_${pinned_headlines[String(i)] + 1}`
		}
		return asset
	})

	// Build description assets with optional pinning
	const descriptionAssets = descriptions.map((text, i) => {
		const asset = { text }
		if (pinned_descriptions && pinned_descriptions[String(i)] !== undefined) {
			asset.pinnedField = `DESCRIPTION_${pinned_descriptions[String(i)] + 1}`
		}
		return asset
	})

	const adGroupAd = {
		adGroup: adGroupResourceName,
		status: 'ENABLED',
		ad: {
			finalUrls: [final_url],
			responsiveSearchAd: {
				headlines: headlineAssets,
				descriptions: descriptionAssets,
			},
		},
	}

	if (path1) adGroupAd.ad.responsiveSearchAd.path1 = path1
	if (path2) adGroupAd.ad.responsiveSearchAd.path2 = path2

	const result = await mutate('adGroupAds', [{ create: adGroupAd }])
	const resourceName = result.results?.[0]?.resourceName
	return { ok: true, ad_resource_name: resourceName }
}

/** List ads in an ad group with performance. */
export async function listAds({ ad_group_id }) {
	const rows = await query(`
		SELECT
			ad_group_ad.resource_name,
			ad_group_ad.ad.id,
			ad_group_ad.ad.type,
			ad_group_ad.ad.responsive_search_ad.headlines,
			ad_group_ad.ad.responsive_search_ad.descriptions,
			ad_group_ad.ad.final_urls,
			ad_group_ad.status,
			metrics.cost_micros,
			metrics.impressions,
			metrics.clicks,
			metrics.conversions
		FROM ad_group_ad
		WHERE ad_group.id = ${ad_group_id}
		  AND ad_group_ad.status != 'REMOVED'
	`)
	return rows.map(r => {
		const a = r.adGroupAd || {}
		const ad = a.ad || {}
		const rsa = ad.responsiveSearchAd || {}
		const m = r.metrics || {}
		return {
			resource_name: a.resourceName,
			ad_id: ad.id,
			type: ad.type,
			status: a.status,
			headlines: (rsa.headlines || []).map(h => h.text),
			descriptions: (rsa.descriptions || []).map(d => d.text),
			final_urls: ad.finalUrls,
			cost: Number(m.costMicros || 0) / 1_000_000,
			impressions: Number(m.impressions || 0),
			clicks: Number(m.clicks || 0),
			conversions: Number(m.conversions || 0),
		}
	})
}

/** Update ad status (pause/enable/remove). */
export async function updateAdStatus({ ad_group_id, ad_id, status }) {
	const cid = getMutateCustomerId()
	const resourceName = `customers/${cid}/adGroupAds/${ad_group_id}~${ad_id}`
	const result = await mutate('adGroupAds', [{
		update: { resourceName, status },
		updateMask: 'status',
	}])
	return { ok: true, resource_name: result.results?.[0]?.resourceName }
}

/** Get ad preview — returns the ad as it would render in search. */
export async function getAdPreview({ ad_group_id, ad_id }) {
	const rows = await query(`
		SELECT
			ad_group_ad.ad.responsive_search_ad.headlines,
			ad_group_ad.ad.responsive_search_ad.descriptions,
			ad_group_ad.ad.responsive_search_ad.path1,
			ad_group_ad.ad.responsive_search_ad.path2,
			ad_group_ad.ad.final_urls,
			ad_group_ad.ad.type,
			ad_group_ad.status
		FROM ad_group_ad
		WHERE ad_group.id = ${ad_group_id}
		  AND ad_group_ad.ad.id = ${ad_id}
	`)
	if (rows.length === 0) throw new Error(`Ad ${ad_id} not found in ad group ${ad_group_id}`)
	const a = rows[0].adGroupAd || {}
	const ad = a.ad || {}
	const rsa = ad.responsiveSearchAd || {}
	const finalUrl = ad.finalUrls?.[0] || ''
	const displayUrl = finalUrl.replace(/^https?:\/\//, '').split('/')[0]
	return {
		status: a.status,
		type: ad.type,
		final_url: finalUrl,
		display_url: `${displayUrl}${rsa.path1 ? '/' + rsa.path1 : ''}${rsa.path2 ? '/' + rsa.path2 : ''}`,
		headlines: (rsa.headlines || []).map(h => h.text),
		descriptions: (rsa.descriptions || []).map(d => d.text),
	}
}
