function getItemData(collection) {
	const urlParams = new URLSearchParams(window.location.search);
	const slug = urlParams.get("e");
	const apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/${collection}?slug=${slug}&acf_format=standard`;

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			const data = response[0].acf;
			const posterContainer = document.getElementById("poster-container");
			const title = document.getElementById("post-title");
			const description = document.getElementById("description-container");
			const highlights = document.getElementById("highlights-container");
			const btnContainer = document.getElementById("button-container");

			if (data.featured_image.url) {
				const image = document.createElement("img");
				image.src = data.featured_image.url;
				data.featured_image.alt
					? (image.alt = data.featured_image.alt)
					: "If These Lands Could Talk";

				image.classList.add("event-poster");
				posterContainer.appendChild(image);
			}
			response[0].title.rendered && title // Using the WordPress title instead of the ACF title
				? appendData(response[0].title.rendered, "h1", "markup", title)
				: null;
			data.content && description
				? appendData(data.content, "div", "markup", description)
				: null;
			data.button_1 && btnContainer
				? appendData(data.button_1, "button-1", "link", btnContainer)
				: null;
			data.button_2 && btnContainer
				? appendData(data.button_2, "button-2", "link", btnContainer)
				: null;
			data.highlights && highlights
				? appendData(data.highlights, "div", "markup", highlights)
				: null;
		})
		.catch(error => console.error("Error:", error));
}

// Fetch all events
function getCollectionData(collection) {
	const apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/${collection}?acf_format=standard`;

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

				// Using dates to sort events
				const currentDate = new Date();
				data.enddate ? (endDate = new Date(data.enddate)) : null;
				endDate ? (past = endDate < currentDate) : null;

				// Container elements
				const container = document.getElementById(`${collection}-container`);
				const pastEventsContainer = document.getElementById(
					"previous-events-container",
				);
				const card = document.createElement("a");
				card.classList.add("card", "event");
				card.href = `events/event.html?e=${item.slug}`;
				// Append data to the card
				if (data.featured_image.url) {
					const image = document.createElement("img");
					image.src = data.featured_image.url;
					data.featured_image.alt
						? (image.alt = data.featured_image.alt)
						: "If These Lands Could Talk";
					card.appendChild(image);
				}
				if (response[index].title) {
					const title = document.createElement("h3");
					title.textContent = response[index].title.rendered;
					card.appendChild(title);
				}
				if (data.excerpt) {
					const excerpt = document.createElement("p");
					excerpt.textContent = data.excerpt;
					card.appendChild(excerpt);
				}
				// Append this card to the container
				if (past) {
					pastEventsContainer.appendChild(card);
				} else {
					container.appendChild(card);
				}
			});
		})
		.catch(error => console.error("Error:", error));
}
