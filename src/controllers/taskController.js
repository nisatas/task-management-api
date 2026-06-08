const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    const userId = req.user.userId;

    if (!title) {
      return res.status(400).json({
        message: "Title is required"
      });
    }

    const newTask = await prisma.task.create({
      data: {
        title: title,
        description: description,
        userId: userId
      }
    });

    return res.status(201).json({
      message: "Task created successfully",
      task: newTask
    });

  } catch (error) {
    console.error("Create task error:", error);

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const tasks = await prisma.task.findMany({
      where: {
        userId: userId
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return res.status(200).json({
      message: "Tasks fetched successfully",
      tasks: tasks
    });

  } catch (error) {
    console.error("Get tasks error:", error);

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = Number(req.params.id);

    if (!taskId) {
      return res.status(400).json({
        message: "Invalid task id"
      });
    }

    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: userId
      }
    });

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    return res.status(200).json({
      message: "Task fetched successfully",
      task: task
    });

  } catch (error) {
    console.error("Get task by id error:", error);

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = Number(req.params.id);

    const { title, description, completed } = req.body;

    if (!taskId) {
      return res.status(400).json({
        message: "Invalid task id"
      });
    }

    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: userId
      }
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: taskId
      },
      data: {
        title: title !== undefined ? title : existingTask.title,
        description: description !== undefined ? description : existingTask.description,
        completed: completed !== undefined ? completed : existingTask.completed
      }
    });

    return res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask
    });

  } catch (error) {
    console.error("Update task error:", error);

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskId = Number(req.params.id);

    if (!taskId) {
      return res.status(400).json({
        message: "Invalid task id"
      });
    }

    const existingTask = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId: userId
      }
    });

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    await prisma.task.delete({
      where: {
        id: taskId
      }
    });

    return res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    console.error("Delete task error:", error);

    return res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};