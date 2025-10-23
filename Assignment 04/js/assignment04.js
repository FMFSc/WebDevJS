// COMP2132 – Assignment 04 (assignment04.js; no helpers)
// Keep index.html and style.css unchanged.

// ---------------- Part 1 ----------------
function listImages(images, basePath) {
    // basePath is optional; default "./images"
    if (typeof basePath === "undefined" || basePath === null) {
        basePath = "./images";
    }

    // Where the gallery goes
    var userSection = document.querySelector("#user");
    if (!userSection) {
        return;
    }

    // Remove any old gallery
    var oldGallery = userSection.querySelector(".gallery");
    if (oldGallery) {
        oldGallery.remove();
    }

    // Message area
    var messagesBox = document.querySelector("#results-messages");
    if (messagesBox) {
        var p = document.createElement("p");
        p.textContent = "Running Part 1 (images)…";
        messagesBox.appendChild(p);
    }

    // Validate input
    if (!Array.isArray(images)) {
        if (messagesBox) {
            var warn = document.createElement("p");
            warn.textContent = "Part 1: images must be an array.";
            warn.classList.add("alert");
            messagesBox.appendChild(warn);
        }
        return;
    }

    // Build gallery
    var gallery = document.createElement("div");
    gallery.className = "gallery";

    var validCount = 0;

    for (var i = 0; i < images.length; i++) {
        var name = images[i];

        if (typeof name === "string" && name.trim().length > 0) {
            // If it looks like a URL, use as-is; else prepend basePath
            var looksLikeURL = /^(https?:)?\/\//i.test(name) || name.indexOf("/") === 0;
            var src = looksLikeURL ? name : (basePath + "/" + name);

            var fig = document.createElement("figure");
            var img = document.createElement("img");
            img.src = src;
            img.alt = name.replace(/^.*\//, "");
            fig.appendChild(img);
            gallery.appendChild(fig);
            validCount++;
        }
    }

    userSection.appendChild(gallery);

    if (messagesBox) {
        var done = document.createElement("p");
        done.textContent = "Part 1: rendered " + validCount + " image(s).";
        messagesBox.appendChild(done);
    }
}

// ---------------- Part 2 ----------------
function listLinks(urls, containerSelector) {
    // containerSelector optional; default "#processing-list"
    if (typeof containerSelector === "undefined" || containerSelector === null) {
        containerSelector = "#processing-list";
    }

    var messagesBox = document.querySelector("#results-messages");
    if (messagesBox) {
        var p = document.createElement("p");
        p.textContent = "Running Part 2 (links)…";
        messagesBox.appendChild(p);
    }

    // Target <ul>
    var ul = document.querySelector(containerSelector);
    if (!ul) {
        return;
    }

    // Clear previous links
    ul.innerHTML = "";

    // Validate input
    if (!Array.isArray(urls)) {
        if (messagesBox) {
            var warn = document.createElement("p");
            warn.textContent = "Part 2: links must be provided as an array.";
            warn.classList.add("alert");
            messagesBox.appendChild(warn);
        }
        return;
    }

    var skipped = 0;
    var rendered = 0;

    for (var i = 0; i < urls.length; i++) {
        var value = urls[i];

        if (typeof value !== "string") {
            skipped++;
            continue;
        }

        // Light sanity check
        var ok =
            /^(https?:)?\/\//i.test(value) ||
            value.indexOf("./") === 0 ||
            value.indexOf("../") === 0 ||
            /^[A-Za-z0-9]/.test(value);

        if (!ok) {
            skipped++;
            continue;
        }

        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = value;
        a.textContent = value;
        a.target = "_blank";
        a.rel = "noopener";
        li.appendChild(a);
        ul.appendChild(li);
        rendered++;
    }

    if (messagesBox) {
        var done = document.createElement("p");
        var msg = "Part 2: rendered " + rendered + " link(s).";
        if (skipped > 0) {
            msg += " Skipped " + skipped + " value(s) that were not valid strings/links.";
        }
        done.textContent = msg;
        messagesBox.appendChild(done);
    }
}

// --------------- Load data + run demos ---------------
document.addEventListener("DOMContentLoaded", function () {
    // Reset message and list areas each run
    var messagesBox = document.querySelector("#results-messages");
    if (messagesBox) {
        messagesBox.innerHTML = "";
    }
    var listBox = document.querySelector("#processing-list");
    if (listBox) {
        listBox.innerHTML = "";
    }

    // Dynamically load ./js/assignment04-data.js
    var s = document.createElement("script");
    s.src = "./js/assignment04-data.js";

    s.onload = function () {
        try {
            // Part 1 demo images (replace with your real filenames if you have them)
            var demoImagesOK = ["01.jpg", "02.jpg", "landscape.png"];
            var demoImagesMixed = ["", 42, null, "https://picsum.photos/400/260"];

            listImages(demoImagesOK, "./images");
            listImages(demoImagesMixed, "./images");

            // Part 2 demos (only call if variables exist)
            if (typeof alsoNotAnArrayOfLinks !== "undefined") {
                listLinks(alsoNotAnArrayOfLinks, "#processing-list");
            }
            if (typeof notAnArrayOfLinks !== "undefined") {
                listLinks(notAnArrayOfLinks, "#processing-list");
            }
            if (typeof arrayOfLinks !== "undefined") {
                listLinks(arrayOfLinks, "#processing-list");
            }
            if (typeof anotherArrayOfLinks !== "undefined") {
                listLinks(anotherArrayOfLinks, "#processing-list");
            }
        } catch (e) {
            if (messagesBox) {
                var err = document.createElement("p");
                err.textContent = "Error running with data file: " + e.message;
                err.classList.add("alert");
                messagesBox.appendChild(err);
            }
            console.error(e);
        }
    };

    s.onerror = function () {
        if (messagesBox) {
            var warn = document.createElement("p");
            warn.textContent = "Could not load ./js/assignment04-data.js; running with built-in samples.";
            warn.classList.add("alert");
            messagesBox.appendChild(warn);
        }

        // Part 1 built-in demo
        listImages(["01.jpg", "02.jpg", "landscape.png"], "./images");
        listImages(["", 42, null, "https://picsum.photos/400/260"], "./images");

        // Part 2 built-in demo
        listLinks(["https://bcit.ca", "notes.html", 123, null, "./relative/page"], "#processing-list");
    };

    document.head.appendChild(s);
});