// Importing values from another JavaScript file is an ES6 module feature.
import multiply, { PI, add } from "./math.js";

const output = document.querySelector("#output");

// A small helper function to display every example on the web page.
const showResult = (title, message) => {
    const card = document.createElement("article");
    const heading = document.createElement("h2");
    const text = document.createElement("p");

    heading.textContent = title;
    text.textContent = message;
    card.classList.add("result-card");
    card.append(heading, text);
    output.append(card);

    console.log(`${title}: ${message}`);
};

// 1. var, let, and const
var oldStyle = "var can be declared again";
var oldStyle = "var is function-scoped";
let marks = 70;
marks = marks + 5;
const collegeName = "ABC College";

// 2. Arrow function
const square = number => number * number;

// 3. Template literal and 4. object destructuring
const student = {
    name: "Riya",
    age: 20,
    city: "Mumbai"
};
const { name, city, country = "India" } = student;

// 5. Spread operator and rest parameter
const firstNumbers = [1, 2, 3];
const secondNumbers = [4, 5, 6];
const allNumbers = [...firstNumbers, ...secondNumbers];
const [firstNumber, secondNumber] = firstNumbers;
const total = (...numbers) => numbers.reduce((sum, number) => sum + number, 0);

// 6. Default parameters
const greet = (personName = "Guest", greeting = "Hello") => `${greeting}, ${personName}!`;

// 7. ES6 classes and inheritance
class Person {
    constructor(personName) {
        this.personName = personName;
    }

    introduce() {
        return `My name is ${this.personName}.`;
    }

    static description() {
        return "A student is a type of person.";
    }
}

class Student extends Person {
    constructor(studentName, course) {
        super(studentName);
        this.course = course;
    }

    study() {
        return `${this.personName} is studying ${this.course}.`;
    }
}

// 8. Enhanced object literal: shorthand property, method, and computed property.
const subject = "JavaScript";
const propertyName = "labNumber";
const labDetails = {
    subject,
    [propertyName]: 7,
    describe() {
        return `${this.subject} lab number is ${this.labNumber}.`;
    }
};

const displayExamples = () => {
    output.textContent = "";

    showResult("var, let, and const", `${oldStyle}. Marks: ${marks}. College: ${collegeName}.`);
    showResult("Arrow function", `Square of 5 is ${square(5)}.`);
    showResult("Template literal", `My name is ${name}, I live in ${city}, ${country}.`);
    showResult("Destructuring", `Object name = ${name}, city = ${city}. First two colours: ${firstNumber}, ${secondNumber}.`);
    showResult("Spread and rest", `Combined array: ${allNumbers.join(", ")}. Total: ${total(...allNumbers)}.`);
    showResult("Default parameters", `${greet()} Also: ${greet("Riya", "Hi")}`);

    const newStudent = new Student("Riya", "Web Technology");
    showResult(
        "Classes and inheritance",
        `${newStudent.introduce()} ${newStudent.study()} ${Person.description()}`
    );
    showResult("Enhanced object", labDetails.describe());
    showResult("ES6 module", `PI = ${PI}; 2 + 3 = ${add(2, 3)}; 4 × 5 = ${multiply(4, 5)}.`);
};

// 9. Promise and async/await
const getMessageFromServer = () => new Promise(resolve => {
    setTimeout(() => resolve("Data loaded successfully after 1 second."), 1000);
});

const showAsyncExample = async () => {
    try {
        const message = await getMessageFromServer();
        showResult("Promise and async/await", message);
    } catch (error) {
        console.error("Error:", error);
    }
};

displayExamples();
showAsyncExample();
