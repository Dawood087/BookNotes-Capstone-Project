import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// DB Connection
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true })); // To use bodyParser
app.use(express.static("public")); // If using CSS

// Render the main Page
app.get("/", async (req, res) => {
  // Fallback / default Sort = id, ASC
  const sortBy = req.query.sort || "id"; // Sort By: Rating or ID - a SortBy Value is send through the URL
  const sortOrder = req.query.order || "ASC"; // Sort Order: Ascending or Descending - a SortOrder Value is send through the URL

  // Setting Sort By and Order through Buttons pressed on Page
  let orderByColumn;
  if (sortBy === "rating") {
    orderByColumn = "rating";
  } else if (sortBy === "id") {
    orderByColumn = "id";
  }

  // Inserting the Values into the query to render depending on the buttons clicked
  try {
    const result = await db.query(
      `SELECT * FROM books ORDER BY ${orderByColumn} ${sortOrder}`
    );

    // Enabling the usage of the books DB as an array
    const books = result.rows;

    res.render("index.ejs", {
      books: books,
    });
  } catch (err) {
    console.log(err);
    res.render("index.ejs", { books: [] });
  }
});

// GET Route to view Entry Details
app.get("/view/:id", async (req, res) => {
  const id = req.params.id; // id of the entry sent through the URL

  // Sending the Info of one single book, from the DB to display on page
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    const book = result.rows[0];
    res.render("view.ejs", { book: book });
  } catch (err) {
    // redirecting to the homepage, if there is an error
    console.log(err);
    res.redirect("/");
  }
});

// Rendering the Page for a new Entry
app.get("/new", async (req, res) => {
  res.render("new.ejs");
});

// POST Route to add new Entry - Insert Into Database
app.post("/add", async (req, res) => {
  const { title, author, rating, notes, isbn } = req.body;

  // Connection to form on new.ejs -> Sends the Input Values to the DB
  try {
    await db.query(
      "INSERT INTO books (title, author, rating, notes, isbn) VALUES ($1, $2, $3, $4, $5)",
      [title, author, parseInt(rating), notes, isbn]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.render("new.ejs");
  }
});

// GET Route to render the edit page of an entry with an id
app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);
    const book = result.rows[0];
    res.render("edit.ejs", { book: book });
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// POST Route to change Information of a Book with an id
app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author, rating, notes, isbn } = req.body;
  try {
    await db.query(
      "UPDATE books SET title=$1, author=$2, rating=$3, notes=$4, isbn=$5 WHERE id=$6",
      [title, author, rating, notes, isbn, id]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect(`/edit/${id}`);
  }
});

// Delte Route to remove a book from the database
app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await db.query("DELETE FROM books WHERE id=$1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.redirect("/");
  }
});

// Listen on Port
app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
