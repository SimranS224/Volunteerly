import express from "express";

import { login } from "./login";
export const router = express.Router();


router.get("/", login)

