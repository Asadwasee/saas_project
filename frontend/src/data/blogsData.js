export const blogsData = [
  {
    id: 1,
    slug: 'ai-automation-2025',
    title: 'The State of AI Automation in 2025',
    category: 'AI',
    author: 'Aria Voss',
    date: 'Jan 14, 2025',
    readTime: '6 min read',
    excerpt:
      'Large language models have moved from demo to production. Here is what that shift means for automation teams shipping real products in 2025.',
    content: `
      <p>The hype cycle has passed. In 2025, AI automation is no longer a competitive advantage — it's table stakes. Teams that haven't integrated LLM-powered workflows into their stack are already behind.</p>
      <h3>From Proof-of-Concept to Production</h3>
      <p>The biggest shift we've seen is the move from "let's try this in a sandbox" to "this runs 98 million times a month in production." That's a fundamentally different set of engineering challenges: latency, reliability, fallback logic, observability.</p>
      <h3>The Reliability Problem</h3>
      <p>LLMs are probabilistic. Your ETL pipeline is not. Bridging that gap — making non-deterministic outputs fit into deterministic workflows — is the core engineering problem of 2025.</p>
      <h3>What Smart Teams Are Doing</h3>
      <p>The best teams are building a thin, reliable orchestration layer between their deterministic business logic and their AI components. They treat the AI as a smart sub-process, not as the orchestrator.</p>
    `,
    tags: ['AI', 'Automation', '2025']
  },
  {
    id: 2,
    slug: 'saas-pricing-psychology',
    title: 'SaaS Pricing Psychology: Why Anchoring Works',
    category: 'Growth',
    author: 'Carlos Mbeki',
    date: 'Jan 28, 2025',
    readTime: '5 min read',
    excerpt:
      "Three-tier pricing isn't just convention — it's applied behavioral economics. Here's the science behind why your middle plan always wins.",
    content: `
      <p>Walk through any SaaS pricing page and you'll see the same pattern: three tiers, a highlighted "Most Popular" middle plan, and a top-tier that seems almost too expensive.</p>
      <h3>The Goldilocks Effect</h3>
      <p>Humans are bad at evaluating absolute value but excellent at relative comparison. When you see a $19, $49, and $129 plan, the $49 plan feels "just right" — even if the $19 plan covers your actual needs.</p>
      <h3>Decoy Pricing</h3>
      <p>The expensive tier isn't meant to sell. It's the decoy that makes the middle tier look reasonable. Remove the top tier and conversion to the middle tier drops significantly.</p>
      <h3>Implication for Your Pricing Page</h3>
      <p>Make the decoy tier genuinely impressive. If customers see through the anchoring, they'll pick the bottom tier. The decoy only works if it looks like a real option.</p>
    `,
    tags: ['Growth', 'Pricing', 'Psychology']
  },
  {
    id: 3,
    slug: 'building-realtime-dashboard',
    title: 'Building a Real-Time Dashboard Without Pain',
    category: 'Engineering',
    author: 'Liam Osei',
    date: 'Feb 4, 2025',
    readTime: '8 min read',
    excerpt:
      "WebSockets, SSE, or polling? Here's how we cut dashboard latency from 12 seconds to under 800ms — and what we'd do differently.",
    content: `
      <p>Real-time dashboards are deceptively hard. They look simple in demos but fall apart at scale. Here's what we learned rebuilding ours from scratch.</p>
      <h3>Why We Abandoned WebSockets</h3>
      <p>WebSockets introduce stateful connections. At 10K concurrent users, managing connection state becomes a distributed systems problem. We switched to Server-Sent Events (SSE) and our infra costs dropped by 40%.</p>
      <h3>Smart Polling as a Fallback</h3>
      <p>SSE doesn't work everywhere. We implemented an adaptive polling fallback that starts at 3s intervals and backs off exponentially if the server is under load.</p>
      <h3>The Rendering Bottleneck</h3>
      <p>Getting data fast is half the battle. Rendering 1,000 chart updates per second without janking the UI requires virtualization, requestAnimationFrame batching, and careful component memoization.</p>
    `,
    tags: ['Engineering', 'Frontend', 'Performance']
  },
  {
    id: 4,
    slug: 'design-systems-at-scale',
    title: 'Design Systems at Scale: Lessons from 3 Years',
    category: 'Design',
    author: 'Nadia Petrov',
    date: 'Feb 18, 2025',
    readTime: '7 min read',
    excerpt:
      "We've rebuilt our design system twice. Here's everything we got wrong the first time and how the second version actually stuck.",
    content: `
      <p>Design systems fail for organizational reasons, not technical ones. Our first attempt collapsed not because the components were bad, but because nobody owned them.</p>
      <h3>The Ownership Problem</h3>
      <p>A design system without a dedicated owner is a cemetery. Components get forked, diverge, and slowly die. You need a team — even one person — whose job is the system, not the product built on top of it.</p>
      <h3>Documentation Over Components</h3>
      <p>Counter-intuitive but true: the documentation matters more than the components. A mediocre component with great docs gets adopted. A great component with no docs gets ignored.</p>
      <h3>Version It Like Software</h3>
      <p>Semantic versioning for design systems is non-negotiable. Breaking changes must be major versions. Teams need to opt in to updates, not have them pushed on them.</p>
    `,
    tags: ['Design', 'Systems', 'Figma']
  },
  {
    id: 5,
    slug: 'zero-trust-for-startups',
    title: 'Zero-Trust Security for Startups (Without the Pain)',
    category: 'Security',
    author: 'Priya Anand',
    date: 'Mar 1, 2025',
    readTime: '6 min read',
    excerpt:
      "Zero-trust doesn't require a 50-person security team. Here's a pragmatic path to better security for a 15-person startup.",
    content: `
      <p>Zero-trust gets marketed as an enterprise initiative. It doesn't have to be. The core principle — verify every request, trust nothing by default — is actually simpler to implement than the traditional "castle and moat" model.</p>
      <h3>Start With Identity</h3>
      <p>Every security posture starts with identity. Use a modern IdP (Okta, Auth0, or WorkOS), enforce MFA everywhere, and audit access quarterly. This alone closes 80% of common attack vectors.</p>
      <h3>Least Privilege by Default</h3>
      <p>Your developers should not have production database access by default. Your intern should not have admin access to your CI/CD pipeline. Least privilege is uncomfortable but non-negotiable.</p>
      <h3>Audit Logs Before You Need Them</h3>
      <p>The worst time to implement audit logging is after a breach. Set up immutable logs from day one. CloudTrail, Datadog, or even a simple append-only database table. Just do it.</p>
    `,
    tags: ['Security', 'Startup', 'Zero-Trust']
  },
  {
    id: 6,
    slug: 'api-rate-limiting',
    title: 'API Rate Limiting: Patterns That Actually Work',
    category: 'Engineering',
    author: 'Yuki Tanaka',
    date: 'Mar 10, 2025',
    readTime: '7 min read',
    excerpt:
      "Token bucket, sliding window, or fixed counter? We tested all three under production load. Here's what survived.",
    content: `
      <p>Rate limiting is one of those things that seems simple until you have to implement it correctly at scale. Fixed counters are naive, leaky buckets have burst problems, and sliding windows are expensive. Here's what we found.</p>
      <h3>The Fixed Counter Problem</h3>
      <p>A 60 req/min fixed counter allows 120 requests in 2 seconds if timed right — 59 at the end of minute one and 61 at the start of minute two. This is the "thundering herd at the boundary" problem.</p>
      <h3>Why We Chose Sliding Window Log</h3>
      <p>More memory than fixed counters but eliminates boundary bursts entirely. Store each request timestamp in a Redis sorted set. Count entries within the window. Evict old entries on each request.</p>
      <h3>Graceful Degradation</h3>
      <p>Rate limiting should degrade gracefully. Return 429 with Retry-After headers. Separate rate limits by tier. Never apply the same limit to a free user and an enterprise customer.</p>
    `,
    tags: ['Engineering', 'API', 'Backend']
  }
]

export const categories = [
  'All',
  'AI',
  'Growth',
  'Engineering',
  'Design',
  'Security'
]
