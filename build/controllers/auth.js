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
exports.isAdmin = exports.isAuthenticated = exports.login = void 0;
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const users_1 = __importDefault(require("../models/users"));
const jsonwebtoken_1 = require("jsonwebtoken");
const envVariables_1 = require("../envVariables");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, number } = req.body;
    if (!(number || password)) {
        return next(new errorHandler_1.default().notAccept("all fields are required"));
    }
    try {
        const user = yield users_1.default.findOne({ number, password });
        if (!user) {
            return next(new errorHandler_1.default().notAccept("invalid credentials"));
        }
        const token = (0, jsonwebtoken_1.sign)({ _id: user._id }, envVariables_1.JWT_SECRET, {
            expiresIn: "365d",
        });
        res
            .status(200)
            .setHeader("Authorization", `Bearer ${token}`)
            .json({ token });
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.login = login;
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return next(new errorHandler_1.default().notAccept("no token provided"));
    }
    const decoded = (yield (0, jsonwebtoken_1.verify)(token, envVariables_1.JWT_SECRET));
    try {
        const user = (yield users_1.default.findById(decoded._id));
        if (!user) {
            return next(new errorHandler_1.default().unAuthrized());
        }
        req.user = user;
        next();
    }
    catch (err) {
        return next(new errorHandler_1.default().serverError(err));
    }
});
exports.isAuthenticated = isAuthenticated;
const isAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return next(new errorHandler_1.default().serverError("you are not admin"));
    }
    next();
};
exports.isAdmin = isAdmin;
