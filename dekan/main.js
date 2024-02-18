let div = document.querySelector(".spa");
let maps = document.querySelectorAll(".map");
let map = [];
let player;
let heart = 5;
let startTime;
let username;
let heartHtml;
let gameTimeElement;
let zombi_kill = 0;
let mina_kill = 0;
let q;
let w;
let e;
let r;
let t;
let inter_hearts;
let inter_upfate_game_time;

function getRandomNumber(min, max) {
    let randomValue;
    do {
        const randomFraction = Math.random();
        randomValue = Math.floor(randomFraction * (max - min + 1)) + min;
    } while (randomValue % 10 !== 0);

    return randomValue;
}

maps.forEach(image => {
    image.addEventListener("click", () => {
        map = [];
        map.push(image.src);
        username = prompt("Введите никнейм");
        startTime = new Date();

        div.innerHTML = `
            <div class="zombi" style="position: absolute;
            overflow: visible; "></div>
            <div class="mina" style="position: absolute;
            overflow: visible; "></div>
            <div class="heart_html"></div>
            <img class="img3" src="./free-png.ru-45.png" alt="">
            <img src="${image.src}" style="width: 1470px; height: 738px;">
            <div class="game">
                <div><img class="player" style="position: absolute;
                overflow: visible;transform: translate(-50px, -370px);" src="./19506.png" alt=""></div>
            </div>`;
        player = document.querySelector('.player');
        heartHtml = document.querySelector(".heart_html");
        gameTimeElement = document.getElementById("game-time");
        updateHeartCounter();

        function spawn_zombi() {
            let zombi = document.querySelector(".zombi");
            let mina = document.querySelector(".mina");

            for (let i = 0; i <= 10; i++) {
                let x = getRandomNumber(0, 1300);
                let y = getRandomNumber(0, 630);
                zombi.innerHTML += `<img class="img4" style="transform: translate(${x}px, ${y}px);" " src="./cartoon-zombie-transparent-6-transformed.png" alt="">`;
            }
            for (let i = 0; i <= 2; i++) {
                let x = getRandomNumber(0, 1300);
                let y = getRandomNumber(0, 630);
                mina.innerHTML += `<img class="img5" style="transform: translate(${x}px, ${y}px);" " src="./png-clipart-halo-reach-halo-4-xbox-360-land-mine-weapon-mines-game-explosion.png" alt="">`;
            }
        }

        q = setInterval(game_res, 100);
        w = setInterval(checkCollisions, 50);
        e = setInterval(checkCollisions2, 50);
        r = setInterval(spawn_zombi, 3000);
        t = setInterval(dvig, 1500);
        setInterval(updateHeartCounter, 1000)
        inter_hearts = setInterval(hearts, 100);
        inter_upfate_game_time = setInterval(updateGameTime, 1000);

        updateGameTime();
    });
});

function stopGame() {
    clearInterval(inter_hearts);
    clearInterval(inter_upfate_game_time);
    clearInterval(q);
    clearInterval(w);
    clearInterval(e);
    clearInterval(r);
    clearInterval(t);
}

let x = -50;
let y = -370;

document.addEventListener('keydown', (event) => {
    const speed = 10;
    if (event.key === 'Escape') {
        // Pause the game logic here
        pauseGame();
    }
    if (event.key === 'w' || event.key === 'W' || event.key === 'ц' || event.key === 'Ц') {
        y -= speed;
    } else if (event.key === 's' || event.key === 'S' || event.key === 'ы' || event.key === 'Ы') {
        y += speed;
    } else if (event.key === 'a' || event.key === 'A' || event.key === 'ф' || event.key === 'Ф') {
        x -= speed;
    } else if (event.key === 'd' || event.key === 'D' || event.key === 'в' || event.key === 'В') {
        x += speed;
    }
    player.style.transform = `translate(${x}px, ${y}px)`;
});

