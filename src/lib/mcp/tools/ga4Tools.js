/**
 * Google Analytics 4 — MCP Tools for BOT Dashboard
 * 
 * Uses the GA4 Data API v1beta REST endpoints directly (same approach as googleAds tools).
 * Reuses the same OAuth2 credentials from googleAdsHelpers.
 * 
 * ENV VARS NEEDED:
 *   GA4_PROPERTY_ID  — Your GA4 property ID (e.g. "123456789")
 *   (OAuth creds reused from Google Ads: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN)
 * 
 * If the refresh token doesn't have GA4 scope yet, re-auth with:
 *   scope: https://www.googleapis.com/auth/analytics.readonly
 */

import { getAccessToken } from './googleAdsHelpers.js'

const GA4_BASE = 'https://analyticsdata.googleapis.com/v1beta'

/** Get property ID from env */
function getPropertyId() {
  const id = process.env.GA4_PROPERTY_ID
  if (!id) throw new Error('GA4_PROPERTY_ID environment variable is required')
  return id.replace(/^properties\//, '')
}

/** Make GA4 Data API request */
async function ga4Request(endpoint, body = null) {
  const accessToken = await getAccessToken()
  const propertyId = getPropertyId()
  const url = `${GA4_BASE}/properties/${propertyId}${endpoint}`

  const opts = {
    method: body ? 'POST' : 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  }
  if (body) opts.body = JSON.stringify(body)

  const resp = await fetch(url, opts)
  if (!resp.ok) {
    const errText = await resp.text()
    throw new Error(`GA4 API ${resp.status}: ${errText}`)
  }
  return resp.json()
}

/** Convert GA4 report response rows to flat objects */
function flattenReport(response) {
  const dimHeaders = (response.dimensionHeaders || []).map(h => h.name)
  const metHeaders = (response.metricHeaders || []).map(h => h.name)
  const rows = (response.rows || []).map(row => {
    const obj = {}
    ;(row.dimensionValues || []).forEach((v, i) => {
      obj[dimHeaders[i]] = v.value
    })
    ;(row.metricValues || []).forEach((v, i) => {
      obj[metHeaders[i]] = isNaN(Number(v.value)) ? v.value : Number(v.value)
    })
    return obj
  })
  return {
    rows,
    rowCount: response.rowCount || rows.length,
    metadata: response.metadata || null,
  }
}


// ═══════════════════════════════════════════
// TOOL IMPLEMENTATIONS
// ═══════════════════════════════════════════

/**
 * Run a flexible GA4 report
 */
export async function ga4RunReport({
  dimensions = [],
  metrics = [],
  startDate = '30daysAgo',
  endDate = 'today',
  dimensionFilter = null,
  metricFilter = null,
  orderBys = null,
  limit = 100,
  offset = 0,
}) {
  const body = {
    dateRanges: [{ startDate, endDate }],
    dimensions: dimensions.map(d => ({ name: d })),
    metrics: metrics.map(m => ({ name: m })),
    limit,
    offset,
  }

  if (dimensionFilter) body.dimensionFilter = dimensionFilter
  if (metricFilter) body.metricFilter = metricFilter
  if (orderBys) body.orderBys = orderBys

  const response = await ga4Request(':runReport', body)
  return flattenReport(response)
}


/**
 * Get account/property summary info
 */
export async function ga4GetPropertyInfo() {
  const accessToken = await getAccessToken()
  const propertyId = getPropertyId()

  const url = `https://analyticsadmin.googleapis.com/v1beta/properties/${propertyId}`
  const resp = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  if (!resp.ok) {
    const errText = await resp.text()
    throw new Error(`GA4 Admin API ${resp.status}: ${errText}`)
  }
  return resp.json()
}


/**
 * Get audience overview — users, sessions, pageviews by date
 */
export async function ga4GetAudienceOverview({ startDate = '30daysAgo', endDate = 'today' }) {
  return ga4RunReport({
    dimensions: ['date'],
    metrics: [
      'totalUsers', 'newUsers', 'sessions',
      'screenPageViews', 'bounceRate', 'averageSessionDuration',
      'engagedSessions', 'engagementRate',
    ],
    startDate,
    endDate,
    orderBys: [{ dimension: { dimensionName: 'date', orderType: 'ALPHANUMERIC' }, desc: false }],
    limit: 366,
  })
}


/**
 * Get demographics — age, gender breakdowns
 */
export async function ga4GetDemographics({ startDate = '90daysAgo', endDate = 'today', dimension = 'userAgeBracket' }) {
  return ga4RunReport({
    dimensions: [dimension],
    metrics: [
      'totalUsers', 'sessions', 'conversions',
      'ecommercePurchases', 'purchaseRevenue',
      'engagementRate', 'averageSessionDuration',
    ],
    startDate,
    endDate,
    orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
    limit: 50,
  })
}


/**
 * Get traffic by device category (desktop, mobile, tablet)
 */
export async function ga4GetDeviceReport({ startDate = '30daysAgo', endDate = 'today' }) {
  return ga4RunReport({
    dimensions: ['deviceCategory'],
    metrics: [
      'totalUsers', 'sessions', 'conversions',
      'ecommercePurchases', 'purchaseRevenue',
      'bounceRate', 'averageSessionDuration', 'engagementRate',
    ],
    startDate,
    endDate,
    orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
    limit: 10,
  })
}


/**
 * Get traffic by country
 */
export async function ga4GetGeoReport({ startDate = '30daysAgo', endDate = 'today', dimension = 'country' }) {
  return ga4RunReport({
    dimensions: [dimension],
    metrics: [
      'totalUsers', 'sessions', 'conversions',
      'ecommercePurchases', 'purchaseRevenue',
      'bounceRate', 'engagementRate',
    ],
    startDate,
    endDate,
    orderBys: [{ metric: { metricName: 'totalUsers' }, desc: true }],
    limit: 50,
  })
}


/**
 * Get traffic sources — channels, source/medium
 */
export async function ga4GetTrafficSources({ startDate = '30daysAgo', endDate = 'today', dimension = 'sessionDefaultChannelGroup' }) {
  return ga4RunReport({
    dimensions: [dimension],
    metrics: [
      'totalUsers', 'sessions', 'conversions',
      'ecommercePurchases', 'purchaseRevenue',
      'bounceRate', 'engagementRate', 'averageSessionDuration',
    ],
    startDate,
    endDate,
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 50,
  })
}


/**
 * Get top pages by pageviews
 */
export async function ga4GetTopPages({ startDate = '30daysAgo', endDate = 'today', limit = 50 }) {
  return ga4RunReport({
    dimensions: ['pagePath'],
    metrics: [
      'screenPageViews', 'totalUsers', 'sessions',
      'bounceRate', 'averageSessionDuration',
      'conversions', 'ecommercePurchases',
    ],
    startDate,
    endDate,
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit,
  })
}


/**
 * Get ecommerce / conversions report
 */
export async function ga4GetConversions({ startDate = '30daysAgo', endDate = 'today', dimension = 'sessionDefaultChannelGroup' }) {
  return ga4RunReport({
    dimensions: [dimension],
    metrics: [
      'conversions', 'ecommercePurchases',
      'purchaseRevenue', 'totalPurchasers',
      'transactions', 'averagePurchaseRevenue',
    ],
    startDate,
    endDate,
    orderBys: [{ metric: { metricName: 'conversions' }, desc: true }],
    limit: 50,
  })
}


/**
 * Get realtime report — active users right now
 */
export async function ga4GetRealtime({ dimensions = ['country'] }) {
  const body = {
    dimensions: dimensions.map(d => ({ name: d })),
    metrics: [{ name: 'activeUsers' }],
  }
  const response = await ga4Request(':runRealtimeReport', body)
  return flattenReport(response)
}


/**
 * Run a cross-dimensional report (e.g., source × device × country)
 */
export async function ga4GetCrossReport({
  dimensions = ['sessionDefaultChannelGroup', 'deviceCategory'],
  metrics = ['totalUsers', 'sessions', 'conversions', 'purchaseRevenue'],
  startDate = '30daysAgo',
  endDate = 'today',
  limit = 100,
}) {
  return ga4RunReport({ dimensions, metrics, startDate, endDate, limit })
}
