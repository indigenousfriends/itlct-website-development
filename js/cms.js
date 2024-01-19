// Fetch page data from Strapi
function getPageData(page) {
	const apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/${page}`;

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			const page = response.data;
			const pageTitle = document.getElementById("page-title");
			const pageContent = document.getElementById("content-container");

			pageTitle.textContent = page.attributes.Title;
			pageContent.innerHTML = page.attributes.content;
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

			const postTitle = document.getElementById("post-title");
			const postContent = document.getElementById("content-container");
			const postHighlights = document.getElementById("highlights-container");

			postTitle.textContent = p.title;
			postContent.innerHTML = marked.parse(p.content);
			postHighlights.innerHTML = marked.parse(p.highlights);
		})
		.catch(error => console.error("Error:", error));
}

// Fetch all events
function getCollectionData(collection) {
	const apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/${collection}?_fields=acf&acf_format=standard`;

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			const posts = response;

			posts.forEach(post => {
				const p = post.acf;

				const container = document.getElementById(`${collection}-container`);
				const postDiv = document.createElement("div");
				postDiv.classList.add("card", "event");

				const postImage = document.createElement("img");
				const postTitle = document.createElement("h3");
				const postContent = document.createElement("p");

				postImage.src = p.featured_image.url;
				postImage.alt = p.featured_image.alt;
				postTitle.textContent = p.title;
				postContent.innerHTML = p.excerpt;

				postDiv.appendChild(postImage);
				postDiv.appendChild(postTitle);
				postDiv.appendChild(postContent);

				container.appendChild(postDiv);
			});
		})
		.catch(error => console.error("Error:", error));
}
