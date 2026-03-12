import { z } from 'zod'
import { getDevicePerformance, getGeoPerformance, getGoogleAdsCampaignSummary, getGoogleAdsData, listGoogleAdsAccounts } from './googleAds'
import { addKeywords, addNegativeKeywords, createAdGroup, createCampaign, createCampaignBudget, createResponsiveSearchAd, enableCampaign, getAdPreview, listAdGroups, listAds, listCampaignBudgets, listCampaigns, listKeywords, pauseCampaign, removeCampaign, removeKeyword, updateAdGroup, updateAdStatus, updateCampaign, updateCampaignBudget, updateKeyword } from './googleAdsWrite'
import { getCampaignTargeting, setCampaignAdSchedule, setCampaignDeviceTargeting, setCampaignLanguageTargeting, setCampaignLocationTargeting } from './googleAdsTargeting'
import { getKeywordForecast, getKeywordIdeas, searchGeoTargets, searchLanguageConstants } from './googleAdsUtility'
import { ga4RunReport, ga4GetPropertyInfo, ga4GetAudienceOverview, ga4GetDemographics, ga4GetDeviceReport, ga4GetGeoReport, ga4GetTrafficSources, ga4GetTopPages, ga4GetConversions, ga4GetRealtime, ga4GetCrossReport } from './ga4Tools'

const json = (data) => ({ content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] })

