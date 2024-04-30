const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const output = document.getElementById("output");
const keyboardContainer = document.getElementById("keyboard");

function createKeyboard() {
  keys.forEach((row) => {
    const rowElement = document.createElement("div");
    rowElement.classList.add("row");
    row.forEach((key) => {
      const keyElement = document.createElement("button");
      keyElement.classList.add("key");
      keyElement.textContent = key;
      keyElement.addEventListener("click", () => {
        output?.textContent += key;
      });
      rowElement.appendChild(keyElement);
    });
    keyboardContainer.appendChild(rowElement);
  });
}

createKeyboard();
