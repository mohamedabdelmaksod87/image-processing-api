import express from "express";
import path from "path";
import sharp from "sharp";
import fs from "fs";

const serveImg = async (req: express.Request, res: express.Response) => {
  try {
    const { filename, width, height } = req.query;
    const imgWidth = parseInt(width as string);
    const imgHeight = parseInt(height as string);

    const resizedFilename = `${(filename as string).slice(
      0,
      -4
    )}_${imgWidth}_${imgHeight}.jpg`;

    const resizedPath = path.join(
      __dirname,
      "..",
      "..",
      "resized_images",
      `${resizedFilename}`
    );

    //create the resized_images directory if not already existed
    if (!fs.existsSync(path.join(__dirname, "..", "..", "resized_images"))) {
      fs.mkdir(path.join(__dirname, "..", "..", "resized_images"), (err) => {
        if (err) throw err;
      });
    }

    //ckeck if requested Image already in resized image folder return it without new resizing
    if (fs.existsSync(resizedPath)) {
      return res.sendFile(resizedPath);
    }

    //resize requested image if it didn't resized before
    await sharp(
      path.join(__dirname, "..", "..", "original_images", `${filename}`)
    )
      .resize(imgWidth, imgHeight)
      .toFile(resizedPath);

    res.sendFile(resizedPath);
  } catch (err) {
    res.status(500).send("Failed to Resize Image");
  }
};

export default serveImg;
