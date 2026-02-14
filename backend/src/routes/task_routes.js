import { Router } from "express";
import {
  getallTasks,
  deleteTask,
  createTask,
  updateTask,
} from "../controllers/task_controllers.js";

const router = Router();

router.route("/").get(getallTasks);
router.route("/").post(createTask);
router.route("/:id").put(updateTask);
router.route("/:id").delete(deleteTask);

export default router;
