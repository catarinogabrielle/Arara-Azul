function toggleMenu() {
    const menu = document.getElementById('menu');
    const links = menu.querySelectorAll('a');
    const menuIcon = document.getElementById('menu-icon');
    const isOpen = menu.classList.toggle('open');

    menuIcon.classList.toggle('fa-bars', !isOpen);
    menuIcon.classList.toggle('fa-xmark', isOpen);

    links.forEach((link, index) => {
        link.style.animation = isOpen
            ? `dropIn 0.5s ease forwards ${index * 0.1}s`
            : `dropOut 0.5s ease forwards ${(links.length - index - 1) * 0.1}s`;
    });

    if (!isOpen) {
        setTimeout(() => {
            links.forEach(link => link.style.animation = '');
        }, links.length * 100);
    }
}



function smoothScroll(linkId, targetId) {
    document.getElementById(linkId).addEventListener("click", function (event) {
        event.preventDefault();
        document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        toggleMenu();
    });
}

smoothScroll("home-link", "home");
smoothScroll("projects-link", "content1");
smoothScroll("aboutus-link", "content2");
smoothScroll("products-link", "content3");



const container = document.querySelector("#content3 .scroll-container");
let autoScroll;
const scrollConfig = { step: 2.3, interval: 20, timeout: 3000 };

function addMoreItems() {
    const items = Array.from(container.children);
    items.forEach(item => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
    });
}

function startAutoScroll() {
    autoScroll = setInterval(() => {
        container.scrollLeft += scrollConfig.step;

        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 100) {
            addMoreItems();
        }
    }, scrollConfig.interval);
}

function stopAutoScroll() {
    clearInterval(autoScroll);
}

function restartAutoScrollAfterDelay() {
    stopAutoScroll();
    setTimeout(startAutoScroll, scrollConfig.timeout);
}

window.addEventListener('scroll', function () {
    const content3Position = document.querySelector("#content3").getBoundingClientRect().top;
    if (content3Position < window.innerHeight && !autoScroll) {
        startAutoScroll();
    }
});

document.querySelector("#content3 .scroll-btn.left").onclick = () => {
    stopAutoScroll();
    container.scrollLeft -= 300;
    restartAutoScrollAfterDelay();
};

document.querySelector("#content3 .scroll-btn.right").onclick = () => {
    stopAutoScroll();
    container.scrollLeft += 300;
    restartAutoScrollAfterDelay();
};




const counters = document.querySelectorAll('.count-up');
const animatedElements = document.querySelectorAll('.scroll-animate');

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    const duration = 4000;
    let count = 0;

    function updateCounter() {
        count += Math.ceil(target / (duration / 100));
        counter.innerText = count < target ? count : target;
        if (count < target) setTimeout(updateCounter, duration / target);
    }
    updateCounter();
}

function handleScrollAnimation() {
    animatedElements.forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight - 100) {
            element.classList.add('show');
        }
    });
    counters.forEach(counter => {
        if (counter.getBoundingClientRect().top < window.innerHeight && counter.innerText === "0") {
            animateCounter(counter);
        }
    });
}

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation();




let players = [];
let currentIndex = 1;
const descriptions = ["GAZIN DE A - Z", "INSTITUCIONAL GRUPO KEFRAYA", "TEASER VEX 24"];

function onYouTubeIframeAPIReady() {
    const videoData = [
        { id: 'video1', videoId: 'Vz4Ikpg4bWM' },
        { id: 'video2', videoId: 'gBHul-xtOxQ' },
        { id: 'video3', videoId: 'e32HZjNXh3M' }
    ];

    videoData.forEach((data, index) => {
        players[index] = new YT.Player(data.id, {
            videoId: data.videoId,
            playerVars: { 'playlist': data.videoId, 'loop': 1 },
            events: { 'onReady': (event) => { event.target.mute(); if (index === 1) event.target.playVideo(); } }
        });
    });
}

function setActiveVideo(index) {
    if (index === currentIndex) return;

    players[currentIndex].pauseVideo();
    document.querySelectorAll('.carousel-video')[currentIndex].classList.remove('active');

    currentIndex = index;
    players[currentIndex].playVideo();
    document.querySelectorAll('.carousel-video')[currentIndex].classList.add('active');
    document.getElementById("video-description").textContent = descriptions[currentIndex];
}

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(tag);




document.getElementById("contact-link").addEventListener("click", function (event) {
    event.preventDefault();
    const phoneNumber = "554191451610";
    const message = "Olá, gostaria de conhecer mais a Arara Azul";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
});