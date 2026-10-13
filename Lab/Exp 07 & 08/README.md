# Experiment 07 & 08: JavaScript Basics

This experiment is about learning the basics of JavaScript and how it works with HTML and browser events. In this lab, we will study ES6 features, DOM manipulation, event handling, and a small to-do list project.

## Aim

The main aim of this experiment is to understand:

- JavaScript ES6 syntax
- DOM (Document Object Model) concepts
- Event handling in the browser
- Create a small interactive web page using JavaScript

## Learning Outcomes

After completing this experiment, students should be able to:

- Use `let`, `const`, arrow functions, template literals, and destructuring.
- Work with arrays, objects, classes, and modules in JavaScript.
- Select and update HTML elements using DOM methods.
- Change styles, text, attributes, and elements dynamically.
- Handle click, keyboard, input, and form events.
- Build a simple to-do list application.

## Tools Required

- VS Code
- Google Chrome / Edge / Firefox
- Python 3 (for local web server)

## Folder Structure

```text
Exp 07 & 08/
├── index.html
├── README.md
├── Part-A-ES6/
│   ├── index.html
│   ├── app.js
│   ├── math.js
│   └── README.md
├── Part-B-DOM/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── README.md
├── Part-C-Events/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── README.md
├── To-Do-List/
│   ├── index.html
│   ├── app.js
│   ├── styles.css
│   └── README.md
└── [main landing page]
```

## How to Run the Experiment

1. Open the `Exp 07 & 08` folder in VS Code.
2. Open the terminal inside this folder.
3. Run the following command:

```powershell
py -m http.server 8000
```

If `py` is not recognized, use:

```powershell
python -m http.server 8000
```

4. Open your browser and go to:

```text
http://localhost:8000/
```

5. Click the section you want to open from the main landing page.

## Quick Start

- Open `index.html` to view the main experiment home page.
- Use the part links to explore ES6, DOM, event handling, and the to-do list.
- Read the code in each part and try modifying values to understand the behavior.

## Parts of the Experiment

### Part A: ES6 Features

This part shows modern JavaScript features such as:

- `let` and `const`
- Arrow functions
- Template literals
- Destructuring
- Spread and rest operators
- Default parameters
- Classes and inheritance
- ES6 modules
- `async` and `await`

This page helps us understand how JavaScript is written in a modern way and how code becomes cleaner and easier to read.

### Part B: DOM Manipulation

This part focuses on selecting and changing HTML elements using JavaScript. We learn how to:

- Access elements by ID, class, or tag name
- Change text and HTML content
- Update attributes
- Add or remove CSS classes
- Add and remove elements from the page
- Navigate through parent, child, and sibling elements

This part is important because JavaScript is mostly used to make pages interactive and dynamic.

### Part C: Event Handling

This part teaches how JavaScript responds to user actions. We learn about:

- Click events
- Keyboard events
- Input events
- Form submission events
- Event bubbling
- Event delegation
- `preventDefault()` and `stopPropagation()`

This helps us create responsive web pages that react to user actions.

### Practical Exercise: To-Do List

This is the main practical part of the experiment. The page allows the user to:

- Add a task
- Mark a task as complete
- Undo completion
- Delete a task

This small project helps us apply all the JavaScript concepts we learned in the earlier parts.

## Expected Output

By the end of this experiment, the student should be able to:

- Run the JavaScript pages without errors.
- Understand how ES6 makes JavaScript easier to use.
- Change web page content dynamically with the DOM.
- Respond to user actions with events.
- Complete the to-do list application successfully.

## Conclusion

Experiment 07 and 08 are very important in JavaScript learning. They teach the foundation of modern web development. These concepts are used in real-world web applications, such as forms, interactive UI, dynamic pages, and front-end development.

## Troubleshooting

| Problem | Solution |
| --- | --- |
| Page does not open | Start the server again using `py -m http.server 8000` |
| `py` command not found | Use `python -m http.server 8000` |
| Browser shows blank page | Check the browser console for JavaScript errors |
| Some buttons do not work | Ensure the HTML file is opened through the local server and not directly from the file system |
| Port 8000 is busy | Use another port like `8001` |

## Student Notes

This experiment is best understood by practicing each example manually. It is recommended to:

1. Open each part separately.
2. Try all buttons and inputs.
3. Read the JavaScript file carefully.
4. Make small changes and observe how the page changes.
5. Complete the to-do list task successfully.

[Back to Laboratory Work](../)
