import express from "express";
import validateURL from "../../middleware/validation";
import serveImg from "../../middleware/serveImage";

const imageRouter = express.Router();

imageRouter.get("/", validateURL, serveImg);

export default imageRouter;
