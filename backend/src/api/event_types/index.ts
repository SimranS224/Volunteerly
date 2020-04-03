import express from "express";

import { getEventTypes } from "./event_types";
export const router = express.Router();


router.get("/", getEventTypes)

