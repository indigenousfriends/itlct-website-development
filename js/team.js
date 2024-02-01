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

			// Generate cards for each item
			items.forEach((item, index) => {
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

				const btn = document.createElement("button");
				btn.classList.add("btn-main", "team-modal-btn");
				btn.setAttribute("data-role", "open-modal");
				btn.setAttribute("data-type", "team-modal");
				btn.setAttribute("data-content", slugify(data.name));
				btn.textContent = "Read More";
				text.appendChild(btn);

				// Append this card to the container
				container.appendChild(card);
			});
		})
		.catch(error => console.error("Error:", error));
}

getAllTeamData();
