const getServices = (title, year, imdbID) => {
  const query = `${title} ${year}`;
  return [
    {
      name: "YTS",
      url: `https://yts.mx/movies/${formatYTSpath(query)}`,
      icon: "https://yts.mx/assets/images/website/favicon.ico",
      alternative_url: `https://yts.mx/browse-movies/${title}/all/all/0/likes/${year}/all`,
    },
    {
      name: "The Pirate Bay",
      url: `https://thepiratebay.org/search.php?q=${imdbID}&video=on`,
      icon: "https://thepiratebay.org/favicon.ico",
    },
    {
      name: "1337x",
      url: `https://1337x.to/search/${query}/1/`,
      icon: "https://1337x.to/favicon.ico",
    },
    {
      name: "RARBG",
      url: `https://rargb.to/search/?category[]=movies&search=${query}`,
      icon: "https://rargb.to/favicon.ico",
    },
    {
      name: "TorrentGalaxy",
      url: `https://torrentgalaxy.to/torrents.php?search=${imdbID}#results`,
      icon: "https://torrentgalaxy.to/common/favicon/favicon.ico",
    },
    {
      name: "YouTube",
      url: `https://www.youtube.com/results?search_query=${query}`,
      icon: "https://www.youtube.com/favicon.ico",
    },
  ];
}

function formatYTSpath(query) {
  let path = query;
  path = path.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
  path = path.replace(/\s\(.*?\)/g, ' ');                       // Replace content within parentheses and parentheses with space
  path = path.replace(/[':/\(\)]/g, '');                        // Remove characters like quotes, colons, slashes, and parentheses
  path = path.replace(/[^a-zA-Z0-9]/g, ' ');                    // Replace non-alphanumeric characters with space
  path = path.replace(/\s+/g, '-').replace(/^-+|-+$/g, '');     // Replace multiple spaces with a single hyphen and trim
  return path.toLowerCase();                                    // Convert to lowercase
}

const getMovieInfo = () => {
  const details = document.querySelector(".details");
  const title = details?.querySelector("h1")?.innerText?.replace(/(%[0-9A-F]{2}|\s)+/gi, ' ');
  const year = details?.querySelector(".releaseyear > a")?.innerText;

  const url = document.querySelector(".micro-button")?.href;
  const imdbID = url.split("/")[4];

  return [(title ?? ""), (year ?? ""), imdbID]
};

// disables the script that hides the panel
const preload = () => {
  const idk = document.querySelector('div[data-on-load="csi-availability"]');
  if (idk) idk.className = "";
};

const addService = (service) => {
  const services = document.querySelector(".services");
  const p = document.createElement('p');
  p.className = "service";

  const a = document.createElement('a');
  a.href = service.url;
  a.target = "_blank";
  a.className = "label";

  const image = document.createElement('img');
  image.src = service.icon;
  image.width = 20;
  image.height = 20;

  const brand = document.createElement('span');
  brand.className = "brand";
  brand.append(image);

  const title = document.createElement('span');
  title.className = "title";
  title.innerText = service.name;

  a.append(brand);
  a.append(title);
  p.append(a);
  services.append(p);

  if ('alternative_url' in service) {
    fetch(service.url).then(response => {
      if (response.status === 404) {
        a.href = service.alternative_url
        if (service.name.toLowerCase() === 'yts') {
          fetch(service.alternative_url)
            .then(response => response.text())
            .then(html => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              const movieLinks = doc.querySelectorAll('a.browse-movie-link');
              if (movieLinks.length == 1)
                a.href = movieLinks[0].href;
            });
        }
      }
    });
  }
}

const hideOther = () => {
  document.querySelector(".services").innerHTML = "";

  document.querySelectorAll(".other").forEach((a) => {
    a.remove(); // removes every element with the class 'other'
  });
};

const init = () => {
  const styleString = `
  .watch-panel .services .service {
    display: flex !important;
  }
`;

  const style = document.createElement("style");
  style.textContent = styleString;
  document.head.append(style);
};

const insertServices = () => {
  hideOther();
  const [title, year, imdbID] = getMovieInfo();
  const services = getServices(title, year, imdbID);
  init();

  for (const service of services) {
    addService(service);
  }
};

const main = () => {
  const watchDiv = document?.getElementById("watch");
  const servicesPanel = watchDiv?.querySelector(".services");

  if (!servicesPanel) {
    var section = document.createElement("SECTION");
    section.classList.add("services");
    watchDiv.append(section);
  }
  insertServices();
};

preload();

window.onload = () => {
  main();
};
