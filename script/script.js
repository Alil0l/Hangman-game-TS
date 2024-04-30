var keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
];
var output = document.getElementById("output");
var keyboardContainer = document.getElementById("keyboard");
function createKeyboard() {
    keys.forEach(function (row) {
        var rowElement = document.createElement("div");
        rowElement.classList.add("row");
        row.forEach(function (key) {
            var keyElement = document.createElement("button");
            keyElement.classList.add("key");
            keyElement.textContent = key;
            keyElement.addEventListener("click", function () {
                output === null || output === void 0 ? void 0 : output.textContent += key;
            });
            rowElement.appendChild(keyElement);
        });
        keyboardContainer.appendChild(rowElement);
    });
}
createKeyboard();
