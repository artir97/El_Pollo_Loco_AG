let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById("canvas");
    initLevel1();
    world = new World(canvas, keyboard);
}

function startGame() {
    init();
    let startScreen = document.getElementById('startScreen');
    startScreen.style = 'display: none';
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

document.addEventListener("DOMContentLoaded", () => {
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
