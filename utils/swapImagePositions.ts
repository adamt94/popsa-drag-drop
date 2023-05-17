import { PrintablePageData } from "../components/PrintablePage/PrintablePage";


// export function swapImagePositions(data: PrintablePageData[], from: [number, number], to: [number, number]): PrintablePageData[] {
//   const newData = [...data];
//   const temp = newData[from[0]].images[from[1]];
//   newData[from[0]].images[from[1]] = newData[to[0]].images[to[1]];
//   newData[to[0]].images[to[1]] = temp;
//   return newData;
// }


export const swapImagePositions = (data: PrintablePageData[], imageA: string, imageB: string) =>{
  // Find the objects containing the images
  const objectA = data.find(obj => obj.images.includes(imageA));
  const objectB = data.find(obj => obj.images.includes(imageB));

  if (objectA && objectB) {
    // Find the indices of the images within their respective objects
    const indexA = objectA.images.indexOf(imageA);
    const indexB = objectB.images.indexOf(imageB);

    // Swap the images within their respective objects
    objectA.images[indexA] = imageB;
    objectB.images[indexB] = imageA;
  }

  return data;
}

