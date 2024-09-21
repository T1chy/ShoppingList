var button = document.getElementById("enter");
var input = document.getElementById("userinput");
var ul = document.querySelector("ul");
var clearButton = document.getElementById("clear-all");

function inputLength() {
    return input.value.trim().length;
}

function createListElement() {
    var li = document.createElement("li");

    li.appendChild(document.createTextNode(input.value));

    ul.appendChild(li);
    input.value = "";

    // Mark as done
    li.addEventListener("click", function () {
        li.classList.toggle("done");
    });

    // Right-click to delete
    li.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        ul.removeChild(li);
    });
}

function addListAfterClick() {
    if (inputLength() > 0) {
        createListElement();
    }
}

function addListAfterKeydown(event) {
    if (inputLength() > 0 && event.key === "Enter") {
        createListElement();
    }
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keydown", addListAfterKeydown);

// Clear all list items
clearButton.addEventListener("click", function() {
    ul.innerHTML = "";
});
