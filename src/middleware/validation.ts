import express from "express";
import path from "path";
import fs from "fs";

const validateURL = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void | express.Response => {
  const inValidMsg = path.join(__dirname, "..", "..", "pages", "homePage.html");

  const { filename, width, height } = req.query;

  //validate that filename, width, height exists
  if (!filename || !width || !height) {
    return res.sendFile(inValidMsg);
  }

  //validate that width and heigth are positive integers
  if (
    !Number.isSafeInteger(parseInt(width as string)) ||
    !Number.isSafeInteger(parseInt(height as string)) ||
    !(parseInt(width as string) > 0) ||
    !(parseInt(height as string) > 0)
  ) {
    return res.sendFile(inValidMsg);
  }

  //validate that file extension .jpg only allowed
  const fileExtension = (filename as string).slice(-4);
  if (fileExtension !== ".jpg") {
    return res
      .status(400)
      .send("file extension <strong>.jpg</strong> only allowed");
  }

  //validate file exsistance
  if (
    !fs.existsSync(
      path.join(__dirname, "..", "..", "original_images", `${filename}`)
    )
  ) {
    return res
      .status(400)
      .send(`filename <strong>${filename}</strong> doesn't exist`);
  }
  next();
};
export default validateURL;
