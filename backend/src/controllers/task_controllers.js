import { Task } from "../models/task_model.js";
import { ApiResponse } from "../utils/ApiResposne.js";

const getallTasks = async (req, res) => {
  const allTasks = await Task.find({});
  res
    .status(200)
    .json(ApiResponse(res, 200, allTasks, "All tasks retrieved successfully"));
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    throw new Error("Title is required");
  }
  const newTask = await Task.create({ title, description });
  res
    .status(201)
    .json(ApiResponse(res, 201, newTask, "Task created successfully"));
};

const updateTask = async (req, res) => {
  res.send("Update a task");
};

const deleteTask = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    return res.status(404).json({ message: "Task not found" });
  }
  res
    .status(200)
    .json(ApiResponse(res, 200, deletedTask, "Task deleted successfully"));
};

export { getallTasks, createTask, updateTask, deleteTask };
