import express from "express";
import { getPreferences, updatePreferences } from "./preferences";

export const router = express.Router();


router.get("/:user_id", getPreferences)
router.post("/:user_id", updatePreferences)