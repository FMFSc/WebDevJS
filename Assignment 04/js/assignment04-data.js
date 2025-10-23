/*
IMPORTANT NOTE: ensure each and all variables
declared here are later used as arguments 
when demonstrating the invocation of your functions
eg: invoke each function several times, 
each time with different sample data
*/

/*
-----------------------------------------
Part 1
-----------------------------------------
some test data to use as arguments 
for the list images function tests
*/
//use this when pathing the src="" to the images folder
const pathToImages  = "images/";

//a valid array of images
const arrayOfImages          = ["jane.jpg","joe.jpg","jana.jpg","jim.jpg"];
//an array with some valid images
//and some junk
const arrayOfSomeImages      = ["kittens-01.jpg","kittens-02.jpg",true,"kittens-03.jpg",23,"kittens-04.jpg","kittens-05.jpg"];

//not a arrays of images
const notAnArrayOfImages     = "just a string";
const alsoNotAnArrayOfImages = 4321;
const anArrayOfNumbers       = [54, 54, 2345, -45];
const anArrayOfBooleans      = [true, false, false, true, true];

/*
-----------------------------------------
Part 2
-----------------------------------------
some test data to use as arguments 
for the list links function tests
*/
//bad examples of array of link urls
const notAnArrayOfLinks     = [true, false, true];
const alsoNotAnArrayOfLinks = 45;
//a valid array of link urls
const arrayOfLinks = ["https://bcit.ca","https://learn.bcit.ca","https://www.bcit.ca/study/courses/comp2132","https://www.bcit.ca/study/courses/comp2913","https://www.bcit.ca/study/courses/comp2909"];
//contains valid (strings) and invaild (non-string) data
const anotherArrayOfLinks = ["https://stackoverflow.com/",true,"https://developer.mozilla.org/en-US/","https://www.w3.org/","https://validator.w3.org/",345,-34,"https://jigsaw.w3.org/css-validator/"];


