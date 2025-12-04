require("dotenv").config();

const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const listRoutes = require("./routes/list.routes");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);
app.use("/api/lists", listRoutes);

app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
