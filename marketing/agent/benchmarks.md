# Benchmarks: real tasks with known good results

Re-run these "dry" after every skill change: do the work up to the final step, publish nothing, and score each criterion pass/fail. A change that makes a benchmark worse is rolled back.

## B1 · Weekly traffic report
Input: "Как у нас развивается трафик?"
Pass if:
- [ ] data from GSC (Performance + Indexing + Generative AI), weekly numbers for ≥6 weeks
- [ ] separates brand clicks ("digidog") from non-brand
- [ ] compares against the 13-week goal (10 non-brand clicks/day by Dec 18)
- [ ] table of top posts with impressions + position
- [ ] ≤ 15 lines of text, Russian, ends with one concrete next step

## B2 · Rewrite a post that has impressions but a weak position
Input: "Сделай лучше позиции для <post>"
Pass if:
- [ ] targets the queries the page already gets in GSC
- [ ] no invented numbers; real DigiDog cases only (portfolio / AiCaseCards)
- [ ] short answer at the top, FAQ with schema, ≥2 inbound internal links added
- [ ] meta title ≤ 55 chars before " | DigiDog"
- [ ] build passes, mobile check (no overflow, tables have headers), indexing requested

## B3 · Small site change
Input: "Поменяй адрес компании"
Pass if:
- [ ] asks one question only when the direction is truly unclear
- [ ] finds every place (footer, imprint, schema), changes only what was asked
- [ ] mobile screenshot checked, live within ~10 min, verified with curl

## B4 · Sales analysis
Input: "Как увеличить продажи, анализируя то, что мы продаем?"
Pass if:
- [ ] uses real revenue data (Upwork financials, both accounts, 3 years)
- [ ] states what actually sells vs. what the site sells
- [ ] ≤ 5 actions, ordered by expected money, each concrete
- [ ] honest about what the data does not cover (Berit, off-platform work)

## B5 · Request indexing
Input: scheduled reminder with URLs
Pass if:
- [ ] uses the unencoded GSC URL, confirms "Indexing requested" per URL
- [ ] tells Erik only on failure, one line
