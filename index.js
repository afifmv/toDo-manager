import express from "express";
import bodyParser from "body-parser";
import nodemon from "nodemon";

const app = express();
const port = 3000;

const items = [];
const work = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, (req, res) => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.render("index.ejs", { tasks: items });
});

// EFFECTS: Adds a new worklist item to normal list
app.get("/addToDo", (req, res) => {
  res.render("addToDo.ejs");
});

app.get("/addToDoWork", (req, res) => {
  res.render("addToDo.ejs", { workMode: true });
});

// EFFECTS: Switches to work mode to do list
app.get("/work", (req, res) => {
  res.render("index.ejs", { tasks: work, workMode: true });
});

// EFFECTS: Adds new to do item inputted by user to items to do list
app.post("/submit", (req, res) => {
  checkToDoDuplication(req.body["todo"], items);
  res.render("index.ejs", { tasks: items });
});

app.post("/submitWork", (req, res) => {
  checkToDoDuplication(req.body["todo"], work);
  res.render("index.ejs", { tasks: work });
});

function checkToDoDuplication(checkTask, tasks) {
  for (let index = 0; index < tasks.length; index++) {
    const task = items[index];
    if (checkTask == task) {
      return 0;
    }
  }
  tasks.push(checkTask);
}
