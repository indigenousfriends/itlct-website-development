/* 
===================================
Modals
===================================
*/

// Land Acknowledgement Variables
let openLaBtn = document.querySelector("#open-la-btn");
let landAckModal = document.querySelector("#land-ack-modal");

// Team Modal Variables
let teamModalBtns = document.querySelector(".team-modal-btn");
let openModalBtns = document.querySelectorAll('[data-role="open-modal"]');
let closeModalBtns = document.querySelectorAll(".close-modal");
let teamModalComponent = document.querySelector("#team-modal");

// open land acknowledgement via button
openLaBtn.addEventListener("click", () => {
	landAckModal.classList.remove("hidden");
});

// Global Modal Events
// open modal button events

openModalBtns.forEach(button => {
	button.addEventListener("click", () => {
		teamModalComponent.classList.add("hidden");
	});
});
// exit via close modal button
closeModalBtns.forEach(button => {
	button.addEventListener("click", () => {
		let modalElement = button.closest(".modal-overlay");
		modalElement.classList.add("hidden");
	});
});

// exit modal via click on modal overlay
document.addEventListener("click", event => {
	if (event.target.classList.contains("modal-overlay")) {
		event.target.classList.add("hidden");
	}
});

// escape key on modal
document.addEventListener("keydown", function (event) {
	let allModalElements = document.querySelectorAll(".modal-overlay");

	if (event.key === "Escape") {
		allModalElements.forEach(modal => {
			if (!modal.classList.contains("hidden")) {
				modal.classList.add("hidden");
			}
		});
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
/* 
===================================
Team Modal
===================================
*/
