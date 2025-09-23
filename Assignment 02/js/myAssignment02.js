// COMP 2132 – Assignment 02
// Use exactly the variables from comp2132-assignment02.js (unchanged).
// This file only reads them, calculates, and renders the four sections.

document.addEventListener("DOMContentLoaded", () => {
  // ---- DOM references (must match your HTML IDs) ----
  const elNameH2      = document.getElementById("user-heading");
  const elQuoteP      = document.getElementById("user-quote");
  const elUserList    = document.getElementById("user-data");
  const elConcertList = document.getElementById("concert-data");
  const elProcList    = document.getElementById("processing-list");
  const elResultsBox  = document.getElementById("results-messages");

  // ---- Read instructor variables (with safe coercion) ----
  // NOTE: window.age is used so we can name our local variable ageNum safely.
  const name = (typeof userName !== "undefined") ? String(userName) : "Anonymous";
  const ageNum = (typeof age !== "undefined") ? Number(age) : 0;
  const cash = (typeof cashOnHandDollarsCDN !== "undefined") ? Number(cashOnHandDollarsCDN) : 0;
  const qty = (typeof quantityOfTickets !== "undefined") ? Number(quantityOfTickets) : 0;
  const price = (typeof ticketCostDollarsCDN !== "undefined") ? Number(ticketCostDollarsCDN) : 0;
  const minAge = (typeof minimumAgeToAttend !== "undefined") ? Number(minimumAgeToAttend) : 0;
  let   tax = (typeof taxRate !== "undefined") ? Number(taxRate) : 0;

  // Allow either 0.12 or 12 for tax definitions
  if (tax > 1.5) tax = tax / 100;

  // ---- Intro (top requirement: name in <h2>, quote with both " and ') ----
  elNameH2.textContent = name;
  elQuoteP.innerHTML = `${name} says: “This show rules!!!!” I need to do this again!`;

  // ---- User Data ----
  elUserList.innerHTML = `
    <li><strong>Age:</strong> ${ageNum}</li>
    <li><strong>Tickets:</strong> ${qty}</li>
    <li><strong>Cash:</strong> $${cash.toFixed(2)}</li>
  `;

  // ---- Concert Data ----
  elConcertList.innerHTML = `
    <li><strong>Minimum Age:</strong> ${minAge}</li>
    <li><strong>Cost per Ticket:</strong> $${price.toFixed(2)}</li>
    <li><strong>Tax Rate:</strong> ${(tax * 100).toFixed(1)}%</li>
  `;

  // ---- Processing ----
  const beforeTax   = qty * price;
  const afterTax    = beforeTax * (1 + tax);
  const canAfford   = cash >= afterTax;
  const isOldEnough = ageNum >= minAge;
  const isExactly   = ageNum === minAge;

  elProcList.innerHTML = [
    `<li><strong>Before-tax cost:</strong> $${beforeTax.toFixed(2)}</li>`,
    `<li><strong>After-tax cost:</strong> $${afterTax.toFixed(2)}</li>`,
    `<li>${canAfford ? "User can afford this purchase." : "User cannot afford this purchase."}</li>`,
    isExactly
      ? `<li>User is exactly old enough to purchase.</li>`
      : (ageNum > minAge ? `<li>User is more than old enough to purchase.</li>` : ``)
  ].filter(Boolean).join("");

  // ---- Results ----
  const msgs = [];
  if (!isOldEnough) {
    const yearsShort = minAge - ageNum;
    msgs.push(`<p class="alert"><strong>Too young:</strong> You need ${yearsShort} more year${yearsShort === 1 ? "" : "s"}.</p>`);
  }
  if (!canAfford) {
    const moreNeeded = afterTax - cash;
    msgs.push(`<p class="alert"><strong>Not enough cash:</strong> You need $${moreNeeded.toFixed(2)} more.</p>`);
  }
  if (isOldEnough && canAfford) {
    msgs.push(`<p class="note">✅ Success! You are old enough and have enough funds. Purchase confirmed.</p>`);
  }
  elResultsBox.innerHTML = msgs.join("");
});
