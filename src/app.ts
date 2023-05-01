import express, { Request, Response } from "express";
import error from "./middlewares/error";
import connectDB from "./database";
import auth from "./routes/auth";
import users from "./routes/users";
import books from "./routes/books";
import { IUser } from "./types/users";

const app = express();

app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});


declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/books", books);

app.use(error);

export default app;
