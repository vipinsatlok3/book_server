import { Router } from "express";
import {
  addBook,
  updateBook,
  deleteBook,
  getBook,
  getBooks,
  getAllBookOfAnyUser,
} from "../controllers/books";
import { isAuthenticated, isAdmin } from "../controllers/auth";

const route = Router();

route.post("/", isAuthenticated, addBook);
route.patch("/:id", isAuthenticated, updateBook);
route.delete("/:id", isAuthenticated, deleteBook);
route.get("/", isAuthenticated, isAdmin, getBooks);
route.get("/book", isAuthenticated, getAllBookOfAnyUser);
route.get("/:id", isAuthenticated, getBook);

export default route;
