/* 
===================================
Modals
===================================
*/

// HTML Reference Variables
let openModalBtns = document.querySelectorAll(`[data-role="open-modal"]`);
let closeModalBtns = document.querySelectorAll(`[data-role="close-modal"]`);
console.log(openModalBtns);
// toggle modal on and off
const toggleModal = modal => {
	document.body.classList.toggle("disable-scroll");
	modal.classList.toggle("hidden");
};

// Global Modal Events
// open modal button events
openModalBtns.forEach(button => {
	button.addEventListener("click", () => {
		let modalElement = document.querySelector(`#${button.dataset.type}`);

		let member = button.dataset.content;
		console.log(`Found modals: ${modalElement}`);

		// opening modals based on data-content attr
		if (member) {
			// populate modal according to data-content
			populateTeamModal(teamModalData[member]);

			// open modal
			toggleModal(modalElement);
			member = "";
		} else {
			console.log("No member found");
			// open modal
			toggleModal(modalElement);
		}
	});
});

// exit via close modal button
closeModalBtns.forEach(button => {
	button.addEventListener("click", () => {
		let modalElement = button.closest(".modal-overlay");
		toggleModal(modalElement);
	});
});

// exit modal via click on modal overlay
document.addEventListener("click", event => {
	if (event.target.classList.contains("modal-overlay")) {
		toggleModal(event.target);
	}
});

// escape key on modal
document.addEventListener("keydown", function (event) {
	let allModalElements = document.querySelectorAll(".modal-overlay");

	if (event.key === "Escape") {
		allModalElements.forEach(modal => {
			if (!modal.classList.contains("hidden")) {
				toggleModal(modal);
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

	if (!menuIconOpen.classList.contains("hidden")) {
		mobileMenuBtn.ariaLabel = "toggle mobile menu on";
	} else {
		mobileMenuBtn.ariaLabel = "toggle mobile menu off";
	}
	// toggle mobile menu component
	mobileMenuComponent.classList.toggle("open-menu");
});

/* 
===================================
Content Management System
===================================
*/
// Helper functions for appending data to DOM elements
function appendData(data, element, method, dest) {
	if (data && dest) {
		if (method === "text") {
			dest.textContent = "";
			dest.appendChild(document.createTextNode(data));
		} else if (method === "link") {
			let el = document.getElementById(element);

			if (el) {
				el.href = data.url;
				el.textContent = "";
				el.textContent = data.title;
			} else {
				el = document.createElement("a");
				el.href = data.url;
				el.textContent = data.title;
				el.classList.add("btn-main", "btn-hover-drk");
				dest.appendChild(el);
			}
		} else if (method === "markup") {
			dest.innerHTML = "";
			dest.innerHTML = marked.parse(data);
		} else if (method === "image") {
			if (!dest && data.url) {
				// TODO Figure out what's going on with this.
				el = document.createElement("img");
				el.src = data.url;
				el.alt ? (el.alt = data.alt) : "If These Lands Could Talk";
				el.appendChild(dest);
			} else {
				dest.setAttribute("src", data.url);
				data.alt
					? dest.setAttribute("alt", data.alt)
					: dest.setAttribute("alt", "If These Lands Could Talk");
			}
		} else {
			el.innerHTML = data;
			el.appendChild(dest);
		}
	}
}

// Slug helper function
function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, "-") // Replace spaces with -
		.replace(/[^\w-]+/g, "") // Remove all non-word chars
		.replace(/--+/g, "-") // Replace multiple - with single -
		.replace(/^-+/, "") // Trim - from start of text
		.replace(/-+$/, ""); // Trim - from end of text
}
