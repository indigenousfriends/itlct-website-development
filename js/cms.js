// Fetch page data from Strapi
function getPageData(page, source) {
	const cms = source;
	const apiURL = "";

	if (cms === "strapi") {
		const apiURL = `https://cms.iftheselandscouldtalk.org/api/${page}?populate=*`;
	} else if (cms === "wordpress") {
		const apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2`;
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

function getItemData(collection, item) {
	const urlParams = new URLSearchParams(window.location.search);
	const slug = urlParams.get("e");
	console.log(slug);

	fetch(`${apiURL}/${collection}/${slug}?populate=*`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			const post = response.data;
			const postTitle = document.getElementById("post-title");
			const postContent = document.getElementById("content-container");

			postTitle.textContent = post.attributes.title;
			postContent.innerHTML = marked.parse(post.attributes.content);
		})
		.catch(error => console.error("Error:", error));
}

// Fetch all events
function getCollectData(collection, source) {
	const cms = source;
	const apiURL = "";

	if (cms === "strapi") {
		const apiURL = `https://cms.iftheselandscouldtalk.org/api/${collection}-items?populate=*`;
	} else if (cms === "wordpress") {
		const apiURL = `https://wp.iftheselandscouldtalk.org/wp-json/wp/v2/posts?type=events`;
	}

	fetch(`${apiURL}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then(response => response.json())
		.then(response => {
			console.log(response.data);
			response.data.forEach(post => {
				const container = document.getElementById(`${collection}-container`);
				const postDiv = document.createElement("div");
				postDiv.classList.add("post");

				const postImage = document.createElement("img");
				const postTitle = document.createElement("h2");
				const postContent = document.createElement("p");
				const postLink = document.createElement("a");

				// postImage.src = cmsURL + post.attributes.featuredImage.data.attributes.url;
				postTitle.textContent = post.attributes.title;
				postContent.innerHTML = marked.parse(post.attributes.content);
				postLink.innerHTML = "Read more";
				postLink.href = "/events/event.html?e=" + post.id;

				postDiv.appendChild(postTitle);
				postDiv.appendChild(postImage);
				postDiv.appendChild(postContent);
				postDiv.appendChild(postLink);

				container.appendChild(postDiv);
			});
		})
		.catch(error => console.error("Error:", error));
}
