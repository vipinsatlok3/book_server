"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const route = (0, express_1.Router)();
route.post("/login", auth_1.login);
exports.default = route;
