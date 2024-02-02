// Populate modal
function populateTeamModal(data) {
	const teamMemberData = {
		imgPath: data.image.url,
		name: data.name,
		role: data.position,
		bio: data.bio,
	};

	const { imgPath, name, role, bio } = teamMemberData;

	// Team modal elements
	const memberImg = document.querySelector("#modal-member-img");
	const memberName = document.querySelector("#modal-member-name");
	const memberRole = document.querySelector("#modal-member-role");
	const memberBio = document.querySelector("#modal-member-bio");

	// picture
	memberImg.src = imgPath;
	memberImg.alt = `A profile picture of ${name}`;

	// text
	memberName.textContent = name;
	memberRole.textContent = role;

	// bio
	appendData(bio, "p", "text", memberBio);
}

function generateCards(items) {
	items.forEach(item => {
		// Single item data
		const data = item.acf;
		// Container elements
		const container = document.getElementById(`team-members-container`);
		const card = document.createElement("li");
		card.classList.add("member");

		// Append data to the card
		if (data.image.url) {
			const image = document.createElement("div");
			card.appendChild(image);
			const img = document.createElement("img");
			img.src = data.image.url;
			data.image.alt ? (img.alt = data.image.alt) : (img.alt = data.name);
			image.appendChild(img);
		}

		const text = document.createElement("div");
		text.classList.add("text-container");
		card.appendChild(text);

		if (data.name) {
			const name = document.createElement("h2");
			name.textContent = data.name;
			text.appendChild(name);
		}
		if (data.position) {
			const position = document.createElement("h3");
			position.classList.add("role");
			position.textContent = data.position;
			text.appendChild(position);
		}
		if (data.summary) {
			const summary = document.createElement("p");
			summary.textContent = data.summary;
			text.appendChild(summary);
		}

		if (data.bio && text) {
			const btn = document.createElement("button");
			btn.classList.add("btn-main", "team-modal-btn");
			btn.setAttribute("data-role", "open-team-modal");
			btn.setAttribute("data-type", "team-modal");
			btn.setAttribute("data-content", slugify(data.name));
			btn.textContent = "Read More";
			text.appendChild(btn);

			btn.addEventListener("click", () => {
				let modalElement = document.querySelector(`#${btn.dataset.type}`);
				let member = btn.dataset.content;

				// opening modals based on data-content attr
				if (member) {
					// populate modal according to data-content
					populateTeamModal(data);

					// open modal
					toggleModal(modalElement);
					member = "";
				} else {
					// open modal
					toggleModal(modalElement);
				}
			});
		}

		// Append this card to the container
		container.appendChild(card);
	});
}

// Fetch all team members
function getAllTeamData() {
	const apiURL =
		"https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/team?acf_format=standard";

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			const items = response;
			generateCards(items);
			// generateModals(items);
		})
		.catch(error => console.error("Error:", error));
}

getAllTeamData();
