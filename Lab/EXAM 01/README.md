# My Notes App

This project is a simple Notes Management application built with Express.js and EJS using MongoDB.

## Features

- View all notes
- Add a new note
- Delete a note
- Search notes by title (bonus feature)
- Server-side rendering using EJS

## Tech Stack

- Node.js
- Express.js
- EJS
- MongoDB

## Run the app

1. Open a terminal in this folder.
2. Install dependencies:

```bash
npm install
```

3. Start the app:

```bash
npm start
```

4. Open:

```text
http://localhost:3000
```

## MongoDB connection

The app uses:

```text
mongodb://127.0.0.1:27017
```

Database name:

```text
notes_lab
```

Collection:

```text
notes
```

## Notes document format

```json
{
  "title": "Backend Lab",
  "content": "Complete the Notes application.",
  "category": "Study",
  "createdAt": "Date"
}
```
