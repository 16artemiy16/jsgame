import { CoordsI } from '../models/interfaces/coords.interface';

const getValCoords = (matrix: any[][], val: any): CoordsI => {
  let coords: CoordsI | undefined;
  matrix.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === val) {
        coords = { x, y };
      }
    });
  });
  return coords;
};

export default getValCoords;
