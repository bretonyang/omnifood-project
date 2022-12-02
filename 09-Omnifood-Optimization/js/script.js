'use strict';

const body = document.body;
const header = document.querySelector('.header');
const btnNav = document.querySelector('.btn-mobile-nav');
const sectionHero = document.querySelector('.section-hero');

///////////////////////////////////////////////////////////
// Mobile Navigation

btnNav.addEventListener('click', function () {
  header.classList.toggle('nav-open');
});

///////////////////////////////////////////////////////////
// Smooth Scrolling Animation

body.addEventListener('click', function (e) {
  const link = e.target.closest('a:link');

  if (!link) return;

  // If it's link, then prevent default and get href
  e.preventDefault();
  const href = link.getAttribute('href');

  // Scroll back to top
  if (href === '#') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  // Scroll to internal links
  if (href !== '#' && href.startsWith('#')) {
    const destinationEl = document.querySelector(href);
    destinationEl.scrollIntoView({ behavior: 'smooth' });
  }

  // Close mobile navigation
  header.classList.remove('nav-open');
});

///////////////////////////////////////////////////////////
// Sticky Header (Navigation)

const navHeight = header.getBoundingClientRect().height;
const stickyNavHeight = navHeight * (8 / 9.6); // 8rem / 9.6rem

const stickyCallback = function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      header.classList.add('sticky');
      sectionHero.classList.add('sticky--helper');
    } else {
      header.classList.remove('sticky');
      sectionHero.classList.remove('sticky--helper');
    }
  });
};

const options = {
  root: null,
  threshold: 0,
  rootMargin: `-${stickyNavHeight}px`,
};

const observer = new IntersectionObserver(stickyCallback, options);
observer.observe(sectionHero);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions

const checkFlexGap = function () {
  const flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  const isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
};
checkFlexGap();

// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

/*
.no-flexbox-gap .main-nav-list li:not(:last-child) {
  margin-right: 4.8rem;
}

.no-flexbox-gap .list-item:not(:last-child) {
  margin-bottom: 1.6rem;
}

.no-flexbox-gap .list-icon:not(:last-child) {
  margin-right: 1.6rem;
}

.no-flexbox-gap .delivered-faces {
  margin-right: 1.6rem;
}

.no-flexbox-gap .meal-attribute:not(:last-child) {
  margin-bottom: 2rem;
}

.no-flexbox-gap .meal-icon {
  margin-right: 1.6rem;
}

.no-flexbox-gap .footer-row div:not(:last-child) {
  margin-right: 6.4rem;
}

.no-flexbox-gap .social-links li:not(:last-child) {
  margin-right: 2.4rem;
}

.no-flexbox-gap .footer-nav li:not(:last-child) {
  margin-bottom: 2.4rem;
}

@media (max-width: 75em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 3.2rem;
  }
}

@media (max-width: 59em) {
  .no-flexbox-gap .main-nav-list li:not(:last-child) {
    margin-right: 0;
    margin-bottom: 4.8rem;
  }
}
*/
