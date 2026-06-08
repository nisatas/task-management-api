require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/", taskRoutes);


app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Task Management API",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});