/* 
===================================
Modals
===================================
*/

// HTML Reference Variables
let openModalBtns = document.querySelectorAll(`[data-role="open-modal"]`);
let closeModalBtns = document.querySelectorAll(`[data-role="close-modal"]`);

// Team Modals Data

let teamBioData = {
	natasha: {
		imgPath: "/assets/images/pages/team/natasha-rabsatt.png",
		name: "Natasha Rabsatt, M.S.",
		role: "Co-Founder",
		email: "info@iftheselandscouldtalk.org",
		linkedin: "https://www.linkedin.com/in/natasha-rabsatt/",
		bio: [
			"Natasha is Caribbean afro-indigenous with Classic Taíno (Puerto Rico - Boríken) and African heritage.",
			"She is passionate about creating value and social impact through mindful stewardship with innovation, technology, and creative experiences. She is an avid world traveler and has lived in many different regions of the United States and also abroad.",
			"Professionally, Natasha is a strategic designer, tech strategist, advisor, U.S. Army veteran, and entrepreneur. She has nearly 2 decades of experience in diverse industries and sectors leading people and directing initiatives and programs centered around learning, design, innovation, business development, and technology. Over the years, she has supported a number of businesses and organizations through the design and development of inclusive learning experiences, business development, innovation strategy, creative design, and Immersive Technology - AR/VR, Emerging Technologies - NFTs, Blockchain, Web 3.0 initiatives, and more.",
		],
	},
	marsha: {
		imgPath: "/assets/images/pages/team/marsha-maxwell.png",
		name: "Dr. Marsha Maxwell, CETL ",
		role: "Co-founder",
		email: "info@iftheselandscouldtalk.org",
		linkedin: "https://www.linkedin.com/in/natasha-rabsatt/",
		bio: [
			"With strategic, tactical and operational technology experience, Dr. Marsha Maxwell creates innovative environments and applications that harness the power of emerging technologies and neuroscience to enhance the educator's reach to better engage students and foster a culture of innovation in organizations.",
			"Her areas of interest include Augmented Analytics, Immersive Experiences, Artificial Intelligence, Machine Learning, STEAM programs, and cybersecurity. Marsha has also been very active in bringing STEM/STEAM initiatives to life especially for underserved and underrepresented groups throughout their educational journey from kindergarten to university and beyond.",
			"Marsha has been a featured speaker for various organizations' educational summits and workshops including Microsoft, Apple, and Google for her skills in education technology, innovation leadership, strategic analysis and decision-making, and equity and inclusion in technology.",
		],
	},
};

// Team Modal Functions

// populate modal
const populateTeamModal = profile => {
	// deconstructing object
	const { imgPath, name, role, bio, email, linkedin } = profile;

	// Team modal elements
	let memberImg = document.querySelector("#member-img");
	let memberName = document.querySelector("#member-name");
	let memberRole = document.querySelector("#member-role");
	let memberEmail = document.querySelector("#member-email");
	let memberLinkedin = document.querySelector("#member-linkedin");
	let memberBio = document.querySelector("#member-bio");

	// picture
	memberImg.src = imgPath;
	memberImg.alt = name;

	// text
	memberName.textContent = name;
	memberRole.textContent = role;

	// bio
	bio.forEach(paragraph => {
		let pElement = document.createElement("p");
		pElement.textContent = paragraph;
		memberBio.appendChild(pElement);
	});

	// socials
	memberEmail.href = `mailto:${
		email || "mailto:info@iftheselandscouldtalk.org"
	}`;
	memberLinkedin =
		linkedin ||
		"https://www.linkedin.com/company/if-these-lands-could-talk-itlct/";
};

// Global Modal Events
// open modal button events
openModalBtns.forEach(button => {
	button.addEventListener("click", () => {
		// opening modals based on data-type attr
		let modalElement = document.querySelector(`#${button.dataset.type}`);

		if (button.dataset.content) {
			let member = button.dataset.content;
			populateTeamModal(teamBioData[member]);
			modalElement.classList.remove("hidden");
		} else {
			modalElement.classList.remove("hidden");
		}
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
