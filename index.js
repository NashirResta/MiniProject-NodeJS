require("dotenv").config();

const express = require("express");
const UserRouter = require("./Router/user");
const NotesUser = require("./Router/notes");
const app = express();
const cors = require("cors");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const port = process.env.PORT || 3001;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library API",
      version: "1.0.0",
      description: "A simple Express Library API",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./Router/*.js"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());

app.use(express.json());
app.use(UserRouter);
app.use(NotesUser);

app.listen(port, () => console.log(`Listening at PORT ` + port));

module.exports = app;
