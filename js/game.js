let canvas;
let world;
let keyboard = new Keyboard();
let background_sound = new Audio('audio/background_music.mp3');
let small_chicken_sound = new Audio('audio/chicken_chirping.mp3');

/**
 * Initializes the game environment.
 */
function init() {
    canvas = document.getElementById("canvas");
    initLevel1();
    world = new World(canvas, keyboard);
}

/**
 * Starts the game.
 */
function startGame() {
    init();
    removeStartScreen();
    playBackGroundSound();
}

/**
 * Stops the game and clears intervals.
 */
function stopGame() {
    turnOffSounds();
    clearAllIntervals();
}

/**
 * Clears all intervals set on the window.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Removes the start screen from the DOM.
 */
function removeStartScreen() {
    const startScreen = document.getElementById('startScreen');
    startScreen.style = 'display: none';
}

/**
 * Opens the controls page.
 */
function openControlsPage() {
    const controlsScreen = document.getElementById('controlsScreen');
    controlsScreen.classList.remove('d-none');
    controlsScreen.classList.add('d-flex');
}

/**
 * Closes the controls page.
 */
function closeControlsPage() {
    const controlsScreen = document.getElementById('controlsScreen');
    controlsScreen.classList.add('d-none');
}

/**
 * Opens the legal documents page based on the document type.
 * @param {string} doc - The type of document ('data' or 'imp').
 */
function openLegals(doc) {
    const legalsScreen = document.getElementById('legalsScreen');
    legalsScreen.classList.remove('d-none');

    let url = getLegalsUrl(doc);
    fetchUrl(url);
}

/**
 * Gets the URL for the legal document based on the document type.
 * @param {string} doc - The type of document ('data' or 'imp').
 * @returns {string} The URL for the legal document.
 */
function getLegalsUrl(doc) {
    if (doc === 'data') {
        return './datenschutz.html';
    } else if (doc === 'imp') {
        return './impressum.html';
    }
}

/**
 * Fetches the HTML content from the specified URL and displays it on the legals screen.
 * @param {string} url - The URL of the legal document.
 */
function fetchUrl(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            legalsScreen.innerHTML = html;
        })
        .catch(error => console.error('Error fetching HTML:', error));
}


/**
 * Closes the legal documents page.
 */
function closeLegals() {
    const legalsScreen = document.getElementById('legalsScreen');
    legalsScreen.classList.add('d-none');
}

/**
 * Plays the background music.
 */
function playBackGroundSound() {
    background_sound.loop = true;
    background_sound.play();
    background_sound.volume = 0;
}

/**
 * Restarts the game by reloading the page.
 */
function restartGame() {
    localStorage.setItem('shouldStartGame', 'true');
    window.location.reload();
}


/**
 * Handles touch start events.
 * @param {TouchEvent} event - The touch event object.
 */
function handleTouchStart(event) {
    if (event.target.id === 'moveLeft') {
        keyboard.LEFT = true;
    } else if (event.target.id === 'moveRight') {
        keyboard.RIGHT = true;
    } else if (event.target.id === 'jump') {
        keyboard.SPACE = true;
    } else if (event.target.id === 'throw') {
        keyboard.D = true;
    }
}

/**
 * Handles touch end events.
 */
function handleTouchEnd() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.SPACE = false;
    keyboard.D = false;
}

/**
 * Toggles the game sound on/off.
 */
function pauseAndResumeGameSound() {
    let soundIconDiv = document.getElementById('gameSoundDiv');
    let soundIconOn = '<img id="gameSound" src="img/10_menu_icons/sound_on.png" alt="sound on icon">';
    let soundIconOff = '<img id="gameSound" src="img/10_menu_icons/sound_off.png" alt="sound off icon">';

    if (soundTurnedOn()) {
        soundIconDiv.innerHTML = soundIconOff;
    } else {
        soundIconDiv.innerHTML = soundIconOn;
    }
}

/**
 * Checks if the game sound is turned on.
 * @returns {boolean} - Whether the game sound is turned on.
 */
function soundTurnedOn() {
    let soundIcon = document.getElementById('gameSound');
    return soundIcon.src.includes('img/10_menu_icons/sound_on.png');
}

/**
 * Turns off game sounds.
 */
function turnOffSounds() {
    background_sound.pause();
    small_chicken_sound.pause();
}

/****************************************************
 *  EVENT LISTENER
 ****************************************************/
document.addEventListener("DOMContentLoaded", function() {
    const shouldStartGame = localStorage.getItem('shouldStartGame');
    if (shouldStartGame === 'true') {
        startGame();
        localStorage.removeItem('shouldStartGame'); // Remove the flag after starting the game
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        keyboard.UP = true;
    }

    if (event.key === 'ArrowDown') {
        keyboard.DOWN = true;
    }

    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = true;
    }

    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = true;
    }

    if (event.key === ' ') {
        keyboard.SPACE = true;
    }

    if (event.key === 'd' || event.key === 'D') {
        keyboard.D = true;
    }
})

window.addEventListener('keyup', (event) => {
    if (event.key === 'ArrowUp') {
        keyboard.UP = false;
    }

    if (event.key === 'ArrowDown') {
        keyboard.DOWN = false;
    }

    if (event.key === 'ArrowLeft') {
        keyboard.LEFT = false;
    }

    if (event.key === 'ArrowRight') {
        keyboard.RIGHT = false;
    }

    if (event.key === ' ') {
        keyboard.SPACE = false;
    }

    if (event.key === 'd' || event.key === 'D') {
        keyboard.D = false;
    }
})

document.addEventListener("DOMContentLoaded", () => {
    gameSoundBtn = document.getElementById('gameSoundDiv');
    restartBtn = document.getElementById('restartGame');
    restratBtnGameOver = document.getElementById('gameOverRestartGame');

    gameSoundBtn.addEventListener('click', pauseAndResumeGameSound);
    restartBtn.addEventListener('click', restartGame);
    restratBtnGameOver.addEventListener('click', restartGame);

    moveLeftBtn = document.getElementById('moveLeft');
    moveRightBtn = document.getElementById('moveRight');
    jumpBtn = document.getElementById('jump');
    throwBtn = document.getElementById('throw');

    moveLeftBtn.addEventListener('touchstart', handleTouchStart);
    moveRightBtn.addEventListener('touchstart', handleTouchStart);
    jumpBtn.addEventListener('touchstart', handleTouchStart);
    throwBtn.addEventListener('touchstart', handleTouchStart);

    moveLeftBtn.addEventListener('touchend', handleTouchEnd);
    moveRightBtn.addEventListener('touchend', handleTouchEnd);
    jumpBtn.addEventListener('touchend', handleTouchEnd);
    throwBtn.addEventListener('touchend', handleTouchEnd);
});
