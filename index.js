const express = require("express");
const UserRouter = require("./Router/user");
const NotesUser = require("./Router/notes");
const app = express();

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

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

app.use(express.json());
app.use(UserRouter);
app.use(NotesUser);

app.listen(3001, () => console.log(`Listening at PORT ` + 3001));

module.exports = app;
