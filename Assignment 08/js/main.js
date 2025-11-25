/**
 * @ Author: Fellipe M Fumagali Scirea
 * @ BCIT Student # : A01181350
 * @ Created: 11-21-2025
 * @ Description: COMP 2132 Assignment 08 - Deliverable as part of coursework.
 */

$(document).ready(function () {
    // DOM CACHING
    const $animationElement = $("#main-image"); // <img id="main-image" class="main-image">
    const $startButton = $(".start-animation");
    const $stopButton = $(".stop-animation");

    const $popup = $("#rotation-popup");
    const $popupClose = $(".popup-close");

    // CONFIGURATION
    const imagePath = "./images/product-images";
    const totalFrames = 34;
    const frameDelayMs = 100; // 1/10th of a second per assignment
    const popupDelayMs = 3000; // 3 seconds

    // STATE
    let frameNumber = 1; // current frame number (1–34)
    let isAnimating = false; // whether the rotation is running
    let animationFrameId = null; // id returned by requestAnimationFrame

    let popupTimeoutId = null; // timeout id for delayed popup
    let userStartedWithin3s = false; // has user started animation at least once?

    // --- IMAGE / ANIMATION HELPERS ----------------------------------

    // Update the <img> src based on the current frameNumber
    function updateFrame() {
        const src = imagePath + "/bike-" + frameNumber + ".jpg";
        $animationElement.attr("src", src);
    }

    // Move to the next frame in the sequence (loop 34 → 1)
    function advanceFrame() {
        if (frameNumber >= totalFrames) {
            frameNumber = 1;
        } else {
            frameNumber += 1;
        }
        updateFrame();
    }

    // Main animation loop: advance frame, then wait 100 ms before next RAF
    function step() {
        if (!isAnimating) {
            return; // safety guard
        }

        advanceFrame();

        // Slow things down using setTimeout to ~100ms per frame
        setTimeout(function () {
            if (!isAnimating) {
                return; // check again in case Stop was clicked
            }
            animationFrameId = window.requestAnimationFrame(step);
        }, frameDelayMs);
    }

    // --- POPUP HELPERS ----------------------------------------------

    function schedulePopup() {
        // don't schedule if popup doesn't exist OR user already started animation
        if (!$popup.length || userStartedWithin3s) {
            return;
        }

        // avoid stacking multiple timeouts
        if (popupTimeoutId !== null) {
            return;
        }

        popupTimeoutId = setTimeout(function () {
            popupTimeoutId = null;
            showPopup();
        }, popupDelayMs);
    }

    function showPopup() {
        // do nothing if user already started animation or popup missing
        if (userStartedWithin3s || !$popup.length) {
            return;
        }

        $popup
            .css({
                display: "flex",
                opacity: 0
            })
            .fadeTo(1000, 1);
    }

    function hidePopup() {
        if (!$popup.length) {
            return;
        }

        $popup.fadeTo(300, 0, function () {
            $popup.css("display", "none");

            // If the user has NOT started the animation yet,
            // schedule the popup to show again after another 3 seconds.
            if (!userStartedWithin3s) {
                schedulePopup();
            }
        });
    }

    // --- EVENT HANDLERS ---------------------------------------------

    function startAnimation() {
        // record that the user interacted (used to permanently suppress popup)
        userStartedWithin3s = true;

        // cancel any pending popup and hide it if visible
        if (popupTimeoutId !== null) {
            clearTimeout(popupTimeoutId);
            popupTimeoutId = null;
        }
        hidePopup();

        // Prevent multiple animation loops (no speed-up on repeat clicks)
        if (isAnimating) {
            return;
        }

        isAnimating = true;
        animationFrameId = window.requestAnimationFrame(step);

        // reflect state on buttons
        $startButton.prop("disabled", true);
        $stopButton.prop("disabled", false);
    }

    function stopAnimation() {
        if (!isAnimating) {
            return;
        }

        isAnimating = false;

        if (animationFrameId !== null) {
            window.cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        // Keep showing the current frame (do NOT reset to frame 1)
        $startButton.prop("disabled", false);
        $stopButton.prop("disabled", true);
    }

    // --- PRELOAD IMAGES ---------------------------------------------

    // Preload all frames so the animation runs smoothly
    for (let i = 1; i <= totalFrames; i += 1) {
        $("<div>")
            .css({
                display: "none",
                backgroundImage: "url('" + imagePath + "/bike-" + i + ".jpg')"
            })
            .appendTo("body");
    }

    // --- WIRE UP BUTTONS & POPUP ------------------------------------

    $startButton.on("click", startAnimation);
    $stopButton.on("click", stopAnimation);

    if ($popupClose.length) {
        $popupClose.on("click", hidePopup);
    }

    // --- INITIAL STATE ----------------------------------------------

    updateFrame(); // ensure the first image matches frameNumber
    $stopButton.prop("disabled", true); // nothing to stop at page load

    // make sure popup starts hidden (in case CSS didn't)
    if ($popup.length) {
        $popup.css({
            display: "none",
            opacity: 0
        });
    }

    // Schedule the first popup for 3 seconds after page load
    schedulePopup();
});