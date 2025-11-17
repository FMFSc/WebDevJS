/**
 * @ Author: Fellipe M Fumagali Scirea
 * @ BCIT Student # : A01181350
 * @ Created: 11-15-2025
 * @ Description: COMP 2132  Assignment 06 - Deliverable as part of coursework.
 */

//capturing the date from the DOM
let appointmentDate = document.getElementById('date');

//begin by determining what day it is right now...
const myDate = new Date(); //get a new Date Object
let year, month, dayOfMonth; //use 'let' since some of these might need to change
year = myDate.getFullYear(); //get year
//adjust zero based counting (eg: January is otherwise month 0)
month = myDate.getMonth() + 1; //getMonth() returns the month from 0 to 11 so you need to add 1 to get the current month.
dayOfMonth = myDate.getDate(); //get day

let formattedMonth, formattedDay; //variables to hold formatted month and day values

formattedDay = dayOfMonth.toString().padStart(2, '0'); //format day to always be 2 digits
formattedMonth = month.toString().padStart(2, '0'); //format month to always be 2 digits

//create a formatted date string in the form YYYY-MM-DD
let formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

//setting the appointment date variable created to return a value to the DOM
appointmentDate.value = formattedDate;
appointmentDate.min = formattedDate;

// Show/hide implementation for password field
let passwordField = document.getElementById('password');
let togglePasswordButton = document.querySelector('.togglePassword');

if (passwordField !== null && togglePasswordButton !== null) {
    togglePasswordButton.addEventListener('click', function () {
        passwordField.type = (passwordField.type === 'password') ? 'text' : 'password';
        togglePasswordButton.textContent = (passwordField.type === 'password') ? "Show" : "Hide";
    });

    // Set initial button text
    togglePasswordButton.textContent = (passwordField.type === 'password') ? "Show" : "Hide";
}


//Form validation against assignment criteria
let appointmentForm = document.getElementById('appointment-form');

//regex for student ID validation
const studentNumberRegEx = /^a0[0-9]{7}$/i;

//add event listener to the form submit event
appointmentForm.addEventListener('submit', function (event) {
    event.preventDefault(); //prevent form submission with default values

    //data field values extraction
    let firstName = document.getElementById('firstName');
    let lastName = document.getElementById('lastName');
    let password = document.getElementById('password');
    let studentID = document.getElementById('studentID');
    let courseSelection = document.getElementById('courseSelection');

    //validation for all fields

    //Assuming validation goes well
    let formValid = true;

    //if validation fails, set formValid to false and alert the user
    if (firstName.value.trim() === '') {
        formValid = false;
        firstName.classList.add('input-error');
        alert('Please enter your first name.');
    } else {
        firstName.classList.remove('input-error');
    }

    if (lastName.value.trim() === '') {
        formValid = false;
        lastName.classList.add('input-error');
        alert('Please enter your last name.');
    } else {
        lastName.classList.remove('input-error');
    }

    if (password.value.trim() === '') {
        formValid = false;
        password.classList.add('input-error');
        alert('Please enter your password.');
    } else {
        password.classList.remove('input-error');
    }

    if (studentID.value.trim() === '') {
        formValid = false;
        studentID.classList.add('input-error');
        alert('Please enter your Student ID.');
    } else if (!studentNumberRegEx.test(studentID.value.trim())) {
        formValid = false;
        studentID.classList.add('input-error');
        alert('Please enter a valid Student ID in the format A0XXXXXX, where X is a digit.');
    } else {
        studentID.classList.remove('input-error');
    }

    if (courseSelection.value === '') {
        formValid = false;
        courseSelection.classList.add('input-error');
        alert('Please select a course.');
    } else {
        courseSelection.classList.remove('input-error');
    }

    //if all validations pass, submit the form
    //console.log("testing form validation", firstName, lastName, password, studentID, courseSelection);

    if (formValid) {
        appointmentForm.submit();
    } else {
        console.log("Form validation failed.");
    }
});