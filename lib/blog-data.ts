export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  tags: string[]
  emoji: string
  accentColor: string
  content: string // HTML string
}

export const blogPosts: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────────────
  // POST 1 — AI Tech Stack
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'mern-to-ai-my-honest-learning-curve',
    title: 'From MERN to AI: My Honest Learning Curve into the LLM Stack',
    excerpt:
      'Nobody tells you how disorienting it is to go from confident full-stack dev to complete beginner — all in the same year. Here\'s what that actually looked like for me.',
    date: '2025-04-18',
    readTime: '8 min read',
    category: 'AI & LLM',
    tags: ['AI', 'LLM', 'RAG', 'LangChain', 'ChromaDB', 'Learning'],
    emoji: '🤖',
    accentColor: '#6c63ff',
    content: `
<p>I remember the exact moment I realized I needed to learn AI properly. It wasn't some grand epiphany. I was staring at a production bug in our Node.js backend, and my tech lead casually dropped — "we're adding an AI document search feature next sprint." I nodded. Cool. No problem.</p>

<p>Then I went home and Googled "how to add LLM to Node.js app." The results were a wall of academic papers, half-finished Medium posts, and Python tutorials. I had been writing MERN stack code for over two years at that point. I knew React, Express, MongoDB, deployment pipelines — the works. And suddenly I felt like a complete junior again.</p>

<h2>Why the Learning Curve Hits Differently</h2>

<p>The thing about learning the MERN stack is that each piece has a clear mental model. MongoDB stores data as documents, Express handles HTTP, React renders UI, Node runs JavaScript on the server. These concepts slot together intuitively.</p>

<p>AI/LLM engineering doesn't work like that. The concepts — embeddings, vector similarity, context windows, hallucination, temperature, RAG pipelines — none of them have obvious real-world analogies if you're coming from traditional web dev. And the tooling moves so fast that a tutorial from eight months ago might reference an API that no longer exists.</p>

<p>Here's what actually worked for me, roughly in the order I tackled it:</p>

<h2>Step 1: Stop Thinking About "AI" and Start Thinking About Text</h2>

<p>The breakthrough for me was realising that at their core, LLMs are text-in, text-out machines. That's it. Once I stopped treating them as some magical oracle and started treating them like a very sophisticated string transformation function, the whole thing became less intimidating.</p>

<p>I started with the OpenAI API directly — no frameworks, no SDKs beyond the base client. Just sending a system prompt and a user message, reading the response. I built a tiny CLI tool that summarised text files. Embarrassingly simple. But it worked, and it demystified the "AI" part.</p>

<h2>Step 2: Understand Embeddings Before You Touch RAG</h2>

<p>RAG (Retrieval-Augmented Generation) was the first real feature I had to build at work. The idea sounds straightforward: instead of asking an LLM questions it might hallucinate answers to, you give it your own documents to reference. In practice, you need to understand why this works, and that means understanding embeddings.</p>

<p>An embedding is just a list of numbers (a vector) that represents a piece of text in high-dimensional space. Similar text has similar vectors. When a user asks a question, you embed their question and then search your document vectors for the closest matches. You then give those matching chunks to the LLM as context.</p>

<p>I spent a full weekend just playing with the OpenAI embeddings API, computing similarity scores between random sentences. It's honestly one of the more satisfying things to experiment with — you quickly develop an intuition for what "semantic similarity" actually means.</p>

<h2>Step 3: LangChain is Powerful but Learn the Primitives First</h2>

<p>LangChain gets a lot of hype and a lot of criticism. My honest take: it's incredibly useful once you understand what it's abstracting, and incredibly confusing if you jump straight in. I made the mistake of copy-pasting a LangChain RAG example and running it without understanding each piece. It worked. Then I needed to customise something and had no idea what to change.</p>

<p>Going back and building a simple RAG pipeline without LangChain — just raw API calls, a simple cosine similarity function, and my own chunking logic — was the best thing I did. When I returned to LangChain, everything clicked.</p>

<h2>Step 4: ChromaDB for Local Prototyping, Think About Production Early</h2>

<p>For vector storage, I started with ChromaDB running locally. It's Python-first but has a JavaScript client, and it's genuinely great for prototyping. You can have a working vector database in about ten lines of code.</p>

<p>But I learned a hard lesson: the data you store and the chunking strategy you use will make or break your retrieval quality. I spent probably two weeks iterating on chunk sizes, overlap strategies, and metadata filtering before I got results that felt production-worthy. Don't skip this part. Bad chunking = bad answers, no matter how good your LLM is.</p>

<h2>The Mindset Shift That Changed Everything</h2>

<p>About three months into this journey, something clicked. I stopped seeing LLM engineering as a separate discipline from web development and started seeing it as another layer of the stack. The database stores structured data. The vector store stores semantic relationships. The LLM is a reasoning layer. My API routes coordinate between them.</p>

<p>That reframe was everything. Suddenly I could design AI features the same way I'd design any backend system — thinking about data flow, latency, caching, error handling, observability. The "AI" part became just another integration.</p>

<h2>What I'd Tell Myself Six Months Ago</h2>

<ul>
  <li><strong>Start with the API directly.</strong> Don't touch a framework until you've built something from scratch.</li>
  <li><strong>Embeddings are the foundation.</strong> You can't understand RAG without understanding them.</li>
  <li><strong>Chunking strategy matters more than you think.</strong> It's the unsexy part that determines quality.</li>
  <li><strong>LangChain is a tool, not a replacement for understanding.</strong> Learn the primitives first.</li>
  <li><strong>The learning curve is real but it plateaus.</strong> The first month feels impossible. The third month feels almost familiar.</li>
</ul>

<p>If you're a MERN developer thinking about getting into AI engineering — start today. Not because it's easy, but because the mental model you already have (APIs, data transformation, async operations, user-facing products) gives you a massive head start that most Python-first ML engineers don't have.</p>

<p>The hardest part isn't the technology. It's tolerating being a beginner again. Do it anyway.</p>
    `.trim(),
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // POST 2 — NestJS vs Express
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'nestjs-vs-express-why-i-made-the-switch',
    title: 'Why I Switched from Express.js to NestJS (And When You Shouldn\'t)',
    excerpt:
      'Express.js built the modern Node.js ecosystem. NestJS is what happens when a large TypeScript codebase outgrows it. Here\'s the real comparison — no hype, no gatekeeping.',
    date: '2025-03-07',
    readTime: '7 min read',
    category: 'Backend',
    tags: ['NestJS', 'Express', 'Node.js', 'TypeScript', 'Architecture'],
    emoji: '🏗️',
    accentColor: '#00d4aa',
    content: `
<p>I have a lot of respect for Express.js. It's the reason the Node.js ecosystem became what it is. Minimal, flexible, fast. When I was learning backend development, Express was the first thing that made me feel like I understood how web servers actually work.</p>

<p>But after working on a production codebase with three developers, dozens of routes, multiple authentication strategies, and a growing test suite — I started to feel the friction. Not because Express is bad, but because our codebase had outgrown what Express was designed for.</p>

<p>Let me walk you through what actually changes when you move to NestJS, and be honest about when it's not worth it.</p>

<h2>The Problem with Express at Scale</h2>

<p>Express gives you a blank canvas. That's its greatest strength and its biggest weakness on a growing team. Every Express codebase I've seen beyond a certain size develops its own conventions — how routes are organised, how middleware is applied, how services are injected, how errors are handled. These conventions are usually reasonable, but they're invented locally, not inherited from a shared understanding.</p>

<p>When a new developer joins, there's no "Express way" to learn. There's your team's way. And your team's way is documented in comments, tribal knowledge, and hope.</p>

<p>NestJS is opinionated about all of this. Controllers, services, modules, providers, guards, interceptors, pipes — these are defined concepts. A developer who knows NestJS can read your code without needing a tour.</p>

<h2>Dependency Injection Changed How I Think About Code</h2>

<p>This was the single biggest shift. In Express, I was either importing dependencies directly (tight coupling) or passing them through function arguments or a custom container. Both approaches work, but they require discipline.</p>

<p>NestJS's DI system is first-class. You declare what a service needs in its constructor, and the framework provides it. Testing becomes dramatically simpler because you can inject mock implementations without changing the production code at all.</p>

<p>Here's a simple example of what this looks like in practice:</p>

<pre><code>// NestJS service
@Injectable()
export class DocumentService {
  constructor(
    private readonly vectorStore: VectorStoreService,
    private readonly llm: LLMService,
  ) {}

  async search(query: string) {
    const chunks = await this.vectorStore.similaritySearch(query)
    return this.llm.generateAnswer(query, chunks)
  }
}
</code></pre>

<p>Testing this means creating a mock <code>VectorStoreService</code> and a mock <code>LLMService</code> and injecting them. No monkey-patching, no module mocking gymnastics. Just dependency injection doing its job.</p>

<h2>TypeScript as a First-Class Citizen</h2>

<p>You can use TypeScript with Express, and many teams do. But Express was designed for JavaScript, and TypeScript feels bolted on — you're adding types to a system that wasn't built around them.</p>

<p>NestJS was built for TypeScript. Decorators, interfaces, enums — they're how you configure the framework, not just how you annotate your code. Your route handlers automatically validate request bodies through class-validator DTOs. Your Swagger documentation generates itself from your types. The type safety permeates the architecture.</p>

<h2>The Module System Enforces Good Architecture</h2>

<p>Every feature in NestJS lives in a module. A module declares what it provides (services, controllers) and what it imports (other modules). This creates clear boundaries between features and makes it obvious what depends on what.</p>

<p>In a large Express app, these boundaries are managed through folder structure and developer discipline. In NestJS, they're enforced by the framework. You literally cannot use a service from another module unless you've explicitly imported that module and exported the service. It's a constraint that catches architectural mistakes before they compound.</p>

<h2>When You Absolutely Should NOT Switch</h2>

<p>Here's where I'll push back on the NestJS hype:</p>

<ul>
  <li><strong>Side projects and prototypes.</strong> The overhead of modules, decorators, and abstractions slows you down when you're just trying to validate an idea. Reach for Express or even Fastify.</li>
  <li><strong>Simple CRUD APIs.</strong> If your backend is three endpoints and a database connection, NestJS is overkill. The complexity ceiling you're worried about isn't anywhere close.</li>
  <li><strong>Microservices under 500 lines.</strong> Small, focused services don't need the architectural scaffolding NestJS provides. They need to be small and focused.</li>
  <li><strong>Teams unfamiliar with TypeScript.</strong> NestJS without TypeScript knowledge is painful. Don't add two learning curves at once.</li>
</ul>

<h2>My Actual Recommendation</h2>

<p>Learn Express first. Truly learn it — build an API without tutorials, understand the middleware chain, implement authentication from scratch. That understanding will make you a better NestJS developer when you eventually make the move.</p>

<p>Move to NestJS when your team has more than two backend developers, when your API has more than twenty endpoints, or when you find yourself writing the same architectural conventions in every new project. At that point, the abstraction overhead pays off immediately.</p>

<p>The framework choice matters much less than people argue about online. The discipline of clean architecture matters. NestJS just makes that discipline easier to maintain at scale.</p>
    `.trim(),
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // POST 3 — Admin Dashboard Security
  // ─────────────────────────────────────────────────────────────────────────────
  {
    slug: 'admin-dashboard-5-security-features-you-cant-skip',
    title: '5 Security Features Every Admin Dashboard Needs in 2025',
    excerpt:
      'Admin panels are the highest-value targets in any web application. These five features aren\'t optional extras — they\'re the baseline. Build them in from day one.',
    date: '2025-01-29',
    readTime: '6 min read',
    category: 'Security',
    tags: ['Security', 'Admin Dashboard', 'RBAC', 'Authentication', 'Node.js'],
    emoji: '🔐',
    accentColor: '#f59e0b',
    content: `
<p>Admin dashboards are where your most sensitive data lives. User records, financial transactions, system configuration, access controls — it's all there. And because admin panels are often built quickly, by developers under feature pressure, they end up being the least security-hardened part of an application.</p>

<p>I've built admin panels for healthcare platforms and fintech applications. The security requirements in those contexts aren't optional. Here are the five features I now consider non-negotiable in every admin dashboard I build, regardless of industry.</p>

<h2>1. Role-Based Access Control (RBAC) — Not Just "isAdmin"</h2>

<p>The most common mistake I see is a single boolean <code>isAdmin</code> flag on a user record. You're either an admin or you're not. This works fine until your "admin" team has different people doing different jobs — a customer support rep shouldn't be able to delete database records, and a content editor shouldn't be able to modify billing settings.</p>

<p>Proper RBAC means defining roles with specific permissions, then assigning users to roles. Something like:</p>

<pre><code>const roles = {
  SUPPORT: ['users:read', 'tickets:read', 'tickets:write'],
  EDITOR: ['content:read', 'content:write'],
  FINANCE: ['billing:read', 'billing:write', 'reports:read'],
  SUPERADMIN: ['*'], // all permissions
}
</code></pre>

<p>Every protected route checks for the specific permission it requires, not just whether the user is logged in as an admin. On the backend, this is a middleware check. On the frontend, it controls whether menu items and buttons are rendered at all.</p>

<p>Principle of least privilege: every admin user should have exactly the access they need to do their job, and nothing more.</p>

<h2>2. Immutable Audit Logs</h2>

<p>Every action in an admin panel should be logged: who did what, to which record, at what time, from which IP address. This isn't just for security forensics after an incident — it's also your compliance paper trail and your debugging tool when something goes wrong and you need to understand what happened.</p>

<p>The key word is <em>immutable</em>. Audit logs should be append-only. No admin, including super admins, should be able to edit or delete log entries. Consider writing logs to a separate database, or a write-only storage service, from day one.</p>

<p>At minimum, log: user login/logout, failed login attempts, any record creation/update/deletion, permission changes, and configuration updates. Log the before and after state for mutations — "changed billing status from active to cancelled" is infinitely more useful than "updated user".</p>

<h2>3. Multi-Factor Authentication with Session Management</h2>

<p>Admin accounts should always require MFA. A leaked password should not be sufficient to access your admin panel. TOTP (Time-based One-Time Passwords, the kind Google Authenticator uses) is the minimum bar. For high-security environments, hardware security keys (WebAuthn/FIDO2) are worth the implementation complexity.</p>

<p>Equally important: session management. Admin sessions should have shorter TTLs than regular user sessions. Force re-authentication for sensitive operations (deleting records, changing permissions, exporting data). Implement session invalidation so you can immediately revoke access when an employee leaves or when suspicious activity is detected.</p>

<p>Keep a session registry — a table of active sessions with device info and last-seen timestamps. Give admins a "sign out all devices" button. Implement automatic session expiry after inactivity. These aren't hard to build and they dramatically limit the blast radius of a compromised account.</p>

<h2>4. Rate Limiting and Anomaly Detection</h2>

<p>Admin panels are targeted by credential-stuffing attacks because the payoff is high. Rate limit everything: login attempts, API calls, password resets, MFA code submission. Be aggressive — five failed login attempts should trigger a cooldown, not fifty.</p>

<p>Beyond basic rate limiting, build simple anomaly detection:</p>

<ul>
  <li>Alert on login from a new geographic location or device.</li>
  <li>Flag bulk operations (deleting 100 records in 30 seconds should require confirmation and generate an alert).</li>
  <li>Monitor for access pattern changes — an account that suddenly starts hitting export endpoints it's never touched deserves a second look.</li>
  <li>Temporarily lock accounts after repeated failures and notify the account owner.</li>
</ul>

<p>None of this requires sophisticated ML. A few database queries and a notification hook covers 90% of real-world attack patterns.</p>

<h2>5. Input Validation, Output Encoding, and Query Safety</h2>

<p>Admin panels often have the most powerful data manipulation interfaces in an application — bulk edit forms, raw query tools, file upload handlers. These are also the highest-risk inputs.</p>

<p>Validate everything server-side, even if you're also validating on the client. Never trust that a request came from your admin UI. Use parameterised queries or a proper ODM/ORM that prevents injection attacks — if you're using MongoDB, never pass raw user input directly into a query object. If you're building any kind of query builder interface, whitelist allowed fields and operators explicitly.</p>

<p>Output encoding matters too. If your admin panel renders user-generated content (support tickets, user profile data, submitted forms), sanitise it before rendering. Stored XSS through an admin panel is particularly dangerous because admin users have elevated privileges — an attacker who can inject a script that runs in your admin's browser can do significant damage.</p>

<h2>Start with Security, Not with Features</h2>

<p>The honest reason admin dashboards end up insecure is that security work is invisible when it works. Nobody files a bug report saying "great, I was not hacked today." Features ship, deadlines hit, and security gets deferred.</p>

<p>The five things above aren't advanced security engineering. They're the baseline that any production admin panel should have before it touches real user data. Build them in from sprint one. They're significantly harder to retrofit than to build upfront, and the cost of not having them is measured in data breaches, compliance failures, and user trust.</p>

<p>An admin panel without proper security isn't a feature — it's a liability.</p>
    `.trim(),
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}
