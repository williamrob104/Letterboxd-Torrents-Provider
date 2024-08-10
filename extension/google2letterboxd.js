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
            link.appendChild(img.cloneNode())
            h.parentElement.insertAdjacentElement("afterend", link)
		}
	}
})


// Find the element with title="IMDb" and aria-hidden="true"
const imdbElement = document.querySelector('span[title="IMDb"][aria-hidden="true"]');

// If the element exists, proceed
if (imdbElement) {
    // Find the closest <a> tag (which is the parent link element)
    const imdbLink = imdbElement.closest('a');

    // Extract the IMDb ID from the href attribute
    const u = imdbLink.getAttribute('href');
    const spl = u.split('title/')
	const id = spl.pop().replace('/','')
    const url = `https://letterboxd.com/imdb/${id}`

    const letterboxdLink = document.createElement('a');
    letterboxdLink.href = url;
    letterboxdLink.className = imdbLink.className

    const span1 = document.createElement('span');
    span1.className = imdbLink.querySelectorAll('span')[0].className;
    span1.textContent = '/5';
    letterboxdLink.appendChild(span1);

    const span2 = document.createElement('span');
    span2.className = imdbLink.querySelectorAll('span')[1].className;
    span2.textContent = 'Letterboxd';
    letterboxdLink.appendChild(span2);

    // Append the letterboxdLink to the DOM
    imdbLink.parentElement.appendChild(letterboxdLink);

    // Fetch the Letterboxd page and extract the rating
    fetch(url)
        .then(response => response.text())
        .then(text => {
            // Use regex to find the ratingValue
            const ratingMatch = text.match(/"ratingValue"\s*:\s*(\d+(\.\d+)?)/);
            if (ratingMatch) {
                const rating = parseFloat(ratingMatch[1]);
                span1.textContent = `${rating.toFixed(1)}/5`;
            } else {
                console.error('Letterboxd rating not found.');
            }
        })
        .catch(error => {
            console.error('Error fetching Letterboxd page:', error);
        });
}
