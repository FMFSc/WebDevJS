// JavaScript: external file, simple DOM write + extras for polish

document.addEventListener("DOMContentLoaded", () => {
  // Required by the assignment: write my name into the <h2 id="javascript_message">
  document.getElementById("javascriptMessage").innerHTML = "Fellipe Scirea";

  // Small enhancement: current year in the footer (still very basic DOM work)
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
