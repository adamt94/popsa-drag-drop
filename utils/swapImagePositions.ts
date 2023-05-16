import { PrintablePageData } from "../components/PrintablePage/PrintablePage";


export function swapImagePositions(data: PrintablePageData[], from: [number, number], to: [number, number]): PrintablePageData[] {
  const newData = [...data];
  const temp = newData[from[0]].images[from[1]];
  newData[from[0]].images[from[1]] = newData[to[0]].images[to[1]];
  newData[to[0]].images[to[1]] = temp;
  return newData;
}