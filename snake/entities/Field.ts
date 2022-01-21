import { CoordsI } from '../models/interfaces/coords.interface';
import { CellItemValue } from '../models/types/cell-item-value.type';

export class Field {
  getCell({ x, y }: CoordsI): CellItemValue {
    return this.cells[y][x];
  }

  /**
   *  0 - empty
   *  1 - snake
   *  2 - food
   *  3 - wall
   */
  cells: CellItemValue[][] = [
    [0, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 3],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];
}
