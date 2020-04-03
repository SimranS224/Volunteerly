import express from "express";
import {getAchievements} from "./achievements"
export const router = express.Router();


router.get("/:user_id", getAchievements)
