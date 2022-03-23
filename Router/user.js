const express = require("express");
const router = express.Router();
const UserController = require("../Controller/user");
const middleware = require("../middleware/middleware");

router.get("/msg", UserController.msg);

/**
 * @swagger
 * /createUser:
 *  post:
 *    summary: Create data user
 *    description: Numeric ID of the user to retrieve.
 *    tags: [USER]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *                properties:
 *                   username:
 *                     type: string
 *                     description: The user's name.
 *                     example: Liz
 *                   password:
 *                     type: string
 *                     description: The user's password.
 *                     example: liz123
 *                   isActive:
 *                     type: boolean
 *                     description: The user's isActive.
 *                     example: true
 *                   email:
 *                     type:  string
 *                     description: The User's Email.
 *                     example: liz@gmail.com
 *    responses:
 *      200:
 *        description: The book was created
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router.post("/createUser", UserController.createUser);

router.post("/login", UserController.login);

router.post("/register", middleware.middleware, UserController.register);

router.post("/userDetail", middleware.middleware, UserController.userDetail);

/**
 * @swagger
 * /getUser:
 *  get:
 *    summary: Get All User
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: The book was created
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router.get("/getUser", UserController.getUser);

/**
 * @swagger
 * /getUserId/{id}:
 *  get:
 *    summary: Get User By Id
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: The book was created
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router.get("/getUserId/:id", UserController.getUserId);

/**
 * @swagger
 * /getUserName/{username}:
 *  get:
 *    summary: Get User By Username
 *    parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: string
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: The book was created
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router.get("/getUserEmail/:email", UserController.getUserEmail);

router.get("/pagination", UserController.pagination);

/**
 * @swagger
 * /updateUser/{id}:
 *  put:
 *    summary: Update Data User
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *    tags: [USER]
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                   username:
 *                     type: string
 *                     description: The user's name.
 *                     example: Leanne Graham
 *                   password:
 *                     type: string
 *                     description: The user's name.
 *                     example: liz123
 *                   isActive:
 *                     type: string
 *                     description: The user's name.
 *                     example: true
 *                   email:
 *                     type: string
 *                     description: The user's name.
 *                     example: liz@gmail.com
 *
 *    responses:
 *      200:
 *        description: The book was created
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router.put("/updateUser/:id", UserController.updateUser);

/**
 * @swagger
 * /deleteUser/{id}:
 *  delete:
 *    summary: Delete User by Id
 *    parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: The book was created
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router.delete("/deleteUser/:id", UserController.deleteUser);

/**
 * @swagger
 * /logout:
 *  get:
 *    summary: Log Out
 *    tags: [USER]
 *    responses:
 *      200:
 *        description: The book was created
 *      404:
 *        description: The book was not found
 *      500:
 *        description: Some error happened
 */

router.get("/logout", UserController.logout);

module.exports = router;
