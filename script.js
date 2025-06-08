// Load dark mode preference from localStorage
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
});

// Toggle dark mode
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Fetch COVID-19 data for India
fetch("https://disease.sh/v3/covid-19/countries/India")
  .then(res => res.json())
  .then(data => {
    const active = data.active;
    const deaths = data.deaths;
    const cases = data.cases;
    const estimatedRecovered = cases - active - deaths;

    // Update DOM with stats
    document.getElementById("cases").innerText = `🟠 Active Cases: ${active.toLocaleString()}`;
    document.getElementById("deaths").innerText = `💀 Deaths: ${deaths.toLocaleString()}`;
    document.getElementById("recovered-count").innerText = estimatedRecovered.toLocaleString();

    // Format updated time
    const updatedDate = new Date(data.updated).toLocaleString();
    document.getElementById("updated").innerText = `📅 Last Updated: ${updatedDate}`;
  })
  .catch(err => {
    console.error("Failed to fetch data", err);
    document.querySelector(".container").innerHTML = "<p>⚠️ Error loading data.</p>";
  });
