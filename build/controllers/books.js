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
exports.deleteBook = exports.updateBook = exports.getAllBookOfAnyUser = exports.getBook = exports.getBooks = exports.addBook = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const books_1 = __importDefault(require("../models/books"));
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { place, date, books } = req.body;
    if (!place) {
        return next(new errorHandler_1.default().notAccept("place is required"));
    }
    try {
        const book = yield books_1.default.create({ place, userId: req.user._id, date, books });
        res.status(201).json({ success: true, book });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.addBook = addBook;
// for admin
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield books_1.default.find();
        res.status(200).json({ success: true, books });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.getBooks = getBooks;
const getBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield books_1.default.findById(req.params.id);
        res.status(200).json({ success: true, book });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.getBook = getBook;
const getAllBookOfAnyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield books_1.default.find({ userId: req.user._id });
        res.status(200).json({ success: true, books });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.getAllBookOfAnyUser = getAllBookOfAnyUser;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield books_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({ success: true, book: updatedBook });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield books_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.deleteBook = deleteBook;
