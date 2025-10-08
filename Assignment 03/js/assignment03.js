/**
 * @ Author: Fellipe M Fumagali Scirea
 * @ BCIT Student # : A01181350
 * @ Create Time: 2025-10-06
 * @ COMP 2132 - Assignment 03- Arrays and Loops
 */

/**
 * PART ONE: Display and Search Array
 */


// Initialize arrays
const students = ["Jane", "Joe", "Jack", "Jill", "Jerome"];

// Prompt user for target name with default value
const targetName = prompt("Enter a name to search for:", "Fellipe") || "Fellipe";

// Add three more names including Fellipe
students.push("Fellipe", "Jessica", "Jordan");

// Display intro section
const userHeading = document.getElementById("user-heading");
const userQuote = document.getElementById("user-quote");

if (userHeading) {
    userHeading.textContent = "Assignment 03 - Arrays and Loops";
}
if (userQuote) {
    userQuote.textContent = `Demonstrating array manipulation and iterative logic with JavaScript`;
}

// Part One: Display and Search
const userSection = document.getElementById("user-data");
if (userSection) {
    // Clear existing content
    userSection.innerHTML = "";

    // Display target name
    const targetLi = document.createElement("li");
    targetLi.innerHTML = `<strong>Target name is:</strong> ${targetName}`;
    userSection.appendChild(targetLi);

    // Display total number of students
    const totalLi = document.createElement("li");
    totalLi.innerHTML = `<strong>Total students:</strong> ${students.length}`;
    userSection.appendChild(totalLi);

    // Create subheading for student list
    const listHeading = document.createElement("li");
    listHeading.innerHTML = `<strong>List of Students:</strong>`;
    userSection.appendChild(listHeading);

    // Note about case insensitive search
    const noteLi = document.createElement("li");
    noteLi.innerHTML = `<em class="note">Performing case-insensitive comparison...</em>`;
    userSection.appendChild(noteLi);
}

// Create student list with search functionality
const concertSection = document.getElementById("concert-data");
if (concertSection) {
    concertSection.innerHTML = "";

    // Create UL for students
    const studentList = document.createElement("ul");
    studentList.className = "student-list";

    let targetFound = false;

    // Iterate through students
    for (let i = 0; i < students.length; i++) {
        const li = document.createElement("li");

        // Case insensitive comparison
        if (students[i].toLowerCase() === targetName.toLowerCase()) {
            targetFound = true;
            li.innerHTML = `👍 ${students[i]} <-- target name found!`;
            li.className = "target-found";
        } else {
            li.textContent = students[i];
        }

        studentList.appendChild(li);
    }

    concertSection.appendChild(studentList);

    // Final report on target name
    const reportDiv = document.createElement("div");
    reportDiv.className = targetFound ? "result-success" : "result-warning";

    if (targetFound) {
        reportDiv.innerHTML = `<strong>✅ YES! Target name was found in the list</strong>`;
    } else {
        reportDiv.innerHTML = `<strong>⚠️ NO, Target name was NOT found in the list</strong>`;
    }

    concertSection.appendChild(reportDiv);
}

// Update section headings
const userSectionHeading = document.querySelector("#user h3");
if (userSectionHeading) {
    userSectionHeading.textContent = "Part One: Display and Search Array";
}

const concertSectionHeading = document.querySelector("#concert h3");
if (concertSectionHeading) {
    concertSectionHeading.textContent = "Student List Results";
}


// PART TWO: Tally Even/Odd and Sum

const arrayOfNumbers = [4, 0, -4, 13, -2];

const processingSection = document.getElementById("processing-list");
if (processingSection) {
    processingSection.innerHTML = "";

    // Display intro
    const introLi = document.createElement("li");
    introLi.innerHTML = `<strong>Array of Numbers:</strong>`;
    processingSection.appendChild(introLi);

    // Create UL for numbers
    const numberList = document.createElement("ul");
    numberList.className = "number-list";

    let sum = 0;
    let evenCount = 0;
    let oddCount = 0;

    // Display numbers and calculate
    for (let i = 0; i < arrayOfNumbers.length; i++) {
        const num = arrayOfNumbers[i];
        const li = document.createElement("li");
        li.textContent = num;
        numberList.appendChild(li);

        // Calculate sum
        sum += num;

        // Count even/odd (0 is neither)
        if (num !== 0) {
            if (num % 2 === 0) {
                evenCount++;
            } else {
                oddCount++;
            }
        }
    }

    processingSection.appendChild(numberList);

    // Display results
    const resultsContainer = document.createElement("li");
    resultsContainer.className = "calculation-results";
    resultsContainer.innerHTML = `
    <p><strong>Even numbers:</strong> ${evenCount}</p>
    <p><strong>Odd numbers:</strong> ${oddCount}</p>
    <p><strong>Sum of all numbers:</strong> ${sum}</p>
  `;
    processingSection.appendChild(resultsContainer);
}

const processingSectionHeading = document.querySelector("#processing h3");
if (processingSectionHeading) {
    processingSectionHeading.textContent = "Part Two: Tally Even/Odd and Sum";
}


// PART THREE: Count Up or Down (Optional)

const resultsSection = document.getElementById("results-messages");
if (resultsSection) {
    resultsSection.innerHTML = "";

    const introP = document.createElement("p");
    introP.innerHTML = `<strong>Counting from each number to zero...</strong>`;
    resultsSection.appendChild(introP);

    // Process each number
    for (let i = 0; i < arrayOfNumbers.length; i++) {
        const num = arrayOfNumbers[i];

        // Create container for this number
        const numberSection = document.createElement("div");
        numberSection.className = "count-section";

        const heading = document.createElement("h4");
        heading.textContent = `Number: ${num}`;
        numberSection.appendChild(heading);

        if (num === 0) {
            // Zero case
            const message = document.createElement("p");
            message.textContent = "There is no counting to be done.";
            message.className = "note";
            numberSection.appendChild(message);
        } else {
            // Create label for count direction
            const label = document.createElement("p");
            label.innerHTML = num > 0 ? "<strong>Count down:</strong>" : "<strong>Count up:</strong>";
            numberSection.appendChild(label);

            // Create list for countdown/countup
            const countList = document.createElement("ul");
            countList.className = "count-list";

            if (num > 0) {
                // Count down
                for (let j = num; j >= 0; j--) {
                    const li = document.createElement("li");
                    li.textContent = j;
                    if (j === 0) {
                        li.className = "zero-reached";
                    }
                    countList.appendChild(li);
                }
            } else {
                // Count up
                for (let j = num; j <= 0; j++) {
                    const li = document.createElement("li");
                    li.textContent = j;
                    if (j === 0) {
                        li.className = "zero-reached";
                    }
                    countList.appendChild(li);
                }
            }

            numberSection.appendChild(countList);
        }

        resultsSection.appendChild(numberSection);
    }
}

const resultsSectionHeading = document.querySelector("#results h3");
if (resultsSectionHeading) {
    resultsSectionHeading.textContent = "Part Three: Count Up or Down";
}

console.log("Assignment 03 loaded successfully!");
console.log(`Students array: ${students}`);
console.log(`Target name: ${targetName}`);
console.log(`Array of numbers: ${arrayOfNumbers}`);