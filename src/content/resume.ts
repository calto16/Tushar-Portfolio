/**
 * Resume-derived content. Source of truth for Experience, Projects,
 * Skills, Achievements, and the About/neofetch section.
 */

/* ------------------------------------------------------------------ */
/* EXPERIENCE                                                          */
/* ------------------------------------------------------------------ */

export interface Experience {
  company: string;
  role: string;
  period: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  bullets: string[];
  stack: string[];
  accent: "green" | "cyan" | "magenta" | "amber";
}

export const experience: Experience[] = [
  {
    company: "Wayfair",
    role: "Software Engineer 1 — Data Tooling",
    period: "Jul 2025 — Present",
    start: "2025-07",
    end: "Present",
    current: true,
    summary:
      "Owning a multi-agent GenAI platform that turns ambiguous data requirements into production-ready contracts.",
    bullets: [
      "Architected and took full ownership of a multi-agent GenAI Data Contract Creation platform end-to-end, translating highly ambiguous dataset requirements into a scalable system that reduced contract creation time from days to minutes.",
      "Integrated BigQuery for real-time relational schema discovery, metadata inference, and live type validation — ensuring high-quality, version-controlled data governance across distributed teams.",
      "Engineered robust distributed data pipelines using Apache Airflow DAGs, defining strict production testing standards, managing complex workflow orchestration, and independently troubleshooting production scheduling systems.",
    ],
    stack: ["GenAI", "Multi-Agent", "BigQuery", "Apache Airflow", "Python"],
    accent: "green",
  },
  {
    company: "Wayfair",
    role: "Software Engineer Intern",
    period: "Jan 2025 — Jun 2025",
    start: "2025-01",
    end: "2025-06",
    summary:
      "Built a RAG-powered system to automate an enterprise-wide Confluent Kafka migration.",
    bullets: [
      "Developed a scalable repository analysis system using an advanced Retrieval-Augmented Generation (RAG) architecture to automate discovery of Apache Kafka usage patterns across a massive, heterogeneous codebase.",
      "Optimized distributed data retrieval by implementing intelligent file chunking and generating vector database embeddings — drastically reducing the manual engineering effort required for an enterprise-wide Confluent Kafka migration.",
    ],
    stack: ["RAG", "Vector DB", "Apache Kafka", "Confluent", "Python"],
    accent: "cyan",
  },
  {
    company: "Catalinko",
    role: "Backend Intern",
    period: "Mar 2024 — May 2024",
    start: "2024-03",
    end: "2024-05",
    summary:
      "Designed serverless backend services that cut server costs 30% and scaled to 10k+ req/s.",
    bullets: [
      "Designed and architected scalable backend services for document storage, inventory management, order processing, and payments using AWS Lambda, AppSync, and CloudFormation — achieving a 30% reduction in server costs through serverless architecture.",
      "Optimized serverless infra by enhancing DynamoDB with efficient indexing and adaptive capacity to handle 10,000+ requests/second; integrated AWS SQS for reliable message queuing, async processing, and microservice fault tolerance.",
    ],
    stack: ["AWS Lambda", "AppSync", "DynamoDB", "SQS", "CloudFormation"],
    accent: "magenta",
  },
  {
    company: "Cooptem",
    role: "LLM Research Intern",
    period: "Dec 2023 — Jan 2024",
    start: "2023-12",
    end: "2024-01",
    summary:
      "Cut LLM inference time 40% with RAG and streamed 1M+ records at sub-second latency.",
    bullets: [
      "Enhanced generative AI accuracy with advanced RAG techniques — integrating the OpenAI API with dense vector retrieval and Llama-Index for efficient indexing, cutting inference time by 40% and improving retrieval precision.",
      "Leveraged real-time data streams using Python and Weaviate to enable rapid access to over 1 million data records with sub-second latency.",
    ],
    stack: ["OpenAI", "Llama-Index", "Weaviate", "RAG", "Python"],
    accent: "amber",
  },
];

/* ------------------------------------------------------------------ */
/* PROJECTS                                                            */
/* ------------------------------------------------------------------ */

export interface Project {
  name: string;
  codename: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  metric: { value: string; label: string };
  accent: "green" | "cyan" | "magenta";
}

export const projects: Project[] = [
  {
    name: "Microservices Mania",
    codename: "PRJ_01",
    tagline: "Resilient, observable, event-driven microservices.",
    description:
      "A fault-tolerant microservices platform engineered for 99.9% uptime, full observability, and millions of events per day.",
    highlights: [
      "Engineered a resilient architecture with Spring Cloud — Eureka service discovery, API Gateway, and Resilience4J circuit breakers — achieving 99.9% uptime.",
      "Implemented event-driven scalability with Apache Kafka to process millions of daily events, secured auth with Keycloak, and containerized every service with Docker.",
      "Established distributed tracing via Spring Cloud Sleuth + Zipkin and robust monitoring with Prometheus & Grafana.",
    ],
    stack: [
      "Spring Cloud",
      "Eureka",
      "Resilience4J",
      "Apache Kafka",
      "Keycloak",
      "Docker",
      "Zipkin",
      "Prometheus",
      "Grafana",
    ],
    metric: { value: "99.9%", label: "uptime" },
    accent: "green",
  },
  {
    name: "CSI-S3-Spec",
    codename: "PRJ_02",
    tagline: "Mount S3 buckets as native Kubernetes filesystems.",
    description:
      "A custom Container Storage Interface (CSI) driver letting Kubernetes pods mount S3 buckets as native filesystems — handling 100TB+ workloads.",
    highlights: [
      "Developed a CSI driver that seamlessly integrates S3 storage, allowing pods to mount buckets as native filesystems across large-scale deployments exceeding 100TB.",
      "Configured a customized Kubernetes ecosystem with tailored storage classes and S3-compatible integration, using shared mounts for Docker.",
      "Implemented Kubernetes Secrets for sensitive data and authored automated deployment scripts to streamline delivery and boost container performance.",
    ],
    stack: [
      "Kubernetes",
      "CSI",
      "AWS S3",
      "Docker",
      "Go",
      "K8s Secrets",
    ],
    metric: { value: "100TB+", label: "workloads" },
    accent: "cyan",
  },
];

