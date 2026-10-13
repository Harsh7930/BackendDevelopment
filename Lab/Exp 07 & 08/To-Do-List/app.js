// State
let tasks = [];
let nextTaskId = 1;

// DOM elements
const input = document.getElementById("taskInput");
const form = document.getElementById("taskForm");
const list = document.getElementById("taskList");
const statusMessage = document.getElementById("statusMessage");
const taskSummary = document.getElementById("taskSummary");

// ES6 class for a task
class Task {
    constructor(title) {
        this.id = nextTaskId;
        nextTaskId += 1;
        this.title = title;
        this.completed = false;
    }
}

// Render every task in the list
const renderTasks = () => {
    list.replaceChildren();
    const remainingTasks = tasks.filter((task) => !task.completed).length;
    taskSummary.textContent =
        `${tasks.length} task${tasks.length === 1 ? "" : "s"} total, ` +
        `${remainingTasks} remaining.`;

    if (tasks.length === 0) {
        const emptyMessage = document.createElement("li");
        emptyMessage.classList.add("empty-message");
        emptyMessage.textContent = "No tasks yet. Add one above.";
        list.appendChild(emptyMessage);
        return;
    }

    tasks.forEach(({ id, title, completed }) => {
        const li = document.createElement("li");
        li.dataset.id = id;

        const span = document.createElement("span");
        span.textContent = title;
        span.classList.toggle("done", completed);

        const completeButton = document.createElement("button");
        completeButton.textContent = completed ? "Undo" : "Done";
        completeButton.classList.add("complete-btn");
        completeButton.dataset.action = "toggle";
        completeButton.type = "button";
        completeButton.setAttribute("aria-pressed", String(completed));
        completeButton.setAttribute(
            "aria-label",
            `${completed ? "Mark as not done" : "Mark as done"}: ${title}`
        );

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.dataset.action = "delete";
        deleteButton.type = "button";
        deleteButton.setAttribute("aria-label", `Delete: ${title}`);

        li.append(span, completeButton, deleteButton);
        list.appendChild(li);
    });
};

// Add a task from the input
const addTask = () => {
    const title = input.value.trim();

    if (!title) {
        statusMessage.textContent = "Please enter a task first.";
        statusMessage.classList.add("error");
        input.focus();
        return;
    }

    tasks = [...tasks, new Task(title)];
    input.value = "";
    statusMessage.textContent = "Task added.";
    statusMessage.classList.remove("error");
    renderTasks();
    input.focus();
};

// Submitting the form works with both the button and the Enter key.
form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTask();
});

// Event delegation handles buttons for every task, including newly added ones.
list.addEventListener("click", (event) => {
    const actionButton = event.target.closest("button[data-action]");
    const li = actionButton && actionButton.closest("li");

    if (!actionButton || !li || !list.contains(li)) {
        return;
    }

    const id = Number(li.dataset.id);

    if (actionButton.dataset.action === "delete") {
        tasks = tasks.filter((task) => task.id !== id);
        statusMessage.textContent = "Task deleted.";
    } else {
        tasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        const task = tasks.find((item) => item.id === id);
        statusMessage.textContent = task.completed ? "Task marked as done." : "Task marked as not done.";
    }

    statusMessage.classList.remove("error");
    renderTasks();
});

renderTasks();
