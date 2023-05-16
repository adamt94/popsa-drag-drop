type ImageData = {
  images: any[]; // Update the type of the 'images' property as per your requirements
}

export function swapImagePositions(data: ImageData[], from: [number, number], to: [number, number]): ImageData[] {
  const newData = [...data];
  const temp = newData[from[0]].images[from[1]];
  newData[from[0]].images[from[1]] = newData[to[0]].images[to[1]];
  newData[to[0]].images[to[1]] = temp;
  return newData;
}