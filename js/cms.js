// const { json } = require("body-parser");

// Helper functions for appending data to DOM elements
function appendData(data, element, method, target) {
	if (data && target) {
		if (method === "text") {
			target.textContent = "";
			target.appendChild(document.createTextNode(data));
		} else if (method === "link") {
			let el;
			if (target) {
				el = document.getElementById(target);
				console.log(`Found target: ${target}`);
			} else {
				el = document.createElement(element);
				console.log("Created element");
			}

			el.href = data.url;
			el.textContent = data.title;
			target.appendChild(el);
		} else if (method === "markup") {
			target.innerHTML = "";
			target.innerHTML = marked.parse(data);
		} else if (method === "image") {
			const el = document.createElement(element);
			if (data.url) {
				el.src = data.url;
				data.alt ? (el.alt = data.alt) : "If These Lands Could Talk";
				target.appendChild(el);
			}
		} else {
			el.innerHTML = data;
			target.appendChild(el);
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
			const pageTitle = document.getElementById("page-title"); // For <title> tag
			const hero = document.getElementById("hero"); // For hero section
			const heroHeading = document.getElementById("hero-heading"); // For h1 in the hero
			const heroSubheading = document.getElementById("hero-subheading");
			const heroImage = document.getElementById("hero-image");

			// TODO: Add button repeater functionality
			const heroButtonContainer = document.getElementById(
				"hero-button-container",
			);
			const mainContent = document.getElementById("main-content");

			// Append data to elements
			appendData(data.hero_heading, "h1", "text", heroHeading);
			appendData(data.hero_subheading, "h2", "text", heroSubheading);

			if (data.hero_image.url) {
				appendData(data.hero_image, "img", "image", heroImage);
				hero.style.backgroundImage = `url(${data.hero_image.url})`;
			}

			appendData(data.main_content, "div", "markup", mainContent);
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
			data = response[0].acf;

			const title = document.getElementById("post-title");
			const description = document.getElementById("description-container");
			const highlights = document.getElementById("highlights-container");
			const btn1 = document.getElementById("button-1");
			const btn2 = document.getElementById("button-2");
			console.log(btn1);
			appendData(data.title, "h1", "text", title);
			appendData(data.content, "div", "markup", description);
			appendData(data.button_1, "a", "link", btn1);
			// appendData(data.button_2, "a", "link", btn2);
			appendData(data.highlights, "div", "markup", highlights);
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
			const posts = response;

			// Generate cards for each post
			posts.forEach(post => {
				// Single event data
				const data = post.acf;

				// Container elements
				const container = document.getElementById(`${collection}-container`);
				const card = document.createElement("a");
				card.classList.add("card", "event");
				card.href = `events/event.html?e=${post.slug}`;

				// Append data to the card
				if (data.featured_image.url) {
					const image = document.createElement("img");
					image.src = data.featured_image.url;
					data.featured_image.alt
						? (image.alt = data.featured_image.alt)
						: "If These Lands Could Talk";
					card.appendChild(image);
				}

				if (data.title) {
					const title = document.createElement("h3");
					title.textContent = data.title;
					card.appendChild(title);
				}

				if (data.excerpt) {
					const excerpt = document.createElement("p");
					excerpt.textContent = data.excerpt;
					card.appendChild(excerpt);
				}

				// Append this card to the container
				container.appendChild(card);
			});
		})
		.catch(error => console.error("Error:", error));
}
