let balance = 100
let sum = 0
let dsum =0
let gameover = false

let playCards = {

        "2": "♠️2",
        "3": "♠️3",
        "4": "♠️4",
        "5": "♠️5",
        "6": "♠️6",
        "7": "♠️7",
        "8": "♠️8",
        "9": "♠️9",
        "10": "♠️10",
        "11": "♠️A",
        "11": "♠️A",
   
    
      
      
}



function rn(min , max){
    return (Math.floor(Math.random() *(max-min+1)+min))
}

let message = ""
let messageEl = document.querySelector("#message-el")

let sumEl = document.getElementById("sum-el")
let cardEl = document.getElementById("card-el")


let dealerCard = document.getElementById("dealer-card")
let dealersum = document.getElementById("dealer-sum")

let bal=document.getElementById("balance")
let count = 0;
let facedown = "🂠"

function renderGame(){
    sumEl.textContent = `Sum: ${sum}`
    dealersum.textContent = `Dealer sum: ${dsum}`
    messageEl.textContent = message
    bal.textContent=balance
    document.getElementById("balance").textContent = `Balance: ${balance}`

}

function resetGame(){
    gameover=false
    sum=0
    dsum=0
    message="----------------"
    cardEl.textContent="Your Cards: "
    dealerCard.textContent="Dealer Cards: "
    count=0

    renderGame()
}

function startGame(){
 
    document.querySelector(".maingame").style.display='block';
    document.querySelector(".end-screen").style.display='none';

    resetGame()
    dealerCheck();
    dealerCheck();
    userDrawCard();
    renderGame()


}


//User and dealer draw cards
function userDrawCard(){
    let card = rn(2,11)
    sum+=card
    cardEl.textContent += ` ${playCards[card]}`
    renderGame()

}

function newCard(){

    if(gameover) return
    userDrawCard()
    checkWinner()
}

function userStand(){
    if(gameover) return 
    dealerCheck()

}


function dealerDrawCard(){
    let card = rn(2,11)
    dsum+=card
    dealerCard.textContent += ` ${playCards[card]}`
    count++


}


function dealerCheck(){

    if(count==0) dealerDrawCard()
    else if(count===1) {
        dealerCard.textContent += `${facedown}`
        count++
        renderGame()
    }
    else if(count===2){
        dealerCard.textContent = dealerCard.textContent.replace(facedown,"")
        dealerDrawCard()
        if(dsum<17){ 
            dealerDrawCard()
        }  
        renderGame()
        gameover=true  
        checkWinner()
    }

}
//check winner

let change = "+0"
function balanceChange(c){
    change=`${balance} ${c>0?'+':''} ${c}`
    balance+=c
}

function checkWinner(){


    if(sum>21 && dsum>21){
        message="Both bust"
        gameover=true;
    }
    else if(sum >21){
        message = "You bust"
        gameover=true
        balanceChange(-200)
        
    }
    else if(dsum>21){
        message = "Dealer bust"
        gameover=true
        balanceChange(200)
        
    }
    else{
        if(sum==21 && dsum==21){
            message="Draw"
            gameover=true
        }
        else if(sum==21){
            message="You win"
            gameover=true
            balanceChange(200)
            
        }
        else if(dsum==21){
            message="Dealer win"
            gameover=true
            balanceChange(-200)
            
        }
        else if(count>=3){

            
            if (dsum < sum) {
                message = "Player wins";
                balanceChange(200);
            } 
            else if (dsum > sum) {
                message = "Dealer wins";
                balanceChange(-200)
            } 
            else {
                message = "Draw";
                change ="+-0"
                
            }
            gameover=true
            
        }
        else{
            if(!gameover)
                message="Hit or stand"
        
        }
    }
    
    renderGame()
    if(gameover==true )
        setTimeout(endscreen,1000)

}

function endscreen(){

    document.querySelector('#state').textContent=message
    document.querySelector('#bal').textContent =`Balance: ${balance}(${change})`

    document.querySelector("#end-screen-dealer-cards").textContent=dealerCard.textContent
    document.querySelector("#end-dealer-sum").textContent=dealersum.textContent

    document.querySelector("#end-screen-player-cards").textContent=cardEl.textContent
    document.querySelector("#end-sum").textContent=sumEl.textContent



    document.querySelector(".maingame").style.display='none'
    document.querySelector(".end-screen").style.display='block'


}
