import "express-async-errors";
import express, { json } from "express";
import helmet from "helmet";
import { HandleErrors } from "./middlewares/handleErrors.middleware";
import taskRouter from "./routers/task.routes";
import categoryRouter from "./routers/category.routes";
import userRouter from "./routers/user.routes";

export const app = express();

app.use(helmet());

app.use(json());

app.use("/tasks", taskRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter)

app.use(HandleErrors.execute);