import {
  CalloutPanel,
  DataTable,
  ExitCallout,
  Prose,
  SectionTitle,
  StatCard,
  Subhead,
} from "@/components/memo-ui";

const sectionClass =
  "mt-[80px] scroll-mt-28 space-y-8 md:mt-[100px]";

const RISKS: { title: string; w: string; m: string }[] = [
  {
    title: "First paid customer conversion (highest near-term risk)",
    w: "Our pilots are on free founder pricing. The first paid customer signing in the August through October 2026 window is the milestone that triggers the pre-seed round and validates the entire revenue thesis. If outbound and Marketplace inbound fail to produce a paid customer in that window, the F&F runway compresses and pre-seed conversations get harder.",
    m: "Multiple parallel paths to first paid customer (Lefevre conversion, Mary Davis conversion, concierge intros through Sach's network, Castle Connolly intros through Ravi's aunt). Conservative case assumes 1 of 5 paths converts. We are building the pipeline accordingly.",
  },
  {
    title: "Athena platform dependency",
    w: "We are launching on a single EHR. If Athena materially changes Partner Program terms, revokes API access, or de-prioritizes the Marketplace, the roadmap is at risk through Year 2.",
    m: "Transparent relationship management with Athena (we are doing exactly this through the ISC kickoff process). Multi-EHR roadmap with ModMed as second target in Year 2. The technical substrate is EHR-agnostic by design; only the adapter layer is athena-specific.",
  },
  {
    title: "Competition entering PCP-outbound segment",
    w: "Tennr and Valerie raised meaningful capital (Tennr at approximately $605M post-money) in adjacent specialty-inbound categories. Either could pivot or expand into PCP-outbound. Other workflow SaaS companies could add referral-specific features.",
    m: "Speed to category leadership on the PCP side. Customer relationships and switching costs (Tether is embedded in athenaOne workflow, not bolt-on). The dual pricing model captures economics competitors are not architected for.",
  },
  {
    title: "Founder bandwidth constraints",
    w: "Sach is constrained by residency starting July 2026. Ravi covers all engineering surfaces. Sid joins full-time July 2026. The GTM motion cannot scale on founder time alone past 20-30 customers.",
    m: "Pre-seed funded Head of Growth Month 8-10 is the explicit solution. Until then, scope discipline (we close concierge practices, not networks). After the Head of Growth hire, founder time refocuses on technical execution and high-priority enterprise deals.",
  },
  {
    title: "CMS reimbursement rule changes",
    w: "Our customer ROI math depends on continued TCM, CCM, and quality bonus payment structures. Major CMS changes (rare but possible) could compress the recovered-revenue math.",
    m: "The recovered visit revenue (Stream One, $150-$200 per follow-up) is structurally durable; PCPs will bill follow-up visits regardless of CMS rule changes. The TCM/CCM exposure (Streams Two and Three) is real but ranges, not point estimates, so we have buffer. The MA labor savings are policy-independent.",
  },
  {
    title: "Regulatory and HIPAA compliance scale-up",
    w: "As we onboard more customers and process more PHI, audit exposure increases. Major HIPAA incidents or HITRUST certification delays could pause enterprise deal cycles.",
    m: "PHI-strict logging is built into the runtime substrate from day one. SOC 2 Type II certification funded in the pre-seed round. HITRUST assessment timeline coordinated with the Athena ISC process. Cyber insurance baseline policy in place before first paid customer.",
  },
];

