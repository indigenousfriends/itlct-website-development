// const { json } = require("body-parser");

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

// Fetch page data from WordPress
function getPageData(page) {
	const apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/pages?slug=${page}&acf_format=standard`;

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			// Page data
			const data = response[0].acf;

			// Dynamic elements
			const hero = document.getElementById("hero"); // For hero section
			const heroHeading = document.getElementById("hero-heading"); // For h1 in the hero
			const heroSubheading = document.getElementById("hero-subheading");
			const heroImage = document.getElementById("hero-image");

			const btnContainer = document.getElementById("hero-button-container");
			const mainContent = document.getElementById("main-content");

			const cards = document.querySelectorAll("#card-container .card");
			const tiles = data.tile_section;
			console.log(data);
			if (cards.length > 0 && data.tile_section) {
				Object.keys(tiles).forEach(key => {
					const tile = tiles[key];
					const slug = key.replace(/_/g, "-");
					const tileImage = document.querySelector(`#${slug} img`);
					const tileHeading = document.querySelector(
						`#${slug} .card-text-container  h3`,
					);
					const tileText = document.querySelector(
						`#${slug} .card-text-container  p`,
					);
					const tileDescription = document.querySelector(
						`#${slug} .card-description  p`,
					);

					if (tile.image && tileImage) {
						appendData(tile.image, "img", "image", tileImage);
					}
					if (tile.heading && tileHeading) {
						appendData(tile.heading, "h3", "text", tileHeading);
					}
					if (tile.text && tileText) {
						appendData(tile.text, "p", "text", tileText);
					}
					if (tile.description && tileDescription) {
						appendData(tile.description, "p", "text", tileDescription);
					}
				});
			}

			// Append data to elements
			if (data.hero_image.url) {
				appendData(data.hero_image, "img", "image", heroImage);
				hero.style.backgroundImage = `url(${data.hero_image.url})`;
			}
			data.hero_heading
				? appendData(data.hero_heading, "h1", "text", heroHeading)
				: null;
			data.hero_subheading
				? appendData(data.hero_subheading, "h2", "text", heroSubheading)
				: null;
			data.button_1
				? appendData(data.button_1, "button-1", "link", btnContainer)
				: null;
			data.button_2
				? appendData(data.button_2, "button-2", "link", btnContainer)
				: null;
			data.main_content
				? appendData(data.main_content, "div", "markup", mainContent)
				: null;

			if (cards > 0 && data.tile_section) {
				tiles.forEach(tile => {
					const tileData = data.tile_section.tile_section[tile.id];
					const tileImage = tile.querySelector("img");
					const tileTitle = tile.querySelector("h3");
					const tileExcerpt = tile.querySelector("p");

					tileData.image.url && tileImage
						? appendData(tileData.image, "img", "image", tileImage)
						: null;
					tileData.heading && tileTitle
						? appendData(tileData.heading, "h3", "text", tileTitle)
						: null;
					tileData.excerpt && tileExcerpt
						? appendData(tileData.excerpt, "p", "text", tileExcerpt)
						: null;
				});
			}
		})
		.catch(error => console.error("Error:", error));
}

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
			const title = document.getElementById("post-title");
			const description = document.getElementById("description-container");
			const highlights = document.getElementById("highlights-container");
			const btnContainer = document.getElementById("button-container");

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
