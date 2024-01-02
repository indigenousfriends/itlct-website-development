let openLaBtn = document.querySelector("#open-la-btn");
let closeLaBtn = document.querySelector("#close-la-btn");
let landAckModal = document.querySelector("#land-ack-modal");

// open land acknowledgement
openLaBtn.addEventListener("click", () => {
	landAckModal.classList.remove("hidden");
});

// close land acknowledgement
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