export function InvestmentMemoBody() {
  return (
    <>
      <section id="opportunity" className={sectionClass}>
        <SectionTitle kicker="01" title="The opportunity" />
        <Subhead>The broken loop in primary care</Subhead>
        <Prose>
          <p>Approximately 50% of specialist referrals from U.S. primary care never close the loop. The patient does not see the specialist, or sees them but the consult note never returns to the PCP. This has been the same broken workflow for thirty years and it costs the system meaningful money. Patients fall through the cracks, conditions go unmanaged, and the primary care practice that initiated the referral loses three things: the follow-up visit revenue, the documentation needed for higher-value billing codes, and the patient relationship.</p>
          <p>The mechanical reason this happens is that referral coordination is manual, fragmented, and not integrated into the PCP's EHR workflow. Staff spend approximately 25 minutes per referral on coordination work: pulling clinical context from the chart, drafting the referral, identifying the right specialist, verifying insurance acceptance, sending the referral, tracking acknowledgment, tracking the appointment, tracking the visit, waiting for the consult note, and updating the chart. Half of those loops break somewhere in that chain.</p>
        </Prose>
        <Subhead>Why Tether exists</Subhead>
        <Prose>
          <p>Tether is the EHR-native software platform that closes the loop. We sit inside the primary care practice's electronic health record (athenaOne, our launch partner), generate the complete clinical referral narrative from chart context, verify the patient's insurance against the specialist's accepted plans, route the referral to the specialist's office, track every stage of the workflow automatically, and write the consult note back into the chart when it returns.</p>
          <p>Staff time per referral drops from approximately 25 minutes to approximately 7 minutes. More loops close. The practice captures revenue that was previously being left on the table. This is the wedge.</p>
        </Prose>
        <Subhead>Market sizing</Subhead>
        <Prose>
          <p>The U.S. specialty services market triggered by primary care referrals is approximately $981 billion annually. This is not Tether's addressable revenue; it is the size of the broken system within which Tether operates. Bottom-up: approximately 315 million PCP-initiated referrals per year (FAIR Health 2022 data, adjusted to 2026) multiplied by approximately $3,114 average downstream specialty episode value (CMS Medicare Physician Fee Schedule 2024, commercial composite).</p>
        </Prose>
        <div className="grid gap-3 sm:grid-cols-2">
          <StatCard label="Addressable subscription market" value="$1.0 to $1.5B" hint="150,000 community-based U.S. primary care practices at $15K to $30K blended ACV" />
          <StatCard label="Five-year ARR target" value="$50M to $120M" hint="3 to 8 percent of serviceable market" />
        </div>
      </section>

      <section id="customer" className={sectionClass}>
        <SectionTitle kicker="02" title="The customer" />
        <Subhead>Who pays Tether and why</Subhead>
        <Prose>
          <p>We sell to three customer segments, each with different economics and different sales motions.</p>
          <p><span className="font-semibold">Solo and duo concierge practices (1-2 providers).</span> Practices with 200-600 members, charging $1,500 to $5,000 per member per year. Revenue at the practice is $300K to $3M annually. Patient retention is the entire business. Membership fees compound; losing 5% to attrition costs the practice 5% of revenue forever. The MA handling referrals is a senior, expensive employee whose time is the largest non-physician cost in the practice. These customers buy Tether because the MA time savings is observable in week one, and recovered TCM and follow-up billing pays for the subscription many times over.</p>
          <p><span className="font-semibold">Small to mid-size primary care groups (3-10 providers).</span> Independent groups, often physician-owned, generally fee-for-service plus some Medicare Advantage capitation. Annual revenue $2M to $15M. These practices are price-sensitive but operationally rigorous. They have a practice manager who runs the P&L and understands code-level reimbursement. They buy Tether after a 30-day pilot where the billing impact can be measured against the baseline.</p>
          <p><span className="font-semibold">PE-backed primary care networks and MSOs (10-1000+ providers).</span> Privia, Bowling Green, OneMedical-style consolidators, MSO platforms managing affiliated independent groups. These are the deals that move the needle on ARR. Revenue per deal: $250K to $1M+ in single contracts. Sales cycle: 4-9 months. They buy Tether after a procurement review and a multi-practice pilot, generally with a Head of Growth running the deal.</p>
        </Prose>
        <Subhead>Why concierge is the wedge</Subhead>
        <Prose>
          <p>Three reasons concierge is our beachhead, not a final state.</p>
          <p>First, concierge practices are unusually willing to pay for software that improves the member experience because their entire business model is premium-priced member experience. Second, concierge practices are small enough that a single physician decision-maker can sign. Third, MDVIP, SignatureMD, and Castle Connolly affiliations create natural peer-to-peer referral networks for software adoption. Sach has direct introductions into these networks.</p>
          <p>After we have 10-20 concierge customers with documented results, the path opens to small groups (where we sell on labor plus revenue capture math) and then to networks (where we sell on portfolio-level revenue impact and care coordination outcomes).</p>
        </Prose>
      </section>

      <section id="platform" className={sectionClass}>
        <SectionTitle kicker="03" title="The platform" />
        <Subhead>One platform, four releases</Subhead>
        <Prose>
          <p>Tether is a platform with four named releases over the next eighteen months. Each release ships a defined agentic capability, addresses a defined customer outcome, unlocks a defined pricing tier, and depends on a defined capital trigger. We have shipped the first release. The next three are funded sequentially from the friends and family round and the pre-seed round that follows.</p>
        </Prose>

        <CalloutPanel className="mt-6">
          <p className="m-0 font-semibold text-memo-navy">Release 01 · Tether Referrals — Live in production (May 2026)</p>
        </CalloutPanel>
        <Prose>
          <p>The AI-generated clinical referral and lifecycle agent. The platform pulls patient context from athenaOne, generates a complete clinical referral narrative ready for physician review, routes the referral to the specialist, tracks acknowledgment / scheduling / visit / consult-note return automatically, and writes the consult note back into athenaOne when it arrives. Practice-level analytics surface stalled referrals before they fall through.</p>
          <p>This is the wedge product. It is what is shipped today and what the first paying customers sign for.</p>
          <p><span className="font-semibold">Pricing tier:</span> Launch — $600 / practice / month (solo concierge), $125 / provider / month (small group), $100-$125 / provider volume-tiered (network).</p>
          <p><span className="font-semibold">Status:</span> Live in production with two design partners. Athena write-back deploying this quarter. Athena Marketplace listing target Q3 2026.</p>
        </Prose>

        <CalloutPanel variant="warm" className="mt-6">
          <p className="m-0 font-semibold text-memo-navy">Release 02 · Tether Eligibility — Q4 2026 alpha, Q1 2027 GA</p>
        </CalloutPanel>
        <Prose>
          <p>Stedi-backed insurance eligibility verification agent. Before the referral goes out, Tether automatically verifies that the specialist accepts the patient's insurance plan. Eliminates the single largest cause of referral rejection.</p>
          <p>This is the first capability that triggers the price increase from launch to full platform, because it removes a meaningful additional 5-8 minutes of MA work per patient encounter (not just per referral) and unlocks Stedi-grade eligibility data the customer cannot get from athenaOne natively.</p>
          <p><span className="font-semibold">Pricing tier:</span> Full platform — $1,200 / practice (solo), $225 / provider (small group), $150-$200 / provider (network).</p>
          <p><span className="font-semibold">Capital dependency:</span> Stedi paid integration plus engineering time, approximately $15K to $25K all-in. Funded from the pre-seed round.</p>
        </Prose>

        <CalloutPanel variant="warm" className="mt-6">
          <p className="m-0 font-semibold text-memo-navy">Release 03 · Tether Voice — Q2 2027 alpha, Q3 2027 GA</p>
        </CalloutPanel>
        <Prose>
          <p>Vapi-backed voice coordination agent. Specialist offices without patient portals (which is the majority of them) get phone calls from Tether's voice agent: schedule confirmation, appointment reminders, consult note follow-up. The MA phone time at small practices is 5-15 hours per week. Tether Voice eliminates the majority of it.</p>
          <p>This release defends the full-platform pricing because the customer has now seen us replace two categories of MA work (referral coordination and phone-based specialist follow-up). Without Voice, the launch tier and full platform are not differentiated enough to justify the 2x price.</p>
          <p><span className="font-semibold">Capital dependency:</span> Vapi setup plus voice agent design and clinical safety review, approximately $15K to $25K all-in. Funded from pre-seed round.</p>
        </Prose>

        <CalloutPanel variant="warm" className="mt-6">
          <p className="m-0 font-semibold text-memo-navy">Release 04 · Tether Network — Q4 2027 onward</p>
        </CalloutPanel>
        <Prose>
          <p>Multi-EHR support (athenaOne plus ModMed plus others) and practice-network analytics. This is the release that makes large PE-backed network deals possible, because few networks are single-EHR.</p>
          <p>The network analytics layer is the second-order monetization: aggregated referral pattern intelligence sold to the MSO or network leadership team. Which specialists deliver, which ones don't, which payer mixes generate the best outcomes. This is what crosses ACV above $100K per network.</p>
          <p><span className="font-semibold">Pricing tier:</span> Per-seat at scale, custom volume-tiered. ACV crosses $100K on 50+ provider contracts. Network analytics layer adds $25K to $100K to ACV depending on size.</p>
          <p><span className="font-semibold">Capital dependency:</span> Multi-EHR engineering (second engineer plus integration work) and enterprise sales motion (Head of Growth). Funded from pre-seed plus early Series A.</p>
        </Prose>
      </section>

      <section id="revenue-model" className={sectionClass}>
        <SectionTitle kicker="04" title="Revenue model" />
        <Subhead>How Tether earns revenue</Subhead>
        <Prose>
          <p>Pricing scales on two dimensions: scope of product (launch versus full platform) and practice size (per-practice flat for the smallest, per-seat for groups and networks).</p>
        </Prose>
        <DataTable
          headers={["", "Solo or duo concierge (1-2)", "Small to mid group (3-10)", "Network or PE-backed (10+)"]}
          rows={[
            ["Launch product (today through Q4 2026)", "$600 / practice / month", "$125 / provider / month", "$100-$125 / provider, volume tiered"],
            ["Full platform (Q1 2027 onward)", "$1,200 / practice / month", "$225 / provider / month", "$150-$200 / provider, volume tiered"],
          ]}
        />
        <Prose>
          <p>Blended ACV at scale is targeted at $20,000 to $35,000 per customer per year. Network contracts at 50+ providers cross $100K ACV.</p>
          <p><span className="font-semibold">Grandfathering for early customers.</span> The first ten paying customers sign at launch pricing and are grandfathered through their first six months on the full platform, with renewal increase capped at 2x the launch rate. New customers signing after Q1 2027 sign at the full-platform rate from day one. This protects the early-customer relationship and creates the case study volume we need.</p>
        </Prose>

        <Subhead>Why this pricing, not other pricing</Subhead>
        <Prose>
          <p>Investors and customers will both ask why these tiers, not higher or lower. Three answers.</p>
          <p><span className="font-semibold">Why not $300/month for the launch tier?</span> Because at $300, the unit economics of the sales motion don't work. Founder-led concierge sales costs founder time (essentially free) but the customer success and onboarding cost we will eventually carry is real. $600 covers it. $300 forces us to choose between bad gross margins and bad customer experience.</p>
          <p><span className="font-semibold">Why not $1,500 for the launch tier?</span> Because the launch product is genuinely narrower than what ships in Q1 2027. We are anchoring at a price the recovered revenue clearly justifies (5-10x net positive on month one, see below) so the buying decision is unambiguous. The price will rise when the value rises.</p>
          <p><span className="font-semibold">Why per-practice flat for solo and per-provider for groups?</span> Because the cost-to-serve math is different. A solo concierge practice with one MA and one physician has roughly fixed referral volume regardless of provider count. A 5-physician group has 5x the referral volume and 5x the recovered revenue, so per-provider pricing aligns price with value capture. The crossover happens at 3 providers, which is why our pricing matrix transitions there.</p>
          <p><span className="font-semibold">Why volume tiering for networks?</span> Because network procurement teams expect it, and because at scale our marginal cost per provider drops materially. A 100-provider network using Tether costs us approximately the same engineering and support as a 25-provider network, so we can offer the volume tier without margin erosion.</p>
        </Prose>

        <Subhead>How Tether makes the customer money</Subhead>
        <Prose>
          <p>This is the load-bearing claim of the entire revenue thesis. We can defend it with real CMS data.</p>
          <p>The mechanism is loop closure. When Tether closes a referral that would otherwise have been lost, the primary care practice unlocks four real billable revenue streams under current CMS and commercial payer rules. The first two are directly attributable to Tether (we cause them); the third and fourth are indirectly supported by Tether (we enable better documentation that supports them).</p>
        </Prose>

        <Subhead id="stream-one">Stream One · Follow-up visit billing on closed loops</Subhead>
        <Prose>
          <p>When a referral closes and the specialist sends back a consult note, the PCP typically schedules a follow-up visit to review findings. This is a billable established-patient encounter. CMS 2024 reimbursement: 99213 (~$92) for low complexity, 99214 (~$130) for moderate complexity, 99215 (~$184) for high complexity. Blended with concierge and commercial multipliers, the average is approximately $150 to $200 per visit.</p>
          <p>Math for a solo concierge practice: approximately 100 referrals per month (FAIR Health average); current closure rate without Tether approximately 50%; Tether-recovered closed loops approximately 30 to 40 percent of the previously-lost half = 15 to 20 additional closed loops per month; follow-up visit conversion rate on recovered loops approximately 75%; additional follow-up visits per month: 11 to 15. <span className="font-semibold">Recovered visit revenue per month: $1,650 to $3,000.</span> For a 5-provider group: roughly 5x the volume, so $8,250 to $15,000 per month.</p>
        </Prose>

        <Subhead>Stream Two · Transitional Care Management codes</Subhead>
        <Prose>
          <p>This is the highest-leverage CMS code category and the one that almost no PCP captures fully today. CMS pays separately for Transitional Care Management when the PCP coordinates care after a qualifying post-acute event (hospitalization, ER visit, or qualifying specialist encounter) and documents the work within specific time windows.</p>
          <p>The codes: CPT 99495 (TCM, moderate complexity) approximately $185; CPT 99496 (TCM, high complexity) approximately $249. The American Academy of Family Physicians estimates that PCPs capture only 20-30% of the TCM revenue they are technically eligible for, because the documentation burden is high enough that the workflow happens but the billing doesn't get captured.</p>
          <p>Math for a solo concierge practice: approximately 30-40 percent of recovered closed loops involve a TCM-qualifying event; TCM-eligible events per month approximately 4 to 7; average reimbursement per TCM bill (blended) approximately $200. <span className="font-semibold">Recovered TCM revenue per month: $800 to $1,400.</span> For a 5-provider group: $5,000 to $10,000 per month.</p>
        </Prose>

        <Subhead>Stream Three · Chronic Care Management and Principal Care Management codes</Subhead>
        <Prose>
          <p>CMS pays separately for CCM (CPT 99490 at ~$63/month per patient for 20 minutes of non-face-to-face coordination work; CPT 99491 at ~$83 for complex CCM) and PCM (CPT 99424 and 99425, separate fee schedule for single high-risk conditions).</p>
          <p>These codes depend on patient cohort enrollment, not on referral closure, so we attribute them less directly to Tether. The honest framing: Tether's documentation also supports CCM and PCM billing by maintaining the care coordination paper trail that CMS audits expect. We do not claim a specific dollar amount per practice here because the impact varies dramatically by patient mix. Rough estimate for a practice with significant Medicare patient panel: $500 to $2,000 per month in additional CCM/PCM billing.</p>
        </Prose>

        <Subhead>Stream Four · Quality bonus payments</Subhead>
        <Prose>
          <p>HEDIS measures, MIPS, and Medicare Star Ratings reward closed-loop care coordination through several measures including care transitions composite, medication reconciliation post-discharge, and care coordination process measures.</p>
          <p>Bonus payments range from 2 to 7 percent of total Medicare revenue for high-performing practices. For a PCP with $300,000 in annual Medicare revenue, that is $6,000 to $21,000 per year in performance-based reimbursement, of which approximately 30-50% is directly attributable to documented loop closure. Annual attributable quality revenue: approximately $2,000 to $10,000 per provider per year, or $170 to $850 per provider per month.</p>
        </Prose>

        <Subhead>Total customer ROI math</Subhead>
        <Prose>
          <p><span className="font-semibold">Solo concierge practice (1 provider, $600/month subscription):</span> Stream One $1,650 – $3,000 / month; Stream Two $800 – $1,400 / month; Stream Three $500 – $2,000 / month; Stream Four $170 – $850 / month. Total recovered revenue: $3,120 – $7,250 per month. Net ROI: 5.2x to 12.1x at launch pricing.</p>
          <p><span className="font-semibold">5-provider small group ($625/month subscription, $125/provider × 5):</span> Total recovered revenue scales roughly linearly: $15,600 – $36,250 per month. Net ROI: 25x to 58x at launch pricing.</p>
          <p><span className="font-semibold">100-provider network ($12,500/month subscription, $125/provider × 100):</span> Total recovered revenue at network scale: approximately $300K – $700K per month. Plus quality bonus and RAF impact at network scale: additional $1M – $5M annually. Net ROI: 25x to 50x+ at network scale.</p>
          <p>These ratios are deliberately conservative. Upper bounds assume diverse referral mix and high-complexity patients. Lower bounds assume average concierge patient panel without complex chronic disease.</p>
        </Prose>

        <Subhead>Why this matters for unit economics</Subhead>
        <Prose>
          <p>The customer is not just net-positive on the subscription. The customer is net-positive by an order of magnitude. This creates three things we need for a venture-scale business:</p>
          <ol className="m-0 list-decimal space-y-2 pl-5">
            <li><span className="font-semibold">Low price sensitivity.</span> A customer recovering $5K/month from a $600 subscription does not negotiate hard at renewal.</li>
            <li><span className="font-semibold">High retention.</span> Customer churn assumptions in our model are 5-8% annually post-launch, materially below healthcare SaaS averages of 12-18%.</li>
            <li><span className="font-semibold">Expansion revenue.</span> The customer who experiences 5-12x ROI on the launch tier is highly likely to upgrade to the full platform at 2x price when Tether Eligibility and Tether Voice ship, because the same ROI math holds at the higher price.</li>
          </ol>
        </Prose>
      </section>

      <section id="path-to-scale" className={sectionClass}>
        <SectionTitle kicker="05" title="Path to scale" />
        <Subhead>The five-year ARR build</Subhead>
        <Prose>
          <p>The bottom-up build, with assumptions:</p>
          <p><span className="font-semibold">Year 1 (June 2026 - June 2027):</span> Q3 2026 first paid customer signed. Q4 2026: 3-5 paid customers, all concierge or small practice; Tether Eligibility alpha with design partners. Q1 2027: Tether Eligibility GA; new customers sign at full-platform pricing. Q2 2027: 8-15 paid customers, average ACV $15-20K. Ending ARR: $200K to $400K. Trigger: pre-seed round closes Month 8-14.</p>
          <p><span className="font-semibold">Year 2 (June 2027 - June 2028):</span> Tether Voice ships Q3 2027. Head of Growth hired Q3 2027. First network deal closes Q4 2027. 30-50 paid individual practices plus 1 network deal. Ending ARR: $1.5M to $3M. Trigger: Series A conversations begin late Year 2.</p>
          <p><span className="font-semibold">Year 3 (June 2028 - June 2029):</span> Multi-EHR live (ModMed plus athenaOne). Network analytics layer GA. 2-3 network deals at PE-backed organizations. 100-200 individual practices plus 3-5 network deals. Ending ARR: $8M to $15M.</p>
          <p><span className="font-semibold">Year 4 (June 2029 - June 2030):</span> Established category leadership on PCP outbound. Expansion into adjacent EHR markets. 5-8 major network deals. Ending ARR: $25M to $50M.</p>
          <p><span className="font-semibold">Year 5 (June 2030 - June 2031):</span> Network deals at scale dominating ARR composition. Practice-network analytics layer driving 20-30% of revenue. Ending ARR: $50M to $120M.</p>
          <p>These numbers are not promises. They are the operating plan we are building toward, with explicit assumptions baked in. The base case assumes we hit the milestones above. The downside case assumes we are 12-18 months slow on each. The upside case assumes one or two network deals come faster than projected (highly possible given pipeline activity).</p>
        </Prose>

        <Subhead>Customer acquisition by phase</Subhead>
        <Prose>
          <p><span className="font-semibold">Phase 1 · Founder-led concierge (now through Q1 2027).</span> Channel: Sach's network of concierge physicians from Georgetown and MedStar rotations. MDVIP and Castle Connolly affiliated docs introduced through Ravi's aunt and Lefevre referrals. Cost per customer: founder time only. Volume: 1-2 closed customers per month at the high end of effort. Limitation: founder-led sales does not scale past approximately 20 customers without a dedicated GTM hire. Sach is constrained by residency starting July 2026.</p>
          <p><span className="font-semibold">Phase 2 · Head of Growth and inbound (Q2 2027 onward).</span> Channel: Athena Marketplace inbound plus Head of Growth running concierge-network sales motion. MDVIP and SignatureMD partnership negotiation. Cost per customer: approximately $3K-$5K CAC. Volume: 3-5 closed customers per month after ramp.</p>
          <p><span className="font-semibold">Phase 3 · Enterprise and MSO direct (Q4 2027 onward).</span> Channel: Direct sales into PE-backed primary care networks. 4-9 month sales cycles. Cost per acquisition: approximately $30K to $50K per network deal. Payback period: under 6 months at $250K-$1M ARR per deal. Volume: 1-2 network deals per quarter at maturity.</p>
        </Prose>

        <Subhead>Unit economics by segment</Subhead>
        <DataTable
          headers={["", "Solo concierge", "Small group", "Network"]}
          rows={[
            ["ACV (full platform)", "$14.4K", "$13.5K – $45K", "$150K – $1M+"],
            ["CAC", "Founder time → $3-5K", "$5-10K", "$30-50K"],
            ["Gross margin", "~95%", "~95%", "~92% (custom integration)"],
            ["LTV (5-year, conservative churn)", "$54K – $72K", "$50K – $200K", "$750K – $5M"],
            ["LTV : CAC", "12x+ at maturity", "10x+ at maturity", "25x+"],
            ["Payback period", "1-2 months", "1-3 months", "3-6 months"],
          ]}
        />
        <Prose>
          <p>The unit economics work at every stage. The reason this is true is the customer's recovered-revenue ROI: customers who are net-positive 5-12x on subscription do not churn at venture-SaaS rates and do not require expensive customer success investment.</p>
        </Prose>
      </section>

      <section id="operations" className={sectionClass}>
        <SectionTitle kicker="06" title="Where we are operationally" />
        <Subhead>Product and engineering</Subhead>
        <Prose>
          <p>The agent runtime substrate shipped to the main code branch in May 2026. All safety mechanisms (budget enforcement, circuit breaker, PHI-strict logging, atomic persistence, L2 cache) are exercised against real production data and verified.</p>
          <p>Tether Referrals is in production. Variable cost per AI-generated referral is approximately $0.004 per invocation. Gross margin on every subscription is effectively the full subscription price.</p>
          <p>Historical referral audit is operational against real customer practices in production. Forward write-back to athenaOne is deploying this quarter, gated on athena scope provisioning at the ISC kickoff.</p>
        </Prose>

        <Subhead>Athena partnership</Subhead>
        <Prose>
          <p>athenahealth Partner Program agreement signed April 2026, including Platform Services API access. We are one of a limited number of partners with this level of integration access. ISC integration kickoff is pending scheduling with our assigned athena resource manager. The single technical ask we have at the kickoff is a three-scope provisioning ticket (Medication.rs, ServiceRequest.rs, DocumentReference.cu) across the Preview and Production athena apps.</p>
          <p>Athena Marketplace listing target Q3 2026. The listing exposes Tether to the approximately 162,000 providers on athenaOne and is a real inbound channel once it goes live with case study material.</p>
        </Prose>

        <Subhead>Design partners</Subhead>
        <Prose>
          <p><span className="font-semibold">Dr. Lefevre</span>, MDVIP concierge physician in Washington DC, has been using Tether daily in his practice. His historical referral audit is operational against his real athenaOne tenant. His practice is the source of our pre-Tether vs post-Tether time-savings baseline.</p>
          <p><span className="font-semibold">Ms. Davis</span>, who runs an independent primary care practice in Kentucky, is the second design partner. Her practice contributes a non-concierge baseline to our data.</p>
          <p>Both are on free founder pricing during the design partnership window. Conversion to paid pricing target Q4 2026.</p>
        </Prose>

        <Subhead>Team</Subhead>
        <Prose>
          <p><span className="font-semibold">Ravi Suresh, CTO.</span> Came from Scale AI customer-facing engineering. Built the production runtime substrate while still employed there. Full-time on Tether as of May 2026. Owns all technical surfaces: agent runtime, athena integration, infrastructure, data layer, AI inference architecture.</p>
          <p><span className="font-semibold">Sid Thakker, CEO.</span> Five years at CapM Advisory and Level Equity in private equity and growth investing. Full-time as of July 2026. Owns fundraising, GTM, partnerships, operations, customer development.</p>
          <p><span className="font-semibold">Sach Thakker, CMO.</span> Graduated Georgetown School of Medicine in May 2026, begins dermatology residency at MedStar in July 2026. Owns clinical credibility, concierge-physician network development, product clinical validation. Constrained by residency hours from July onward; the pre-seed Head of Growth hire is partly designed to address this constraint.</p>
          <p>The three have known each other for over a decade.</p>
        </Prose>

        <Subhead>The next 90 days</Subhead>
        <Prose>
          <ol className="m-0 list-decimal space-y-2 pl-5">
            <li>Athena ISC integration kickoff and scope provisioning ticket cleared.</li>
            <li>Write-back to athenaOne live in production for Dr. Lefevre.</li>
            <li>Athena Marketplace listing submitted for approval (Q3 2026 go-live target).</li>
            <li>First paid customer signed (target window August through October 2026).</li>
            <li>Outbound to concierge networks accelerating: Castle Connolly intro pipeline through Ravi's aunt, MDVIP intro pipeline through Dr. Lefevre, SignatureMD evaluation.</li>
            <li>Pre-Tether vs post-Tether billing baseline established with Dr. Lefevre's practice (TCM volume, follow-up visit volume, time per referral). This becomes the case study that anchors all subsequent investor and customer conversations.</li>
          </ol>
        </Prose>
      </section>

      <section id="capital" className={sectionClass}>
        <SectionTitle kicker="07" title="What capital unlocks" />
        <Subhead>The friends and family round ($75K-$100K at $3M post-money cap)</Subhead>
        <Prose>
          <p>Bridges to first paid customer revenue and pre-seed conversion. Funds five months of operations: HIPAA-compliant infrastructure, below-market founder draws for Ravi and Sid, legal templates for first customer contracts, cyber insurance, and contingency.</p>
          <p>This is the round currently active. Phase 1a is founder co-investment by early June 2026. Phase 1b is family and closest network late June through July 2026. Phase 1c is outside friends and family August through October 2026, gated on the first paid customer signing.</p>
        </Prose>

        <Subhead>The pre-seed round ($400K-$750K at $8M-$12M cap, target Month 8-14)</Subhead>
        <Prose>
          <p>This is the round that funds the bridge from launch product to full platform. Three uses of capital:</p>
          <p><span className="font-semibold">Product expansion to the full platform (approximately $30K-$50K).</span> Stedi paid integration for insurance eligibility (~$15K-$25K), Vapi voice product setup and agent design (~$15K-$25K), and the second engineering hire who ships these integrations and the multi-EHR adapters. This is the bridge from $600 launch pricing to $1,200 full-platform pricing, and from $15K-$20K early ACV to $20K-$35K mature ACV.</p>
          <p><span className="font-semibold">Head of Growth (approximately $180K-$240K annual including equity).</span> Senior GTM operator with healthcare software sales experience into PE-backed primary care networks, MSO platforms, and concierge organizations. Target hire Month 8-10. This is the single highest-leverage hire in the company because one network contract at 50-200 providers is equivalent to two years of founder-led practice-by-practice selling.</p>
          <p><span className="font-semibold">Second engineer (approximately $180K annual including equity).</span> Ships the Stedi and Vapi integrations, then the multi-EHR work. Frees Ravi to focus on runtime substrate and core platform.</p>
          <p>Remainder funds infrastructure scale (Supabase HIPAA tier expansion, Bedrock usage at higher volume), SOC 2 Type II certification (required for enterprise deals), legal infrastructure for network contracts, insurance scale-up.</p>
        </Prose>

        <Subhead>The Series A round (target $4M-$8M, Month 18-30)</Subhead>
        <Prose>
          <p>Funds the enterprise sales motion at scale. Multiple Head of Growth-class hires running parallel deal cycles. Full customer success function. Multi-EHR engineering capacity. Marketing function. This is the round that turns Tether from a 30-customer concierge software company into a network-tier primary care platform.</p>
        </Prose>
      </section>

      <section id="risk" className={sectionClass}>
        <SectionTitle kicker="08" title="Risk" />
        <Prose>
          <p>What can go wrong, and what we are doing about each.</p>
        </Prose>
        <div className="space-y-8">
          {RISKS.map((r) => (
            <div key={r.title}>
              <Subhead>{r.title}</Subhead>
              <ExitCallout>
                <p className="m-0 mb-3">{r.w}</p>
                <p className="m-0">
                  <span className="font-semibold">Mitigation: </span>
                  {r.m}
                </p>
              </ExitCallout>
            </div>
          ))}
        </div>
      </section>

      <section id="team" className={sectionClass}>
        <SectionTitle kicker="09" title="Why this team" />
        <Prose>
          <p>Three people, three surfaces of the company, ten years of relationship.</p>
          <p>Ravi is the technical conviction. He built the runtime substrate while still employed at Scale AI because he believed the platform thesis was correct. He covers every technical surface of Tether by himself and is one of the rare engineers who can credibly carry a healthcare-grade infrastructure platform without a co-founder engineer.</p>
          <p>Sid is the operating conviction. He has seen enough early-stage and growth-stage healthtech companies from the investor side (CapM Advisory, Level Equity) to know the difference between companies that look like they will scale and companies that actually will. He brings the discipline and the financial literacy that founder teams often lack.</p>
          <p>Sach is the clinical conviction. He is the only one of the three who lives in the actual healthcare system, who has rotated through concierge and primary care practices, who has personal relationships with the physicians we sell to. The credibility he brings to a sales conversation is something Tether cannot buy.</p>
          <p>The combination is rare and the relationships are durable. We have known each other for more than a decade.</p>
        </Prose>
      </section>

      <section id="ask" className={sectionClass}>
        <SectionTitle kicker="10" title="The ask" />
        <Prose>
          <p>This roadmap accompanies (does not replace) the separate friends and family investment memo, which contains the full SAFE terms, valuation cap methodology, fund allocation detail, dilution math, and illustrative return scenarios.</p>
        </Prose>
        <CalloutPanel className="mt-4">
          <p className="m-0 font-sans text-base leading-[1.7] text-memo-text">
            <span className="font-semibold">Current round:</span> $75K to $100K at $3M post-money cap, post-money SAFE (Y Combinator standard form), MFN, no discount, no interest, no maturity, converting at the next priced equity round. Suggested individual check range: $25K to $50K. Close window: June through October 2026.
          </p>
        </CalloutPanel>
        <Prose>
          <p>We are happy to walk through any section of this roadmap in detail, demonstrate the production runtime, or address specific questions on the revenue model, the path to scale, or the risk picture.</p>
          <p className="text-memo-text-secondary">
            <span className="font-semibold text-memo-text">Tether Health, June 2026. Confidential.</span>
          </p>
        </Prose>
      </section>
    </>
  );
}
