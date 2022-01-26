import { Field } from './Field';
import { CoordsI } from '../models/interfaces/coords.interface';
import { NonSnakeCellItem } from '../models/enums/non-snake-cell-value.enum';
import { Direction } from '../models/enums/direction.enum';
import { DirectionOption } from '../models/types/direction-option.type';

export class Snake {
  constructor(private readonly field: Field) {}

  get headCoords(): CoordsI {
    return this.field.getMinValCoords();
  }

  get tailCoords(): CoordsI {
    return this.field.getMaxValCoords();
  }

  move(direction: DirectionOption) {
    const newHeadCoords = {
      [Direction.Right]: { y: this.headCoords.y, x: this.headCoords.x + 1 },
      [Direction.Left]: { y: this.headCoords.y, x: this.headCoords.x - 1 },
      [Direction.Bottom]: { x: this.headCoords.x, y: this.headCoords.y + 1 },
      [Direction.Top]: { x: this.headCoords.x, y: this.headCoords.y - 1 },
    }[direction];

    this.field.updateCells([
      { ...newHeadCoords, value: 0 },
      { ...this.tailCoords, value: NonSnakeCellItem.Empty },
    ]);

    this.field.increaseNumbersExceptCoords(newHeadCoords);
  }
}
