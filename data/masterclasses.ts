export interface MasterclassData {
  title: string;
  description: string;
  highlights: {
    icon: string;
    label: string;
    value: string;
  }[];
  schedule: {
    day: string;
    dateLabel: string;
    title: string;
    description: string;
    sessions: {
      type: "session" | "workshop" | "qna" | "bonus" | "graduation";
      text: string;
    }[];
  }[];
}

export const masterclasses: Record<string, MasterclassData> = {
  "digital-marketing": {
    title: "7-DAY LIVE DIGITAL MARKETING MASTERCLASS",
    description: "This intensive 7-day live masterclass is designed as a complete overview and rapid implementation experience — covering the full diploma curriculum in a concentrated, high-energy format. Each day is a standalone module with live sessions, Q&A, and action workshops.",
    highlights: [
      {
        icon: "Clock",
        label: "Format",
        value: "7 Days × 8 Hours = 56 Hours Live"
      },
      {
        icon: "Users",
        label: "Format",
        value: "Live Teaching + Q&A + Workshops"
      },
      {
        icon: "GraduationCap",
        label: "Outcome",
        value: "Ready to Launch Live Campaigns"
      }
    ],
    schedule: [
      {
        day: "01",
        dateLabel: "Monday",
        title: "Marketing Mindset + World-Class Frameworks",
        description: "The theoretical foundation that separates average marketers from market leaders",
        sessions: [
          { type: "session", text: "Session 1 (AM): Digital marketing landscape — why most businesses fail online" },
          { type: "session", text: "The Consumer Psychology Framework: How buyers really think and decide" },
          { type: "session", text: "Alex Hormozi Framework: The Value Equation, Grand Slam Offer, and pricing psychology" },
          { type: "session", text: "Finding your Starving Crowd — audience research and market validation" },
          { type: "session", text: "Seth Godin's Purple Cow: The Remarkability Test for your business" },
          { type: "session", text: "Session 2 (PM): Al Ries & Jack Trout — The 10 most critical laws of marketing for digital" },
          { type: "session", text: "Russell Brunson's Dream Customer Avatar and the Dream 100 Strategy" },
          { type: "session", text: "Hook, Story, Offer — the universal framework behind all successful marketing" },
          { type: "workshop", text: "LIVE WORKSHOP: Participants write their own Hook, Story, and Offer" },
          { type: "qna", text: "Q&A: Apply the frameworks to real businesses in the room" }
        ]
      },
      {
        day: "02",
        dateLabel: "Tuesday",
        title: "UX Psychology + Landing Page Mastery",
        description: "Turn your website into a conversion machine using science and psychology",
        sessions: [
          { type: "session", text: "Session 1 (AM): Consumer psychology deep dive — how the brain processes digital content" },
          { type: "session", text: "The Above-the-Fold Law: What visitors decide in 3 seconds" },
          { type: "session", text: "The 5-Second Test: Does your page pass or fail?" },
          { type: "session", text: "Cognitive Load, Hick's Law, and Fitts's Law applied to page design" },
          { type: "session", text: "The complete 8-section high-converting landing page layout" },
          { type: "session", text: "Session 2 (PM): Copywriting fundamentals for landing pages" },
          { type: "session", text: "Headline formulas that stop the scroll and trigger action" },
          { type: "session", text: "Social proof psychology: How to use reviews, numbers, and credibility signals" },
          { type: "session", text: "The guarantee and risk reversal — converting fence-sitters into buyers" },
          { type: "workshop", text: "LIVE WORKSHOP: Participants wireframe their own landing page from scratch" },
          { type: "qna", text: "Review and critique: Live feedback on participant landing pages" }
        ]
      },
      {
        day: "03",
        dateLabel: "Wednesday",
        title: "Google Ads Mastery",
        description: "Full Google Ads setup, strategy, conversion tracking, and competition research",
        sessions: [
          { type: "session", text: "Session 1 (AM): Google Ads account structure and campaign types overview" },
          { type: "session", text: "Keyword research live: Finding high-intent, high-ROI keywords in any niche" },
          { type: "session", text: "Search campaign setup: Match types, Ad groups, Quality Score optimization" },
          { type: "session", text: "Writing high-CTR Google ad copy with proven formulas" },
          { type: "session", text: "Bidding strategies: Target CPA, Target ROAS, Maximize Conversions" },
          { type: "session", text: "Session 2 (PM): Google Tag Manager setup for conversion tracking (live demo)" },
          { type: "session", text: "GA4 + GTM integration and Prisma for advanced attribution" },
          { type: "session", text: "Google Ads Transparency Center — live competition analysis workshop" },
          { type: "session", text: "AdSense overview for publishers building content businesses" },
          { type: "workshop", text: "LIVE WORKSHOP: Participants set up their first Google Search campaign" },
          { type: "qna", text: "Q&A: Budget allocation, scaling, and troubleshooting common issues" }
        ]
      },
      {
        day: "04",
        dateLabel: "Thursday",
        title: "Meta Ads & Creative Strategy",
        description: "Facebook and Instagram advertising from beginner to advanced in one day",
        sessions: [
          { type: "session", text: "Session 1 (AM): Meta Ads Manager structure — Campaigns, Ad Sets, Ads" },
          { type: "session", text: "Campaign objectives: When to use Traffic, Leads, Conversions, or Sales" },
          { type: "session", text: "Audience strategy: Core → Custom → Lookalike audience stacking" },
          { type: "session", text: "The Meta Pixel: Installation, event setup, and conversion tracking" },
          { type: "session", text: "Retargeting strategy: Building your warm audience funnel" },
          { type: "session", text: "Session 2 (PM): Ad Creative Workshop" },
          { type: "session", text: "Hook types for Meta: Pattern interrupt, Bold claims, Emotional triggers, Social proof hooks" },
          { type: "session", text: "Video vs. Image vs. Carousel vs. Reels — when each format wins" },
          { type: "session", text: "Writing high-converting primary text and headlines for Meta" },
          { type: "session", text: "Meta Ads Library: Live competition analysis and creative research" },
          { type: "workshop", text: "LIVE WORKSHOP: Participants create and launch their first Meta ad" },
          { type: "qna", text: "CBO vs. ABO: Scaling strategies for profitable campaigns" }
        ]
      },
      {
        day: "05",
        dateLabel: "Friday",
        title: "Lead Nurturing, CRM & Retargeting Systems",
        description: "Build automated systems that convert cold leads into loyal customers on autopilot",
        sessions: [
          { type: "session", text: "Session 1 (AM): Email marketing fundamentals and the 5-touch welcome sequence" },
          { type: "session", text: "Email copywriting: Subject lines, body structure, CTAs that convert" },
          { type: "session", text: "Segmentation strategy: Tagging leads for personalised follow-up" },
          { type: "session", text: "WhatsApp Business API: Setup, automations, and broadcast campaigns" },
          { type: "session", text: "CRM pipeline design: Lead stages, scoring, and hand-off to sales" },
          { type: "session", text: "Session 2 (PM): Retargeting campaign strategy and setup" },
          { type: "session", text: "Google Display retargeting: Creative strategy and audience layering" },
          { type: "session", text: "Meta retargeting sequences: The 7-touch follow-up framework" },
          { type: "session", text: "Cross-platform retargeting: Coordinating Google + Meta + Email for maximum reach" },
          { type: "session", text: "Follow-up call scripts: What to say when a lead raises their hand" },
          { type: "workshop", text: "LIVE WORKSHOP: Build a complete 5-email welcome sequence" },
          { type: "qna", text: "Q&A: CRM tool selection, automation setup, and common mistakes" }
        ]
      },
      {
        day: "06",
        dateLabel: "Saturday",
        title: "SEO, AEO, GEO & AIO — The Full Organic Playbook",
        description: "Dominate organic search across Google, voice, AI engines, and the future web",
        sessions: [
          { type: "session", text: "Session 1 (AM): SEO fundamentals — How Google ranks content in 2025 and beyond" },
          { type: "session", text: "Keyword research and search intent: Finding the words buyers actually use" },
          { type: "session", text: "On-Page SEO: The complete optimisation checklist for any page" },
          { type: "session", text: "Technical SEO essentials: Speed, Core Web Vitals, mobile, and structured data" },
          { type: "session", text: "Local SEO: Google Business Profile and dominating \"near me\" searches" },
          { type: "session", text: "Session 2 (PM): Beyond traditional SEO" },
          { type: "session", text: "AEO: How to win Featured Snippets and People Also Ask boxes" },
          { type: "session", text: "GEO: Optimising for ChatGPT, Perplexity, Claude, and AI-powered search" },
          { type: "session", text: "AIO: Building brand authority so AI recommends you as the answer" },
          { type: "session", text: "E-E-A-T deep dive: Building the signals that both Google and AI trust" },
          { type: "workshop", text: "LIVE WORKSHOP: Participants conduct a full SEO audit of their own website" },
          { type: "session", text: "Content strategy session: Building a 90-day organic traffic plan" }
        ]
      },
      {
        day: "07",
        dateLabel: "Sunday",
        title: "AI-Powered Marketing + Capstone Action Plan",
        description: "Integrate AI into your workflow and leave with a complete 30-day marketing plan",
        sessions: [
          { type: "session", text: "Session 1 (AM): AI for marketers — the tools, the workflow, and the future" },
          { type: "session", text: "ChatGPT mastery: Prompting frameworks for strategy, copy, and analysis" },
          { type: "session", text: "Claude for marketing: Long-form content, brand voice, and research" },
          { type: "session", text: "AI ad creative: Tools that generate and test creatives automatically" },
          { type: "session", text: "AI for campaign analysis: Turning raw data into actionable insights" },
          { type: "session", text: "Session 2 (PM): CAPSTONE STRATEGY SESSION" },
          { type: "session", text: "Participants present their 30-day marketing plan for live feedback" },
          { type: "session", text: "Full campaign blueprint: Offer → Landing Page → Google Ads → Meta Ads → Email" },
          { type: "session", text: "Competition analysis live: Using Google and Meta Transparency Centers" },
          { type: "session", text: "Budget allocation strategy: How to distribute ad spend for maximum ROI" },
          { type: "bonus", text: "BONUS: AI tools demonstration — Live prompt engineering for marketing copy" },
          { type: "graduation", text: "GRADUATION: Certificates, Q&A, and next steps for diploma programme" }
        ]
      }
    ]
  }
};
