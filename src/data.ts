export type Tag = 'swe' | 'ai';

export interface Stat {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  title: string;
  kind: string;
  repo: string;
  summary: string;
  flowCaption: string;
  flow: string[];
  points?: string[]; // wrap code in `backticks`
  stats?: Stat[];
  stack: string;
  tags: Tag[];
  video?: { embed: string; link: string; title: string };
}

export const profile = {
  name: 'Gursimar Singh',
  lede: 'I build full-stack products and applied ML systems, and I test them until the numbers hold up.',
  about:
    'Final-year B.Tech (CIOT) student at Netaji Subhas University of Technology, Delhi. Most recently a Product Intern at HCL Healthcare, where I shipped a finance approval portal and a health-insurance claims model. I work mostly in TypeScript (React, Next.js, Node.js, NestJS) and Python (FastAPI, scikit-learn).',
  status: 'Looking for software engineering, full-stack and AI/ML internships',
  email: 'gursimar.chauhan@gmail.com',
};

export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/SimarSingh1910' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gursimar1910' },
  { label: 'LeetCode', href: 'https://leetcode.com/u/Simar04' },
];

export const activeUse = [
  { id: 'cost-provisions', title: 'Cost Provisions Portal', note: 'HCL Healthcare' },
  { id: 'claims-predictor', title: 'Claims Predictor', note: 'HCL Healthcare' },
  { id: 'udyamsaathi', title: 'UdyamSaathi', note: 'Hackathon, team of 2' },
];

export const role = {
  title: 'Product Intern, HCL Healthcare',
  when: 'May to Aug 2026, Delhi',
  summary:
    'Built two internal products end to end, from requirements with the business teams to deployment: one for the Finance department and one for the group health insurance team.',
};

export const internshipProjects: Project[] = [
  {
    id: 'cost-provisions',
    title: 'Cost Provisions Portal',
    kind: 'Full-stack web app for Finance',
    repo: 'https://github.com/SimarSingh1910/vendorPortal',
    summary:
      'Clinics across India used to send monthly cost-provision estimates to Finance over email and Excel. This portal replaced that with one place to submit, review and approve them.',
    flowCaption: 'How a submission moves',
    flow: ['Clinic submits estimate', 'Level 1 approval', 'Level 2 approval', 'Level 3 approval', 'Month locked'],
    points: [
      'Role-based access for 5 user roles and a 7-stage submission lifecycle, with send-back paths at each approval level.',
      'Secured with JWT access tokens, rotating refresh tokens and bcrypt.',
      'Real-time in-app notifications over Server-Sent Events, email alerts through AWS SES, an analytics dashboard in Recharts, and Excel/PDF export with ExcelJS and Puppeteer.',
    ],
    stats: [
      { value: '5', label: 'user roles' },
      { value: '7', label: 'lifecycle stages' },
      { value: '3', label: 'approval levels' },
    ],
    stack: 'React, TypeScript, NestJS, Prisma, MySQL 8, React Query, Zustand, pnpm monorepo, Docker',
    tags: ['swe'],
  },
  {
    id: 'claims-predictor',
    title: 'Group Health Insurance Claims Predictor',
    kind: 'ML model and web app for premium setting',
    repo: 'https://github.com/SimarSingh1910/claims-predictor-',
    summary:
      'Predicts whether a corporate employee will make a health-insurance claim in the next 12 months from their annual health check-up, then rolls the results up into age and gender cohorts and a group-level estimate the pricing team can use.',
    flowCaption: 'How an upload is scored',
    flow: ['Check-up CSV upload', 'Shared preprocessing', 'Model from registry', 'Calibrated probability', 'Cohort and group estimate'],
    points: [
      'Trained on a 100k-record synthetic dataset: removed leakage columns, used a stratified 60/20/20 split with a sealed test set, and compared Logistic Regression, LightGBM and XGBoost.',
      'Calibrated the predicted probabilities so they match observed claim rates.',
      'Designed a model registry where a new model goes live by being saved to its slot on disk, with no code change. Uploads are processed in memory and never stored.',
    ],
    stats: [
      { value: '0.84', label: 'validation ROC-AUC' },
      { value: '0.59', label: 'validation PR-AUC' },
      { value: '0.156 → 0.097', label: 'Brier score after calibration' },
    ],
    stack: 'Python, Pandas, scikit-learn, XGBoost, LightGBM, joblib, FastAPI, React (Vite, TypeScript)',
    tags: ['ai', 'swe'],
  },
];

