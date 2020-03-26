import express from "express";
import serverless from "serverless-http";
<<<<<<< HEAD
import { router as volunteers } from "./volunteers/new_index";
=======
import { router as volunteers} from "./volunteers";
>>>>>>> 94065e961d4236aa56013b23e5dd597d01babc05
import { router as db_calls} from "./database_events";
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(compression());
app.use(bodyParser.json());

<<<<<<< HEAD
app.use("/*/volunteers", volunteers)
app.use("/*/database", db_calls)
=======
app.use("/volunteers", volunteers)
app.use("/database", db_calls)
>>>>>>> 94065e961d4236aa56013b23e5dd597d01babc05

export const handler = serverless(app)
