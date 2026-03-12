/**
 * Google Ads MCP — Shared helpers for auth, API requests, and constants.
 * All write/read tools import from here to avoid duplication.
 */
import { OAuth2Client } from 'google-auth-library'

export const API_VERSION = 'v20'
export const BASE_URL = `https://googleads.googleapis.com/${API_VERSION}`

/** Strip dashes from customer ID → numeric string */
export function formatCustomerId(id) {
	if (id == null || id === '') return id
	return String(id).replace(/\D/g, '') || id
}

/** Get OAuth2 access token using env-based refresh token (server-to-server) */
export async function getAccessToken() {
	const oauth = new OAuth2Client({
		clientId: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		redirectUri: process.env.GOOGLE_REDIRECT_URI,
	})
	const refreshToken = process.env.GOOGLE_REFRESH_TOKEN
	if (!refreshToken) throw new Error('GOOGLE_REFRESH_TOKEN env var is not set')
	const { tokens } = await oauth.refreshToken(refreshToken)
	return tokens.access_token
}

/** Get the primary customer ID used for mutate operations */
export function getMutateCustomerId() {
	const id = process.env.GOOGLE_ADS_CUSTOMER_ID || process.env.GOOGLE_ADS_CUSTOMER_IDS?.split(',')[0]
	if (!id) throw new Error('GOOGLE_ADS_CUSTOMER_ID env var is not set')
	return formatCustomerId(id.trim())
}

/** Get all accessible customer IDs (from env or API) */
export async function getCustomerIds(accessToken) {
	const envIds = process.env.GOOGLE_ADS_CUSTOMER_IDS || process.env.GOOGLE_ADS_CUSTOMER_ID
	if (envIds) {
		return envIds.split(',').map(s => formatCustomerId(s.trim())).filter(Boolean)
	}
	const resp = await fetch(`${BASE_URL}/customers:listAccessibleCustomers`, {
		headers: buildHeaders(accessToken),
	})
	if (!resp.ok) throw new Error(`listAccessibleCustomers: ${resp.status} ${await resp.text()}`)
	const data = await resp.json()
	return (data.resourceNames || [])
		.map(r => String(r).replace(/^customers\//, ''))
		.map(formatCustomerId)
		.filter(Boolean)
}

/** Build standard Google Ads API headers */
export function buildHeaders(accessToken) {
	const devToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN || process.env.GOOGLE_DEVELOPER_TOKEN || ''
	const managerId = formatCustomerId(process.env.GOOGLE_MANAGER_ID)
	const headers = {
		Authorization: `Bearer ${accessToken}`,
		'developer-token': devToken,
		'content-type': 'application/json',
	}
	if (managerId) headers['login-customer-id'] = managerId
	return headers
}

/**
 * Generic mutate helper — calls POST /v20/customers/{customerId}/{resource}:mutate
 * @param {string} resource - e.g. "campaigns", "campaignBudgets", "adGroups"
 * @param {Array} operations - array of {create: {...}}, {update: {...}, updateMask: "..."}, or {remove: "..."}
 * @param {string} [customerId] - override customer ID (defaults to env)
 * @returns {Promise<object>} API response with results array
 */
export async function mutate(resource, operations, customerId) {
	const accessToken = await getAccessToken()
	const cid = customerId || getMutateCustomerId()
	const url = `${BASE_URL}/customers/${cid}/${resource}:mutate`
	const resp = await fetch(url, {
		method: 'POST',
		headers: buildHeaders(accessToken),
		body: JSON.stringify({ operations }),
	})
	if (!resp.ok) {
		const text = await resp.text()
		throw new Error(`Google Ads mutate ${resource} failed: ${resp.status} ${text}`)
	}
	return resp.json()
}

/**
 * Generic GAQL query helper — runs a Google Ads Query Language search.
 * @param {string} gaql - GAQL query string
 * @param {string} [customerId] - override customer ID
 * @returns {Promise<Array>} results array from the search response
 */
export async function query(gaql, customerId) {
	const accessToken = await getAccessToken()
	const cid = customerId || getMutateCustomerId()
	const url = `${BASE_URL}/customers/${cid}/googleAds:search`
	const resp = await fetch(url, {
		method: 'POST',
		headers: buildHeaders(accessToken),
		body: JSON.stringify({ query: gaql }),
	})
	if (!resp.ok) {
		const text = await resp.text()
		throw new Error(`Google Ads query failed: ${resp.status} ${text}`)
	}
	const data = await resp.json()
	return data.results || []
}
