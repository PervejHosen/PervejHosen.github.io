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
    "Since then I've worked remotely with teams in the US, the UAE, Germany and Australia — across circular-fashion e-commerce, prop trading, a restaurant chain and mining — building the data models, dashboards and pipelines they run their business on. Altogether, that's 6+ years of combined, hands-on experience across six roles and five industries.",
    "I'm a Microsoft Certified Power BI Data Analyst (PL-300). My toolkit centres on Power BI, DAX, SQL, Snowflake, BigQuery, Databricks and Python, and I care as much about the clarity of a dashboard as the correctness of the numbers behind it."
  ],
  // the career chart in the About section (current: true adds a "Current" tag)
  careerChart: [
    { role: "Business Intelligence Analyst", where: "Buddy & Selly · Germany", industry: "Circular fashion e-commerce", current: true },
    { role: "BI Developer", where: "Lunar Tech · Dubai, UAE", industry: "Prop trading", current: true },
    { role: "Sr. BI Developer", where: "Leveor · United States", industry: "Restaurant chain", current: true },
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
};
