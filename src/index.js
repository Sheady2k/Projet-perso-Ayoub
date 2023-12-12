//const
const container = document.getElementById("alphabetButtons");
var answerDisplay = document.getElementById("hold");
var answer = "";
var hint = "";
var life = 10;
var wordDisplay = [];
var winningCheck = "";
const containerHint = document.getElementById("clue");
const buttonHint = document.getElementById("hint");
const buttonReset = document.getElementById("reset");
const livesDisplay = document.getElementById("mylives");
var myStickman = document.getElementById("stickman");
var context = myStickman.getContext("2d");

//generate alphabet button
function generateButton() {
  var buttonsHTML = "abcdefghijklmnopqrstuvwxyz"
    .split("")
    .map(
      (letter) =>
        `<button
         class = "alphabetButtonJS" 
         id="${letter}"
         >
        ${letter}
        </button>`
    )
    .join("");

  return buttonsHTML;
}

function handleClick(event) {
  const isButton = event.target.nodeName === "BUTTON";
  if (isButton) {
    //console.dir(event.target.id);
    //console.log(isButton);
    const buttonId = document.getElementById(event.target.id);
    buttonId.classList.add("selected");
  }
  return;
}

//word array
const question = [
  "La categorie choisie est : Jeux videos",
  "La categorie choisie est : Films",
  "La categorie choisie est : Sports"
];

const categories = [
  [
    "mario",
    "fortnite",
    "valorant",
    "overwatch",
    "call-of-duty",
    "minecraft",
    "roblox"
  ],
  ["avatar", "star-wars", "avengers", "indiana-jones", "toys-story"],
  ["basketball", "football", "soccer", "hockey", "volleyball"]
];

const hints = [
  [
    "plombier avec une moustache",
    "100 joueurs 1 gagnant",
    "counter strike version cartoon",
    " surveillance",
    "jeu de guerre mondialement connu",
    "monde cubique",
    "ressemble au jeu du monde cubique"
  ],
  [
    "ils ont la peau bleu",
    "sabres lasers",
    "bande de super heros",
    "homme avec un fouet",
    "jouets vivants "
  ],
  [
    "le but est de scorer le plus de paniers",
    "la balle de se sport ressemble a un ballon de rugby",
    "sport collectif se jouant avec les pieds ",
    "sur la glace ",
    "la balle ne doit pas toucher le sol"
  ]
];

//set question,answer and hint

function setAnswer() {
  const categoryOrder = Math.floor(Math.random() * categories.length);
  const chosenCategory = categories[categoryOrder];
  const wordOrder = Math.floor(Math.random() * chosenCategory.length);
  const chosenWord = chosenCategory[wordOrder];

  const categoryNameJS = document.getElementById("categoryName");
  categoryNameJS.innerHTML = question[categoryOrder];

  //console.log(chosenCategory);
  //console.log(chosenWord);
  answer = chosenWord;
  hint = hints[categoryOrder][wordOrder];
  answerDisplay.innerHTML = generateAnswerDisplay(chosenWord);
}

function generateAnswerDisplay(word) {
  var wordArray = word.split("");
  //console.log(wordArray);
  for (var i = 0; i < answer.length; i++) {
    if (wordArray[i] !== "-") {
      wordDisplay.push("_");
    } else {
      wordDisplay.push("-");
    }
  }
  return wordDisplay.join(" ");
}

function showHint() {
  containerHint.innerHTML = `Indice - ${hint}`;
}

buttonHint.addEventListener("click", showHint);
//setting initial condition
function init() {
  answer = "";
  hint = "";
  life = 10;
  wordDisplay = [];
  winningCheck = "";
  context.clearRect(0, 0, 400, 400);
  canvas();
  containerHint.innerHTML = `indice -`;
  livesDisplay.innerHTML = `vous avez  ${life} vies!`;
  setAnswer();
  container.innerHTML = generateButton();
  container.addEventListener("click", handleClick);
  console.log(answer);
  //console.log(hint);
}

