// Part B: DOM Manipulation
// The script is placed at the end of the body, so the HTML elements are ready to use.

// 1. Selecting elements in different ways
const pageHeading = document.getElementById("pageHeading");
const demoTexts = document.getElementsByClassName("demo-text");
const allListItems = document.getElementsByTagName("li");
const firstDemoText = document.querySelector(".demo-text");
const allDemoTexts = document.querySelectorAll(".demo-text");
const selectionResult = document.getElementById("selectionResult");

selectionResult.textContent =
    "Selected " + demoTexts.length + " paragraphs by class, " +
    allDemoTexts.length + " paragraphs with querySelectorAll(), and " +
    allListItems.length + " list items by tag. First paragraph: \"" +
    firstDemoText.textContent + "\"";

// 2. Modifying text content
document.getElementById("changeTextBtn").addEventListener("click", function () {
    pageHeading.textContent = "The heading was changed with textContent!";
});

// 3. Modifying attributes
const websiteLink = document.getElementById("websiteLink");
const attributeResult = document.getElementById("attributeResult");

document.getElementById("changeLinkBtn").addEventListener("click", function () {
    websiteLink.setAttribute("href", "https://example.com/");
    websiteLink.setAttribute("target", "_blank");
    websiteLink.setAttribute("rel", "noopener noreferrer");
    websiteLink.textContent = "Open Example.com";

    attributeResult.textContent =
        "The href attribute is now: " + websiteLink.getAttribute("href");
});

document.getElementById("removeTargetBtn").addEventListener("click", function () {
    websiteLink.removeAttribute("target");
    attributeResult.textContent =
        "The target attribute was removed. The link will open in this tab.";
});

// 3. Changing text and HTML with trusted, fixed example content.
document.getElementById("changePlainTextBtn").addEventListener("click", function () {
    document.getElementById("contentExample").textContent =
        "This plain text was added with textContent.";
});

document.getElementById("changeHtmlBtn").addEventListener("click", function () {
    const contentExample = document.getElementById("contentExample");
    contentExample.innerHTML = "This is <strong>bold text</strong> created with innerHTML.";
});

document.getElementById("changeInnerTextBtn").addEventListener("click", function () {
    document.getElementById("contentExample").innerText =
        "This visible text was added with innerText.";
});

// 4. Modifying styles and classes
const colorBox = document.getElementById("colorBox");
const styleResult = document.getElementById("styleResult");

document.getElementById("styleBtn").addEventListener("click", function () {
    colorBox.classList.toggle("highlight");
    colorBox.style.borderWidth = "3px";

    if (colorBox.classList.contains("highlight")) {
        styleResult.textContent = "The highlight class was added.";
    } else {
        styleResult.textContent = "The highlight class was removed.";
    }
});

// 5. Creating and adding elements
const itemInput = document.getElementById("itemInput");
const itemList = document.getElementById("itemList");
const listResult = document.getElementById("listResult");

function addItem() {
    const itemName = itemInput.value.trim();

    if (itemName === "") {
        listResult.textContent = "Please type an item first.";
        itemInput.focus();
        return;
    }

    const newItem = document.createElement("li");
    const itemText = document.createElement("span");
    const removeButton = document.createElement("button");

    itemText.textContent = itemName;
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");
    removeButton.type = "button";

    removeButton.addEventListener("click", function () {
        newItem.remove();
        listResult.textContent = "One item was removed.";
    });

    newItem.append(itemText, removeButton);
    itemList.appendChild(newItem);
    itemInput.value = "";
    itemInput.focus();
    listResult.textContent = "A new list item was created and added.";
}

document.getElementById("addItemBtn").addEventListener("click", addItem);

itemInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addItem();
    }
});

document.getElementById("removeLastBtn").addEventListener("click", function () {
    const lastItem = itemList.lastElementChild;

    if (lastItem) {
        lastItem.remove();
        listResult.textContent = "The last list item was removed.";
    } else {
        listResult.textContent = "There are no items left to remove.";
    }
});

// 6. Traversing the DOM
document.getElementById("traverseBtn").addEventListener("click", function () {
    const currentItem = document.querySelector("#traversalList .current");
    const parent = currentItem.parentElement;
    const previous = currentItem.previousElementSibling;
    const next = currentItem.nextElementSibling;

    document.getElementById("traversalResult").textContent =
        "Parent id: " + parent.id + ". Number of children: " + parent.children.length +
        ". Previous sibling: " + previous.textContent +
        ". Next sibling: " + next.textContent + ".";
});
