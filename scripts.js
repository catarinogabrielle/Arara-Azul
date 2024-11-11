const container = document.querySelector(".scroll-container");
const scrollStep = 2;
const scrollInterval = 20;
let autoScroll;
let autoScrollTimeout;

function startAutoScroll() {
    autoScroll = setInterval(() => {
        container.scrollLeft += scrollStep;

        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
            container.scrollLeft = 0;
        }
    }, scrollInterval);
}

function stopAutoScroll() {
    clearInterval(autoScroll);
}

function scrollContentLeft() {
    resetAutoScrollTimeout();
    container.scrollLeft -= 300;
}

function scrollContentRight() {
    resetAutoScrollTimeout();
    container.scrollLeft += 300;
}

function resetAutoScrollTimeout() {
    stopAutoScroll();

    clearTimeout(autoScrollTimeout);
    autoScrollTimeout = setTimeout(() => {
        startAutoScroll();
    }, 3000);
}

startAutoScroll();