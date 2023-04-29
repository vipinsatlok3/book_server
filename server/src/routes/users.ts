import { Router } from "express";
import {
  addUser,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  getUserWithBookCount,
} from "../controllers/users";
import { isAuthenticated, isAdmin } from "../controllers/auth";

const route = Router();

route.post("/", isAuthenticated, isAdmin, addUser);
route.patch("/:id", isAuthenticated, isAdmin, updateUser);
route.delete("/:id", isAuthenticated, isAdmin, deleteUser);
route.get("/", isAuthenticated, isAdmin, getUserWithBookCount);
route.get("/:id", isAuthenticated, isAdmin, getUser);
route.get("/me", isAuthenticated, getMe);

export default route;
