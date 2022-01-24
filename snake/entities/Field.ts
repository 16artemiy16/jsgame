import { CoordsI } from '../models/interfaces/coords.interface';
import { CellItemValue } from '../models/types/cell-item-value.type';
import { FieldUpdateI } from '../models/interfaces/field-update.interface';

type OnUpdateHookI = (updates: FieldUpdateI[]) => void;

export class Field {
  // TODO: refactor to Observable pattern
  onUpdate: OnUpdateHookI = (updates) => {};

  getCell({ x, y }: CoordsI): CellItemValue {
    return this._cells[y][x];
  }

  get cells(): CellItemValue[][] {
    return this._cells;
  }

  /**
   *  0 - empty
   *  1 - snake
   *  2 - food
   *  3 - wall
   *  4- snake head
   */
  private readonly _cells: CellItemValue[][] = [
    [0, 4, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 2, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 3, 0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 3, 0, 0, 0],
    [0, 0, 0, 0, 3, 3, 3, 3],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ];

  updateCells(updates: FieldUpdateI[]) {
    updates.forEach(({ x, y, value }) => {
      this._cells[y][x] = value;
    });
    this.onUpdate(updates);
  }
}
