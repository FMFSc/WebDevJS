/**
 * This file contains my created JS content as per requirements of assignment02.pdf
 *
 */

document.addEventListener("DOMContentLoaded", () => {
  //DOM Referencing
  const elemNameH2 = document.getElementById("user-heading");
  const elemQuoteP = document.getElementById("user-quote");
  const elemUserList = document.getElementById("user-data");
  const elemConcert = document.getElementById("concert-data");
  const elemProcessing = document.getElementById("processing-list");
  const elemResults = document.getElementById("results-messages");

  // Using variables defined in comp2132.assignment02.js file
  const name = typeof userName !== "undefined" ? userName : "Anonymous";
  const age = typeof userAge !== "undefined" ? userAge : 0;
  const cash = typeof userCash !== "undefined" ? userCash : 0;
  const qty = typeof ticketQty !== "undefined" ? ticketQty : 0;
  const min = typeof minAge !== "undefined" ? minAge : 0;
  const price = typeof costPerTicket !== "undefined" ? costPerTicket : 0;
  const tax = typeof taxRate !== "undefined" ? taxRate : 0;

  // Intro section - Displays the basic introductory information
  elemNameH2.textContent = name;
  elemQuoteP.innerHTML = `${name} says: "This show rules!!!!" I need to do this again!`;

  // User data
  elemUserList.innerHTML = `
    <li><strong>Age:</strong> ${age}</li>
    <li><strong>Tickets:</strong> ${qty}</li>
    <li><strong>Cash:</strong> $${cash.toFixed(2)}</li>
  `;

  // --- Concert Data ---
  elConcert.innerHTML = `
    <li><strong>Minimum Age:</strong> ${min}</li>
    <li><strong>Cost per Ticket:</strong> $${price.toFixed(2)}</li>
    <li><strong>Tax Rate:</strong> ${(tax * 100).toFixed(0)}%</li>
  `;

  // --- Processing ---
  const beforeTax = qty * price;
  const afterTax = beforeTax * (1 + tax);
  const canAfford = cash >= afterTax;
  const isOldEnough = age >= min;
  const isExactlyOld = age === min;

  elemProcessing.innerHTML = [
    `<li><strong>Before-tax cost:</strong> $${beforeTax.toFixed(2)}</li>`,
    `<li><strong>After-tax cost:</strong> $${afterTax.toFixed(2)}</li>`,
    `<li>${
      canAfford
        ? "User can afford this purchase."
        : "User cannot afford this purchase."
    }</li>`,
    isExactlyOld
      ? `<li>User is exactly old enough to purchase.</li>`
      : age > min
      ? `<li>User is more than old enough to purchase.</li>`
      : ``,
  ]
    .filter(Boolean)
    .join("");

  // --- Results ---
  const msgs = [];
  if (!isOldEnough) {
    const yearsShort = min - age;
    msgs.push(
      `<p class="alert"><strong>Too young:</strong> You need to be ${yearsShort} years older${
        yearsShort === 1 ? "" : "s"
      }.</p>`
    );
  }
  if (!canAfford) {
    const moreNeeded = afterTax - cash;
    msgs.push(
      `<p class="alert"><strong>Not enough cash:</strong> You need $${moreNeeded.toFixed(
        2
      )} more.</p>`
    );
  }
  if (isOldEnough && canAfford) {
    msgs.push(
      `<p class="note">✅ Great! You are old enough and have enough funds. Purchase confirmed.</p>`
    );
  }
  elResults.innerHTML = msgs.join("");
});
