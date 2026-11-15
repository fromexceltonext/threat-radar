# Episode 1 — Blueprint prompts

Prompts used with Claude (free plan) to design the app blueprint.

## 1. Modules and pages

```
I'm turning a cybersecurity spreadsheet into a live threat radar with Next.js 16 and TypeScript. It pulls known exploited vulnerabilities from CISA KEV, and later CVSS scores from NVD. I'm thinking of two modules: a user side to explore threats, and an admin side to manage things. Give me a short blueprint: just the modules and the pages. No code yet.
```

## 2. Diagram

```
Can you show me this as a diagram?
```

## 3. Blueprint file

```
Perfect. Our stack is already set: Next.js 16, TypeScript, Prisma with Postgres, and we deploy on Vercel. We'll start from the existing app/page.tsx, so keep the user pages directly under app/, no route groups. Now give me the folder structure, and put the whole blueprint in a markdown file I can save as BLUEPRINT.md. Include the diagram in Mermaid so GitHub can render it.
```

> Responses vary between runs. Yours won't be identical, and that's fine.
