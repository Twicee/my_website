import { toHtmlElement } from './toHtmlElement.mjs';

function createHeader(links) {
  const navLinks = links.map(link => {
    return `<li><a href="${link.href}">${link.text}</a></li>`;
  }).join('');

  return `
    <header class="site-header">
      <h1 class="page-title">Adrian Elias</h1>
      <label class="dark-mode-toggle">
        <input type="checkbox" autocomplete="off" />
        Dark mode
      </label>
      <button id="menu-button">Menu</button>
      <nav class="main-nav">
        <ul>
          ${navLinks}
        </ul>
      </nav>
    </header>
  `;
}

function insertHeader(links) {
  // Check if the header already exists (avoid duplicate headers)
  if (document.querySelector('.site-header')) return; 

  const body = document.querySelector('body');
  const headerHtml = createHeader(links);
  const headerFragment = toHtmlElement(headerHtml);
  body.prepend(headerFragment);
}

const linksForHomePage = [
  { href: './index.html', text: 'Home' },
  { href: '#hobbies', text: 'Hobbies' },
  { href: '#contact-info', text: 'Contact Information' },
  { href: './fav_classes.html', text: 'Favorite Classes' }
];

const linksForFavClassesPage = [
  { href: './index.html', text: 'Home' }
];

if (window.location.pathname === "/index.html" || "/") {
  insertHeader(linksForHomePage);
} else if (window.location.pathname === "/fav_classes.html") {
  insertHeader(linksForFavClassesPage);
}

let eventTarget = document.getElementById('menu-button');

function handleButtonClick() {
    const nav = document.querySelector('.main-nav');
    if (nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
}

eventTarget.addEventListener('click', handleButtonClick);

// Add media query listener to reset nav display on desktop
const mediaQuery = window.matchMedia('(min-width: 943px)');

function handleMediaChange(e) {
    if (e.matches) { // Desktop view
        const nav = document.querySelector('.main-nav');
        // Remove inline style to revert to CSS
        nav.style.display = '';
    }
}

// Listen for changes in media query state
mediaQuery.addEventListener('change', handleMediaChange);
// Initial check on page load
handleMediaChange(mediaQuery);

document.body.addEventListener('click', function(event) {
    const header = document.querySelector('.site-header');
    const nav = document.querySelector('.main-nav');
    
    // Check if the click is outside the header and menu is open
    if (!header.contains(event.target)) {
        if (nav.style.display === 'block') {
            nav.style.display = 'none';
        }
    }
});

const darkModeCheckbox = document.querySelector('.dark-mode-toggle input');
const body = document.body;

// Event listener for checkbox
darkModeCheckbox.addEventListener('change', function() {
    body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('darkMode', this.checked.toString());
});

// Load saved state
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true') {
    body.classList.add('dark-mode');
    darkModeCheckbox.checked = true;
}