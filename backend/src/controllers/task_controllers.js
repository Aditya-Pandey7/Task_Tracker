import { Task } from "../models/task_model.js";
import ApiResponse from "../utils/ApiResposne.js";
import ErrorHandler from "../utils/ErrorHandler.js";

const getallTasks = async (req, res) => {
  const allTasks = await Task.find({});
  res
    .status(200)
    .json(ApiResponse(200, allTasks, "All tasks retrieved successfully"));
};

const createTask = async (req, res) => {
  const { title, priority } = req.body;
  if (!title) {
    throw new ErrorHandler("Title is required", 400, "ValidationError");
  }
  const newTask = await Task.create({ title, priority });
  res
    .status(201)
    .json(ApiResponse(201, newTask, "Task created successfully"));
};

const updateTask = async (req, res) => {
  res.send("Update a task");
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    return res
      .status(404)
      .json(new ErrorHandler("Task not found", 404, "NotFoundError"));
  }
  res
    .status(200)
    .json(ApiResponse(200, deletedTask, "Task deleted successfully"));
};

export { getallTasks, createTask, updateTask, deleteTask };
