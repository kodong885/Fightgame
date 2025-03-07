// set "fightMessage" tag; 
function setFightMessage() {    
    console.log(":ASDf")
    const message = document.createElement("span");
    message.id = "fightMessage";
    message.textContent = "🔥Fight🔥";
    message.style.fontWeight = "bold";
    message.style.fontSize = "28px";
    message.style.position = "absolute";
    message.style.display = "inline-block";
    message.style.backgroundColor = "yellow";
    message.style.borderRadius = "15px";
    message.style.border = "2px solid black"
    message.style.width = "160px";
    message.style.height = "55px";
    message.style.left = "680px";
    message.style.top = "300px";
    message.style.lineHeight = "50px";
    message.style.textAlign = "center";
    message.classList.add('animate__animated', 'animate__bounceOutUp')
    message.style.setProperty('--animate-duration', '1.7s');
    document.body.appendChild(message);
};
// remove gameGuide
function closeBtn() {
    document.querySelector("#guideBackground").remove();
    workTimer = true;
    setFightMessage();
};
addEventListener("keydown" , (event) => {
    if (event.key === "Enter") {
        document.querySelector("#guideBackground").remove();
        workTimer = true;
        setFightMessage();
    }
    else {};
})
// set canvas
const canvas = document.querySelector("#Canvas");
const ctx = canvas.getContext("2d");
// set canvas's attribute
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = "black";
// set sound effect
var swooshAudio = new Audio(".\\swooshSound.mp3");
var JumpingAudio = new Audio(".\\jumpSound.mp3");
var punchAudio = new Audio(".\\punchSound.mp3");
var deadSound = new Audio(".\\deadSound.mp3");
swooshAudio.volume = 1;
JumpingAudio.volume = 1;
punchAudio.volume = 1;
deadSound.volume = 1;
//declare backgrondImage variable
var backImg1 = new Image();
backImg1.src = ".\\oak_woods_v1.0\\oak_woods_v1.0\\background\\background_layer_1.png";
var backImg2 = new Image();
backImg2.src = ".\\oak_woods_v1.0\\oak_woods_v1.0\\background\\background_layer_2.png";
var backImg3 = new Image();
backImg3.src = ".\\oak_woods_v1.0\\oak_woods_v1.0\\background\\background_layer_3.png";
var backImg_bottomline = new Image();
backImg_bottomline.src = ".\\oak_woods_v1.0\\oak_woods_v1.0\\bottomLine.png";
// set " scoreboard ";
let setScore_Left = 0;
function scoreboard_left(num_Left) {
    ctx.fillStyle = "white";
    ctx.fillRect(680, 40, 0 - num_Left, 50);
};
let setScore_Right = 0;
function scoreboard_right(num_Right) {
    ctx.fillStyle = "white";
    ctx.fillRect(835, 40, 0 + num_Right, 50);
};
// take hit;
let check_X = "";
let check_Y = "";
let Check_X = "";
let Check_Y = "";
let HP_player = 650;
let HP_enemy = 650;
let isDead_enemy =  false;
let isDead_player = false;
// checking player Hit;
function PlayerHit( Boll_X, Boll_Y ) {
    if (( Boll_X ) && ( Boll_Y )) {
        HP_enemy -= 2.0;
        setScore_Right += 2.0;
        punchAudio.play();
        if (HP_enemy <= 0) {
            console.log("enemy X 😬");
            isDead_enemy = true;
        };
    }
    else {};
    check_X = "";
    check_Y = "";
};
// checking enemy Hit;
function EnemyHit( boll_X, boll_Y) {
    if (( boll_X ) && ( boll_Y )) {
        HP_player -= 2.3;
        setScore_Left += 2.3;
        punchAudio.play();
        if (HP_player <= 0) {
            console.log("player X 😬");
            isDead_player = true;
        };
    }
    else {};
    check_X = "";
    check_Y = "";
};
// key check
const keys = {"a" : false, "d" : false, "w" : false, "v" : false,
    "ArrowLeft" : false, "ArrowRight" : false, "ArrowUp" : false, "l" : false 
};
let stop_player = true
let stop_enemy = true
addEventListener("keydown" , (event) => {
    if (event.repeat) {return};
    // managing player down_key
    if ((event.key === "a") || (event.key === "d") || (event.key === "w") || (event.key === "v")) {
        if (event.key === "w") {
              keys[event.key] = true;
        }
          else if (event.key === "v") {
              swooshAudio.play();
              player_timer_attack = 0;
              keys[event.key] = true;
              stop_player = false;
              stop_player_attacking = true;
        }
        else {
            keys[event.key] = true;
            stop_player = false;
        };
    }
    // managing enemy down_key
    else if ((event.key === "ArrowLeft") || (event.key === "ArrowRight") || (event.key === "ArrowUp") || (event.key === "l")) {
        if (event.key === "ArrowUp") {
            keys[event.key] = true;
        }
        else if (event.key === "l") {
            swooshAudio.play();
            enemy_timer_attack = 0;
            keys[event.key] = true;
            stop_enemy = false;
            stop_enemy_attacking = true;
        }
        else {
            keys[event.key] = true;
            stop_enemy = false;
        };
    };
});
addEventListener("keyup" , (event) => {
    // managing player up key
    if ((event.key === "a") || (event.key === "d") || (event.key === "w") || (event.key === "v")) {
        if (event.key === "w") {} // pass
        else if (event.key === "v") {} // pass
        else {
            keys[event.key] = false; 
            stop_player = true;
        };
    }
    // managing enemy up key
    else if ((event.key === "ArrowLeft") || (event.key === "ArrowRight") || (event.key === "ArrowUp") || (event.key === "l")) {
        if (event.key === "ArrowUp") {} // pass
        else if (event.key === "l") {} // pass
        else {
            keys[event.key] = false;
            stop_enemy = true;
        };
    }
    else { 
        keys[event.key] = false;
    };
});
// set playerImg-function( Stop / Left / Right )
var playerImg = new Image();
function setPlayerImg(filePath, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, width ) {
    playerImg.src = filePath;
    ctx.drawImage(playerImg, sx * width, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};
// set enemyImg-function( Stop / Left / Right )
var enemyImg = new Image();
function setEnemyImg(filePath, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, width) {
    enemyImg.src = filePath;
    ctx.drawImage(enemyImg, sx * width, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};
// show player depending on player's state;
let player_timer = 0;
let player_frame = 0;
let player_timer_attack = 0;
let stop_player_attacking = false;
let enemyRight = 0;
let enemyLeft = 0;
let enemyTop = 0;
let enemyBottom = 0;
let playerAttackRight = 0;
let playerAttackLeft = 0;
let playerAttackRight_L = 0;
let playerAttackLeft_L = 0;
let playerAttackTop = 0;
let playerAttackBottom = 0;
function showPlayer() {
    enemyRight = enemy_X + 215 + 70;
    enemyLeft = enemy_X + 215;
    enemyTop = enemy_Y + 190;
    enemyBottom = enemy_Y + 190 + 115;
    playerAttackRight = player_X + 250 + 200;
    playerAttackLeft = player_X + 250;
    playerAttackRight_L = player_X + 35 + 200; 
    playerAttackLeft_L = player_X + 35;
    playerAttackTop = player_Y + 240;
    playerAttackBottom = player_Y + 240 + 40; 
    // player position;
    ctx.fillStyle = "rgba(0, 255, 0, 0)";
    ctx.fillRect(player_X + 215, player_Y + 230, 70, 105);
    if (keys["v"] === true) {
        if (keys["d"] === true) {
            // player attack direction → " right ";
            // player attack position
            ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
            ctx.fillRect((player_X + 250), (player_Y + 240), 200, 40);
            // set " check_X / check_Y " ;
            check_X = ((playerAttackLeft <= enemyLeft) && ( enemyLeft <= playerAttackRight)) ||
                ((playerAttackLeft <= enemyRight) && (enemyRight <= playerAttackRight));
            check_Y = ((enemyTop <= playerAttackTop) && (playerAttackTop <= enemyBottom)) || 
                ((enemyTop <= playerAttackBottom) && (playerAttackBottom <= enemyBottom));
            PlayerHit(check_X, check_Y);
            // play attack motion
            player_timer_attack += 1;
            if (player_timer_attack <= 28) {
                if (player_timer_attack % 4 === 0) {
                    player_frame += 1
                };
            }
            else if (player_timer_attack > 28) {
                keys["v"] = false;
                stop_player = true;
                player_timer_attack = 0
            }; 
            setPlayerImg(".\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Attack1.png", (player_frame % 8), 0, 250, 250, player_X, player_Y, 500, 500, 250)
        }
        else if (keys["a"] === true) {
            // player attack direction → " left ";
            // player attack positon;
            ctx.fillStyle = "rgba(0, 0, 0, 0.0)";
            ctx.fillRect((player_X + 35), (player_Y + 240), 200, 40);
            // set " check_X / check_Y " ;
            check_X = ((playerAttackLeft_L <= enemyLeft) && (enemyLeft <= playerAttackRight_L)) ||
                ((playerAttackLeft_L <= enemyRight) && (enemyRight <= playerAttackRight_L));
            check_Y = ((enemyTop <= playerAttackTop) && (playerAttackTop <= enemyBottom)) || 
                ((enemyTop <= playerAttackBottom) && (playerAttackBottom <= enemyBottom));
            PlayerHit(check_X, check_Y);
            // play attack motion;
            player_timer_attack += 1;
            if  (player_timer_attack <= 28) {
                if (player_timer_attack % 4 === 0) {
                    player_frame += 1
                };
            }
            else if (player_timer_attack > 28) {
                keys["v"] = false;
                stop_player = true;
                player_timer_attack = 0
            }; 
            setPlayerImg(".\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\AttackLeft2.png", (player_frame % 8), 0, 250, 250, player_X, player_Y, 500, 500, 250)
        }
        else if (stop_player_attacking === true) {
            // player attack direction → " right ";
            // player attack position
            ctx.fillStyle = "rgba(0, 0, 0, 0)";
            ctx.fillRect((player_X + 250), (player_Y + 240), 200, 40);
            // set " check_X / check_Y " ; 
            check_X = ((playerAttackLeft <= enemyLeft) && ( enemyLeft <= playerAttackRight)) ||
                ((playerAttackLeft <= enemyRight) && (enemyRight <= playerAttackRight));
            check_Y = ((enemyTop <= playerAttackTop) && (playerAttackTop <= enemyBottom)) || 
                ((enemyTop <= playerAttackBottom) && (playerAttackBottom <= enemyBottom)); 
            PlayerHit(check_X, check_Y);
            // play attack motion;
            player_timer_attack += 1;
            if (player_timer_attack <= 28) {
                if (player_timer_attack % 4 === 0) {
                    player_frame += 1
                };
            }
            else if (player_timer_attack > 28) {
                keys["v"] = false;
                stop_player = true;
                player_timer_attack = 0
                stop_player_attacking = false;
            }; 
            setPlayerImg(".\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Attack1.png", (player_frame % 8), 0, 250, 250, player_X, player_Y, 500, 500, 250)
        }
    }
    else {
        if (keys["a"] === true) {
            player_timer += 1;
            if (player_timer % 2 === 0) { 
                player_frame += 1 
            };
            setPlayerImg(".\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\RunLeft.png", (player_frame % 8), 0, 250, 250, player_X, player_Y, 500, 500, 250);
        }
        else if (keys["d"] === true) {
            player_timer += 1;
            if (player_timer % 2 === 0) { 
                player_frame += 1 
            };
            setPlayerImg(".\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Run.png", (player_frame % 8), 0, 250, 250, player_X, player_Y, 500, 500, 250);
        }
        else if (stop_player === true) {
            player_timer += 1;
            if (player_timer % 5 === 0) { 
                player_frame += 1 
            };
            setPlayerImg(".\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Idle.png", (player_frame % 8), 0, 250, 250, player_X, player_Y, 500, 500, 250)
        }
    };
};
// show enemy depending on enemy'state;
let enemy_time = 0;
let enemy_frame = 0;
let enemy_timer_attack = 0;
let stop_enemy_attacking = false;
let playerRight = 0;
let playerLeft = 0;
let playerTop = 0;
let playerBottom = 0;
let enemyAttackRight = 0;
let enemyAttackLeft = 0;
let enemyAttackRight_R = 0;
let enemyAttackLeft_R = 0;
let enemyAttackTop = 0;
let enemyAttackBottom = 0; 
function showEnemy() {
    playerRight = player_X + 215 + 70;
    playerLeft = player_X + 215;
    playerTop = player_Y + 230;
    playerBottom = player_Y + 230 + 105;
    enemyAttackRight = enemy_X + 30 + 210;
    enemyAttackLeft = enemy_X + 30;
    enemyAttackRight_R = enemy_X + 255 + 210;
    enemyAttackLeft_R = enemy_X + 255;
    enemyAttackTop = enemy_Y + 200;
    enemyAttackBottom = enemy_Y + 200 + 40;
    ctx.fillStyle = "rgba(0, 255, 0, 0)";
    ctx.fillRect(enemy_X + 215, enemy_Y + 190, 70, 115);
    if (keys["l"] === true) {
        if (keys["ArrowRight"]) {
            // enemy attack direction → " Right ";
            // enemy attack position
            ctx.fillStyle = "rgba(0, 0, 255, 0.0)"
            ctx.fillRect(enemy_X + 255, enemy_Y + 200, 210, 40)
            // set " Check_X / Check_Y ";
            Check_X = ((enemyAttackLeft_R <= playerLeft) && (playerLeft <= enemyAttackRight_R)) ||
                ((enemyAttackLeft_R <= playerRight) && (playerRight <= enemyAttackRight_R));
            Check_Y = ((playerTop <= enemyAttackTop) && (enemyAttackTop <= playerBottom)) ||
                ((playerTop <= enemyAttackBottom) && (enemyAttackBottom <= playerBottom));
            EnemyHit(Check_X, Check_Y);
            enemy_timer_attack += 1;
            if (enemy_timer_attack <= 18) {
                if (enemy_timer_attack % 4 === 0) {
                    enemy_frame += 1;
                };
            }
            else if (enemy_timer_attack > 18) {
                keys["l"] = false;
                stop_enemy = true;
                enemy_timer_attack = 0;
                stop_enemy_attacking = false;
            };
            setEnemyImg(".\\Martial Hero\\Martial Hero\\Sprites\\AttackRight.png" , (enemy_frame % 6), 0, 200, 200, enemy_X, enemy_Y, 500, 500, 200);        
        }
        else if (keys["ArrowLeft"]) {
            // enemy attack direction → " left ";
            // enemy attack position
            ctx.fillStyle = "rgba(0, 0, 255, 0.0)"
            ctx.fillRect(enemy_X + 30, enemy_Y + 200, 210, 40)
            // set " Check_X / Check_Y ";
            Check_X = ((enemyAttackLeft <= playerLeft) && (playerLeft <= enemyAttackRight)) ||
                ((enemyAttackLeft <= playerRight) && (playerRight <= enemyAttackRight));
            Check_Y = ((playerTop <= enemyAttackTop) && (enemyAttackTop <= playerBottom)) ||
                ((playerTop <= enemyAttackBottom) && (enemyAttackBottom <= playerBottom));
            EnemyHit(Check_X, Check_Y);
            enemy_timer_attack += 1;
            if (enemy_timer_attack <= 18) {
                if (enemy_timer_attack % 4 === 0) {
                    enemy_frame += 1;
                };
            }
            else if (enemy_timer_attack > 18) {
                keys["l"] = false;
                stop_enemy = true;
                enemy_timer_attack = 0;
            };
            setEnemyImg(".\\Martial Hero\\Martial Hero\\Sprites\\Attack.png" , (enemy_frame % 6), 0, 200, 200, enemy_X, enemy_Y, 500, 500, 200);        
        }
        else if (stop_enemy_attacking === true) {
            // enemy attack direction → " left ";
            // enemy attack position
            ctx.fillStyle = "rgba(0, 0, 255, 0.0)"
            ctx.fillRect(enemy_X + 30, enemy_Y + 200, 210, 40)
            // set " Check_X / Check_Y "
            Check_X = ((enemyAttackLeft <= playerLeft) && (playerLeft <= enemyAttackRight)) ||
                ((enemyAttackLeft <= playerRight) && (playerRight <= enemyAttackRight));
            Check_Y = ((playerTop <= enemyAttackTop) && (enemyAttackTop <= playerBottom)) ||
                ((playerTop <= enemyAttackBottom) && (enemyAttackBottom <= playerBottom));
            EnemyHit(Check_X, Check_Y);
            // enemy attack motion
            enemy_timer_attack += 1;
            if (enemy_timer_attack <= 18) {
                if (enemy_timer_attack % 4 === 0) {
                    enemy_frame += 1;
                };
            }
            else if (enemy_timer_attack > 18) {
                keys["l"] = false;
                stop_enemy = true;
                enemy_timer_attack = 0;
                stop_enemy_attacking = false;
            };
            setEnemyImg(".\\Martial Hero\\Martial Hero\\Sprites\\Attack.png" , (enemy_frame % 6), 0, 200, 200, enemy_X, enemy_Y, 500, 500, 200);        
        };
    }
    else {
        if (keys["ArrowRight"] === true) {
            enemy_time += 1;
            if (enemy_time % 5 === 0) {
                enemy_frame += 1;
            };
            setEnemyImg(".\\Martial Hero\\Martial Hero\\Sprites\\Run_right.png", (enemy_frame % 8), 0, 200, 200, enemy_X, enemy_Y, 500, 500, 200); 
        }
        else if (keys["ArrowLeft"] === true) {
            enemy_time += 1;
            if (enemy_time % 5 === 0) {
                enemy_frame += 1;
            };
            setEnemyImg(".\\Martial Hero\\Martial Hero\\Sprites\\Run_left.png", (enemy_frame % 8), 0, 200, 200, enemy_X, enemy_Y, 500, 500, 200); 
        }
        else if (stop_enemy === true) {
            enemy_time += 1;
            if (enemy_time % 5 === 0) {
                enemy_frame += 1;
            };
            setEnemyImg(".\\Martial Hero\\Martial Hero\\Sprites\\Idle.png", (enemy_frame % 8), 0, 200, 200, enemy_X, enemy_Y, 500, 500, 200); 
        };
    };
};
let player_X = 60;
let player_Y = 240;
let player_jump_timer = 0;
let enemy_X = 900;
let enemy_Y = 270;
let enemy_jump_timer = 0;
let game_timer = 0;
let game_timerNumber = 0;
let workTimer = false;
// run this game;
function runGame() {
    // initialize this game
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
    // set-backgroundImage
    ctx.drawImage(backImg1, 0, 0, window.innerWidth, window.innerHeight)
    ctx.drawImage(backImg2, 0, 0, window.innerWidth, window.innerHeight)
    ctx.drawImage(backImg3, 0, 0, window.innerWidth, window.innerHeight)
    ctx.drawImage(backImg_bottomline, 2, 0, 73, 20, 0, 575, 1575, 50)
    // set scoreboard;   
    ctx.fillStyle = "red";
    ctx.fillRect(30, 40, 650, 50);
    ctx.fillStyle = "blue";
    ctx.fillRect(835, 40, 650, 50); 
    scoreboard_left(setScore_Left);
    scoreboard_right(setScore_Right);
    // time box;
    ctx.fillStyle = "black";
    ctx.fillRect(715, 30, 90, 80);
    // set timer;
    if (workTimer === true) {
        game_timer += 1;
        if (game_timer % 60 === 0) {
            game_timerNumber += 1;
            console.log(`HP_enemy : ${HP_enemy}, HP_player : ${HP_player}`);
        };
        // set time text;
        if (game_timerNumber < 10) {
            ctx.fillStyle = "white"
            ctx.font = "45px Verdana";
            ctx.fillText(game_timerNumber, 743, 89);
        }
        else if ((10 <= game_timerNumber) && (game_timerNumber < 100)) {
            ctx.fillStyle = "white"
            ctx.font = "45px Verdana";
            ctx.fillText(game_timerNumber, 730, 90);
        }
        else if (100 < game_timerNumber) {
            alert("time over!");
            // add resetButton !!!!
        };   
    };
    // set player position ( X / Y )
    if ( keys["a"] === true ) { 
        player_X -= 6 
    }
    else if ( keys["d"] === true ) { 
        player_X += 6 
    };
    // player jump
    if (keys["w"] === true) {
        player_jump_timer += 1;
        if (player_jump_timer < 22) {
            player_Y -= 9;
        } 
        else if (player_jump_timer >= 22) {
            player_Y += 9;
            if (player_Y >= 240) {  
                keys["w"] = false;
                player_jump_timer = 0;              
            };
        };
    };
    // show player 
    showPlayer();
    // set enemy position ( X / Y );
    if ( keys["ArrowRight"] === true) { 
        enemy_X += 6
    }
    else if ( keys["ArrowLeft"] === true ) { 
        enemy_X -= 6 
    };
    // enemy jump;
    if (keys["ArrowUp"] === true) {
        enemy_jump_timer += 1;
        if (enemy_jump_timer < 22) {
            enemy_Y -= 9;
        }
        else if (enemy_jump_timer >= 22) {
            enemy_Y += 9;
            if (enemy_Y >= 270) {
                keys["ArrowUp"] = false;
                enemy_jump_timer = 0;
            };
        };
    };
    // show enemy
    showEnemy();
    // player or enemy dead motion → game end!;
    if ((isDead_enemy === true) || (isDead_player === true)) {
        runGameBool = false;
        endGame()
    }
    else {
        requestAnimationFrame(runGame);
    }
};
runGame();
// player or enemy dead motion → game end!;
function endGame() {
     // initialize this game
     ctx.clearRect(0,0, window.innerWidth, window.innerHeight);
     // set-backgroundImage
     ctx.drawImage(backImg1, 0, 0, window.innerWidth, window.innerHeight)
     ctx.drawImage(backImg2, 0, 0, window.innerWidth, window.innerHeight)
     ctx.drawImage(backImg3, 0, 0, window.innerWidth, window.innerHeight)
     ctx.drawImage(backImg_bottomline, 2, 0, 73, 20, 0, 575, 1575, 50)
     // set scoreboard;   
     ctx.fillStyle = "red";
     ctx.fillRect(30, 40, 650, 50);
     ctx.fillStyle = "blue";
     ctx.fillRect(835, 40, 650, 50); 
     scoreboard_left(setScore_Left);
     scoreboard_right(setScore_Right);
     // time box;
     ctx.fillStyle = "black";
     ctx.fillRect(715, 30, 90, 80);
    // player dead;
    if (isDead_player === true) {
        // play deadSound;
        setTimeout(() => {
            deadSound.play();
        }, 1500);
        // enemy standing;
        enemy_time += 1;    
        if (enemy_time % 4 === 0) {
            enemy_frame += 1;
        };
        setEnemyImg(".\\Martial Hero\\Martial Hero\\Sprites\\Idle.png", (enemy_frame % 8), 0, 200, 200, enemy_X, enemy_Y, 500, 500, 200); 
        // player dead motion
        player_timer += 1;
        if (player_timer % 39 === 0) {
            player_frame += 1;
        };
        setPlayerImg(".\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Death.png", (player_frame % 7), 0, 250, 250, player_X, player_Y, 500, 500, 250);
        setTimeout(() => {
            // alert("player dead 😬") and and reset game;
            isDead_player = false;
            isDead_enemy = false;
            HP_enemy = 650;
            HP_player = 650;
            setScore_Left = 0;
            setScore_Right = 0;
            game_timer = 0;
            game_timerNumber = 0;
            player_X = 60;
            player_Y = 240;
            player_jump_timer = 0;
            enemy_X = 900;
            enemy_Y = 270;
            enemy_jump_timer = 0;
            game_timer = 0;
            game_timerNumber = 0;
        }, 3000);
    }
    // enemy dead;
    else if (isDead_enemy === true) {
        // play deadSound;
        setTimeout(() => {
            deadSound.play();
        }, 1500)
        // player standing;
        player_timer += 1;
        if (player_timer % 2 === 0) {
            player_frame += 1;
        };
        setPlayerImg(".\\EVil Wizard 2\\EVil Wizard 2\\Sprites\\Idle.png", (player_frame % 8), 0, 250, 250, player_X, player_Y, 500, 500, 250);
        // enemy dead motion;
        enemy_time += 1;
        if (enemy_time % 35 === 0) {
            enemy_frame += 1;
        };
        setEnemyImg(".\\Martial Hero\\Martial Hero\\Sprites\\Death.png", (enemy_frame % 6), 0, 200, 200, enemy_X, enemy_Y, 500, 500, 200)
        setTimeout(() => {
            // alert("enemy dead 😬") and reset game;
            isDead_enemy = false;
            isDead_player = false;
            HP_enemy = 650;
            HP_player = 650;
            setScore_Left = 0;
            setScore_Right = 0;
            game_timer = 0;
            game_timerNumber = 0;
            player_X = 60;
            player_Y = 240;
            player_jump_timer = 0;
            enemy_X = 900;
            enemy_Y = 270;
            enemy_jump_timer = 0;
            game_timer = 0;
            game_timerNumber = 0;
        }, 2600);
    };
    if ((isDead_player === false) && (isDead_enemy === false)) {
        setTimeout(() => {
            setFightMessage();
        }, 1200)
        runGame();        
    }
    else {
        requestAnimationFrame(endGame);
    };
    
};

