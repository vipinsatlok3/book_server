"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const error_1 = __importDefault(require("./middlewares/error"));
const database_1 = __importDefault(require("./database"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const books_1 = __importDefault(require("./routes/books"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*" || ["*"],
}));
(0, database_1.default)();
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.use("/api/auth", auth_1.default);
app.use("/api/users", users_1.default);
app.use("/api/books", books_1.default);
app.use(error_1.default);
exports.default = app;