function checkCollisions() {
    const playerRect = player.getBoundingClientRect();
    const zombies = document.querySelectorAll(".zombi img");

    zombies.forEach(zombie => {
        const zombieRect = zombie.getBoundingClientRect();

        if (
            playerRect.left + 40 < zombieRect.right &&
            playerRect.right - 90 > zombieRect.left &&
            playerRect.top + 40 < zombieRect.bottom &&
            playerRect.bottom - 70 > zombieRect.top
        ) {
            zombie.remove();
            heart -= 1;
            zombi_kill += 1;
            updateHeartCounter();
        }
    });
}

function checkCollisions2() {
    const playerRect = player.getBoundingClientRect();
    const mines = document.querySelectorAll(".mina img");

    mines.forEach(mina => {
        const minaRect = mina.getBoundingClientRect();

        if (
            playerRect.left + 40 < minaRect.right &&
            playerRect.right - 20 > minaRect.left &&
            playerRect.top + 40 < minaRect.bottom &&
            playerRect.bottom - 20 > minaRect.top
        ) {
            mina.remove();
            heart -= 1;
            mina_kill += 1;
            updateHeartCounter();
        }
    });
}

function hearts() {
    if (heart <= 0) {
        stopGame();
        div.innerHTML +=
            `
        <div class="res">
        <h2>Ты проиграл!</h2>
            <p>Время игры: ${getGameTime()}</p>
            <p>Вы столкнулись с зомби: ${zombi_kill} раз</p>
            <p>Вы столкнулись с миной: ${mina_kill} раз</p>
            <p>Оставшиеся жизни: ${heart}</p>
            <button onclick="restart()">Играть сначала</button>
        </div>
        `;
    }
}

function updateHeartCounter() {
    heartHtml.innerHTML = `
        <div class="block">
            <p>Никнейм: ${username}</p>
            <p>Оставшиеся жизни: ${heart}</p>
            <p id="game-time">Время игры: ${getGameTime()}</p>
            <p>Время: ${getMoscowTime()}</p>
        </div>`;
}

function getMoscowTime() {
    const now = new Date();
    const moscowTimezoneOffset = 1 * 60 - 60; // Moscow timezone offset in minutes
    const moscowTime = new Date(now.getTime() + moscowTimezoneOffset * 60 * 1000);
    return `${padLeft(moscowTime.getHours())}:${padLeft(moscowTime.getMinutes())}:${padLeft(moscowTime.getSeconds())}`;
}

function padLeft(value) {
    return value < 10 ? `0${value}` : value;
}

function updateGameTime() {
    gameTimeElement.textContent = `Время игры: ${getGameTime()}`;
}

function getGameTime() {
    const currentTime = new Date();
    const elapsedMilliseconds = currentTime - startTime;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${padLeft(minutes)}:${padLeft(seconds)}`;
}

function dvig() {
    let zombies = document.querySelectorAll(".zombi img");
    zombies.forEach(zombi => {

        let x_1 = getRandomNumber(-10, 10);
        let y_1 = getRandomNumber(-10, 10);

        let rect = zombi.getBoundingClientRect();
        let currentX = rect.left;
        let currentY = rect.top;

        zombi.style.transform = `translate(${currentX + x_1}px, ${currentY + y_1}px)`;
    });
}

function pauseGame() {
    alert("Игра на паузе нажмите 'Esc' или 'OK' чтобы продолжить");
}

function game_res() {
    const playerRect = player.getBoundingClientRect();
    const close = document.querySelector(".img3");
    if (
        (playerRect.right >= 1470 && playerRect.right <= 1530) &&
        (playerRect.top >= 360 && playerRect.top <= 390)
    ) {
        stopGame();
        div.innerHTML +=
            `
        <div class="res">
            <p>Время игры: ${getGameTime()}</p>
            <p>Вы столкнулись с зомби: ${zombi_kill} раз</p>
            <p>Вы столкнулись с миной: ${mina_kill} раз</p>
            <p>Оставшиеся жизни: ${heart}</p>
            <button onclick="restart()">Играть сначала</button>
        </div>
        `;
    }
}

function restart() {
    div.innerHTML = "";
    zombi_kill = 0;
    mina_kill = 0;
    heart = 5;
    startTime = new Date();
    x = -50;
    y = -370;
    maps[0].click();
}
