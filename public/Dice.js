function dice_roller() {
    var diceNumber1 =  Math.floor(Math.random() * 6) + 1;
    var diceNumber2 =  Math.floor(Math.random() * 6) + 1;
    var DiceImage1 = 'images/dice' + diceNumber1 + '.' +'png'
    var DiceImage2 = 'images/dice' + diceNumber2 + '.' +'png'
    document.querySelectorAll("img")[0].setAttribute("src",DiceImage1);
    document.querySelectorAll("img")[1].setAttribute("src",DiceImage2);
    if (diceNumber1 > diceNumber2) {
        document.querySelector("h3").innerHTML = "🚩 Play 1 Wins!";
      }
      else if (diceNumber2 > diceNumber1) {
        document.querySelector("h3").innerHTML = "Player 2 Wins! 🚩";
      }
      else {
        document.querySelector("h3").innerHTML = "Draw!";
      }
}
dice_roller()

