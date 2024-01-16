/* 
===================================
Contact Form
===================================
*/
// HTML Reference Variables
// form elements
let contactForm = document.querySelector("#contact-form");
let nameInput = document.querySelector("#name-input");
let emailInput = document.querySelector("#email-input");
let messageInput = document.querySelector("#message-input");

// User response element
let formResponseContainer = document.querySelector("#form-response-container");
let formResponse = document.querySelector("#form-response");

// Responses
let successRes = "Success - we will get back to you soon!";
let errorRes = "Something went wrong on our end - please try again later!";

// Form submission
window.onload = function () {
	const urlParams = new URLSearchParams(window.location.search);

	if (urlParams.has("success") && urlParams.get("success") === "true") {
		formResponse.textContent = successRes;
		formResponseContainer.classList.add("success");
	}

	if (urlParams.has("success") && urlParams.get("success") === "false") {
		formResponse.textContent = errorRes;
	}
};
