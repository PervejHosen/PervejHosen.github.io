/* =====================================================================
   YOUR CONTENT LIVES HERE.
   Edit this file to change anything on the site. You never need to
   touch index.html or main.js to update text, links, jobs or photos.
   ===================================================================== */

const CONFIG = {

  /* ---------- basics & hero ---------- */
  name: "Pervej Hosen",
  logo: "Pervej Hosen",
  // Hero photos: they change every second (click/tap to skip ahead). Square photos work best.
  // Files that don't exist yet are skipped automatically, so you can add them any time.
  photos: ["assets/profile.jpg", "assets/profile-2.jpg", "assets/profile-3.jpg", "assets/profile-4.jpg"],
  resume: "assets/resume.pdf",        // your résumé PDF
  roles: ["Sr. BI Developer", "Independent Consultant", "Power BI Developer", "Analytics Engineer", "Data Storyteller"],
  objective: "I turn raw data into decisions people trust — Power BI dashboards, SQL models and analytics pipelines on Snowflake, BigQuery and Databricks for teams in the US, UAE, Germany and Australia.",
  location: "Based in Dhaka (UTC+6) · Working remotely with teams worldwide",

  links: {
    email: "pervejhosen2@gmail.com",
    linkedin: "https://www.linkedin.com/in/pervejhosen/",
    github: "https://github.com/PervejHosen",
    kaggle: "https://www.kaggle.com/pervejhosen"
  },

  /* ---------- about ---------- */
  careerStart: "2022-08",   // {years} in the About text is counted from this month, so it updates itself
  about: [
    "I'm <span class='grad-text'>Pervej Hosen</span>, a Business Intelligence developer based in Dhaka, Bangladesh. I started my career in August 2022 on the commercial side of the pharmaceutical industry, in sales and distribution, which is where I learned that a report only matters if someone acts on it.",
    "Since then I've worked remotely with teams in the US, the UAE, Germany and Australia, in circular-fashion e-commerce, prop trading, a restaurant chain and mining. I build the data models, dashboards and pipelines they run their business on. Altogether, that's 6+ years of combined, hands-on experience across six roles and five industries.",
    "I'm a Microsoft Certified Power BI Data Analyst (PL-300). My toolkit centres on Power BI, DAX, SQL, Snowflake, BigQuery, Databricks and Python, and I care as much about the clarity of a dashboard as the correctness of the numbers behind it."
  ],
  // the career chart in the About section
  careerChart: [
    { role: "Business Intelligence Analyst", where: "Buddy & Selly · Germany", industry: "Circular fashion e-commerce" },
    { role: "BI Developer", where: "Lunar Tech · Dubai, UAE", industry: "Prop trading" },
    { role: "Sr. BI Developer", where: "Leveor · United States", industry: "Restaurant chain" },
    { role: "Data Analytics Engineer", where: "Onwards Analytics · Australia", industry: "Mining & business improvement" },
    { role: "Associate Data Analyst", where: "Transcom Ltd · Bangladesh", industry: "Pharmaceutical" },
    { role: "Assistant Officer, Sales & Distribution", where: "Transcom Ltd · Bangladesh", industry: "Pharmaceutical" }
  ],
  facts: [
    { n: "6+", l: "Years combined experience" },
    { n: "5", l: "Industries" },
    { n: "4", l: "Countries, remote teams" },
    { n: "PL-300", l: "Microsoft certified" }
  ],

  /* ---------- skills ----------
     Left: grouped list. Right: logo tiles.
     icon = file name in assets/icons/ (leave it out for tools without a logo) */
  skillsIntro: "The tools I use to take data from source systems to a decision, built up across pharma, e-commerce, prop trading, restaurants and mining.",
  skillGroups: [
    { title: "Visualize & report", items: ["Power BI", "Excel", "Looker Studio"] },
    { title: "Query & model", items: ["SQL", "Microsoft SQL Server", "MySQL", "Data Modeling"] },
    { title: "Warehouse & cloud", items: ["Snowflake", "Google BigQuery", "Databricks", "Google Cloud"] },
    { title: "Analyze & predict", items: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"] },
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
    { name: "Google Cloud", icon: "googlecloud.svg" },
    { name: "MySQL", icon: "mysql.svg" },
    { name: "Pandas", icon: "pandas.svg" },
    { name: "NumPy", icon: "numpy.svg" },
    { name: "Scikit-learn", icon: "scikitlearn.svg" },
    { name: "Matplotlib", icon: "matplotlib.png" },
    { name: "Seaborn", icon: "seaborn.svg" },
    { name: "Git", icon: "git.svg" },
    { name: "GitHub", icon: "github.svg" },
    { name: "Jira", icon: "jira.svg" },
    { name: "ClickUp", icon: "clickup.svg" },
    { name: "Miro", icon: "miro.svg" },
    { name: "Slack", icon: "slack.svg" }
  ],

  /* ---------- education ----------
     One card each. meta = the small grey line (years, board, etc.).
     link: optional Google Drive link to that certificate. It shows a "View certificate" link on the card.
     In Google Drive: right-click the file → Share → General access: "Anyone with the link" (Viewer) → Copy link. */
  education: [
    { degree: "Master of Science (MSc) in Applied Statistics and Data Science", school: "Jahangirnagar University", meta: "2022 – 2023", link: "" },
    { degree: "Bachelor of Social Science (BSS), Honours in Economics", school: "National University, Bangladesh", meta: "2016 – 2020", link: "" },
    { degree: "Higher Secondary Certificate (HSC), Science", school: "Hajigonj Degree College", meta: "2013 – 2015 · Cumilla Board", link: "https://drive.google.com/file/d/1alieg3hpcH0jNwL-F7SgBNzPqlBBGIms/view?usp=drive_link" },
    { degree: "Secondary School Certificate (SSC), Science", school: "Suapara G. K. High School", meta: "2008 – 2013 · Cumilla Board", link: "https://drive.google.com/file/d/1CO3v7kDyRJlWTyI3Uhh233Dvw6OURbvB/view?usp=drive_link" }
  ],
  // optional: one shared Google Drive folder with all your certificates → shows a "View all certificates" button
  certificatesFolder: "",

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

  /* ---------- contact form ----------
     Empty: "Send message" opens a pre-filled Gmail message to you in a new tab.
     To receive messages directly: create a free form at https://formspree.io
     and paste its endpoint here, e.g. "https://formspree.io/f/abcdwxyz" */
  formspree: "",
};
