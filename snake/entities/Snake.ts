import { Field } from './Field';
import { CellItem } from '../models/enums/cell-item.enum';
import { CoordsI } from '../models/interfaces/coords.interface';

export class Snake {
  constructor(private readonly field: Field) {}

  get headCoords(): CoordsI {
    return this.field.getValueCoords(CellItem.SnakeHead)[0];
  }

  get bodyCoords(): CoordsI[] {
    return this.field.getValueCoords(CellItem.Snake);
  }

  get tailCoords(): CoordsI {
    return this.field.getValueCoords(CellItem.SnakeTail)[0];
  }
}
