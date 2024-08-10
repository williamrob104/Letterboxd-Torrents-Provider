// get matching links or something
// let links = document.querySelectorAll('#search [data-sokoban-feature] a')
let links = document.querySelectorAll('#search a h3')


let svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="500px" height="500px" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width: 100%; height: 100%;">
    <!-- Generator: Sketch 52.2 (67145) - http://www.bohemiancoding.com/sketch -->
    <title>Go to movie on Letterboxd</title>
    <desc>Created with Sketch.</desc>
    <defs>
        <rect id="path-1" x="0" y="0" width="129.847328" height="141.389313"></rect>
        <rect id="path-3" x="0" y="0" width="129.847328" height="141.389313"></rect>
    </defs>
    <g id="letterboxd-decal-dots-neg-rgb" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <circle id="Circle" fill="#FFFFFF" cx="250" cy="250" r="250"></circle>
        <g id="dots-pos" transform="translate(61.000000, 180.000000)">
            <g id="Dots">
                <ellipse id="Green" fill="#00E054" cx="189" cy="69.9732824" rx="70.0786517" ry="69.9732824"></ellipse>
                <g id="Blue" transform="translate(248.152672, 0.000000)">
                    <mask id="mask-2" fill="white">
                        <use xlink:href="#path-1"></use>
                    </mask>
                    <g id="Mask"></g>
                    <ellipse fill="#40BCF4" mask="url(#mask-2)" cx="59.7686766" cy="69.9732824" rx="70.0786517" ry="69.9732824"></ellipse>
                </g>
                <g id="Orange">
                    <mask id="mask-4" fill="white">
                        <use xlink:href="#path-3"></use>
                    </mask>
                    <g id="Mask"></g>
                    <ellipse fill="#FF8000" mask="url(#mask-4)" cx="70.0786517" cy="69.9732824" rx="70.0786517" ry="69.9732824"></ellipse>
                </g>
                <path d="M129.539326,107.022244 C122.810493,96.2781677 118.921348,83.5792213 118.921348,69.9732824 C118.921348,56.3673435 122.810493,43.6683972 129.539326,32.9243209 C136.268159,43.6683972 140.157303,56.3673435 140.157303,69.9732824 C140.157303,83.5792213 136.268159,96.2781677 129.539326,107.022244 Z" id="Overlap" fill="#556677"></path>
                <path d="M248.460674,32.9243209 C255.189507,43.6683972 259.078652,56.3673435 259.078652,69.9732824 C259.078652,83.5792213 255.189507,96.2781677 248.460674,107.022244 C241.731841,96.2781677 237.842697,83.5792213 237.842697,69.9732824 C237.842697,56.3673435 241.731841,43.6683972 248.460674,32.9243209 Z" id="Overlap" fill="#556677"></path>
            </g>
        </g>
    </g>
</svg>`


// find the thing
links.forEach(h => {
    let a = h.closest('a')
	let u = a.getAttribute('href')
	if( u.includes('imdb.com/title/') ){
		let h = a.querySelector('h3')
		if( h ){
			let spl = u.split('title/')
			let id = spl.pop().replace('/','')
			h.parentElement.insertAdjacentHTML("afterend", `<a style="position: relative; display: inline-block; width: 25px; height: 25px; top: 4px; left: 8px;" href="http://letterboxd.com/imdb/${id}">${svg}</a>`)
		}
	}
})