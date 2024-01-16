// Fetch page data from Strapi
function getPageData(page, source) {
	const cms = source;
	let apiURL = "";

	if (cms === "strapi") {
		apiURL = `https://cms.iftheselandscouldtalk.org/api/${page}?populate=*`;
	} else if (cms === "wordpress") {
		apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/page`;
	}

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

function getItemData(collection, source) {
	const urlParams = new URLSearchParams(window.location.search);
	const slug = urlParams.get("e");
	let apiURL = "";

	if (source === "strapi") {
		apiURL = `https://cms.iftheselandscouldtalk.org/api/${collection}/${slug}?populate=*`;
	} else if (source === "wordpress") {
		apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/${collection}?slug=${slug}`;
	}

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			console.log(response);

			let p = {};

			if (source === "strapi") {
				p = response.data.attributes;
			} else if (source === "wordpress") {
				p = response[0].acf;
			}

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
function getCollectionData(collection, source) {
	const cms = source;
	let apiURL = "";

	if (cms === "strapi") {
		apiURL = `https://cms.iftheselandscouldtalk.org/api/${collection}-items?populate=*`;
	} else if (cms === "wordpress") {
		apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/${collection}`;
	}

	console.log(apiURL);

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			let posts = response;

			posts.forEach(post => {
				const container = document.getElementById(`${collection}-container`);
				const postDiv = document.createElement("div");
				postDiv.classList.add("card");

				const postImage = document.createElement("img");
				const postTitle = document.createElement("h3");

				const postContent = document.createElement("p");
				const postLink = document.createElement("a");
				postLink.classList.add("btn-main");

				let p = post.attributes;

				if (cms === "wordpress") {
					p = post.acf;
				}

				// postImage.src = cmsURL + p.featuredImage.data.attributes.url;
				postTitle.textContent = p.title;
				if (cms == "strapi") {
					postContent.innerHTML = marked.parse(p.content);
				} else if (cms == "wordpress") {
					postContent.innerHTML = p.content;
				}

				postLink.innerHTML = "Read more";
				postLink.href = "/events/event.html?e=" + post.slug;

				postDiv.appendChild(postTitle);
				postDiv.appendChild(postImage);
				postDiv.appendChild(postContent);
				postDiv.appendChild(postLink);

				container.appendChild(postDiv);
			});
		})
		.catch(error => console.error("Error:", error));
}
