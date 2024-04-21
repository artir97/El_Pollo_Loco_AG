let canvas;
let world;
let keyboard = new Keyboard();
let background_sound = new Audio('audio/background_music.mp3');

function init() {
    canvas = document.getElementById("canvas");
    initLevel1();
    world = new World(canvas, keyboard);
    background_sound.loop = true;
    background_sound.play();
}

function startGame() {
    init();
    let startScreen = document.getElementById('startScreen');
    startScreen.style = 'display: none';
}

function restartGame() {
    window.location.reload();
}

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

function handleTouchEnd() {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.SPACE = false;
    keyboard.D = false;
}

function pauseAndResumeGameSound() {
    let soundIconDiv = document.getElementById('gameSoundDiv');
    if (soundTurnedOn()) {
        soundIconDiv.innerHTML =
            '<img id="gameSound" src="img/10_menu_icons/sound_off.png" alt="sound off icon">';
    } else {
        soundIconDiv.innerHTML =
            '<img id="gameSound" src="img/10_menu_icons/sound_on.png" alt="sound on icon">';
    }
}

function soundTurnedOn() {
    let soundIcon = document.getElementById('gameSound');
    return soundIcon.src.includes('img/10_menu_icons/sound_on.png');
}


document.addEventListener("DOMContentLoaded", () => {
    gameSoundBtn = document.getElementById('gameSoundDiv');
    restartBtn = document.getElementById('restartGame');
    restratBtnGameOver = document.getElementById('GameOverRestartGame');

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
