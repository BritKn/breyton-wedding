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
const scriptURL = "https://script.google.com/macros/s/AKfycbzCAVhy7ArK1-PWwqsc04CWqZxOGqabTMVdwdtVfj-jaZ4J7j9Fsaw8Qeu6zoQ0YJM-/exec";

submitButton.addEventListener("click", function () {
    const guestName = document.getElementById("guest-name").value;
    const attending = document.getElementById("attending").value;
    const guestCount = document.getElementById("guest-count").value;
    const rsvpMessage = document.getElementById("rsvp-message");
    const invitationCode = document.getElementById("invitation-code").value;

    if (guestName === "") {
        alert("Please enter your name");
        return;
    }


    if (attending === "") {
        alert("Please select whether you will be attending");
        return;
    }
})
const guestQuestion = document.getElementById("guest-question");
const attendingSelect = document.getElementById("attending");
attendingSelect.addEventListener("change", function (){
    if (attendingSelect.value === "Yes") {
        guestQuestion.style.display = "block";
    } else {
        guestQuestion.style.display = "none";
        document.getElementById("guest-count").value = "";
    } 
        
})


































const canvas = document.getElementById("flappy-game");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("flappy-start");
const scoreText = document.getElementById("flappy-score");

let bird;
let pipes;
let score;
let gameRunning;
let animationId;

function resetGame() {
    bird = {
        x: 60,
        y: 200,
        width: 25,
        height: 25,
        velocity: 0
    };

    pipes = [];

    score = 0;
    gameRunning = true;

    scoreText.textContent = "Score: 0";
}

function flap() {
    if (gameRunning) {
        bird.velocity = -7;
    }
}

function createPipe() {
    const gap = 140;
    const topHeight = Math.random() * 250 + 50;

    pipes.push({
        x: canvas.width,
        width: 50,
        top: topHeight,
        bottom: topHeight + gap,
        scored: false
    });
}

function updateGame() {

    bird.velocity += 0.4;
    bird.y += bird.velocity;

    pipes.forEach(function(pipe) {
        pipe.x -= 2;

        if (!pipe.scored && pipe.x + pipe.width < bird.x) {
            pipe.scored = true;
            score++;
            scoreText.textContent = `Score: ${score}`;
        }
    });

    if (
        pipes.length === 0 ||
        pipes[pipes.length - 1].x < canvas.width - 200
    ) {
        createPipe();
    }

    pipes = pipes.filter(function(pipe) {
        return pipe.x + pipe.width > 0;
    });

    checkCollision();
}

function checkCollision() {

    if (
        bird.y <= 0 ||
        bird.y + bird.height >= canvas.height
    ) {
        endGame();
    }

    pipes.forEach(function(pipe) {

        const touchingPipe =
            bird.x + bird.width > pipe.x &&
            bird.x < pipe.x + pipe.width;

        const hittingTop =
            bird.y < pipe.top;

        const hittingBottom =
            bird.y + bird.height > pipe.bottom;

        if (touchingPipe && (hittingTop || hittingBottom)) {
            endGame();
        }
    });
}

function drawGame() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Bird
    ctx.font = "28px Arial";
    ctx.fillText("💗", bird.x, bird.y + 25);

    // Pipes
    ctx.fillStyle = "green";

    pipes.forEach(function(pipe) {

        ctx.fillRect(
            pipe.x,
            0,
            pipe.width,
            pipe.top
        );

        ctx.fillRect(
            pipe.x,
            pipe.bottom,
            pipe.width,
            canvas.height - pipe.bottom
        );
    });
}

function gameLoop() {

    if (!gameRunning) {
        return;
    }

    updateGame();
    drawGame();

    animationId = requestAnimationFrame(gameLoop);
}

function startGame() {

    cancelAnimationFrame(animationId);

    resetGame();
    createPipe();

    gameLoop();
}

function endGame() {

    gameRunning = false;

    ctx.font = "30px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";

    ctx.fillText(
        "Game Over",
        canvas.width / 2,
        canvas.height / 2
    );

    ctx.textAlign = "start";
}

startButton.addEventListener("click", startGame);

canvas.addEventListener("click", flap);

document.addEventListener("keydown", function(event) {

    if (event.code === "Space" && document.activeElement.tagName !== "INPUT") {
        event.preventDefault();
        flap();
    }

});