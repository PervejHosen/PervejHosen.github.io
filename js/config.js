/* =====================================================================
   YOUR CONTENT LIVES HERE.
   Edit this file to change anything on the site. You never need to
   touch index.html or main.js to update text, links, jobs or photos.
   ===================================================================== */

/* =====================================================================
   ALL YOUR LINKS IN ONE PLACE
   Change a link here and it updates everywhere on the site.
   Google Drive tip: to replace a file but KEEP the same link, right-click it in Drive →
   File information → Manage versions → Upload new version. Then nothing here needs changing.
   ===================================================================== */
const LINKS = {
  // contact & profiles (icons in the hero + cards in Contact)
  social: {
    email: "pervejhosen2@gmail.com",
    linkedin: "https://www.linkedin.com/in/pervejhosen/",
    github: "https://github.com/PervejHosen",
    kaggle: "https://www.kaggle.com/pervejhosen"
  },
  // Google Drive certificates ("" = the card shows no "View certificate" link)
  drive: {
    certificatesFolder: "",   // one folder with everything → shows a "View all certificates" button
    msc: "",
    bss: "",
    hsc: "",
    ssc: ""
  },
  // Contact form → your inbox. Visitors don't log in to anything.
  // Paste your free Web3Forms access key here (get it at https://web3forms.com: enter your email, the key arrives by email).
  formKey: "f0d9430b-f502-4d22-b526-34838329b1f4",
  // Backup used only while formKey is empty (FormSubmit; needs a one-time "Activate form" click in your email).
  form: "https://formsubmit.co/ajax/pervejhosen2@gmail.com"
  // Certification verify links sit with each certificate further down (they never change).
};

