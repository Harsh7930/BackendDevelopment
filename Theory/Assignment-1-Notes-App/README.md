# Assignment 01: Notes App

A browser-based notes application built for the LocalStorage, SessionStorage, and JSON lesson.

## Run

Open `index.html` in a web browser.

## Features

- Add, edit, complete, and delete notes.
- Filter notes by all, active, or completed.
- Clear all saved notes.
- Persist notes in `localStorage` as a JSON array.

## Storage format

```js
{
  id: "unique-id",
  text: "Learn localStorage",
  completed: false,
  createdAt: "2026-08-30T00:00:00.000Z"
}
```
