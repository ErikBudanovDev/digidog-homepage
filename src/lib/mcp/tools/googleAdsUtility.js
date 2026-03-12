/**
 * Google Ads MCP — Utility and reference tools.
 * Covers geo target search, language constants, keyword ideas, and forecast (Phase 3 + 4).
 */
import { getAccessToken, buildHeaders, getMutateCustomerId, BASE_URL } from './googleAdsHelpers'

// ─────────────────────────────────────────────
// GEO TARGET SEARCH
// ─────────────────────────────────────────────

/** Search for Google Geo Target IDs by name (e.g. "Berlin" → 1003854). */
export async function searchGeoTargets({ query: searchQuery, country_code }) {
	const accessToken = await getAccessToken()
	const url = `${BASE_URL}/geoTargetConstants:suggest`
	const body = {
		locale: 'en',
		query: searchQuery,
	}
	if (country_code) body.countryCode = country_code

	const resp = await fetch(url, {
		method: 'POST',
		headers: buildHeaders(accessToken),
		body: JSON.stringify(body),
	})
	if (!resp.ok) {
		const text = await resp.text()
		throw new Error(`searchGeoTargets failed: ${resp.status} ${text}`)
	}
	const data = await resp.json()
	return (data.geoTargetConstantSuggestions || []).map(s => {
		const g = s.geoTargetConstant || {}
		return {
			id: g.id,
			name: g.name,
			canonical_name: g.canonicalName,
			target_type: g.targetType,
			country_code: g.countryCode,
			resource_name: g.resourceName,
			reach: s.reach,
		}
	})
}

// ─────────────────────────────────────────────
// LANGUAGE CONSTANTS
// ─────────────────────────────────────────────

/** List available language targeting options. */
export async function searchLanguageConstants() {
	const accessToken = await getAccessToken()
	// Language constants are global, use any customer ID
	const cid = getMutateCustomerId()
	const url = `${BASE_URL}/customers/${cid}/googleAds:search`
	const resp = await fetch(url, {
		method: 'POST',
		headers: buildHeaders(accessToken),
		body: JSON.stringify({
			query: `
				SELECT
					language_constant.id,
					language_constant.name,
					language_constant.code,
					language_constant.targetable
				FROM language_constant
				WHERE language_constant.targetable = TRUE
				ORDER BY language_constant.name
			`,
		}),
	})
	if (!resp.ok) {
		const text = await resp.text()
		throw new Error(`searchLanguageConstants failed: ${resp.status} ${text}`)
	}
	const data = await resp.json()
	return (data.results || []).map(r => {
		const l = r.languageConstant || {}
		return { id: l.id, name: l.name, code: l.code }
	})
}

// ─────────────────────────────────────────────
// KEYWORD IDEAS
// ─────────────────────────────────────────────

/**
 * Get keyword suggestions with volume/competition data.
 * Uses the KeywordPlanIdea service.
 */
export async function getKeywordIdeas({ seed_keywords, url: seedUrl, location_ids, language_id }) {
	const accessToken = await getAccessToken()
	const cid = getMutateCustomerId()
	const endpoint = `${BASE_URL}/customers/${cid}:generateKeywordIdeas`

	const body = {
		language: language_id ? `languageConstants/${language_id}` : 'languageConstants/1000',
		keywordPlanNetwork: 'GOOGLE_SEARCH',
	}

	// Add geo targets
	if (location_ids && location_ids.length > 0) {
		body.geoTargetConstants = location_ids.map(id => `geoTargetConstants/${id}`)
	}

	// Seed: keywords and/or URL
	if (seed_keywords && seed_keywords.length > 0 && seedUrl) {
		body.keywordAndUrlSeed = {
			keywords: seed_keywords,
			url: seedUrl,
		}
	} else if (seedUrl) {
		body.urlSeed = { url: seedUrl }
	} else if (seed_keywords && seed_keywords.length > 0) {
		body.keywordSeed = { keywords: seed_keywords }
	} else {
		throw new Error('Provide seed_keywords and/or url')
	}

	const resp = await fetch(endpoint, {
		method: 'POST',
		headers: buildHeaders(accessToken),
		body: JSON.stringify(body),
	})
	if (!resp.ok) {
		const text = await resp.text()
		throw new Error(`getKeywordIdeas failed: ${resp.status} ${text}`)
	}
	const data = await resp.json()
	return (data.results || []).map(r => ({
		keyword: r.text,
		avg_monthly_searches: r.keywordIdeaMetrics?.avgMonthlySearches,
		competition: r.keywordIdeaMetrics?.competition,
		competition_index: r.keywordIdeaMetrics?.competitionIndex,
		low_top_of_page_bid_micros: r.keywordIdeaMetrics?.lowTopOfPageBidMicros,
		high_top_of_page_bid_micros: r.keywordIdeaMetrics?.highTopOfPageBidMicros,
	}))
}

// ─────────────────────────────────────────────
// KEYWORD FORECAST
// ─────────────────────────────────────────────

/**
 * Get traffic/cost forecast for a set of keywords.
 * Uses the KeywordPlan forecast endpoint.
 */
export async function getKeywordForecast({ keywords, location_ids, language_id, daily_budget_micros }) {
	const accessToken = await getAccessToken()
	const cid = getMutateCustomerId()
	const endpoint = `${BASE_URL}/customers/${cid}:generateKeywordForecastMetrics`

	const body = {
		keywordPlanNetwork: 'GOOGLE_SEARCH',
		forecastPeriod: {
			dateRange: {
				// Forecast for the next 30 days
				startDate: formatDateForApi(new Date()),
				endDate: formatDateForApi(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)),
			},
		},
		campaign: {
			keywordPlanNetwork: 'GOOGLE_SEARCH',
			cpcBidMicros: String(daily_budget_micros || 2000000),
			keywords: keywords.map(kw => ({
				keyword: {
					text: typeof kw === 'string' ? kw : kw.text,
					matchType: typeof kw === 'string' ? 'PHRASE' : (kw.match_type || 'PHRASE'),
				},
			})),
		},
	}

	if (location_ids && location_ids.length > 0) {
		body.campaign.geoTargets = location_ids.map(id => ({
			geoTargetConstant: `geoTargetConstants/${id}`,
		}))
	}
	if (language_id) {
		body.campaign.languageConstants = [`languageConstants/${language_id}`]
	}

	const resp = await fetch(endpoint, {
		method: 'POST',
		headers: buildHeaders(accessToken),
		body: JSON.stringify(body),
	})
	if (!resp.ok) {
		const text = await resp.text()
		throw new Error(`getKeywordForecast failed: ${resp.status} ${text}`)
	}
	const data = await resp.json()
	const m = data.campaignForecastMetrics || {}
	return {
		impressions: m.impressions,
		clicks: m.clicks,
		cost_micros: m.costMicros,
		cost_eur: Number(m.costMicros || 0) / 1_000_000,
		ctr: m.ctr,
		average_cpc_micros: m.averageCpcMicros,
		average_cpc_eur: Number(m.averageCpcMicros || 0) / 1_000_000,
		conversions: m.conversions,
	}
}

/** Format Date object to YYYY-MM-DD string for API */
function formatDateForApi(date) {
	const y = date.getFullYear()
	const m = String(date.getMonth() + 1).padStart(2, '0')
	const d = String(date.getDate()).padStart(2, '0')
	return `${y}-${m}-${d}`
}
