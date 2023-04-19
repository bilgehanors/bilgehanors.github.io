function dice_roller() {
    var diceNumber1 =  Math.floor(Math.random() * 6) + 1;
    var diceNumber2 =  Math.floor(Math.random() * 6) + 1;
    var DiceImage1 = 'images/dice' + diceNumber1 + '.' +'png'
    var DiceImage2 = 'images/dice' + diceNumber2 + '.' +'png'
    document.querySelectorAll("img")[0].setAttribute("src",DiceImage1);
    document.querySelectorAll("img")[1].setAttribute("src",DiceImage2);
    function Result() {
      var p1 = document.getElementById("player1");  
      var p2 = document.getElementById("player2"); 
      if (p1.checked==true) {
        if (diceNumber1 > diceNumber2){
          document.querySelector("h3").innerHTML = "🚩 Kazandın! 🚩";
        }
        else if (diceNumber2 > diceNumber1) {
          document.querySelector("h3").innerHTML = "Kaybettin !";
        }
        else {
          document.querySelector("h3").innerHTML = "Berabere!";
        }
      }
      else if (p2.checked==true) {
        if (diceNumber2 > diceNumber1){
          document.querySelector("h3").innerHTML = "🚩 Kazandın! 🚩";
        }
        else if (diceNumber1 > diceNumber2) {
          document.querySelector("h3").innerHTML = "Kaybettin !";
        }
        else {
          document.querySelector("h3").innerHTML = "Berabere!";
        }
      }
      else {
        document.querySelector("h3").innerHTML = "Lütfen Bir Zar Seç !";
      }
    }
    Result()
    var inputs = document.querySelectorAll('.check_value');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].checked = false;
        }
      }
function onlyOne(checkbox) {
  var checkboxes = document.getElementsByName('check')
  checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false
  })
}
document.querySelector("button").addEventListener("click",dice_roller)


