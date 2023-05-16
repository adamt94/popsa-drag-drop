export function swapImagePositions(data, from, to) {
  const newData = [...data];
  const temp = newData[from[0]].images[from[1]];
  newData[from[0]].images[from[1]] = newData[to[0]].images[to[1]];
  newData[to[0]].images[to[1]] = temp;
  return newData;
}
