import supertest from "supertest";
import app from "..";
import path from "path";
import resizeImage from "../services/resizeImage";

const request = supertest(app);
describe("Test /image endpoint responses", () => {
  const testPath1 = "/image?filename=cat.jpg&width=200&height=200";
  it("should response with status code 200 since url is valid", async () => {
    const response = await request.get(testPath1);
    expect(response.status).toBe(200);
  });

  const testPath2 = "/image?filename=cat.png&width=200&height=200";
  it("should response with status code 400 since .png extension not allowed", async () => {
    const response = await request.get(testPath2);
    expect(response.status).toBe(400);
  });

  const testPath3 = "/image?filename=dog.jpg&width=200&height=200";
  it("should response with status code 400 since filename doesn't exist on disk", async () => {
    const response = await request.get(testPath3);
    expect(response.status).toBe(400);
  });
});

describe("Test image resize function", () => {
  const imgWidth = 200;
  const imgHeight = 200;
  const imgPath = path.join(
    __dirname,
    "..",
    "..",
    "original_images",
    "cat.jpg"
  );
  const outputPath = path.join(
    __dirname,
    "..",
    "..",
    "resized_images",
    `cat_${imgWidth}_${imgHeight}.jpg`
  );
  it("should resize image width & height to be 200px", async () => {
    const response = await resizeImage(
      imgPath,
      outputPath,
      imgWidth,
      imgHeight
    );
    expect(response.width).toBe(200);
    expect(response.height).toBe(200);
  });
});
