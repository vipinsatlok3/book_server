"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app_1 = __importDefault(require("./app"));
const envVariables_1 = require("./envVariables");
const port = envVariables_1.PORT || 3001;
app_1.default.listen(port, () => console.log(`Server listening on port ${port}`));
