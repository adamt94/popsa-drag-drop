import { swapImagePositions } from './swapImagePositions';

describe('swapImagePositions', () => {
    it('should swap image positions correctly', () => {
      const data = [
        {
          images: ['image1', 'image2', 'image3'],
        },
        {
          images: ['image4', 'image5'],
        },
      ];
  
      const expectedResult = [
        {
          images: ['image1', 'image4', 'image3'],
        },
        {
          images: ['image2', 'image5'],
        },
      ];
  
      const result = swapImagePositions(data, [0, 1], [1, 0]);
  
      expect(result).toEqual(expectedResult);
    });
  });