export const projects: Project[] = [
  {
    id: 'smartdialer',
    title: 'SmartDialer',
    kind: 'Outbound call pacing system',
    repo: 'https://github.com/SimarSingh1910/Smart-Dialer',
    summary:
      'A progressive and predictive outbound dialer for a debt-collections contact centre. It decides how many calls to place so agents stay busy without callers being abandoned.',
    flowCaption: 'Architecture',
    flow: ['Campaign', 'Pacing engine', 'Safety controller', 'Call allocator', 'Telecom provider'],
    points: [
      'The pacing engine is a pure function with no I/O, and an import-graph test keeps it that way.',
      'Agent allocation is safe across concurrent workers using `SELECT … FOR UPDATE SKIP LOCKED` and compare-and-swap state transitions.',
      'An AIMD abandon-rate budget and a circuit breaker protect callers. An injected virtual clock makes provider outages, duplicate events and worker crashes reproducible in tests.',
    ],
    stats: [
      { value: '1.2 ms', label: 'p50 reservation latency, 1,000 agents and 20 workers' },
      { value: '237', label: 'tests' },
      { value: '6', label: 'failure simulation scenarios' },
    ],
    stack: 'Python 3.11, PostgreSQL, psycopg 3, pytest',
    tags: ['swe'],
  },
  {
    id: 'udyamsaathi',
    title: 'UdyamSaathi',
    kind: 'SMB onboarding platform, team of 2',
    repo: 'https://github.com/SimarSingh1910/UdyamSaathi',
    summary:
      'A mobile-first, English and Hindi journey where a small-business owner describes their business and gets a telecom bundle recommended, quoted, KYC-verified and ordered, on the web or over WhatsApp. Built for the Airtel SYNC case at YTL Hackathon 2026.',
    flowCaption: 'How a customer gets onboarded',
    flow: ['Owner describes business', 'LLM parses the need', 'Rules engine picks and prices', 'Smart KYC', 'Order and live tracker'],
    points: [
      'Pricing stays deterministic: the rules engine chooses the bundle and sets the price, and the LLM only parses and explains, so it can never quote a wrong price.',
      'A provider-agnostic LLM layer (Gemini, Groq, OpenAI, Anthropic) with a keyword fallback that also handles Hindi, so the product works fully without an API key.',
      'Smart KYC runs on-device OCR (tesseract.js) over 4 documents and cross-checks them against mock GST and Udyam registries, flagging cancelled GSTINs, edited names and stale address proofs.',
      'A logistic-regression lead score that explains each score by its top two factors, and AES-256-GCM encryption of phone numbers.',
    ],
    stats: [
      { value: '0.72', label: 'held-out lead score AUC' },
      { value: '~2×', label: 'conversion of top-10% leads vs average' },
      { value: '4', label: 'KYC documents checked' },
    ],
    stack: 'Next.js, TypeScript, PostgreSQL, Drizzle ORM, WhatsApp Cloud API, tesseract.js, Vitest, Docker',
    tags: ['swe', 'ai'],
    video: {
      embed: 'https://drive.google.com/file/d/10jd537jqJQKNsgViOWQ-Zx5OI4QB9Wxv/preview',
      link: 'https://drive.google.com/file/d/10jd537jqJQKNsgViOWQ-Zx5OI4QB9Wxv/view',
      title: 'UdyamSaathi demo video',
    },
  },
  {
    id: 'schemesetu',
    title: 'SchemeSetu',
    kind: 'RAG assistant for government schemes',
    repo: 'https://github.com/SimarSingh1910/SchemeSetu',
    summary:
      'Answers questions about Indian startup and MSME schemes (Startup India, MUDRA, MSME/CGTMSE, Stand-Up India) straight from the official PDFs, and shows the page each answer came from.',
    flowCaption: 'Retrieval pipeline',
    flow: ['Official scheme PDFs', 'pypdf, pdfplumber fallback', 'Page-tagged chunks', 'Gemini embeddings in ChromaDB', 'Answer with page citations'],
    points: [
      'Structured LLM output grouped by source PDF, with every citation checked against the excerpts that were actually retrieved.',
      'Says "not found" for out-of-scope questions instead of guessing, and falls back to showing the relevant excerpts when the LLM is unavailable.',
      'Scheme-level filtering, Dockerised and deployed on Render.',
    ],
    stats: [
      { value: '4', label: 'scheme families covered' },
      { value: 'Page', label: 'citation granularity' },
    ],
    stack: 'Google Gemini API, ChromaDB, FastAPI, pypdf, pdfplumber, pytest, React, TypeScript, Docker',
    tags: ['ai', 'swe'],
  },
  {
    id: 'aqi',
    title: 'AQI Predictor',
    kind: 'Air quality forecasting',
    repo: 'https://github.com/SimarSingh1910/AQI-predictor-AIML',
    summary: 'Forecasts PM2.5 for 4 Indian cities from Open-Meteo data: a daily forecast and a 72-hour hourly one.',
    flowCaption: 'Modelling pipeline',
    flow: ['Open-Meteo API', 'EDA, PCA and clustering', 'Random Forest, daily', 'LSTM, 72-hour hourly'],
    stats: [
      { value: '4', label: 'cities' },
      { value: '0.75', label: 'Random Forest R², best city' },
      { value: '3.79', label: 'LSTM test MAE' },
    ],
    stack: 'Python, Pandas, scikit-learn, TensorFlow/Keras, Matplotlib, Seaborn',
    tags: ['ai'],
  },
  {
    id: 'chat',
    title: 'Real-Time Chat App',
    kind: 'MERN stack',
    repo: 'https://github.com/SimarSingh1910/chat-app',
    summary:
      'A full-stack chat app with low-latency messaging, live typing indicators and delivery receipts. Conversations persist across reconnects and page reloads.',
    flowCaption: 'How a message travels',
    flow: ['React client', 'Socket.io connection', 'Node.js and Express', 'Stored in MongoDB'],
    points: ['Bidirectional WebSocket messaging through Socket.io.', 'Authentication with JWT and bcrypt-hashed credentials.'],
    stack: 'MongoDB, Express.js, React.js, Node.js, Socket.io, JWT',
    tags: ['swe'],
  },
];

