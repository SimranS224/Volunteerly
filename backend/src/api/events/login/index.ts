import express from "express";

import { login } from "./login";
export const router = express.Router();
console.log("LOGIN")

router.post("/", login)

