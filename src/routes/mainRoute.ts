import express from "express";
import path from "path";
import imageRouter from "./image/imageRouter";
const router = express.Router();

router.get("/", (req: express.Request, res: express.Response): void => {
  res.sendFile(path.join(__dirname, "..", "..", "pages", "homePage.html"));
});

router.use("/image", imageRouter);

router.use("*", (req: express.Request, res: express.Response): void => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "..", "..", "pages", "notFound.html"));
});

export default router;