window.onload = init();

//reset (play again)
buttonReset.addEventListener("click", init);

//guess click
function guess(event) {
  const guessWord = event.target.id;
  const answerArray = answer.split("");
  var counter = 0;
  if (answer === winningCheck) {
    livesDisplay.innerHTML = `VOUS AVEZ GAGNÉ!`;
    return;
  } else {
    if (life > 0) {
      for (var j = 0; j < answer.length; j++) {
        if (guessWord === answerArray[j]) {
          wordDisplay[j] = guessWord;
          console.log(guessWord);
          answerDisplay.innerHTML = wordDisplay.join(" ");
          winningCheck = wordDisplay.join("");
          //console.log(winningCheck)
          counter += 1;
        }
      }
      if (counter === 0) {
        life -= 1;
        counter = 0;
        animate();
      } else {
        counter = 0;
      }
      if (life > 1) {
        livesDisplay.innerHTML = `vous avez  ${life} vies !`;
      } else if (life === 1) {
        livesDisplay.innerHTML = `vous avez ${life} vies !`;
      } else {
        livesDisplay.innerHTML = `PERDU!`;
      }
    } else {
      return;
    }
    console.log(wordDisplay);
    //console.log(counter);
    //console.log(life);
    if (answer === winningCheck) {
      livesDisplay.innerHTML = `VOUS AVEZ GAGNÉ!`;
      return;
    }
  }
}

container.addEventListener("click", guess);

// Hangman
function animate() {
  drawArray[life]();
  //console.log(drawArray[life]);
}

function canvas() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "#fff";
  context.lineWidth = 2;
}

function head() {
  myStickman = document.getElementById("stickman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
}

function draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
  context.moveTo($pathFromx, $pathFromy);
  context.lineTo($pathTox, $pathToy);
  context.stroke();
}

function frame1() {
  draw(0, 150, 150, 150);
}

function frame2() {
  draw(10, 0, 10, 600);
}

function frame3() {
  draw(0, 5, 70, 5);
}

function frame4() {
  draw(60, 5, 60, 15);
}

function torso() {
  draw(60, 36, 60, 70);
}

function rightArm() {
  draw(60, 46, 100, 50);
}

function leftArm() {
  draw(60, 46, 20, 50);
}

function rightLeg() {
  draw(60, 70, 100, 100);
}

function leftLeg() {
  draw(60, 70, 20, 100);
}

var drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1
];


// fonctionnalité javascript ajoutée : ajouter un mots personnalisé.
const customWordInput = document.getElementById("customWord");
const addWordButton = document.getElementById("addWord");

addWordButton.addEventListener("click", function () {
  const customWord = customWordInput.value.trim().toLowerCase();

  if (customWord.length > 0) {
    
    const categoryIndex = Math.floor(Math.random() * categories.length);
    categories[categoryIndex].push(customWord);

    init();

    alert(`Le mot "${customWord}" a bien été ajouté au jeu !`);
  }
});


/*La première partie du code récupère les références aux éléments HTML avec les IDs "customWord" et "addWord" et les stocke dans les variables customWordInput et addWordButton.
Ensuite, un écouteur d'événements "click" est ajouté au bouton identifié par l'ID "addWord".
Lorsque le bouton est cliqué, le code extrait la valeur saisie dans l'élément avec l'ID "customWord", la nettoie (en supprimant les espaces avant et après) et la convertit en minuscules.
Ensuite, il vérifie si la longueur du mot personnalisé est supérieure à zéro. Si c'est le cas, le mot est ajouté à une catégorie choisie au hasard parmi celles stockées dans un tableau appelé categories.
Enfin, la fonction init() est appelée pour réinitialiser le jeu avec la catégorie mise à jour, et une alerte est affichée pour informer le joueur que son mot a été ajouté avec succès.*/