export const skills = [
  { group: 'Languages', items: 'TypeScript, JavaScript (ES6), Python, C++, SQL, HTML and CSS' },
  { group: 'Frontend', items: 'React, Next.js, Tailwind CSS, shadcn/ui, React Query, Zustand' },
  { group: 'Backend and databases', items: 'Node.js, Express, NestJS, FastAPI, Socket.io, PostgreSQL, MySQL, MongoDB, Prisma, Drizzle ORM' },
  {
    group: 'ML and data',
    items:
      'NumPy, Pandas, scikit-learn, XGBoost, LightGBM, TensorFlow/Keras, Matplotlib, Seaborn; preprocessing, feature engineering, evaluation and calibration, time-series forecasting',
  },
  { group: 'Generative AI', items: 'RAG, embeddings, ChromaDB, Google Gemini API, LangChain, structured LLM outputs, LLM evaluation' },
  { group: 'Tools and testing', items: 'Git, Docker, pnpm, Vitest, pytest, Render' },
];

export const education = [
  { qualification: 'B.Tech (CIOT)', institution: 'Netaji Subhas University of Technology, Delhi', years: '2023–2027', score: '7.18 CGPA' },
  { qualification: 'CBSE Class XII', institution: 'Guru Harkrishan Public School, H.E.', years: '2022', score: '82.3%' },
  { qualification: 'CBSE Class X', institution: 'Guru Harkrishan Public School, H.E.', years: '2020', score: '91.2%' },
];

export const educationNote =
  'Coursework includes data structures and algorithms, DBMS, operating systems, computer networks, system design and compiler construction. Outside class, I captained my school volleyball team to the zonals.';
