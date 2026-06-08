const express = require("express");
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task CRUD endpoints
 */

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Case projesini tamamla
 *               description:
 *                 type: string
 *                 example: JWT auth ve CRUD endpointlerini bitir
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Title is required
 *       401:
 *         description: No token provided or invalid token
 *       500:
 *         description: Server error
 */
router.post("/task", authMiddleware, createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks of authenticated user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 *       401:
 *         description: No token provided or invalid token
 *       500:
 *         description: Server error
 */
router.get("/tasks", authMiddleware, getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Get task by id
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task id
 *     responses:
 *       200:
 *         description: Task fetched successfully
 *       400:
 *         description: Invalid task id
 *       401:
 *         description: No token provided or invalid token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.get("/tasks/:id", authMiddleware, getTaskById);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task by id
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Case projesini güncelle
 *               description:
 *                 type: string
 *                 example: PUT endpointi test edildi
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Invalid task id
 *       401:
 *         description: No token provided or invalid token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.put("/tasks/:id", authMiddleware, updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task by id
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Task id
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       400:
 *         description: Invalid task id
 *       401:
 *         description: No token provided or invalid token
 *       404:
 *         description: Task not found
 *       500:
 *         description: Server error
 */
router.delete("/tasks/:id", authMiddleware, deleteTask);

module.exports = router;