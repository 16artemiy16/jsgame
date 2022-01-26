import { Field } from './Field';
import { CoordsI } from '../models/interfaces/coords.interface';
import { NonSnakeCellItem } from '../models/enums/non-snake-cell-value.enum';
import { Direction } from '../models/enums/direction.enum';

export class Snake {
  constructor(private readonly field: Field) {}

  get headCoords(): CoordsI {
    return this.field.getMinValCoords();
  }

  get tailCoords(): CoordsI {
    return this.field.getMaxValCoords();
  }

  move(direction: 'top' | 'left' | 'bottom' | 'right') {
    if (direction === Direction.Right) {
      const newHeadCoords = { ...this.tailCoords, x: this.headCoords.x + 1 };
      this.field.updateCells([
        // Move the tail ahead the head
        { ...newHeadCoords, value: 0 },
        // Make 'obsolete' tail empty
        { ...this.tailCoords, value: NonSnakeCellItem.Empty },
      ]);
      this.field.increaseNumbersExceptCoords(newHeadCoords);
    }
  }
}