/* ------------------------------------------------------------------ */
/* SKILLS                                                              */
/* ------------------------------------------------------------------ */

export interface SkillGroup {
  label: string;
  command: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    command: "pacman -Q languages",
    items: ["Python", "Java", "C++"],
  },
  {
    label: "Databases",
    command: "pacman -Q databases",
    items: [
      "PostgreSQL",
      "BigQuery",
      "DynamoDB",
      "MongoDB",
      "Weaviate",
      "MySQL",
    ],
  },
  {
    label: "Cloud & AWS",
    command: "pacman -Q cloud",
    items: ["AWS Lambda", "S3", "SQS", "Bedrock", "Cognito", "GCP", "Linode"],
  },
  {
    label: "Tools & Infra",
    command: "pacman -Q infra",
    items: [
      "Kafka",
      "Docker",
      "Kubernetes",
      "Apache Airflow",
      "Linux",
      "Git",
      "Maven",
      "CMake",
    ],
  },
  {
    label: "Frameworks",
    command: "pacman -Q frameworks",
    items: ["Spring Cloud", "Django", "FastAPI", "Flask"],
  },
];

export const coursework: string[] = [
  "Distributed Systems",
  "Operating Systems",
  "Database Systems & Architecture",
  "Data Structures & Algorithms",
  "Computer Networks",
  "Cryptography & Network Security",
];

/* ------------------------------------------------------------------ */
/* ACHIEVEMENTS                                                        */
/* ------------------------------------------------------------------ */

export interface Achievement {
  rank: string;
  title: string;
  detail: string;
  highlight?: boolean;
}

export const achievements: Achievement[] = [
  {
    rank: "01",
    title: "Winner — Veritas Uconnect 2.0",
    detail: "Delivered a standout software-engineering solution to take first place.",
    highlight: true,
  },
  {
    rank: "1st",
    title: "Winner — Neuro-Hack by Whirlpool Corp",
    detail: "Built an AI chatbot enabling users to talk with their data.",
    highlight: true,
  },
  {
    rank: "2nd",
    title: "Runner-up — L&T India Createch Hackathon 2024",
    detail: "An innovative solution tackling a real-world industry problem.",
  },
  {
    rank: "F",
    title: "Finalist — Bosch Auto Vision X",
    detail: "Automotive innovation including Image Binding using C++.",
  },
  {
    rank: "SF",
    title: "Semi-finalist — Flipkart GRID 5.0",
    detail: "Strong CS fundamentals, delivered the full project under a strict deadline.",
  },
  {
    rank: "★",
    title: "Knight on LeetCode · 5★ on CodeChef",
    detail: "Peak ratings 2132 / 2012. 1,500+ problems solved across DSA & concurrency.",
    highlight: true,
  },
];

export const education = {
  degree: "B.Tech, Computer Science & Engineering",
  school: "Walchand College of Engineering, Sangli",
  period: "2021 — 2025",
  cgpa: "8.19",
};

/* ------------------------------------------------------------------ */
/* ABOUT / NEOFETCH                                                    */
/* ------------------------------------------------------------------ */

/** neofetch-style key/value facts for the About section. */
export const neofetch: { key: string; value: string }[] = [
  { key: "OS", value: "Arch Linux x86_64 (btw)" },
  { key: "Host", value: "Software Engineer @ Wayfair" },
  { key: "Kernel", value: "Distributed Systems · GenAI · Data" },
  { key: "Uptime", value: "Building since 2021" },
  { key: "Shell", value: "zsh — debugging > coding" },
  { key: "Resolution", value: "Sangli, India · UTC+5:30" },
  { key: "DE", value: "Sci-Fi · Brutalist Architecture" },
  { key: "WM", value: "Gaming Addict · Tech Enthusiast" },
  { key: "Terminal", value: "LeetCode Knight · CodeChef 5★" },
  { key: "CPU", value: "Python · Java · C++" },
];

export const aboutParagraphs: string[] = [
  "I'm Tushar — a Software Engineer at Wayfair building multi-agent GenAI data tooling and resilient distributed systems. I love taking ambiguous, gnarly problems and turning them into scalable systems that just work.",
  "Off the clock I'm a die-hard Linux user (Arch, btw), a gaming addict, and an unapologetic tech enthusiast. I'm obsessed with all things sci-fi and modern — and I have a strange love for brutalist architecture: raw, honest, structural. This whole site is basically that obsession rendered in code.",
];

/** Tags rendered as glitchy pills in the About section. */
export const interests: string[] = [
  "Arch Linux",
  "PC Gaming",
  "Sci-Fi",
  "Brutalist Architecture",
  "Distributed Systems",
  "GenAI / LLMs",
  "Open Source",
  "Competitive Programming",
];
