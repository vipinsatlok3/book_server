"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getMe = exports.getUser = exports.getUserWithBookCount = exports.addUser = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const users_1 = __importDefault(require("../models/users"));
const books_1 = __importDefault(require("../models/books"));
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, number } = req.body;
    if (!(name || number)) {
        return next(new errorHandler_1.default().notAccept("all fields are required"));
    }
    try {
        const user = yield users_1.default.create({ name, number });
        res.status(201).json({ success: true, user });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.addUser = addUser;
const getUserWithBookCount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield books_1.default.find();
        const users = yield users_1.default.find();
        const usersWithCount = users.map((user) => {
            const obj = {
                gyanGanga: 0,
                jeeneKiRah: 0,
                total: 0,
            };
            const filterAllBookOfSingleUser = books.filter((book) => book.userId === user._id);
            const totalBookCount = filterAllBookOfSingleUser.forEach((book) => {
                for (const key in obj) {
                    const countSingleBook = book.books.reduce((total, item) => {
                        if (item.name === key) {
                            return total + Number(item.sell);
                        }
                        return 0;
                    }, 0);
                    obj[key] = obj[key] + countSingleBook;
                }
            });
            return {
                _id: user._id,
                name: user.name,
                number: user.number,
                password: user.password,
                role: user.role,
                gyanGanga: obj.gyanGanga,
                jeeneKiRah: obj.jeeneKiRah,
                total: obj.total,
            };
        });
        res.status(200).json({ success: true, users: usersWithCount });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.getUserWithBookCount = getUserWithBookCount;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(req.params.id);
        res.status(200).json({ success: true, user });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.getUser = getUser;
const getMe = (req, res, next) => {
    try {
        console.log("user", req.user);
        res.status(200).json({ success: true, user: req.user });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
};
exports.getMe = getMe;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield users_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({ success: true, user: updatedUser });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield users_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.deleteUser = deleteUser;
