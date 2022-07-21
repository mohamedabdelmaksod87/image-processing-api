const renameImage = (
  filename: string,
  width: number,
  height: number
): string => {
  return `${(filename as string).slice(0, -4)}_${width}_${height}.jpg`;
};

export default renameImage;
