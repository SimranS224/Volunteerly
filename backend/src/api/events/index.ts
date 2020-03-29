import express from "express";
import { getEvents, addEvent } from "./updateEvents";

export const router = express.Router();


router.get("/", getEvents)
router.post("/", addEvent)