import express from "express";
import { getEventsByUser, getEvents, addEvent, deleteEvent } from "./updateEvents";

export const router = express.Router();

router.get("/:id", getEventsByUser)
router.get("/", getEvents)
router.post("/", addEvent)
router.delete("/:event_id", deleteEvent) // id is organization id
