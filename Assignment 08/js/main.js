/**
 * @ Author: Fellipe M Fumagali Scirea
 * @ BCIT Student # : A01181350
 * @ Created: 11-21-2025
 * @ Description: COMP 2132 Assignment 08 - Deliverable as part of coursework.
 */

$(function () {
    const $animationElement = $('.main-image');

    const imagePath = "./images/product-images";
    const totalFrames = 34;

    const animationDuration = 5000;

    const timePerFrame = animationDuration / totalFrames;

    let timeWhenLastUpdate;

    let frameNumber = 1;

    function step(startTime) {
        if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;

        timeFromLastUpdate = startTime - timeWhenLastUpdate;

        if (timeFromLastUpdate > timePerFrame) {
            $animationElement.attr('src', imagePath + `/bike-${frameNumber}.jpg`);
            timeWhenLastUpdate - startTime;
            if (frameNumber >= totalFrames) {
                frameNumber = 1;
            } else {
                frameNumber = frameNumber + 1;
            }
        }
        requestAnimationFrame(step);
    }
});

$(document).ready(() => {
    for (let i = 1; i <= totalFrames; i++) {
        $('body').append(`<div id="preload-image-${i}" style="background-image: url('${imagePath}/bike-${i}.jpg');"></div>`);

    }
});