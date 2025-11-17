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


