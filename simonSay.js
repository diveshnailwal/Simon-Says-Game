let start = false;
let userseq = [];
let gameseq = [];
let btn = ["red", "pink", "green", "blue"];
let h3 = document.querySelector("h3");
let level = 0;
let highScore = 0;

document.addEventListener("keypress", function() {
    if (!start) {
        console.log("game started");
        start = true;
        levelUp();
    }
});

function levelUp() {
    userseq = [];
    level++;
    h3.innerText = `Level ${level} - High Score: ${highScore}`;
    btnFlash();
}

function btnFlash() {
    let indx = Math.floor(Math.random() * btn.length);
    let randCol = btn[indx];
    let randBtn = document.querySelector(`.${randCol}`);
    gameseq.push(randCol);
    flash(randBtn);
}

function flash(btn) {
    btn.classList.add("flash");
    setTimeout(function() {
        btn.classList.remove("flash");
    }, 250);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function() {
        btn.classList.remove("userflash");
    }, 150);
}

let allbtns = document.querySelectorAll(".box");
allbtns.forEach(btn => {
    btn.addEventListener("click", btnPress);
});

function btnPress() {
    let btn = this;
    userflash(btn);
    let userpress = btn.getAttribute("id");
    userseq.push(userpress);
    
    checkans();
    playSound(userpress);
}

function checkans() {
    let indx = userseq.length - 1;
    if (gameseq[indx] === userseq[indx]) {
        if (gameseq.length === userseq.length) {
            setTimeout(levelUp, 750);
        }
    } else {
        if (level - 1 > highScore) {
            highScore = level - 1;
        }
        h3.innerHTML = `Game Over! High Score: ${highScore}. Press any key to start`;
        start = false;
        level = 0;
        gameseq = [];
        userseq = [];
    }
}
function playSound(color) {
    let sound = document.getElementById(`${color}Sound`);
    sound.play();
}