// Constants
const keys: string[][] = [
  ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  ["K", "L", "M", "N", "O", "P", "Q", "R", "S"],
  ["T", "U", "V", "W", "X", "Y", "Z"],
];
const output: HTMLElement | null = document.getElementById("output");
const word: HTMLElement | null = document.querySelector(".word");
const replay: HTMLElement | null = document.querySelector(".replay");
let limit: number;
let currentWord: string;
let puzzleWord: string = "";
let wrongChar: number = 0;
let correctChar: number = 0;
let isPlayable: boolean = true;

// Creating on screen keyboard - IIFE
(function createKeyboard() {
  const keyboardContainer: HTMLElement | null =
    document.getElementById("keyboard");
  keys.forEach((row) => {
    const rowElement: HTMLDivElement = document.createElement("div");
    rowElement.classList.add("row");
    keyboardContainer!.appendChild(rowElement);
    row.forEach((key) => {
      const keyElement: HTMLButtonElement = document.createElement("button");
      keyElement.classList.add("key");
      keyElement.textContent = key;
      rowElement.appendChild(keyElement);
      keyElement.addEventListener("click", (e) => gaming(e.target, key));
    });
  });
})();

// Get Username from input
(function getUserName() {
  let name: HTMLElement | null = document.querySelector(".user-name");
  document.getElementById("form")!.addEventListener("submit", (e) => {
    e.preventDefault();
    let cont: string = document.getElementById("userName")!.value;
    if (!cont) return alert("Please enter a valid name!");
    name!.textContent = cont.toUpperCase();
    document.querySelector(".popup-landing")?.classList.add("hidden");
    document.querySelector(".container")?.classList.remove("blur");
  });
})();

// Fetch a random words from an api
// https://random-word-api.herokuapp.com/word?number=10d
const getRandomWords = (number: number): Promise<string[]> => {
  return fetch(`https://random-word-api.herokuapp.com/word?number=${number}`)
    .then((response) => response.json())
    .then((data) => data.map((word: any) => word.toString()))
    .catch((error) => console.error(error));
};

// Random Word
function randomWord() {
  getRandomWords(10).then((words) => {
    puzzleWord = words[Math.ceil(Math.random() * 10)];
    currentWord = puzzleWord; // Update the currentWord variable with the new word
    word!.innerHTML = puzzleWord
      .split("")
      .map(() => `<li class="letter"></li>`)
      .join("");
    limit = puzzleWord.length;
  });
}
randomWord();
// Handle wining and losing
function winOrLose(msg: string) {
  document.querySelector(".msg")?.classList.remove("none");
  document.querySelector(".winLoseMsg")?.classList.add("lose");
  document.querySelector(".lose")!.textContent = msg;
  document.querySelector(".container")?.classList.add("blur");
  document.querySelector(".header")?.classList.add("blur");
  isPlayable = false;
  document.querySelectorAll("button").forEach((e) => {
    e.setAttribute("disabled", "");
  });
  document.querySelector(".replay")?.removeAttribute("disabled");
}

// Handle clicks on keyboard
function gaming(button: HTMLButtonElement, letterClicked: string) {
  if (isPlayable) {
    // Correct Letter
    if (currentWord.includes(letterClicked.toLowerCase())) {
      currentWord.split("").forEach((letter, index) => {
        if (letter === letterClicked.toLowerCase()) {
          word!.querySelectorAll("li")[index].innerText = letter.toUpperCase();
          word!.querySelectorAll("li")[index].classList.add("guessed");
          button.setAttribute("disabled", "");
          correctChar++;
          if (correctChar >= limit) {
            winOrLose("You Won!🎉 Well Done. ");
          }
        }
      });
    }
    // Wrong Letter
    else {
      button.setAttribute("disabled", "");
      wrongChar++;
      document
        .querySelector(`.stick-part${wrongChar}`)
        ?.classList.remove("hidden");
      if (wrongChar >= 6) {
        winOrLose("You Lost!😭 Try Again. ");
      }
    }
  }
}

// Restarting the game button
function restartGame() {
  isPlayable = true;
  wrongChar = 0;
  correctChar = 0;
  document.querySelector(".msg")?.classList.add("none");
  document.querySelector(".winLoseMsg")?.classList.remove("lose");
  document.querySelector(".container")?.classList.remove("blur");
  document.querySelector(".header")?.classList.remove("blur");
  currentWord.split("").forEach((letter, index) => {
    word!.querySelectorAll("li")[index].innerText = "";
    word!.querySelectorAll("li")[index].classList.remove("guessed");
  });
  document.querySelectorAll("button").forEach((e) => {
    e.removeAttribute("disabled");
  });
  for (let i = 1; i <= 6; i++) {
    document.querySelector(`.stick-part${i}`)?.classList.add("hidden");
  }
  randomWord();
}
replay!.addEventListener("click", () => {
  restartGame();
});
