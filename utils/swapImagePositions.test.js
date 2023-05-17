import { swapImagePositions } from "./swapImagePositions";

describe("swapImagePositions", () => {
  it("should swap image positions correctly", () => {
    const data = [
      {
        images: ["image1", "image2", "image3"],
      },
      {
        images: ["image4", "image5"],
      },
    ];

    const expectedResult = [
      {
        images: ["image1", "image2", "image5"],
      },
      {
        images: ["image4", "image3"],
      },
    ];

    const result = swapImagePositions(data, "image5", "image3");

    expect(result).toEqual(expectedResult);
  });
});
