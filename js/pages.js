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
			// Hero
			const hero = document.getElementById("hero"); // For hero section
			const heroHeading = document.getElementById("hero-heading"); // For h1 in the hero
			const heroSubheading = document.getElementById("hero-subheading");
			const heroImage = document.getElementById("hero-image");
			const heroButton1 = document.getElementById("hero-button-1");
			const heroButton2 = document.getElementById("hero-button-2");

			if (data.hero_image.url) {
				appendData(data.hero_image, "img", "image", heroImage);
				heroImage.setAttribute("src", data.hero_image.url);
				data.hero_image.alt
					? heroImage.setAttribute("alt", data.hero_image.alt)
					: heroImage.setAttribute("alt", "If These Lands Could Talk");
				hero.style.backgroundImage = `url(${data.hero_image.url})`;
			}
			data.hero_heading
				? appendData(data.hero_heading, "h1", "text", heroHeading)
				: null;
			data.hero_subheading
				? appendData(data.hero_subheading, "h2", "text", heroSubheading)
				: null;
			data.hero_button_1
				? appendData(data.hero_button_1, "hero-button-1", "link", heroButton1)
				: null;
			data.hero_button_1
				? appendData(data.hero_button_2, "hero-button-2", "link", heroButton2)
				: null;

			// Main Content Sections
			const mainContent = document.getElementById("main-content");
			data.main_content
				? appendData(data.main_content, "div", "markup", mainContent)
				: null;

			// Generic Content Sections
			const sections = document.querySelectorAll("section");
			sections.forEach(section => {
				const sectionID = section.id;
				const slug = sectionID.replace(/-/g, "_");

				if (
					sectionID &&
					slug.includes("section") &&
					data.hasOwnProperty(slug)
				) {
					const sectionData = data[slug];
					const sectionHeading = document.querySelector(`#${sectionID} h2`);
					const sectionText = document.querySelector(`#${sectionID} p`);
					const sectionQuote = document.querySelector(
						`#${sectionID} blockquote p`,
					);
					const sectionImage = document.querySelector(`#${sectionID} img`);
					const sectionButton = document.querySelector(`#${sectionID} a`);
					console.log(sectionImage);

					sectionData.image && sectionImage
						? appendData(sectionData.image, "img", "image", sectionImage)
						: null;
					sectionData.heading && sectionHeading
						? appendData(sectionData.heading, "h2", "text", sectionHeading)
						: null;
					sectionData.text && sectionText
						? appendData(sectionData.text, "p", "text", sectionText)
						: null;
					sectionData.quote && sectionQuote
						? appendData(sectionData.quote, "blockquote", "text", sectionQuote)
						: null;

					if (sectionData.button && sectionButton) {
						// appendData(sectionData.button, "button", "link", sectionButton);
						sectionButton.href = sectionData.button.url;
						sectionButton.textContent = sectionData.button.title;
					}
				} else {
					null;
				}
			});

			// Cards
			const cardElements = document.querySelectorAll("#card-container .card");
			const cards = data.card_section;

			if (cardElements.length > 0 && data.card_section) {
				Object.keys(cards).forEach(key => {
					const card = cards[key];
					const slug = key.replace(/_/g, "-");
					const cardImage = document.querySelector(`#${slug} img`);
					const cardHeading = document.querySelector(
						`#${slug} .card-text-container  h3`,
					);
					const cardText = document.querySelector(
						`#${slug} .card-text-container  p`,
					);
					const cardDescription = document.querySelector(
						`#${slug} .card-description  p`,
					);

					if (card.image && cardImage) {
						appendData(card.image, "img", "image", cardImage);
					}
					if (card.heading && cardHeading) {
						appendData(card.heading, "h3", "text", cardHeading);
					}
					if (card.text && cardText) {
						appendData(card.text, "p", "text", cardText);
					}
					if (card.description && cardDescription) {
						appendData(card.description, "p", "text", cardDescription);
					}
				});
			}
		})
		.catch(error => console.error("Error:", error));
}
