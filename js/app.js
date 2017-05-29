var letterArr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var wordArr = ["dictionary","washington","rainbow","hello", "tortilla","smartphone", "television","operate","vehicle"];

var container = document.getElementById("container");
var hangman = document.getElementById("hangman");
var word = wordArr[Math.floor(Math.random()*wordArr.length)+0].toUpperCase();

var triesOutput = document.getElementById("tries");
var tries = 6;
triesOutput.innerHTML = "Turns: " + tries;

var keypad = function(){
       for(var i = 0; i< letterArr.length; i++){
            var inputButton = document.createElement("button");
            inputButton.innerHTML = letterArr[i];
            inputButton.classList.add("keypadInput");
            inputButton.value = letterArr[i];
            container.insertBefore(inputButton, triesOutput);
       }
}
var hints = function(){
    var hintOutput = document.getElementById("hint");
    var hintOutputContainer = document.createElement("div");
    hintOutputContainer.classList.add("hint-output");
    container.appendChild(hintOutputContainer);
    hintOutput.innerHTML = "Hint: The word is "+ word.length +" letters long"; 
    for(var i = 0; i < word.length; i++){
        var inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.classList.add("hint-letters","invisible");
        inputElement.setAttribute("readonly","readonly");
        inputElement.placeholder = word[i];
        hintOutputContainer.appendChild(inputElement);
    }
}
var check = function(input){
     var guessText = input;
     var guess = guessText.toUpperCase();
     var hintSplit = word.split("");
     if(hintSplit.indexOf(guess) === -1){
              --tries; 
              triesOutput.innerHTML = "Turns: " + tries;
              if(tries <= 3){
                 triesOutput.setAttribute("style","color: red");
              }
              if(tries === 5){
                 hangman.src = "https://josuearce.com/img/hangman-2.png"
              }
              if(tries === 4){
                 hangman.src = "https://josuearce.com/img/hangman-3.png" 
              }
              if(tries === 3){
                hangman.src = "https://josuearce.com/img/hangman-4.png"
              }
              if(tries === 2){
                hangman.src = "https://josuearce.com/img/hangman-5.png"
              }
              if(tries === 1){
                hangman.src = "https://josuearce.com/img/hangman-6.png"
              }
              if(tries <= 0){
                  hangman.src="https://josuearce.com/img/hangman-7.png";
                  triesOutput.innerHTML = "GAME OVER <br> The word was - "+ hintSplit.join("");
                  document.getElementsByClassName("hint-output")[0].setAttribute("style","display: none");
                  
              }
     }else{
       console.log(valid);
       valid(guess,hintSplit);
    }
}
var newArr = [];
var valid = function(input,split){
     var hintElement = document.getElementsByClassName("hint-letters");
     var actualWord = split.join("");
     for(var i = 0; i < hintElement.length; i++){
           if(input == hintElement[i].placeholder){
                newArr[i] = input;
                hintElement[i].classList.remove("invisible"); 
           }
      }
      if(newArr.join("") === actualWord){
         triesOutput.innerHTML = "Congrats! You guessed right!";
         triesOutput.setAttribute("style","color: green");
      }
}
hints();
keypad();
var keypadValue = document.getElementsByClassName("keypadInput");
     for(var i = 0; i < keypadValue.length; i++){
          keypadValue[i].onclick = function(){
                check(this.value);
          }
}