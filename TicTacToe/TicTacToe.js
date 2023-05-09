counter = 0
counterType = 0
const lst = [['-','-','-'],
            ['-','-','-'],
            ['-','-','-']]
var GameEnded = false
var botPlaying  = false

function onDisp(txt) {
    document.getElementById("overlay").style.display = "block";
    document.getElementById(('text')).innerHTML = txt
}
  
function off(hijack = false) {
    document.getElementById("overlay").style.display = "none";
    if (GameEnded || hijack){
        for (let n = 1; n<10; n++){
            console.log(n)
            document.getElementById(('b'+n)).innerHTML = ''
            lst[Math.floor((n-1)/3)][((n-1)%3)] = "-";
        }
        counter = 0
        GameEnded = false
        if (botPlaying && botFirst && !hijack) bot()
        
        
    }
}
function check(b){
    return ((b[0][0] == b[0][1] && b[0][1] == b[0][2] && b[0][2] != '-') ||
            (b[1][0] == b[1][1] && b[1][1] == b[1][2] && b[1][2] != '-') ||
            (b[2][0] == b[2][1] && b[2][1] == b[2][2] && b[2][2] != '-') ||
            (b[0][0] == b[1][0] && b[1][0] == b[2][0] && b[2][0] != '-') ||
            (b[0][1] == b[1][1] && b[1][1] == b[2][1] && b[2][1] != '-') ||
            (b[0][2] == b[1][2] && b[1][2] == b[2][2] && b[2][2] != '-') ||
            (b[0][0] == b[1][1] && b[1][1] == b[2][2] && b[2][2] != '-') ||
            (b[0][2] == b[1][1] && b[1][1] == b[2][0] && b[2][0] != '-'))
}
function endCheck(){
    if (check(lst)){
        GameEnded = true
        onDisp(botPlaying ? (counter % 2 ? "Player" : "Bot") + " wins <br> Click to reset":
                            "Dude "+ (1 + counter % 2) +" won<br> Click to reset")
    }
    else if (counter == 9 || (counter == 7 && botFirst == true)){
        GameEnded = true
        onDisp("Draw, both of you suck<br> Click to reset")
    }
}
function change(n){
    //prevents a move if game has ended or box is occupied
    if (lst[Math.floor((n-1)/3)][((n-1)%3)] != '-'){
        onDisp('Box is already Occupied')
        return 0
    }
    else if (GameEnded == true){
        onDisp('Game is already over')
        return 0
    }

    if (counter % 2 == 0 ){
        document.getElementById(('b'+n)).innerHTML = 'X'
        lst[Math.floor((n-1)/3)][((n-1)%3)] = "X";
        if (botPlaying == true){bot()}
    }
    else{
        document.getElementById(('b'+n)).innerHTML = 'O'
        lst[Math.floor((n-1)/3)][((n-1)%3)] = "O";
    }
    counter += 1

    //Game ends
    endCheck()
    
}

function bot(){
    endCheck()
    //to lazy to create the real one, just made it do random moves lmao
    if (GameEnded == false){
        while (true ){
            randomNo = Math.floor(Math.random() * (9 - 1)) + 1;
            if (lst[Math.floor((randomNo-1)/3)][((randomNo-1)%3)] == '-'){
                document.getElementById(('b'+randomNo)).innerHTML = 'O'
                lst[Math.floor((randomNo-1)/3)][((randomNo-1)%3)] = "O";
                break;
            }
        }
        counter += 1
    }
    endCheck()
    
    
    

}
function switchButton(botFirst = false){
    if (counterType % 2 ==0){
        document.getElementById("Bb1").innerHTML = "Player vs Player"
        document.getElementById("Bb2").style.display = "none"
        document.getElementById('changeText').innerHTML = 'Bot: O'
        GameEnded = true
        botPlaying = true
        GameEnded = true
        off(true)
        if (botFirst == true){
            bot()
            counter = 0
        }


    }
    else{
        document.getElementById("Bb1").innerHTML = "Play with Bot: Human First"
        document.getElementById("Bb2").style.display = "block"
        document.getElementById('changeText').innerHTML = 'Player 2: O'
        botPlaying= false
        GameEnded = true
        off(true)
        
    }
    
    counterType += 1
}
