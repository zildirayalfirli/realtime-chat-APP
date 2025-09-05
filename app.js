// app.js
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRoutes from "./routes/index.js";
import responseMiddleware from "./middlewares/response.js";
import { errorHandler, notFound } from "./middlewares/error.js";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(responseMiddleware);

app.use("/api", apiRoutes);
app.get("/health", (_req, res) => res.ok({ ok: true }, "OK"));


app.use(notFound);
app.use(errorHandler);

export default app;

