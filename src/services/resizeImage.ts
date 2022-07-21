import sharp from "sharp";

//resize requested image if it didn't resized before
const resizeImage = async (
  originalPath: string,
  resizedPath: string,
  width: number,
  height: number
): Promise<sharp.OutputInfo> => {
  return await sharp(originalPath).resize(width, height).toFile(resizedPath);
};

export default resizeImage;
