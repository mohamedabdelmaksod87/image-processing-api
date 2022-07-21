import express from "express";
import router from "./routes/mainRoute";

const app = express();
const port = 3000;

app.use(router);

app.listen(port, (): void => {
  console.log(`Server Listening on Port ${port}`);
});

export default app;
