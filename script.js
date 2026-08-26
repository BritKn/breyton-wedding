const weddingDate = new Date("2027-11-13");
function updateCountdown() {
const today = new Date();
const timeDifference = weddingDate - today;
const millisecondsPerDay = 1000 * 60 * 60 * 24;
const daysUntilWedding = Math.ceil(timeDifference / millisecondsPerDay)
const countdownElement = document.getElementById("countdown");
countdownElement.textContent = `Only ${daysUntilWedding} days til the wedding!`
}
updateCountdown();
const menu = document.querySelector(".menu");
let lastScrollY = window.scrollY;
let menuOffset = 0;

window.addEventListener("scroll", function () {

    if (window.innerWidth <= 600) {

        const currentScrollY = window.scrollY;
        const scrollDifference = currentScrollY - lastScrollY;

        menuOffset = menuOffset + scrollDifference;

        const maxMove = menu.offsetHeight - 15;

        menuOffset = Math.max(0, Math.min(menuOffset, maxMove));

        menu.style.transform = `translateY(-${menuOffset}px)`;

        lastScrollY = currentScrollY;

    } else {
        menu.style.transform = "translateY(0)";
        menuOffset = 0;
        lastScrollY = window.scrollY;
    }

});
const submitButton = document.getElementById("submit-rsvp");
submitButton.addEventListener("click", function () {
    const guestName = document.getElementById("guest-name").value;
    const attending = document.getElementById("attending").value;
if (guestName === "") {
    alert("Please enter your name");
    return;
}

const scriptURL = "https://script.google.com/macros/s/AKfycbzCAVhy7ArK1-PWwqsc04CWqZxOGqabTMVdwdtVfj-jaZ4J7j9Fsaw8Qeu6zoQ0YJM-/exec";
fetch(scriptURL, {
    method: "POST",
    body: JSON.stringify ({
        name: guestName,
        attending: attending
    })
});
console.log(guestName);
console.log(attending);
})