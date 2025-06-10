let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let game = document.querySelector(".game");

let turnO = true; //playerX, playerO
let gameActive = true;

const winPatterns = [
    [0, 1, 2], 
    [0, 3, 6], 
    [0, 4, 8], 
    [1, 4, 7], 
    [2, 5, 8], 
    [2, 4, 6], 
    [3, 4, 5], 
    [6, 7, 8], 
];

const resetGame = () => {
    turnO = true;
    gameActive = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    game.style.transform = "rotateX(0deg)";
    boxes.forEach(box => {
        box.style.transform = "scale(1)";
        box.style.backgroundColor = "rgba(237, 227, 233, 0.9)";
        box.classList.remove("celebrate");
    });
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(!gameActive || box.disabled) return;
        
        if(turnO){
            box.innerText = "O";
            box.style.color = "#680464";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "#689689";
            turnO = true;         
        }
        box.disabled = true;
        box.style.transform = "scale(1.1)";
        
        setTimeout(() => {
            box.style.transform = "scale(1)";
        }, 200);

        checkWinner();
    });
});

const disableBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    gameActive = false;
    msg.innerText = `Congratulations, ${winner} Wins!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    
    // Add celebration animation to winning boxes
    const winningPattern = winPatterns.find(pattern => {
        return boxes[pattern[0]].innerText === winner &&
               boxes[pattern[1]].innerText === winner &&
               boxes[pattern[2]].innerText === winner;
    });
    
    if(winningPattern) {
        winningPattern.forEach(index => {
            boxes[index].classList.add("celebrate");
            boxes[index].style.backgroundColor = "#9F84BD";
        });
    }
    
    // Add 3D rotation effect to the game board
    game.style.transform = "rotateX(360deg)";
    game.style.transition = "transform 1s ease";
};

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return;
            }
        }
    }
    
    // Check for draw
    let isDraw = true;
    for(let box of boxes) {
        if(box.innerText === "") {
            isDraw = false;
            break;
        }
    }
    
    if(isDraw) {
        msg.innerText = "Game Draw!";
        msgContainer.classList.remove("hide");
        gameActive = false;
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
