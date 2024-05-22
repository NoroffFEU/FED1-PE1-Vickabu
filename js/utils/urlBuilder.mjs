function isLocalhost() {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
}

function buildURL(path) {
    if (isLocalhost()) {
        // Lokal utvikling
        return `http://localhost:port/${path}`;
    } else {
        // GitHub Pages eller annen produksjons-URL
        return `https://norofffeu.github.io/FED1-PE1-Vickabu/${path}`;
    }
}

const linkURL = buildURL('path/to/page.html');
console.log(linkURL); 