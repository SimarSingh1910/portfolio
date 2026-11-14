# Gursimar Singh · Portfolio

Final-year B.Tech (CIOT) student at NSUT Delhi and former Product Intern at HCL Healthcare. I build full-stack products and applied ML systems. This repo is the source of my portfolio site.

**Live site:** _add your Render URL here_
**[Link:](https://portfolio-1-wvrc.onrender.com)** [GitHub](https://github.com/SimarSingh1910) · [LinkedIn](https://www.linkedin.com/in/gursimar1910) · [LeetCode](https://leetcode.com/u/Simar04)

## Featured work

| Project | What it is | Code |
| --- | --- | --- |
| **Cost Provisions Portal** | Finance approval workflow built at HCL Healthcare: role-based access, multi-level approvals, notifications and dashboards | [vendorPortal](https://github.com/SimarSingh1910/vendorPortal) |
| **Claims Predictor** | ML engine built at HCL Healthcare that predicts group health insurance claims to support premium setting | [claims-predictor-](https://github.com/SimarSingh1910/claims-predictor-) |
| **UdyamSaathi** | Bilingual small-business onboarding on web and WhatsApp, built at YTL Hackathon 2026 (with demo video) | [UdyamSaathi](https://github.com/SimarSingh1910/UdyamSaathi) |
| **SmartDialer** | Outbound call pacing system | [Smart-Dialer](https://github.com/SimarSingh1910/Smart-Dialer) |
| **SchemeSetu** | RAG assistant for Indian government startup and MSME schemes | [SchemeSetu](https://github.com/SimarSingh1910/SchemeSetu) |
| **AQI Predictor** | PM2.5 forecasting for four Indian cities | [AQI-predictor-AIML](https://github.com/SimarSingh1910/AQI-predictor-AIML) |
| **Real-Time Chat App** | MERN chat app with typing indicators and delivery receipts | [chat-app](https://github.com/SimarSingh1910/chat-app) |

## About the site

- One page: Home, About, Experience, Projects and Contact
- Projects can be filtered by software engineering or AI/ML, and each has an expandable case study
- Visitor analytics through Google Analytics 4
- Contact form delivered by Web3Forms
- Responsive and accessible

**Built with** React 19, TypeScript, Vite and Tailwind CSS v4. Deployed as a static site on Render.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check and build to dist/
```

## Configuration

Both variables are optional and read at build time. Copy `.env.example` to `.env.local` to use them locally, or add them on Render and redeploy.

| Variable | Purpose |
| --- | --- |
| `VITE_GA_ID` | Google Analytics 4 measurement ID. If empty, nothing is tracked. |
| `VITE_WEB3FORMS_KEY` | Web3Forms access key. If empty, the contact form opens the visitor's email app. |

Besides page views, the site records which sections visitors reach, which case studies they open, and clicks on code links, the demo video, social links and email.

## Deploy

Render **Static Site** · Build command `npm install && npm run build` · Publish directory `dist`

## Editing content

All the text lives in `src/data.ts`: profile, experience, education, skills and projects.
