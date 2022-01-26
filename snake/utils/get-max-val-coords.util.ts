import { CoordsI } from '../models/interfaces/coords.interface';

const getMaxValCoords = (matrix: any[][]): CoordsI => {
  let maxCoords: CoordsI | undefined;
  let max: number = 0;
  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (!isNaN(cell as number) && cell >= max) {
        max = cell as number;
        maxCoords = { x, y };
      }
    });
  });
  return maxCoords;
};

export default getMaxValCoords;
