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
        saveListToLocalStorage();
    });

    // Right-click to delete
    li.addEventListener("contextmenu", function (event) {
        event.preventDefault();
        ul.removeChild(li);
        saveListToLocalStorage();
    });

    saveListToLocalStorage();
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

clearButton.addEventListener("click", function() {
    ul.innerHTML = "";
    localStorage.removeItem("shoppingList");
});

// Save and load list to/from local storage
function saveListToLocalStorage() {
    const items = Array.from(ul.children).map(li => ({
        text: li.textContent,
        done: li.classList.contains("done")
    }));

    localStorage.setItem("shoppingList", JSON.stringify(items));
}

function loadListFromLocalStorage() {
    const savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];

    savedList.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item.text;

        if (item.done) {
            li.classList.add("done");
        }

        ul.appendChild(li);

        li.addEventListener("click", function () {
            li.classList.toggle("done");
            saveListToLocalStorage();
        });

        li.addEventListener("contextmenu", function (event) {
            event.preventDefault();
            ul.removeChild(li);
            saveListToLocalStorage();
        });
    });
}

// Load the list when the page loads
window.onload = function() {
    loadListFromLocalStorage();
};