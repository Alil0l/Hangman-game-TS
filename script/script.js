// Constants
var keys = [
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
    ["K", "L", "M", "N", "O", "P", "Q", "R", "S"],
    ["T", "U", "V", "W", "X", "Y", "Z"],
];
var output = document.getElementById("output");
var word = document.querySelector(".word");
var replay = document.querySelector(".replay");
var limit;
var currentWord;
var puzzleWord = "";
var wrongChar = 0;
var correctChar = 0;
var isPlayable = true;
// Creating on screen keyboard - IIFE
(function createKeyboard() {
    var keyboardContainer = document.getElementById("keyboard");
    keys.forEach(function (row) {
        var rowElement = document.createElement("div");
        rowElement.classList.add("row");
        keyboardContainer.appendChild(rowElement);
        row.forEach(function (key) {
            var keyElement = document.createElement("button");
            keyElement.classList.add("key");
            keyElement.textContent = key;
            rowElement.appendChild(keyElement);
            keyElement.addEventListener("click", function (e) { return gaming(e.target, key); });
        });
    });
})();
// Get Username from input
(function getUserName() {
    var name = document.querySelector(".user-name");
    document.getElementById("form").addEventListener("submit", function (e) {
        var _a, _b;
        e.preventDefault();
        var cont = document.getElementById("userName").value;
        if (!cont)
            return alert("Please enter a valid name!");
        name.textContent = cont.toUpperCase();
        (_a = document.querySelector(".popup-landing")) === null || _a === void 0 ? void 0 : _a.classList.add("hidden");
        (_b = document.querySelector(".container")) === null || _b === void 0 ? void 0 : _b.classList.remove("blur");
    });
})();
// Fetch a random words from an api
// https://random-word-api.herokuapp.com/word?number=10
var getRandomWords = function (number) {
    return fetch("https://random-word-api.herokuapp.com/word?number=".concat(number))
        .then(function (response) { return response.json(); })
        .then(function (data) { return data.map(function (word) { return word.toString(); }); })
        .catch(function (error) { return console.error(error); });
};
// Random Word
function randomWord() {
    getRandomWords(10).then(function (words) {
        puzzleWord = words[Math.ceil(Math.random() * 10)];
        currentWord = puzzleWord; // Update the currentWord variable with the new word
        word.innerHTML = puzzleWord
            .split("")
            .map(function () { return "<li class=\"letter\"></li>"; })
            .join("");
        limit = puzzleWord.length;
        console.log(puzzleWord, limit);
    });
}
randomWord();
// Handle wining and losing
function winOrLose(msg) {
    var _a, _b, _c, _d, _e;
    (_a = document.querySelector(".msg")) === null || _a === void 0 ? void 0 : _a.classList.remove("none");
    (_b = document.querySelector(".winLoseMsg")) === null || _b === void 0 ? void 0 : _b.classList.add("lose");
    document.querySelector(".lose").textContent = msg;
    (_c = document.querySelector(".container")) === null || _c === void 0 ? void 0 : _c.classList.add("blur");
    (_d = document.querySelector(".header")) === null || _d === void 0 ? void 0 : _d.classList.add("blur");
    isPlayable = false;
    document.querySelectorAll("button").forEach(function (e) {
        e.setAttribute("disabled", "");
    });
    (_e = document.querySelector(".replay")) === null || _e === void 0 ? void 0 : _e.removeAttribute("disabled");
}
// Handle clicks on keyboard
function gaming(button, letterClicked) {
    var _a;
    if (isPlayable) {
        // Correct Letter
        if (currentWord.includes(letterClicked.toLowerCase())) {
            currentWord.split("").forEach(function (letter, index) {
                if (letter === letterClicked.toLowerCase()) {
                    word.querySelectorAll("li")[index].innerText = letter.toUpperCase();
                    word.querySelectorAll("li")[index].classList.add("guessed");
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
            (_a = document
                .querySelector(".stick-part".concat(wrongChar))) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
            if (wrongChar >= 6) {
                winOrLose("You Lost!😭 Try Again. ");
            }
        }
    }
}
// Restarting the game button
function restartGame() {
    var _a, _b, _c, _d, _e;
    isPlayable = true;
    wrongChar = 0;
    correctChar = 0;
    (_a = document.querySelector(".msg")) === null || _a === void 0 ? void 0 : _a.classList.add("none");
    (_b = document.querySelector(".winLoseMsg")) === null || _b === void 0 ? void 0 : _b.classList.remove("lose");
    (_c = document.querySelector(".container")) === null || _c === void 0 ? void 0 : _c.classList.remove("blur");
    (_d = document.querySelector(".header")) === null || _d === void 0 ? void 0 : _d.classList.remove("blur");
    currentWord.split("").forEach(function (letter, index) {
        word.querySelectorAll("li")[index].innerText = "";
        word.querySelectorAll("li")[index].classList.remove("guessed");
    });
    document.querySelectorAll("button").forEach(function (e) {
        e.removeAttribute("disabled");
    });
    for (var i = 1; i <= 6; i++) {
        (_e = document.querySelector(".stick-part".concat(i))) === null || _e === void 0 ? void 0 : _e.classList.add("hidden");
    }
    randomWord();
}
replay.addEventListener("click", function () {
    restartGame();
});
