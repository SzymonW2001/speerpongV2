

let yourPoints = 0
let computerPoints = 0
document.querySelector(".time").innerHTML=""
let seconds = 0
let width = window.innerWidth

if(width<400){
    document.body.innerHTML='<div class="smallcreen"><h1>ZA MAŁY EKRAN, OBRÓĆ TELEFON</h1></div>'
}
if(width>400 && width<800){
    document.querySelector(".twoPlayers").remove()
    game(data)
}
else{
    alles()
}
function alles(){
    game(data)
}

function game(data){
    document.querySelector(".gamemodes").style.display="none" 
    let ball = document.getElementById("ball")
    let gameWindow = document.querySelector(".pole")
    let velocity = 7
    let velocityLeft = 8
    let velocityTop = 8
    let compVelocity = 9
    
    if(data==1){
        setInterval(() => {
            seconds+=1
            secondsTime=seconds%60
            minutes  = Math.floor(seconds/60)
            document.querySelector(".time").innerHTML=`${minutes}m ${secondsTime}s`
        }, 1000);
    }
    
    function update(time){
        velocity+=0.001
        window.requestAnimationFrame(update)
        let playerPosition = player.getBoundingClientRect();
        let random = Math.floor(Math.random() * (4)) + velocity
        let ballPosition = ball.getBoundingClientRect()
        let gameWindowPosition = gameWindow.getBoundingClientRect()
        let computerPosition = document.getElementById("computer").getBoundingClientRect();
    
    
        ball.style.left=ballPosition.left + velocityLeft + "px"
        ball.style.top=ballPosition.top + velocityTop + "px"
    
        if(computerPoints==10 | yourPoints==10){
            ball.style.left=50+"%"
            ball.style.top=50+"%"
            window.cancelAnimationFrame(update)
            window.location.reload(true)
        }
    
    
        let computer = document.getElementById("computer")
        if(data==1){
            computer.style.top=ballPosition.top - 50 + "px"    
        }
        if(data==2){
            computer.style.height="40%"
            computer.style.top=computerPosition.top - compVelocity + "px"
    
            if(computerPosition.top<gameWindowPosition.top){
                compVelocity=-9
            }
            if(computerPosition.bottom>gameWindowPosition.bottom){
                compVelocity=9
            }
        }
    
    
        ////////////////////////////////208
        if(ballPosition.bottom>gameWindowPosition.bottom){
            velocityTop=-random
        }
        if(ballPosition.top<gameWindowPosition.top){
            velocityTop=random
        }
        if(ballPosition.left-30<playerPosition.left && ballPosition.bottom<playerPosition.bottom+50 && ballPosition.top+50>playerPosition.top){
            velocityLeft=random
        }
        if(ballPosition.left<gameWindowPosition.left){
            ball.style.left=50+"%"
            ball.style.top=50+"%"
            velocityLeft=random
            computerPoints+=1
            document.getElementById("points").innerHTML=`${yourPoints} : ${computerPoints}`
    
        }
    
        if(ballPosition.right>gameWindowPosition.right){
            ball.style.left=50+"%"
            ball.style.top=50+"%"
            velocityLeft=-random
            yourPoints+=1
            document.getElementById("points").innerHTML=`${yourPoints} : ${computerPoints}`
    
        }
    
        if(ballPosition.right+20>computerPosition.right && ballPosition.bottom<computerPosition.bottom+50 && ballPosition.top+50>computerPosition.top){
            velocityLeft=-random
        }
    
    
    }
    window.requestAnimationFrame(update)
    
    //////////////////////////////////////
    document.onkeydown = checkKey;
    
    function checkKey(e) {
        let player = document.getElementById("player");
        let playerPosition = player.getBoundingClientRect().top;
        let computer = document.getElementById("computer");
        let computerPosition = document.getElementById("computer").getBoundingClientRect().top;
    
        e = e || window.event;
    
        if (e.keyCode == '38') {
            console.log(playerPosition)
            player.style.top=playerPosition + -30 + "px"
    
    
        }
        else if (e.keyCode == '40') {
            console.log(playerPosition)
            player.style.top=playerPosition + 30 + "px"
        }
        
        if(data==3){
            if (e.keyCode == '87') {
                computer.style.top=computerPosition + -30 + "px"
            
            
            }
            else if (e.keyCode == '83') {
                computer.style.top=computerPosition + 30 + "px"
            }
        }
    }
            // Register touchstart and touchend listeners for element 'source'
            let clientX;
            let clientY;
            
            window.addEventListener('touchstart', (e) => {
                let playerPosition = player.getBoundingClientRect();
                
            
              // Cache the client X/Y coordinates
              clientX = e.touches[0].clientX;
              clientY = e.touches[0].clientY;
            
              console.log(clientX)
              console.log(clientY)  
              console.log(playerPosition.top)
              if(clientY>playerPosition.bottom){
                player.style.top=playerPosition.top + 30 + "px"
              }
              if(clientY<playerPosition.top){
                player.style.top=playerPosition.top + -30 + "px"
              }
            
            
            }, false);
    }
    
    