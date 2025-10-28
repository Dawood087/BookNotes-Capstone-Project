📚 Manga Notes: Your Personal Reading Tracker
This project is a full-stack web application designed to track, rate, and annotate your manga or book collection. It serves as a comprehensive Capstone Project demonstrating proficiency in backend data management with PostgreSQL and dynamic frontend rendering with EJS and Bootstrap.
✨ Features
Full CRUD Functionality: Easily create, view, edit, and delete entries from your collection.
Dynamic Sorting: Sort your collection dynamically by Rating (Asc./Desc.) and Date Added (Recent/Oldest) using dynamic SQL queries.
Automatic Cover Images: Fetch book covers automatically by ISBN using the Open Library Covers API. Includes fallback logic for missing covers.
Data Persistence: All reading notes, ratings, and details are securely stored in a PostgreSQL database.
Responsive Design: Modern and mobile-friendly user interface built using Bootstrap 5.
🛠️ Tech Stack
This application is built with the following technologies:
|
| Category | Technology | Purpose |
| Backend | Node.js / Express.js | Server environment and routing. |
| Database | PostgreSQL | Secure and scalable relational database for data storage. |
| Database Driver | pg (node-postgres) | Connects Node.js to the PostgreSQL database. |
| Frontend | EJS (Embedded JavaScript) | Templating engine for dynamic HTML rendering. |
| Styling | Bootstrap 5 | CSS framework for responsive and modern UI components. |
🚀 Setup & Installation
Follow these steps to get the Manga Notes application running locally on your machine.
Prerequisites
Node.js: Ensure you have Node.js (v18+) installed.
PostgreSQL: Ensure you have a PostgreSQL server running (default port 5432).
1. Database Configuration
You need to set up a database and a table for the application.
Create Database: In your PostgreSQL client (like pgAdmin or the psql terminal), create a new database.
CREATE DATABASE book_notes;



Create Table: Connect to the new database (book_notes) and execute the following SQL to create the necessary table structure:
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 10),
    notes TEXT,
    isbn VARCHAR(13)
);



Update Credentials: Open your backend file (index.js) and ensure your PostgreSQL connection details are correct:
const db = new pg.Client({
  user: "postgres", // Your PostgreSQL User
  host: "localhost",
  database: "book_notes", // Database name you created
  password: "YOUR_PASSWORD_HERE", // 👈 Crucial: Your actual password
  port: 5432,
});



2. Project Setup
Clone the Repository:
git clone [YOUR_REPOSITORY_URL]
cd [PROJECT_FOLDER_NAME]



Install Dependencies:
npm install



Run the Server:
# Assuming you use nodemon for development
nodemon index.js
# Or standard
node index.js



The application will now be running on http://localhost:3000.
📂 Project Structure
| File/Folder | Description |
| index.js | Main Express server file, handles routing, database connections, and business logic. |
| package.json | Project metadata and dependency list. |
| /views | Contains all EJS templates (index.ejs, new.ejs, edit.ejs, view.ejs). |
| /public | Static assets (CSS, images, etc.). |
| [SQL files] | (Optional) Contains the initial SQL setup script. |
