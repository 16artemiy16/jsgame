import { CoordsI } from '../models/interfaces/coords.interface';
import { CellItemValue } from '../models/types/cell-item-value.type';
import { FieldUpdateI } from '../models/interfaces/field-update.interface';
import { NonSnakeCellItem } from '../models/enums/non-snake-cell-value.enum';
import getMaxValCoords from '../utils/get-max-val-coords.util';
import getValCoords from '../utils/get-min-val-coords.util';

type OnUpdateHookI = (updates: FieldUpdateI[]) => void;

const e = NonSnakeCellItem.Empty;
const f = NonSnakeCellItem.Food;
const w = NonSnakeCellItem.Wall;

export class Field {
  // TODO: refactor to Observable pattern
  onUpdate: OnUpdateHookI = (updates) => {};

  getCell({ x, y }: CoordsI): CellItemValue {
    return this._cells[y][x];
  }

  get cells(): CellItemValue[][] {
    return this._cells;
  }

  _cells: CellItemValue[][] = [
    [1, 0, e, e, e, e],
    [e, e, e, e, w, e],
    [e, e, e, e, w, e],
    [e, e, f, e, e, e],
    [e, e, e, e, e, e],
    [e, e, e, e, e, e],
  ];

  getMaxValCoords(): CoordsI {
    return getMaxValCoords(this._cells);
  }

  getMinValCoords(): CoordsI {
    return getValCoords(this._cells, 0);
  }

  increaseNumbersExceptCoords(coords: CoordsI) {
    this._cells.forEach((row, y) => {
      row.forEach((val, x) => {
        if (!isNaN(val as number) && !(coords.x === x && coords.y === y)) {
          this._cells[y][x] = (this._cells[y][x] as number) + 1;
        }
      })
    })
  }

  updateCells(updates: FieldUpdateI[]) {
    updates.forEach(({ x, y, value }) => {
      this._cells[y][x] = value;
    });
    this.onUpdate(updates);
  }
}
