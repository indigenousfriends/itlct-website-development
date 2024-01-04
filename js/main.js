/* 
===================================
Land Acknowledgement Modal
===================================
*/

// HTML Reference Variables
let openLaBtn = document.querySelector("#open-la-btn");
let closeLaBtn = document.querySelector("#close-la-btn");
let landAckModal = document.querySelector("#land-ack-modal");

// open land acknowledgement via button
openLaBtn.addEventListener("click", () => {
	landAckModal.classList.remove("hidden");
});

// close land acknowledgement via button
closeLaBtn.addEventListener("click", () => {
	landAckModal.classList.add("hidden");
});

// click on land ack modal overlay
document.addEventListener("click", event => {
	if (event.target.classList.contains("modal-overlay")) {
		landAckModal.classList.add("hidden");
	}
});

// escape key on land ack modal
document.addEventListener("keydown", function (event) {
	if (event.key === "Escape" && !landAckModal.classList.contains("hidden")) {
		landAckModal.classList.add("hidden");
	}
});

/* 
===================================
Mobile Menu
===================================
*/

// HTML Reference Variables
let mobileMenuBtn = document.querySelector("#mobile-menu");
let menuIconOpen = document.querySelector(".menu-icon");
let menuIconClose = document.querySelector(".menu-exit-icon");

let mobileMenuComponent = document.querySelector("#nav-links");

// toggle Mobile Menu via button
mobileMenuBtn.addEventListener("click", () => {
	// toggle close and open icons for menu button
	menuIconOpen.classList.toggle("hidden");
	menuIconClose.classList.toggle("hidden");

	// toggle mobile menu component
	mobileMenuComponent.classList.toggle("open-menu");
});
