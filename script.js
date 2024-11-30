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

    console.log("Item added:", li.textContent); // Debugging
    saveListToLocalStorage();
}

function addListAfterClick() {
    if (inputLength() > 0) {
        console.log("Add button clicked, input value:", input.value); // Debugging
        createListElement();
    }
}

function addListAfterKeydown(event) {
    if (inputLength() > 0 && event.key === "Enter") {
        console.log("Enter key pressed, input value:", input.value); // Debugging
        createListElement();
    }
}

button.addEventListener("click", addListAfterClick);

input.addEventListener("keydown", addListAfterKeydown);

clearButton.addEventListener("click", function() {
    ul.innerHTML = "";
    localStorage.removeItem("shoppingList");
    console.log("Shopping list cleared from localStorage"); // Debugging
});

// Save and load list to/from local storage
function saveListToLocalStorage() {
    const items = Array.from(ul.children).map(li => ({
        text: li.textContent.trim(),
        done: li.classList.contains("done")
    }));

    console.log("Saving to localStorage:", items); // Debugging
    localStorage.setItem("shoppingList", JSON.stringify(items));
}

function loadListFromLocalStorage() {
    const savedList = JSON.parse(localStorage.getItem("shoppingList")) || [];
    console.log("Loaded items from localStorage:", savedList); // Debugging

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
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed"); // Debugging
    loadListFromLocalStorage();
});
