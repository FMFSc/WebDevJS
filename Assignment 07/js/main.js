/**
 * @ Author: Fellipe M Fumagali Scirea
 * @ BCIT Student # : A01181350
 * @ Created: 11-16-2025
 * @ Description: COMP 2132 Assignment 07 - jQuery product page behaviour
 */

$(function () {

    // 1. CONSTANTS & STATE

    const UNIT_PRICE = 20.0;

    // These match your HTML defaults:
    // src="./images/product-images/t-shirt-black-no-model.jpg"
    let currentColor = "black";
    let currentView = "no-model";


    // 2. CACHE DOM ELEMENTS

    const $mainImage = $("#main-image");
    const $thumbs = $(".thumb");

    const $quantity = $("#quantity");
    const $totalPrice = $("#total-price");

    const $colorRadios = $('input[name="color"]');
    const $sizeRadios = $('input[name="size"]');

    const $colorName = $("#color-name");
    const $sizeName = $("#size-name");
    const $addToCart = $("#add-to-cart");


    // 3. HELPER FUNCTIONS


    // Build the correct image path based on your file naming scheme
    // Example result: "./images/product-images/t-shirt-red-front.jpg"
    function buildImagePath(color, view) {
        return `./images/product-images/t-shirt-${color}-${view}.jpg`;
    }

    // Update the big main image
    function updateMainImage() {
        const path = buildImagePath(currentColor, currentView);
        $mainImage.attr("src", path);
    }

    // Update all thumbnails to the current color while keeping their view
    function updateThumbnails() {
        $thumbs.each(function () {
            const view = $(this).data("view"); // "no-model", "front", "back"
            const path = buildImagePath(currentColor, view);
            $(this).find("img").attr("src", path);
        });
    }

    // Update the total based on quantity
    function updateTotal() {
        let qty = parseInt($quantity.val(), 10);

        if (!qty || qty < 1) {
            qty = 1;
            $quantity.val(qty);
        }

        const total = (qty * UNIT_PRICE).toFixed(2);
        $totalPrice.text(`$${total}`);
    }

    // Visually highlight the active thumbnail
    function setActiveThumbnail($clicked) {
        $thumbs.removeClass("is-active");
        $clicked.addClass("is-active");
    }

    // Enable the Add To Cart button once a size is selected
    function enableAddToCart() {
        $addToCart.prop("disabled", false).text("Add To Cart");
    }


    // 4. EVENT HANDLERS


    // When user clicks a thumbnail
    $thumbs.on("click", function () {
        const view = $(this).data("view"); // "no-model", "front", "back"
        currentView = view;
        setActiveThumbnail($(this));
        updateMainImage();
    });

    // When user changes colour
    $colorRadios.on("change", function () {
        currentColor = $(this).val(); // "black", "red", "grey"
        $colorName.text(currentColor);
        updateMainImage();
        updateThumbnails();
    });

    // When user changes quantity
    $quantity.on("change input", function () {
        updateTotal();
    });

    // When user chooses a size
    $sizeRadios.on("change", function () {
        const size = $(this).val(); // "Small", "Medium", "Large"
        $sizeName.text(size);
        enableAddToCart();
    });


    // 5. INITIAL SETUP

    updateTotal();
    updateMainImage();
    updateThumbnails();
    // Button starts disabled from HTML; we only enable after size selection
});