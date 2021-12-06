var navigationItems;
var contactForm;
var formData;
var portfolioItems;
var ignoreScrollSpy = false;

function init() {
    addNavigationItemListener();
    initScrollSpy();
    addFormListener();
    addPortfolioHover();
}

function submitForm(e) {
    e.preventDefault();
    formData = new FormData(contactForm);
}

function handleFormData(e) {
    var data = e.formData;

    var dataObject = {
        name: data.get('name'),
        email: data.get('email'),
        subject: data.get('subject'),
        message: data.get('message'),
    }

    console.log('dataObject', dataObject);
    alert('form sent');

    // insert your code to process the formData here
}

function addFormListener() {
    contactForm = document.querySelector('#contactForm');
    if (!contactForm) {
        return setTimeout(addFormListener, 100);
    }

    contactForm.addEventListener('submit', submitForm);
    contactForm.addEventListener('formdata', handleFormData);
}

function addNavigationItemListener() {
    navigationItems = document.querySelectorAll(".navigation-button");
    navigationItems = [].slice.call(navigationItems);
    if (!navigationItems.length) {
        return setTimeout(addNavigationItemListener, 100);
    }

    navigationItems.forEach(navigationItem => {
        navigationItem.addEventListener("click", function (e) { setNavigationButtonActive(e) });
    })
}

function setNavigationButtonActive(e) {
    ignoreScrollSpy = true;
    var navigationItem = e.target.closest('.navigation-button');

    navigationItems.forEach(navigationItem => navigationItem.classList.remove("active"));
    navigationItem.classList.add("active");
}

function initScrollSpy() {
    if (window.innerWidth < 768) { return }
    var sections = document.querySelectorAll(".section");
    sections = [].slice.call(sections);
    if (!sections.length) {
        return setTimeout(initScrollSpy, 100);
    }
    var sectionsObject = {};
    var i = 0;

    var header = document.querySelector('header.header');
    var headerHeight = header.offsetHeight;

    sections.forEach(section => {
        sectionsObject[section.id] = section.offsetTop - headerHeight;
    });

    window.onscroll = function (e) {
        if(ignoreScrollSpy) {
            ignoreScrollSpy = false;
            return;
        }
        var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

        for (i in sectionsObject) {
            if (!navigationItems.length) { return }
            if (sectionsObject[i] <= scrollPosition) {
                navigationItems.forEach(navigationItem => navigationItem.classList.remove("active"));
                document.querySelector('a[href*=' + i + ']').classList.add('active');
            }
        }
    }
}

function addPortfolioHover() {
    portfolioItems = document.querySelectorAll(".portfolio-grid .portfolio-card");
    portfolioItems = [].slice.call(portfolioItems);
    if (!portfolioItems.length) {
        return setTimeout(addPortfolioHover, 100);
    }

    var overlay = document.querySelector('.project-overlay-content');
    overlay.addEventListener("mouseleave", function (e) { hidePortfolioButtons(e) });

    portfolioItems.forEach(portfolioItem => {
        portfolioItem.addEventListener("mouseenter", function (e) { showPortfolioButtons(e) });
    });
}

function showPortfolioButtons(e) {
    var portfolioItem = e.target;
    var offsetTop = portfolioItem.offsetTop;
    var offsetLeft = portfolioItem.offsetLeft;
    var boundingRect = portfolioItem.getBoundingClientRect();
    var width = boundingRect.width;
    var height = boundingRect.height;
    var overlay = document.querySelector('.project-overlay-content');
    overlay.innerHTML = `<a href="${portfolioItem.dataset.projectDetails}" class="button button--primary button--small">Read details</a>
    <a href="${portfolioItem.dataset.projectLink}" class="button button--primary button--ghost button--small" target="_blank">See project</a>`;
    overlay.classList.add('visible');
    overlay.setAttribute('style', `position: absolute; top: ${offsetTop}px; left: ${offsetLeft}px; height: ${height}px; width: ${width}px`);

}

function hidePortfolioButtons(e) {
    var overlay = document.querySelector('.project-overlay-content');
    overlay.classList.remove('visible');
    overlay.removeAttribute('style');
}


init();