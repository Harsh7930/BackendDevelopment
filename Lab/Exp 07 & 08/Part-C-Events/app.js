document.addEventListener("DOMContentLoaded", () => {
    const clickButton = document.getElementById("clickButton");
    const hoverBox = document.getElementById("hoverBox");
    const mouseMessage = document.getElementById("mouseMessage");
    const keyInput = document.getElementById("keyInput");
    const keyMessage = document.getElementById("keyMessage");
    const nameForm = document.getElementById("nameForm");
    const nameInput = document.getElementById("nameInput");
    const formMessage = document.getElementById("formMessage");
    const demoLink = document.getElementById("demoLink");
    const outerBox = document.getElementById("outerBox");
    const innerButton = document.getElementById("innerButton");
    const stopBubble = document.getElementById("stopBubble");
    const bubbleMessage = document.getElementById("bubbleMessage");
    const fruitList = document.getElementById("fruitList");
    const addFruitButton = document.getElementById("addFruitButton");
    const listMessage = document.getElementById("listMessage");

    clickButton.addEventListener("click", (event) => {
        mouseMessage.textContent = `Button clicked at X: ${event.clientX}, Y: ${event.clientY}`;
    });

    hoverBox.addEventListener("mouseenter", () => {
        hoverBox.style.backgroundColor = "#d1e7dd";
        mouseMessage.textContent = "Mouse entered the box.";
    });

    hoverBox.addEventListener("mouseleave", () => {
        hoverBox.style.backgroundColor = "#e8f2ff";
        mouseMessage.textContent = "Mouse left the box.";
    });

    keyInput.addEventListener("keydown", (event) => {
        keyMessage.textContent = `Key pressed: ${event.key} | Code: ${event.code}`;
    });

    keyInput.addEventListener("input", (event) => {
        if (event.target.value === "") {
            keyMessage.textContent = "Input is empty.";
        }
    });

    nameForm.addEventListener("submit", (event) => {
        event.preventDefault();
        formMessage.textContent = `Form submitted for ${nameInput.value.trim()}. Page reload was prevented.`;
        nameForm.reset();
    });

    demoLink.addEventListener("click", (event) => {
        event.preventDefault();
        formMessage.textContent = "Link click detected. Navigation was prevented.";
    });

    innerButton.addEventListener("click", (event) => {
        if (stopBubble.checked) {
            event.stopPropagation();
            bubbleMessage.textContent = "Inner button clicked. Bubbling was stopped.";
        } else {
            bubbleMessage.textContent = "Inner button clicked. The event is bubbling.";
        }
    });

    outerBox.addEventListener("click", (event) => {
        if (event.target === innerButton) {
            bubbleMessage.textContent = "Inner button clicked, then the event bubbled to the outer box.";
        } else {
            bubbleMessage.textContent = "The outer box was clicked directly.";
        }
    });

    fruitList.addEventListener("click", (event) => {
        const item = event.target.closest("li");

        if (!item || !fruitList.contains(item)) {
            return;
        }

        item.classList.toggle("selected");
        listMessage.textContent = `${item.textContent} was clicked.`;
    });

    addFruitButton.addEventListener("click", () => {
        const fruit = document.createElement("li");
        fruit.textContent = "Orange";
        fruitList.appendChild(fruit);
        listMessage.textContent = "Orange was added. Click it to test event delegation.";
    });
});
