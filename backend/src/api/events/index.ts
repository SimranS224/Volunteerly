import express from "express";
import { getEvents, addEvent, deleteEvent } from "./updateEvents";

export const router = express.Router();


router.get("/", getEvents)
router.post("/", addEvent)
router.delete("/:event_id", deleteEvent)
