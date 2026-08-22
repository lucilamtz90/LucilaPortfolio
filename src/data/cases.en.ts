import placeholder from '../assets/images/project-placeholder.jpg';
import type { CaseData } from './types';

export const casesEn: CaseData[] = [
  {
    slug: 'dynamic-units',
    cardNumber: '01',
    cardCompany: 'Etsy',
    cardYear: '2023',
    cardTitle: 'Dynamic Units for Affiliates',
    cardMeta: 'Discovery to launch',
    cardType: 'B2B',
    heroMedia: placeholder,

    headerCompany: 'Etsy',
    headerYear: '2023',
    headerTitle: 'Dynamic Units: Turning Affiliates Into a Revenue Channel',
    headerStatus: 'Project launched to the US market',
    headerMeta: 'Discovery to launch',
    headerRole: 'Sr. Product Designer',

    sections: [
      {
        type: 'sectionTwoColumn',
        heading: 'Problem & Opportunity',
        body: "Etsy's Affiliate program — bloggers, social, and editorial creators earning commissions by promoting listings — had outgrown its first tool, Static Units. With no dedicated researcher on the project, my PM, PMM, and I proactively led the strategy and research plan ourselves: understand what was actually holding Affiliates back, then design a tool automated and flexible enough to grow the channel, without losing sight of real backend constraints already in motion at the engineering level.",
      },
      {
        type: 'processStep',
        heading: 'Facilitated a 2-day cross-functional workshop to align the team on vision',
        body: 'I organized and led a two-day workshop with Product, Marketing, Analytics, and Design to establish a shared vision, key needs, and goals for the tool. On Day 2, I ran a SCAMPER exercise to identify what to improve, modify, or retain from Static Units, then facilitated voting and affinity mapping to prioritize themes against our business pillars.',
        image: placeholder,
      },
      {
        type: 'processStepsRow',
        left: {
          heading: "Ran research from scratch, in the gap where a researcher should've been",
          body: 'With no dedicated researcher on the project, my PM, PMM, and I proactively led the research plan ourselves. I conducted 8 qualitative interviews with active Affiliates and fielded two surveys to 100+ Affiliates, then translated it all into an end-to-end journey map of real pain points and expectations — the foundation the whole design was built on.',
        },
        right: {
          heading: 'Benchmarked 6+ competitor programs before designing',
          body: "I audited more than six Affiliate programs, analyzing experience, usability, content, and visual design, and built a comparison matrix to speed up analysis — grounding my design decisions in what already worked (and didn't) elsewhere.",
        },
      },
      {
        type: 'processStep',
        heading: 'Designed for feasibility and delight, then carried it past the interface',
        body: 'I mapped the experience in happy-path diagrams to pressure-test it against real backend constraints, then refined the final UI across two versions — an MVP modal flow and a streamlined single-page flow — through iterative feedback, a legal compliance review, and close collaboration with my UX Writer on tone and voice.',
        body2:
          'I also led the launch email campaign strategy with Marketing, crafting illustrations and tailoring content per Affiliate tier with my UX Content partner, and built a lifecycle email plan to re-engage inactive Affiliates.',
      },
      { type: 'heroImage', image: placeholder },
      {
        type: 'impactResults',
        heading: 'Impact & results',
        stats: [
          {
            label: 'Adoption',
            value:
              '+$500k estimated revenue attributed to Dynamic Units, with +30k daily impressions and +10k daily visits to Etsy from active Units',
          },
          {
            label: 'Engagement',
            value:
              'Affiliates who adopted the new tool created 2.3x more widgets on average than they had with Static Units. Only 2 support tickets in the first week',
          },
        ],
      },
      {
        type: 'reflection',
        heading: "What I'd do differently",
        body: "Push earlier for a dedicated researcher on the project. I made it work by taking on research myself alongside my PM and PMM, but a project with this much revenue riding on it deserved research bandwidth that wasn't split three ways.",
      },
    ],
  },
  {
    slug: 'etsy-insider-rewards',
    cardNumber: '02',
    cardCompany: 'Etsy',
    cardYear: '2025',
    cardTitle: 'Etsy Insider — introducing Rewards',
    cardMeta: 'Ideation to hand-off',
    cardType: 'B2C',
    heroMedia: placeholder,

    headerCompany: 'Etsy',
    headerYear: '2025',
    headerTitle: 'Etsy Insider Rewards: Designing a New Benefit at Scale',
    headerStatus: 'Project launched to the US market',
    headerMeta: 'Ideation to hand-off',
    headerRole: 'Sr. Product Designer',

    sections: [
      {
        type: 'sectionTwoColumn',
        heading: 'Problem & Opportunity',
        body: "Etsy Insider's first cohort was stagnant — low-frequency buyers weren't returning. Phase 2 needed to introduce Rewards as an entirely new benefit, but where to place it was the real design challenge: I audited the existing experience to map possible integration points, then paired that with research on Phase 1's highest-converting moments to identify where buyers would actually value Rewards most — without disrupting flows that were already working. Beyond the new benefit itself, this meant refreshing sign-up prompts and content across every touchpoint in the buyer journey.",
      },
      {
        type: 'processStep',
        heading: 'Turned a competitive benchmark into the strategic recommendation',
        body: 'I audited and synthesized loyalty and rewards programs from other companies, distilling patterns in visual treatment, positioning, and experience design. That synthesis became my recommendation for how and where to introduce Rewards — giving my PM and marketing partners a clear, evidence-backed view of where the benefit could land with the most impact for buyers, and it set the priorities for everything that followed.',
        image: placeholder,
      },
      {
        type: 'processStepsRow',
        left: {
          heading: 'Built the roadmap backwards from the deadline',
          body: 'I led a 3.5-hour cross-functional planning session with engineering, marketing, and design systems leadership, prepping a FigJam board with calendars, sticky notes, and the PRDs my PM had shared — giving all of us shared visibility into what needed to launch, and surfacing the gaps and dependencies between teams. Working backwards from the deadline, we defined concrete milestones and action items, aligning on a sequenced plan across 4 external design partners.',
        },
        right: {
          heading: 'Turned one plan into 8 shipped projects',
          body: 'That planning session became the throughline for 8+ projects that together built Etsy Insider V2, including Rewards. With a clear roadmap in hand, my PM could plan confidently across other product teams, while I broke every project down into smaller tasks and began connecting with the other designers involved.',
        },
      },
      {
        type: 'processStepsRow',
        left: {
          heading: 'Validated the concept before scaling it',
          body: "I ran two rounds of usability testing — first to confirm buyers understood what Rewards actually offered, then to confirm the placements we'd chosen added value without breaking the surrounding experience. Testing shaped real changes to how and where Rewards appeared, from messaging clarity to positioning at high-conversion moments like cart and checkout.",
        },
        right: {
          heading: 'Scaled across 9 touchpoints, two platforms',
          body: 'From homepage to post-purchase email, I delivered cohesive flows for web and native, coordinated with the seller-side design owner for consistency.',
        },
      },
      {
        type: 'impactResults',
        heading: 'Impact & results',
        stats: [
          {
            label: 'Adoption & frequency',
            value: [
              '150k subscribers in 6 weeks',
              '+1.3% purchase frequency lift',
              '+40% repeat-purchase frequency among new and habitual members',
            ],
          },
          {
            label: 'User conversion sentiment',
            value: '20 of 25 follow-up research participants said the program lowered their barrier to buying',
          },
        ],
      },
      { type: 'heroImage', image: placeholder },
      {
        type: 'reflection',
        heading: "What I'd do differently",
        body: 'Move technical constraint discovery earlier — some ideal-state flows got compromised late because backend linkages surfaced mid-build rather than during definition.',
      },
    ],
  },
  {
    slug: 'checkout-errors',
    cardNumber: '03',
    cardCompany: 'Etsy',
    cardYear: '2026',
    cardTitle: 'Error handling at checkout',
    cardMeta: 'Definition to hand-off',
    cardType: 'B2C',
    heroMedia: placeholder,

    headerCompany: 'Etsy',
    headerYear: '2026',
    headerTitle: 'Checkout Errors: Turning Friction Into Recoverable Moments',
    headerStatus: 'Treatment experiments launched globally',
    headerMeta: 'Definition to hand-off',
    headerRole: 'Sr. Product Designer',

    sections: [
      {
        type: 'sectionTwoColumn',
        heading: 'Problem & Opportunity',
        body: "Checkout was full of outdated, inconsistent error experiences — over 10 high-traffic error types with no shared pattern, leaving buyers stuck and abandoning their carts at the worst possible moment. The ask wasn't just to fix individual errors, but to solve the underlying issue: there was no reusable system, so every error was being handled as a one-off. This became a large-scale experimentation workstream — each new design tested directly against the old, buggy experience, one error type at a time, rather than shipped on faith.",
      },
      {
        type: 'processStep',
        heading: 'Prioritized by real business impact, then grounded in technical reality',
        body: 'Analytics, my PM, and I prioritized the errors by recurring buyer failures and business impact. My tech lead then audited and delivered the full set of backend errors — a key handoff that let me quickly understand what was actually feasible to experiment with. From there, I built test accounts to experience every prioritized error myself, surfacing navigation patterns, bugs, and opportunities I could act on in the new design.',
        image: placeholder,
      },
      {
        type: 'processStep',
        heading: 'Built a system, not a set of screens',
        body: 'I defined three reusable primitives within the design system — Section Banner, In-line Message, and Input Validation — each with clear rules for when to use it, priority level, and tone of voice. This reduced technical implementation effort and increased consistency along the purchase journey, turning every future error into a matter of applying the right pattern, not designing from scratch.',
        image: placeholder,
      },
      {
        type: 'sectionTwoColumn',
        heading: 'Designed for calm recovery, not just clear errors',
        body: 'Working with my UX Content partner, I established clear rules and guidelines for tone and voice across error severity levels — spanning errors, warnings, and informational messages. I also defined seamless navigation patterns to help buyers recover faster in these high-friction moments.',
      },
      {
        type: 'impactResultsExperiments',
        heading: 'Impact & results after experimentation',
        experiments: [
          {
            label: 'Experiment #1',
            image: placeholder,
            title: 'Card Authentication: +1.7% conversion lift after 10 days',
            body: 'Usability and payment-friction enhancements such as clear content and dedicated UI components removed the need for high-intent buyers to manually re-enter an expired card reducing friction at critical purchase moments.',
          },
          {
            label: 'Experiment #2',
            image: placeholder,
            title: 'PayPal steering: +29% conversion lift after 15 days',
            body: 'When a card payment fails with an unlikely-to-succeed auth reason, steering buyers to PayPal in the decline message accelerated checkout completion and conversion, rather than showing a generic error or just manual retries.',
          },
        ],
        summary:
          'Both experiments were fully ramped to 100% of global buyers, with the remaining error types rolling out progressively through the same test-and-ship model.',
      },
      {
        type: 'toolCredit',
        lead: 'Explore the live demo I built:',
        url: 'https://error-demo.figma.site/',
      },
      { type: 'heroImage', image: placeholder },
      {
        type: 'reflection',
        heading: "What I'd do differently",
        body: "Involve engineering earlier to map technical constraints before finalizing design direction — some ideal-state solutions had to be scaled back mid-project once backend limitations surfaced, which cost us about a month on the timeline. Going forward, co-investigating technical constraints during definition (not after) is how I'd break down complex work like this into more accurate milestones.",
      },
    ],
  },
  {
    slug: 'rappi-card',
    cardNumber: '04',
    cardCompany: 'Rappi Card',
    cardYear: '2021',
    cardTitle: 'Reducing late payments',
    cardMeta: 'Discovery to hand-off',
    cardType: 'B2C',
    heroMedia: placeholder,

    headerCompany: 'Rappi Card',
    headerYear: '2021',
    headerTitle: 'Rappi Card: Reducing Late Payments Through Simpler Card Pay',
    headerStatus: 'Launched to Latin America customers',
    headerMeta: 'Discovery to hand-off',
    headerRole: 'Lead Product Designer',

    sections: [
      {
        type: 'sectionTwoColumn',
        heading: 'Problem & Opportunity',
        body: "Over 15% of RappiCard's global users were at risk of having their card blocked due to late payments — driven primarily by ineffective in-app communication, not an inability to pay. Live usability sessions surfaced real friction in the payment flow itself: poor information hierarchy and inconsistent UI components made simple tasks, like selecting or entering a payment amount, unnecessarily hard.",
      },
      {
        type: 'processStep',
        heading: 'Close collaboration with CX surfaced the same story from a different angle',
        body: 'I ran a workshop with lead CX staff and my researcher to dig into ticket volume, investigate the underlying frictions, and prioritize them into concrete action items — surfacing a high volume of support tickets tied directly to complaints about the payment flow and confusion over financial terminology, a gap that hit hardest for buyers less familiar with credit and finance concepts.',
        body2:
          'Together, these signals pointed to three priority areas: clearer payment-cycle communication, a more usable payment flow, and better-timed in-app reminders.',
        image: placeholder,
      },
      {
        type: 'processStepsRow',
        left: {
          heading: 'Selected components for familiarity, not friction',
          body: 'I carefully audited and selected components that felt familiar to users within complex payment flows — moving away from a slider in favor of buttons, dropdowns, and tooltips, patterns users already knew how to read at a glance.',
          body2: 'The goal: help users complete their task naturally, with as little friction as possible.',
        },
        right: {
          heading: 'Designed one system flexible enough for two currencies',
          body: 'While the UI and flow were shared across iOS and Android, each country brought its own complexity — Peru especially, where consumers commonly pay in both dollars and soles. Rather than building country-specific variants, I designed the interface to absorb these currency nuances natively, so it could scale across markets without breaking the UI or adding flow complexity.',
          body2:
            'That flexibility paid off at launch: because the system already accounted for multi-currency cases, engineering effort to ship it was meaningfully reduced.',
        },
      },
      { type: 'heroImage', image: placeholder },
      {
        type: 'extendedNarrative',
        heading: 'Extended tone and voice into a cross-channel system',
        body: "The content direction I led with my UX Content partner didn't stop at in-app messaging — it extended to CRM reminders, FAQs, and off-app touchpoints like landing pages and social media. I audited every touchpoint tied to payment reminders and credit card status, giving my partners the full view of the credit-payment journey.\n\nWith CX helping identify where terminology broke down for users, we built a single tone-and-voice guide so app, web, and support all spoke the same language. This sat outside the core redesign's scope, but I saw how much it mattered to the experience as a whole and pushed to lead it as a related, parallel workstream.",
      },
      { type: 'heroImage', image: placeholder },
      {
        type: 'impactResults',
        heading: 'Impact & results',
        stats: [
          {
            label: 'Usability & Adoption',
            value: [
              'Usability testing showed strong acceptance of the new experience, with remaining feedback focused mainly on content clarity rather than structure',
              'The redesign shipped to an initial 10k-user test group in Mexico as a phased rollout',
              'In the following month, customer support saw a meaningful drop in payment-related inquiries — a strong signal that the redesign reduced real user confusion, not just tested well in a lab',
            ],
          },
        ],
      },
      {
        type: 'toolCredit',
        lead: 'Explore the Figma prototype:',
        url: 'https://error-demo.figma.site/',
      },
      {
        type: 'reflection',
        heading: "What I'd do differently",
        body: 'Push harder for hard conversion/late-payment metrics to be instrumented before launch — the qualitative and support-ticket signals were compelling, but a project this cross-functional deserved a clearer quantitative through-line from problem to result.',
      },
    ],
  },
];
