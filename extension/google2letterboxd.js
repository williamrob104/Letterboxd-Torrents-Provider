// get matching links or something
const links = document.querySelectorAll('#search a h3')

// letterboxd icon
const img = document.createElement('img')
img.src = "https://a.ltrbxd.com/logos/letterboxd-decal-dots-neg-rgb.svg"
img.style.width = '25px'
img.style.height = '25px'
img.style.position = 'relative'
img.style.top = '6px'
img.style.left = '8px'

// find IMDB search result and add letterboxd link
links.forEach(h => {
    const a = h.closest('a')
	const u = a.getAttribute('href')
	if( u.includes('imdb.com/title/') ){
		const h = a.querySelector('h3')
		if(h){
			const spl = u.split('title/')
			const id = spl.pop().replace('/','')

            const link = document.createElement('a')
            link.href = `https://letterboxd.com/imdb/${id}`
            link.appendChild(img.cloneNode(true))
            h.parentElement.insertAdjacentElement("afterend", link)
		}
	}
})


// Find element with IMDb/Letterboxd
const imdbElement = document.querySelector('a span[title="IMDb"]');
const letterboxdElement = document.querySelector('a span[title="Letterboxd"]');

if (imdbElement && !letterboxdElement) {
    // Find the closest <a> tag (which is the parent link element)
    const imdbLink = imdbElement.closest('a');

    // Extract the IMDb ID from the href attribute
    const imdbUrl = imdbLink.getAttribute('href');
	const imdbId = imdbUrl.split('title/').pop().replace('/','')
    const letterboxdUrl = `https://letterboxd.com/imdb/${imdbId}`

    // Construct the letterboxdLink
    const letterboxdLink = imdbLink.cloneNode(true)
    letterboxdLink.href = letterboxdUrl

    const spans = letterboxdLink.querySelectorAll('span')

    const span1 = Array.from(spans).find(span => span.textContent.includes('/10'));
    span1.textContent = '/5';

    const span2 = Array.from(spans).find(span => span.textContent.trim() === 'IMDb');
    span2.textContent = 'Letterboxd';

    // Append the letterboxdLink to the DOM
    imdbLink.parentElement.appendChild(letterboxdLink);

    // Fetch the Letterboxd page and extract the rating
    fetch(letterboxdUrl)
        .then(response => response.text())
        .then(text => {
            // Use regex to find the ratingValue
            const ratingMatch = text.match(/"ratingValue"\s*:\s*(\d+(\.\d+)?)/);
            if (ratingMatch) {
                const rating = parseFloat(ratingMatch[1]);
                span1.textContent = `${rating.toFixed(1)}/5`;
            } else if (/IMDB ID not found/i.test(text)) {
                letterboxdLink.remove();
            } else {
                console.error('Letterboxd rating not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching Letterboxd page:', error);
        });
}
