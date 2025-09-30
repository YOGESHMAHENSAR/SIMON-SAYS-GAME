let gameSeq = [];
let userSeq = [];

let level = 0;
let started = false;
let score = 0;
let highestScore = 0;

let color = ["red","yellow","blue","purple"];

document.addEventListener("keypress",function(){
    if(started == false){
        console.log("game started");
        started = true;
        levelUp();
    }
})
document.addEventListener("click",function(){
    if(started == false){
        console.log("game started");
        started = true;
        levelUp();
    }
})

function userBtnFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(()=>{
        btn.classList.remove("userFlash")
    },250);
}
function gameBtnFlash(btn){
    btn.classList.add("gameFlash");
    setTimeout(()=>{
        btn.classList.remove("gameFlash")
    },250);
}


let h2 = document.querySelector("h2");

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level-${level}`;
    let random = Math.floor(Math.random() * 4);
    let randomCol = color[random];
    let btn = document.querySelector(`.${randomCol}`);
    gameSeq.push(`${randomCol}`);
    console.log(gameSeq);
    gameBtnFlash(btn);
}

function checkBtn(idx){
    // console.log(`curr-level : ${level}`);
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            // levelUp();
            setTimeout(levelUp(),200);
        }
    } else{
        let body = document.querySelector("body");
        body.classList.add("over");
        setTimeout(()=>{
            body.classList.remove("over");
        },1000);
        score = gameSeq.length;
        if(score >= highestScore){
            highestScore = score;
        }
        h2.innerHTML = `Game Over! Your <b>Score was : ${score} </b> <br> Press any key to start a new game<br><b>Highest score is : ${highestScore}</b>`;
        reset();
    }
}
function reset(){
    level=0;
    started = false;
    gameSeq = [];
    userSeq = [];
}

function btnPressed(){
    console.log("button pressed");
    let btn = this;
    console.log(this);
    userBtnFlash(btn);
    let color = btn.getAttribute("id");
    userSeq.push(color);
    checkBtn(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPressed);
}