const CONFIG = {

  /* ---------- basics & hero ---------- */
  name: "Pervej Hosen",
  logo: "Pervej Hosen",
  // Hero photos: they change every second (click/tap to skip ahead). Square photos work best.
  // Files that don't exist yet are skipped automatically, so you can add them any time.
  photos: ["assets/img/hero/headshot.jpg", "assets/img/hero/trek.jpg", "assets/img/hero/paragliding.jpg"],
  resume: "assets/docs/resume.pdf",        // your résumé PDF
  roles: ["Sr. Power BI Developer", "Analytics Engineer", "Data Analyst", "Independent Consultant", "Data Storyteller"],
  objective: "I turn raw data into decisions people trust — Power BI dashboards, SQL models and analytics pipelines on Snowflake, BigQuery and Databricks for teams in the US, UAE, Germany and Australia.",
  location: "Based in Dhaka (UTC+6) · Working remotely with teams worldwide",

  links: LINKS.social,

  /* ---------- about ---------- */
  careerStart: "2022-08",   // {years} in the About text is counted from this month, so it updates itself
  about: [
    "I'm <span class='grad-text'>Pervej Hosen</span>, a Power BI developer and analytics engineer based in Dhaka, Bangladesh. I build the data models, dashboards and pipelines that teams in the US, the UAE, Germany and Australia run their business on, across circular-fashion e-commerce, prop trading, a restaurant chain and mining.",
    "I started on the commercial side of the pharmaceutical industry, in sales and distribution. That's where I learned that a report only matters if someone acts on it, and it still shapes how I work: every dashboard starts from the decision it needs to support.",
    "I hold an MSc in Applied Statistics and Data Science from Jahangirnagar University and I'm a Microsoft Certified Power BI Data Analyst (PL-300). My toolkit centers on Power BI, DAX, SQL, Snowflake, BigQuery, Databricks and Python, and I care as much about the clarity of a dashboard as the correctness of the numbers behind it."
  ],
  // the career chart in the About section.
  // highlights: 2-3 short lines per role. A role with highlights gets a ▸ and opens on click; empty = plain row.
  careerChart: [
    { role: "Business Intelligence Analyst", where: "Buddy & Selly · Germany", industry: "Circular fashion e-commerce",
      highlights: [
        "Built the Power BI data models and KPI dashboards the Sales, Purchasing and Marketing teams used to track performance.",
        "Automated reporting end to end across BigQuery, Power BI, Excel and Google Sheets, cutting manual effort by 40% and making data refreshes reliable.",
        "Turned DHL logistics, inventory and purchasing data into recommendations that shaped product journeys and pricing."
      ] },
    { role: "BI Developer", where: "Lunar Tech · Dubai, UAE", industry: "Prop trading",
      highlights: [
        "Owned Power BI reporting end to end, delivering 15+ reports from requirements and data modeling through to dashboards the business used.",
        "Designed the Snowflake data model and a shared Power BI semantic model used across departments, giving the business a single source of truth.",
        "Took open-ended business questions and turned them into focused analysis and clear recommendations."
      ] },
    { role: "Sr. BI Developer", where: "Leveor · United States", industry: "Restaurant chain",
      highlights: [
        "Built a Snowflake medallion architecture (bronze, silver, gold) that turns raw restaurant data into clean, analysis-ready tables.",
        "Encoded business logic in stored procedures and automated the pipelines with Integrate.io scheduling.",
        "Delivered 15+ gold-layer data models that the company's Sigma reporting is built on."
      ] },
    { role: "Data Analytics Engineer", where: "Onwards Analytics · Australia", industry: "Mining & business improvement",
      highlights: [
        "Delivered value-chain analytics for a Tier-1 mining company, including 10+ production reports for its improvement team.",
        "Built the ETL processes and Power BI dashboards the client used to monitor production, cost and performance.",
        "Fixed long-queue Power BI refresh issues across 5+ reports, cutting refresh time from 35 minutes to 5.",
        "Debugged source data models so figures stayed consistent across reports."
      ] },
    { role: "Associate Data Analyst", where: "Transcom Ltd · Bangladesh", industry: "Pharmaceutical",
      highlights: [
        "Built 15+ SSRS and analytical reports that gave stakeholders a regular view of sales and distribution.",
        "Tuned the SQL behind the reporting, making queries 15% faster.",
        "Administered Power BI and Qlik Sense and supported their users day to day."
      ] },
    { role: "Assistant Officer, Sales & Distribution", where: "Transcom Ltd · Bangladesh", industry: "Pharmaceutical",
      highlights: [] }
  ],
  facts: [
    { n: "6+", l: "Years combined experience" },
    { n: "5", l: "Industries" },
    { n: "4", l: "Countries, remote teams" },
    { n: "PL-300", l: "Microsoft certified" }
  ],

  /* ---------- skills ----------
     Left: grouped list. Right: logo tiles.
     icon = logo name from js/icons.js (leave it out for tools without a logo) */
  skillsIntro: "The tools I use to take data from source systems to a decision, built up across pharma, e-commerce, prop trading, restaurants and mining.",
  skillGroups: [
    { title: "Visualize & report", items: ["Power BI", "Excel", "Looker Studio", "Sigma"] },
    { title: "Query & model", items: ["SQL", "Microsoft SQL Server", "MySQL", "Data Modeling"] },
    { title: "Warehouse & cloud", items: ["Snowflake", "Google BigQuery", "Databricks", "Google Cloud"] },
    { title: "Analyze with code", items: ["Python", "Pandas"] },
    { title: "Workflow & collaboration", items: ["Git", "GitHub", "Jira", "ClickUp", "Miro", "Slack"] }
  ],
  tiles: [
    { name: "Power BI", icon: "powerbi.svg" },
    { name: "Excel", icon: "excel.svg" },
    { name: "SQL Server", icon: "sqlserver.svg" },
    { name: "Snowflake", icon: "snowflake.svg" },
    { name: "BigQuery", icon: "bigquery.svg" },
    { name: "Databricks", icon: "databricks.svg" },
    { name: "Python", icon: "python.svg" },
    { name: "Looker Studio", icon: "lookerstudio.svg" },
    { name: "Sigma", icon: "sigma.svg" },
    { name: "Google Cloud", icon: "googlecloud.svg" },
    { name: "MySQL", icon: "mysql.svg" },
    { name: "Pandas", icon: "pandas.svg" },
    { name: "Git", icon: "git.svg" },
    { name: "GitHub", icon: "github.svg" },
    { name: "Jira", icon: "jira.svg" },
    { name: "ClickUp", icon: "clickup.svg" },
    { name: "Miro", icon: "miro.svg" },
    { name: "Slack", icon: "slack.svg" }
  ],

  /* ---------- education ----------
     One card each. meta = the small grey line (years, board, etc.).
     Certificate links live in LINKS.drive at the top of this file.
     In Google Drive: right-click the file → Share → General access: "Anyone with the link" (Viewer) → Copy link. */
  education: [
    { degree: "Master of Science (MSc) in Applied Statistics and Data Science", school: "Jahangirnagar University", meta: "2022 – 2023", link: LINKS.drive.msc },
    { degree: "Bachelor of Social Science (BSS), Honours in Economics", school: "National University, Bangladesh", meta: "2016 – 2020", link: LINKS.drive.bss },
    { degree: "Higher Secondary Certificate (HSC), Science", school: "Hajigonj Degree College", meta: "2013 – 2015 · Cumilla Board", link: LINKS.drive.hsc },
    { degree: "Secondary School Certificate (SSC), Science", school: "Suapara G. K. High School", meta: "2008 – 2013 · Cumilla Board", link: LINKS.drive.ssc }
  ],
  // optional: one shared Google Drive folder with all your certificates → shows a "View all certificates" button
  certificatesFolder: LINKS.drive.certificatesFolder,

  /* ---------- training (shown under Certifications) ----------
     Programs without an individual credential. No link needed. */
  training: [
    {
      title: "Data Analytics & Data Science Bootcamp",
      by: "Mentored by Md. Shabbir Hossain Bhuiyea",
      year: "2023 · 6 months",
      summary: "99 live sessions and 9 hands-on projects, from statistics and Excel through SQL and cloud data warehouses to Python and machine learning, ending with ETL pipelines and portfolio projects.",
      topics: ["Excel", "Power BI", "Looker Studio", "SQL", "Snowflake", "BigQuery", "Databricks", "MongoDB", "Python", "Machine learning", "ETL"]
    }
  ],

  /* ---------- certifications (Education & Certifications section) ----------
     logo: a file in the icon bundle, or leave it out and set mono (letters) + monoColor.
     expires: if set, the "Active" tag hides itself automatically after that date. */
  featuredCert: {
    title: "Microsoft Certified: Power BI Data Analyst Associate",
    code: "Exam PL-300",
    issuer: "Microsoft", logo: "microsoft.svg",
    earned: "Jun 2025", renewed: "Jun 2026", expires: "2027-06-17", expiresLabel: "Jun 2027",
    link: "https://learn.microsoft.com/api/credentials/share/en-us/PervejHosen-6326/D5D08374D818624B?sharingId=1DEE14FF7052C02E"
  },
  certifications: [
    { title: "Advanced DAX", issuer: "Maven Analytics", mono: "MA", monoColor: "#0f4c75", date: "Oct 2024",
      link: "https://certificates.mavenanalytics.io/1c262e42-d7a3-44fa-ac4a-66e86975fcba#acc.go8qjNmy" },
    { title: "Power BI Service", issuer: "Maven Analytics", mono: "MA", monoColor: "#0f4c75", date: "Oct 2024",
      link: "https://certificates.mavenanalytics.io/ce32560c-86d2-45b8-8fac-27a0bbb57700#acc.ZrxKJ1FL" },
    { title: "Thinking Like an Analyst", issuer: "Maven Analytics", mono: "MA", monoColor: "#0f4c75", date: "Oct 2024",
      link: "https://certificates.mavenanalytics.io/93d2588b-5608-418f-a211-2e97a65523e9#acc.ZgqrsTSF" },
    { title: "Analyzing and Visualizing Data in Looker", issuer: "Google Cloud · completion badge", logo: "googlecloud.svg", date: "Sep 2023",
      link: "https://www.skills.google/public_profiles/adb1aeba-5e05-40ff-85f1-6fe856af2aee/badges/5036688" },
    { title: "Prepare Data for Looker Dashboards and Reports", issuer: "Google Cloud · skill badge", logo: "googlecloud.svg", date: "Sep 2023",
      link: "https://www.skills.google/public_profiles/adb1aeba-5e05-40ff-85f1-6fe856af2aee/badges/5097355" },
    { title: "Exploring Data Transformation with Google Cloud", issuer: "Google Cloud · Coursera", logo: "googlecloud.svg", date: "Oct 2023",
      link: "https://coursera.org/share/29480f78aba53de2fc8003d22346c3ea" },
    { title: "Creating New BigQuery Datasets and Visualizing Insights", issuer: "Google Cloud · Coursera", logo: "googlecloud.svg", date: "Sep 2023",
      link: "https://coursera.org/share/6a17b05973f3fc00fe158fdcc3b90a0c" },
    { title: "Exploring and Preparing your Data with BigQuery", issuer: "Google Cloud · Coursera", logo: "googlecloud.svg", date: "Sep 2023",
      link: "https://coursera.org/share/17c0500cfc9638f627cedb778bced0d6" },
    { title: "Supervised Machine Learning: Regression and Classification", issuer: "DeepLearning.AI · Coursera", mono: "DL", monoColor: "#e8467c", date: "Sep 2023",
      link: "https://coursera.org/share/232ab15c31145f8b51d67b8a7c969b80" },
    { title: "Time Series", issuer: "Kaggle", logo: "kaggle.svg",
      link: "https://www.kaggle.com/learn/certification/pervejhosen/time-series" }
    // HackerRank SQL (Basic) — left out on purpose. To show it, add:
    // { title: "SQL (Basic)", issuer: "HackerRank", mono: "HR", monoColor: "#1ba94c", link: "https://www.hackerrank.com/certificates/330cb5d307eb" }
  ],

  /* ---------- photography ----------
     Web-sized photos live in assets/img/photography/ (about 1600px on the long side).
     Filter buttons are created from the categories you use. */
  photographySubtitle: "Away from dashboards, I chase mountains and light. Frames from my trek to Annapurna Base Camp in Nepal, and from home in Bangladesh.",
  photographyMore: "",   // optional: your Instagram / Flickr / 500px link
  galleryShow: 12,       // on phones/tablets: how many photos show before the "Show all" button
  gallery: [
    { src: "assets/img/photography/01.jpg", title: "Morning over the valley", place: "Annapurna region, Nepal", category: "Mountains" },
    { src: "assets/img/photography/02.jpg", title: "Into the Sanctuary", place: "Annapurna Sanctuary, Nepal", category: "Trek" },
    { src: "assets/img/photography/25.jpg", title: "Trail companion", place: "Annapurna region, Nepal", category: "Trek" },
    { src: "assets/img/photography/03.jpg", title: "Above the hills", place: "Pokhara, Nepal", category: "Travel" },
    { src: "assets/img/photography/04.jpg", title: "Facing Machapuchare", place: "Annapurna Base Camp, Nepal", category: "Mountains" },
    { src: "assets/img/photography/05.jpg", title: "Frozen silence", place: "Annapurna Base Camp, Nepal", category: "Mountains" },
    { src: "assets/img/photography/06.jpg", title: "Storm over the ridge", place: "Annapurna Sanctuary, Nepal", category: "Mountains" },
    { src: "assets/img/photography/07.jpg", title: "Halfway up", place: "Annapurna Sanctuary, Nepal", category: "Trek" },
    { src: "assets/img/photography/08.jpg", title: "Bridge over the terraces", place: "Annapurna region, Nepal", category: "Trek" },
    { src: "assets/img/photography/09.jpg", title: "4,130 metres", place: "Annapurna Base Camp, Nepal", category: "Trek" },
    { src: "assets/img/photography/10.jpg", title: "Annapurna South", place: "Annapurna region, Nepal", category: "Mountains" },
    { src: "assets/img/photography/11.jpg", title: "Dusk on the lake", place: "Pokhara, Nepal", category: "Travel" },
    { src: "assets/img/photography/12.jpg", title: "Pagoda square", place: "Kathmandu, Nepal", category: "Travel" },
    { src: "assets/img/photography/14.jpg", title: "Krishnachura season", place: "Jahangirnagar University", category: "Campus" },
    { src: "assets/img/photography/15.jpg", title: "Under a monsoon sky", place: "Jahangirnagar University", category: "Campus" },
    { src: "assets/img/photography/16.jpg", title: "The green path", place: "Jahangirnagar University", category: "Campus" },
    { src: "assets/img/photography/17.jpg", title: "A quiet afternoon", place: "Jahangirnagar University", category: "Campus" },
    { src: "assets/img/photography/18.jpg", title: "Cart ride through the fields", place: "Jahangirnagar University", category: "Campus" },
    { src: "assets/img/photography/19.jpg", title: "Cosmos", place: "Bangladesh", category: "Nature" },
    { src: "assets/img/photography/20.jpg", title: "Wildflower", place: "Bangladesh", category: "Nature" },
    { src: "assets/img/photography/21.jpg", title: "Frangipani", place: "Bangladesh", category: "Nature" },
    { src: "assets/img/photography/22.jpg", title: "A handful of color", place: "Bangladesh", category: "Nature" },
    { src: "assets/img/photography/13.jpg", title: "Thesis day", place: "Jahangirnagar University", category: "Moments" },
    { src: "assets/img/photography/23.jpg", title: "Red and green", place: "Dhaka, Bangladesh", category: "Moments" },
    { src: "assets/img/photography/24.jpg", title: "Team offsite", place: "Transcom, Bangladesh", category: "Moments" }
  ],

  /* ---------- contact form ----------
     Messages are delivered straight to your inbox; visitors don't need to log in to anything.
     The address is set in LINKS.form at the top of this file. */
  formKey: LINKS.formKey,
  formEndpoint: LINKS.form,
};
