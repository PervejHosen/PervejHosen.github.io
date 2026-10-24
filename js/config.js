/* =====================================================================
   YOUR CONTENT LIVES HERE.
   Edit this file to change anything on the site. You never need to
   touch index.html or main.js to update text, links, jobs or photos.
   ===================================================================== */

const CONFIG = {

  /* ---------- basics & hero ---------- */
  name: "Pervej Hosen",
  logo: "Pervej Hosen",
  photo: "assets/profile.jpg",        // square photo works best
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

  /* ---------- contact form ----------
     Empty: "Send message" opens a pre-filled Gmail message to you in a new tab.
     To receive messages directly: create a free form at https://formspree.io
     and paste its endpoint here, e.g. "https://formspree.io/f/abcdwxyz" */
  formspree: "",
};