export function registerTools(server) {

  // ═══ GOOGLE ADS — READ ═══
  server.tool('get_google_ads', 'Fetch Google Ads campaign/ad data for a date range.', { startDate: z.string().optional(), endDate: z.string().optional() }, async (params) => { const data = await getGoogleAdsData(params); return json({ total_rows: data.length, ads: data }) })
  server.tool('list_google_ads_accounts', 'List accessible Google Ads customer account IDs.', {}, async () => json({ accounts: await listGoogleAdsAccounts() }))
  server.tool('get_google_ads_campaign_summary', 'Get Google Ads campaign performance summary.', { startDate: z.string().optional(), endDate: z.string().optional() }, async (params) => json(await getGoogleAdsCampaignSummary(params)))
  server.tool('get_geo_performance', 'Get Google Ads performance by geography.', { campaign_id: z.string().optional(), startDate: z.string().optional(), endDate: z.string().optional() }, async (params) => json({ geo_performance: await getGeoPerformance(params) }))
  server.tool('get_device_performance', 'Get Google Ads performance by device.', { campaign_id: z.string().optional(), startDate: z.string().optional(), endDate: z.string().optional() }, async (params) => json({ device_performance: await getDevicePerformance(params) }))

  // ═══ GOOGLE ADS — BUDGET ═══
  server.tool('create_campaign_budget', 'Create a campaign budget. Amount in micros (€10 = 10000000).', { name: z.string(), amount_micros: z.number().int(), delivery_method: z.enum(['STANDARD', 'ACCELERATED']).optional().default('STANDARD'), shared: z.boolean().optional().default(false) }, async (params) => json(await createCampaignBudget(params)))
  server.tool('list_campaign_budgets', 'List existing campaign budgets.', {}, async () => json({ budgets: await listCampaignBudgets() }))
  server.tool('update_campaign_budget', 'Update daily amount on an existing budget.', { budget_id: z.string(), amount_micros: z.number().int() }, async (params) => json(await updateCampaignBudget(params)))

  // ═══ GOOGLE ADS — CAMPAIGNS ═══
  server.tool('create_campaign', 'Create a new Google Ads campaign. Starts PAUSED.', { name: z.string(), budget_id: z.string(), channel_type: z.enum(['SEARCH', 'DISPLAY', 'PERFORMANCE_MAX']), bidding_strategy: z.enum(['MAXIMIZE_CLICKS', 'MAXIMIZE_CONVERSIONS', 'TARGET_CPA', 'MANUAL_CPC']), target_cpa_micros: z.number().int().optional(), start_date: z.string().optional(), end_date: z.string().optional(), status: z.enum(['PAUSED', 'ENABLED']).optional().default('PAUSED'), network_settings: z.object({ search: z.boolean().optional().default(true), display: z.boolean().optional().default(false), partners: z.boolean().optional().default(false) }).optional() }, async (params) => json(await createCampaign(params)))
  server.tool('update_campaign', 'Update campaign settings.', { campaign_id: z.string(), name: z.string().optional(), status: z.enum(['ENABLED', 'PAUSED', 'REMOVED']).optional(), budget_id: z.string().optional(), bidding_strategy: z.enum(['MAXIMIZE_CLICKS', 'MAXIMIZE_CONVERSIONS', 'TARGET_CPA', 'MANUAL_CPC']).optional(), target_cpa_micros: z.number().int().optional(), start_date: z.string().optional(), end_date: z.string().optional() }, async (params) => json(await updateCampaign(params)))
  server.tool('pause_campaign', 'Pause a campaign.', { campaign_id: z.string() }, async (params) => json(await pauseCampaign(params)))
  server.tool('enable_campaign', 'Enable a campaign.', { campaign_id: z.string() }, async (params) => json(await enableCampaign(params)))
  server.tool('remove_campaign', 'Soft-delete a campaign.', { campaign_id: z.string() }, async (params) => json(await removeCampaign(params)))
  server.tool('list_campaigns', 'List all campaigns.', { status_filter: z.enum(['ENABLED', 'PAUSED', 'ALL']).optional().default('ALL') }, async (params) => json({ campaigns: await listCampaigns(params) }))

  // ═══ GOOGLE ADS — AD GROUPS ═══
  server.tool('create_ad_group', 'Create an ad group.', { campaign_id: z.string(), name: z.string(), cpc_bid_micros: z.number().int().optional(), status: z.enum(['ENABLED', 'PAUSED']).optional().default('ENABLED') }, async (params) => json(await createAdGroup(params)))
  server.tool('update_ad_group', 'Update ad group.', { ad_group_id: z.string(), name: z.string().optional(), cpc_bid_micros: z.number().int().optional(), status: z.enum(['ENABLED', 'PAUSED']).optional() }, async (params) => json(await updateAdGroup(params)))
  server.tool('list_ad_groups', 'List ad groups for a campaign.', { campaign_id: z.string() }, async (params) => json({ ad_groups: await listAdGroups(params) }))

  // ═══ GOOGLE ADS — KEYWORDS ═══
  server.tool('add_keywords', 'Add keywords to an ad group.', { ad_group_id: z.string(), keywords: z.array(z.object({ text: z.string(), match_type: z.enum(['EXACT', 'PHRASE', 'BROAD']).optional().default('PHRASE'), cpc_bid_micros: z.number().int().optional(), final_url: z.string().optional() })) }, async (params) => json(await addKeywords(params)))
  server.tool('add_negative_keywords', 'Add negative keywords.', { level: z.enum(['CAMPAIGN', 'AD_GROUP']), parent_id: z.string(), keywords: z.array(z.object({ text: z.string(), match_type: z.enum(['EXACT', 'PHRASE', 'BROAD']).optional().default('EXACT') })) }, async (params) => json(await addNegativeKeywords(params)))
  server.tool('list_keywords', 'List keywords for an ad group.', { ad_group_id: z.string() }, async (params) => json({ keywords: await listKeywords(params) }))
  server.tool('update_keyword', 'Update a keyword.', { ad_group_id: z.string(), criterion_id: z.string(), cpc_bid_micros: z.number().int().optional(), status: z.enum(['ENABLED', 'PAUSED']).optional() }, async (params) => json(await updateKeyword(params)))
  server.tool('remove_keyword', 'Remove a keyword.', { ad_group_id: z.string(), criterion_id: z.string() }, async (params) => json(await removeKeyword(params)))

  // ═══ GOOGLE ADS — ADS (RSA) ═══
  server.tool('create_responsive_search_ad', 'Create an RSA. 3-15 headlines (30 chars), 2-4 descriptions (90 chars).', { ad_group_id: z.string(), headlines: z.array(z.string()).min(3).max(15), descriptions: z.array(z.string()).min(2).max(4), final_url: z.string(), path1: z.string().optional(), path2: z.string().optional(), pinned_headlines: z.record(z.string(), z.number()).optional(), pinned_descriptions: z.record(z.string(), z.number()).optional() }, async (params) => json(await createResponsiveSearchAd(params)))
  server.tool('list_ads', 'List ads in an ad group.', { ad_group_id: z.string() }, async (params) => json({ ads: await listAds(params) }))
  server.tool('update_ad_status', 'Pause, enable, or remove an ad.', { ad_group_id: z.string(), ad_id: z.string(), status: z.enum(['ENABLED', 'PAUSED', 'REMOVED']) }, async (params) => json(await updateAdStatus(params)))
  server.tool('get_ad_preview', 'Preview an ad.', { ad_group_id: z.string(), ad_id: z.string() }, async (params) => json(await getAdPreview(params)))

  // ═══ GOOGLE ADS — TARGETING ═══
  server.tool('set_campaign_location_targeting', 'Set geographic targeting.', { campaign_id: z.string(), location_ids: z.array(z.number().int()), excluded_location_ids: z.array(z.number().int()).optional() }, async (params) => json(await setCampaignLocationTargeting(params)))
  server.tool('set_campaign_language_targeting', 'Set language targeting.', { campaign_id: z.string(), language_ids: z.array(z.number().int()) }, async (params) => json(await setCampaignLanguageTargeting(params)))
  server.tool('set_campaign_ad_schedule', 'Set ad schedule.', { campaign_id: z.string(), schedules: z.array(z.object({ day: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']), start_hour: z.number().int().min(0).max(23), start_minute: z.enum(['ZERO', 'FIFTEEN', 'THIRTY', 'FORTY_FIVE']).optional().default('ZERO'), end_hour: z.number().int().min(0).max(24), end_minute: z.enum(['ZERO', 'FIFTEEN', 'THIRTY', 'FORTY_FIVE']).optional().default('ZERO') })) }, async (params) => json(await setCampaignAdSchedule(params)))
  server.tool('set_campaign_device_targeting', 'Set device bid adjustments.', { campaign_id: z.string(), mobile_bid_modifier: z.number().optional(), desktop_bid_modifier: z.number().optional(), tablet_bid_modifier: z.number().optional() }, async (params) => json(await setCampaignDeviceTargeting(params)))
  server.tool('get_campaign_targeting', 'Read targeting settings.', { campaign_id: z.string() }, async (params) => json(await getCampaignTargeting(params)))

  // ═══ GOOGLE ADS — UTILITY ═══
  server.tool('search_geo_targets', 'Search for Geo Target IDs.', { query: z.string(), country_code: z.string().optional() }, async (params) => json({ results: await searchGeoTargets(params) }))
  server.tool('search_language_constants', 'List language targeting options.', {}, async () => json({ languages: await searchLanguageConstants() }))
  server.tool('get_keyword_ideas', 'Get keyword suggestions.', { seed_keywords: z.array(z.string()).optional(), url: z.string().optional(), location_ids: z.array(z.number().int()).optional(), language_id: z.string().optional() }, async (params) => json({ ideas: await getKeywordIdeas(params) }))
  server.tool('get_keyword_forecast', 'Get keyword traffic forecast.', { keywords: z.array(z.union([z.string(), z.object({ text: z.string(), match_type: z.enum(['EXACT', 'PHRASE', 'BROAD']).optional().default('PHRASE') })])), location_ids: z.array(z.number().int()).optional(), language_id: z.string().optional(), daily_budget_micros: z.number().int().optional() }, async (params) => json(await getKeywordForecast(params)))

  // ═══ GOOGLE ANALYTICS 4 ═══
  server.tool('ga4_run_report', 'Run a custom GA4 report with any dimensions and metrics.', { dimensions: z.array(z.string()), metrics: z.array(z.string()), startDate: z.string().optional().default('30daysAgo'), endDate: z.string().optional().default('today'), dimensionFilter: z.any().optional(), metricFilter: z.any().optional(), orderBys: z.any().optional(), limit: z.number().int().optional().default(100), offset: z.number().int().optional().default(0) }, async (params) => json(await ga4RunReport(params)))
  server.tool('ga4_get_property_info', 'Get GA4 property details.', {}, async () => json(await ga4GetPropertyInfo()))
  server.tool('ga4_audience_overview', 'Get daily audience metrics.', { startDate: z.string().optional().default('30daysAgo'), endDate: z.string().optional().default('today') }, async (params) => json(await ga4GetAudienceOverview(params)))
  server.tool('ga4_demographics', 'Get age or gender breakdown.', { startDate: z.string().optional().default('90daysAgo'), endDate: z.string().optional().default('today'), dimension: z.enum(['userAgeBracket', 'userGender']).optional().default('userAgeBracket') }, async (params) => json(await ga4GetDemographics(params)))
  server.tool('ga4_device_report', 'Get device breakdown.', { startDate: z.string().optional().default('30daysAgo'), endDate: z.string().optional().default('today') }, async (params) => json(await ga4GetDeviceReport(params)))
  server.tool('ga4_geo_report', 'Get traffic by country or city.', { startDate: z.string().optional().default('30daysAgo'), endDate: z.string().optional().default('today'), dimension: z.enum(['country', 'city', 'region', 'continent']).optional().default('country') }, async (params) => json(await ga4GetGeoReport(params)))
  server.tool('ga4_traffic_sources', 'Get traffic sources.', { startDate: z.string().optional().default('30daysAgo'), endDate: z.string().optional().default('today'), dimension: z.enum(['sessionDefaultChannelGroup', 'sessionSourceMedium', 'sessionSource', 'sessionMedium', 'sessionCampaignName']).optional().default('sessionDefaultChannelGroup') }, async (params) => json(await ga4GetTrafficSources(params)))
  server.tool('ga4_top_pages', 'Get top pages by pageviews.', { startDate: z.string().optional().default('30daysAgo'), endDate: z.string().optional().default('today'), limit: z.number().int().optional().default(50) }, async (params) => json(await ga4GetTopPages(params)))
  server.tool('ga4_conversions', 'Get conversion data.', { startDate: z.string().optional().default('30daysAgo'), endDate: z.string().optional().default('today'), dimension: z.enum(['sessionDefaultChannelGroup', 'deviceCategory', 'country', 'pagePath', 'sessionSourceMedium', 'userAgeBracket', 'userGender']).optional().default('sessionDefaultChannelGroup') }, async (params) => json(await ga4GetConversions(params)))
  server.tool('ga4_realtime', 'Get realtime active users.', { dimensions: z.array(z.string()).optional().default(['country']) }, async (params) => json(await ga4GetRealtime(params)))
  server.tool('ga4_cross_report', 'Run cross-dimensional report.', { dimensions: z.array(z.string()).optional().default(['sessionDefaultChannelGroup', 'deviceCategory']), metrics: z.array(z.string()).optional().default(['totalUsers', 'sessions', 'conversions', 'purchaseRevenue']), startDate: z.string().optional().default('30daysAgo'), endDate: z.string().optional().default('today'), limit: z.number().int().optional().default(100) }, async (params) => json(await ga4GetCrossReport(params)))

  // ═══ HEALTH CHECK ═══
  server.tool('ping', 'Health check.', { message: z.string().optional() }, async ({ message }) => ({ content: [{ type: 'text', text: `pong${message ? `: ${message}` : ''}` }] }))
}
