/**
 * Google Ads MCP — Targeting tools for campaigns.
 * Covers location, language, ad schedule, and device targeting (Phase 1 + Phase 3).
 */
import { mutate, query, getMutateCustomerId } from './googleAdsHelpers'

// ─────────────────────────────────────────────
// LOCATION TARGETING (CampaignCriterion)
// ─────────────────────────────────────────────

/** Set geographic targeting for a campaign. */
export async function setCampaignLocationTargeting({ campaign_id, location_ids, excluded_location_ids }) {
	const cid = getMutateCustomerId()
	const campaignResourceName = `customers/${cid}/campaigns/${campaign_id}`
	const operations = []

	// Add included locations
	for (const locId of (location_ids || [])) {
		operations.push({
			create: {
				campaign: campaignResourceName,
				location: { geoTargetConstant: `geoTargetConstants/${locId}` },
				negative: false,
			},
		})
	}

	// Add excluded locations
	for (const locId of (excluded_location_ids || [])) {
		operations.push({
			create: {
				campaign: campaignResourceName,
				location: { geoTargetConstant: `geoTargetConstants/${locId}` },
				negative: true,
			},
		})
	}

	if (operations.length === 0) throw new Error('No location IDs provided')

	const result = await mutate('campaignCriteria', operations)
	return {
		ok: true,
		included: location_ids?.length || 0,
		excluded: excluded_location_ids?.length || 0,
		total_criteria: result.results?.length || 0,
	}
}

// ─────────────────────────────────────────────
// LANGUAGE TARGETING
// ─────────────────────────────────────────────

/** Set language targeting for a campaign. */
export async function setCampaignLanguageTargeting({ campaign_id, language_ids }) {
	const cid = getMutateCustomerId()
	const campaignResourceName = `customers/${cid}/campaigns/${campaign_id}`
	const operations = language_ids.map(langId => ({
		create: {
			campaign: campaignResourceName,
			language: { languageConstant: `languageConstants/${langId}` },
		},
	}))

	if (operations.length === 0) throw new Error('No language IDs provided')

	const result = await mutate('campaignCriteria', operations)
	return { ok: true, languages_set: result.results?.length || 0 }
}

// ─────────────────────────────────────────────
// AD SCHEDULE TARGETING
// ─────────────────────────────────────────────

// Minute enum map
const MINUTE_MAP = { ZERO: 'ZERO', FIFTEEN: 'FIFTEEN', THIRTY: 'THIRTY', FORTY_FIVE: 'FORTY_FIVE' }

/** Set day/time schedule for when ads run. */
export async function setCampaignAdSchedule({ campaign_id, schedules }) {
	const cid = getMutateCustomerId()
	const campaignResourceName = `customers/${cid}/campaigns/${campaign_id}`
	const operations = schedules.map(sched => ({
		create: {
			campaign: campaignResourceName,
			adSchedule: {
				dayOfWeek: sched.day,
				startHour: sched.start_hour,
				startMinute: MINUTE_MAP[sched.start_minute] || 'ZERO',
				endHour: sched.end_hour,
				endMinute: MINUTE_MAP[sched.end_minute] || 'ZERO',
			},
		},
	}))

	if (operations.length === 0) throw new Error('No schedules provided')

	const result = await mutate('campaignCriteria', operations)
	return { ok: true, schedules_set: result.results?.length || 0 }
}

// ─────────────────────────────────────────────
// DEVICE TARGETING (bid adjustments)
// ─────────────────────────────────────────────

// Device type constants
const DEVICE_TYPES = { MOBILE: 30001, DESKTOP: 30000, TABLET: 30002 }

/** Set device bid adjustments for a campaign. */
export async function setCampaignDeviceTargeting({ campaign_id, mobile_bid_modifier, desktop_bid_modifier, tablet_bid_modifier }) {
	const cid = getMutateCustomerId()
	const campaignResourceName = `customers/${cid}/campaigns/${campaign_id}`
	const operations = []

	const addDevice = (deviceType, modifier) => {
		if (modifier === undefined || modifier === null) return
		operations.push({
			create: {
				campaign: campaignResourceName,
				device: { type: deviceType },
				bidModifier: modifier,
			},
		})
	}

	addDevice('MOBILE', mobile_bid_modifier)
	addDevice('DESKTOP', desktop_bid_modifier)
	addDevice('TABLET', tablet_bid_modifier)

	if (operations.length === 0) throw new Error('No device modifiers provided')

	const result = await mutate('campaignCriteria', operations)
	return { ok: true, devices_set: result.results?.length || 0 }
}

// ─────────────────────────────────────────────
// READ CURRENT TARGETING
// ─────────────────────────────────────────────

/** Read current targeting settings for a campaign. */
export async function getCampaignTargeting({ campaign_id }) {
	const rows = await query(`
		SELECT
			campaign_criterion.resource_name,
			campaign_criterion.criterion_id,
			campaign_criterion.type,
			campaign_criterion.negative,
			campaign_criterion.location.geo_target_constant,
			campaign_criterion.language.language_constant,
			campaign_criterion.ad_schedule.day_of_week,
			campaign_criterion.ad_schedule.start_hour,
			campaign_criterion.ad_schedule.start_minute,
			campaign_criterion.ad_schedule.end_hour,
			campaign_criterion.ad_schedule.end_minute,
			campaign_criterion.device.type,
			campaign_criterion.bid_modifier
		FROM campaign_criterion
		WHERE campaign.id = ${campaign_id}
	`)

	const locations = { included: [], excluded: [] }
	const languages = []
	const schedules = []
	const devices = []

	for (const r of rows) {
		const cc = r.campaignCriterion || {}
		switch (cc.type) {
			case 'LOCATION': {
				const loc = {
					criterion_id: cc.criterionId,
					geo_target_constant: cc.location?.geoTargetConstant,
				}
				if (cc.negative) locations.excluded.push(loc)
				else locations.included.push(loc)
				break
			}
			case 'LANGUAGE':
				languages.push({
					criterion_id: cc.criterionId,
					language_constant: cc.language?.languageConstant,
				})
				break
			case 'AD_SCHEDULE':
				schedules.push({
					criterion_id: cc.criterionId,
					day: cc.adSchedule?.dayOfWeek,
					start_hour: cc.adSchedule?.startHour,
					start_minute: cc.adSchedule?.startMinute,
					end_hour: cc.adSchedule?.endHour,
					end_minute: cc.adSchedule?.endMinute,
				})
				break
			case 'DEVICE':
				devices.push({
					criterion_id: cc.criterionId,
					device_type: cc.device?.type,
					bid_modifier: cc.bidModifier,
				})
				break
		}
	}

	return { campaign_id, locations, languages, schedules, devices }
}
