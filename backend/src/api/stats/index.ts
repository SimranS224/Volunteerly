import express from "express";
import {getStatistics} from "./stats"
export const router = express.Router();


router.get("/:user_id", getStatistics)
