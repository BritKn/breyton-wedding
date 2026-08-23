const weddingDate = new Date("2027-11-07");
function updateCountdown() {
const today = new Date();
const timeDifference = weddingDate - today;
const millisecondsPerDay = 1000 * 60 * 60 * 24;
const daysUntilWedding = Math.ceil(timeDifference / millisecondsPerDay)
const countdownElement = document.getElementById("countdown");
countdownElement.textContent = `Only ${daysUntilWedding} days til the wedding!`
}
updateCountdown();