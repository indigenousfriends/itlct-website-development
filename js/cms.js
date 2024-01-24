// Helper functions
function appendData(data, element, method, target) {
	if (data) {
		const el = document.createElement(element);

		if (method === "text") {
			target.textContent = "";
			target.appendChild(document.createTextNode(data));
		} else if (method === "markup") {
			const markup = marked.parse(data);
			target.innerHTML = "";
			target.appendChild(document.createTextNode(markup));
		} else if (method === "image") {
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
	const apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/pages?slug=${page}`;

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			// Page data
			const page = response[0].acf;
			// console.log(page);

			// Dynamic eleemnts
			const pageTitle = document.getElementById("page-title"); // For <title> tag
			const heroHeading = document.getElementById("hero-heading"); // For h1 in the hero
			const heroSubheading = document.getElementById("hero-subheading");
			const heroImage = document.getElementById("hero-image");
			const heroButtonContainer = document.getElementById(
				"hero-button-container",
			);
			const mainContent = document.getElementById("main-content");
			// const pageContent = document.getElementById("content-container");

			// Append data to elements
			appendData(page.hero_heading, "h1", "text", heroHeading);
			appendData(page.hero_subheading, "h2", "text", heroSubheading);
			appendData(page.hero_image, "img", "image", heroImage);
			console.log(page.main_content);

			appendData(page.main_content, "div", "markup", mainContent);

			// TODO: Add button repeater functionality
		})
		.catch(error => console.error("Error:", error));
}

function getItemData(collection) {
	const urlParams = new URLSearchParams(window.location.search);
	const slug = urlParams.get("e");
	let apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/${collection}?slug=${slug}`;

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			p = response[0].acf;
			console.log(p);

			const title = document.getElementById("post-title");
			const description = document.getElementById("description-container");
			const highlights = document.getElementById("highlights-container");

			appendData(p.title, "h1", "text", title);
			appendData(p.content, "div", "markup", description);
			appendData(p.highlights, "div", "markup", highlights);
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
				// Single post data
				const p = post.acf;
				// Setup container elements
				const container = document.getElementById(`${collection}-container`);
				const card = document.createElement("a");
				card.classList.add("card", "event");
				card.href = `events/event.html?e=${post.slug}`;

				// Append data to card
				appendData(p.featured_image, "img", "image", card);
				appendData(p.title, "h3", "text", card);
				appendData(p.excerpt, "p", "markup", card);

				// Append card to container
				container.appendChild(card);
			});
		})
		.catch(error => console.error("Error:", error));
}
