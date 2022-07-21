import express from "express";
import path from "path";
import fs from "fs";
import resizeImage from "../services/resizeImage";
import renameImage from "../services/renameImage";

const serveImg = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { filename, width, height } = req.query;
    const imgWidth = parseInt(width as string);
    const imgHeight = parseInt(height as string);

    const originalPath = path.join(
      __dirname,
      "..",
      "..",
      "original_images",
      `${filename}`
    );

    const resizedFilename = renameImage(
      filename as string,
      imgWidth,
      imgHeight
    );

    //create the resized_images directory if not already existed
    if (!fs.existsSync(path.join(__dirname, "..", "..", "resized_images"))) {
      fs.mkdir(path.join(__dirname, "..", "..", "resized_images"), (err) => {
        if (err) throw err;
      });
    }

    const resizedPath = path.join(
      __dirname,
      "..",
      "..",
      "resized_images",
      `${resizedFilename}`
    );

    //ckeck if requested Image already in resized image folder return it without new resizing
    if (fs.existsSync(resizedPath)) {
      return res.sendFile(resizedPath);
    }

    //resize requested image if it didn't resized before
    await resizeImage(originalPath, resizedPath, imgWidth, imgHeight);

    res.sendFile(resizedPath);
  } catch (err) {
    res.status(500).send("Failed to Resize Image");
  }
};

export default serveImg;
