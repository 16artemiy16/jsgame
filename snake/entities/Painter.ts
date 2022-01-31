import { Field } from './Field';
import { CoordsI } from '../models/interfaces/coords.interface';
import { CellItemValue } from '../models/types/cell-item-value.type';
import { NonSnakeCellItem } from '../models/enums/non-snake-cell-value.enum';
import createDomField from '../utils/dom-creators/create-dom-field.util';
import createDomRow from '../utils/dom-creators/create-dom-row.util';
import createDomCell from '../utils/dom-creators/create-dom-cell.util';
import createDomGameover from '../utils/dom-creators/create-dom-gameover.util';

export class Painter {
  private readonly CLASS_FIELD = 'snake-game__field';
  private readonly CLASS_ROW = 'snake-game__row';
  private readonly CLASS_CELL = 'snake-game__cell';

  cellSizePx: number = 40;

  constructor(private field: Field) {}

  init(selector: string) {
    this.paint(selector);

    this.field.onUpdate = (updates) => {
      updates.forEach(({ x, y, value }) => {
        this.paintCellEl({ x, y }, value);
      });
    }
  }

  getCellIdByCoords({ x, y }: CoordsI): string {
    return `snake-game-cell-${y}_${x}`;
  }

  private getElByCoords({ x, y }: CoordsI): HTMLElement | null {
    return document.querySelector(`#${this.getCellIdByCoords({ x, y })}`);
  }

  paintGameOver(message: string) {
    const field = document.querySelector(`.${this.CLASS_FIELD}`) as HTMLDivElement;
    field.style.opacity = '.5';

    const textDiv = createDomGameover(message);

    document
      .querySelectorAll(`.${this.CLASS_ROW}`)
      .forEach((el) => (el as HTMLElement).style.opacity = '.5');

    field.appendChild(textDiv);
  }

  private paint(selector: string) {
    const placeholder = document.querySelector(selector);
    const fieldDiv = createDomField(this.CLASS_FIELD);

    this.field.cells.forEach((row, y) => {
      const rowDiv = createDomRow(this.CLASS_ROW);

      row.forEach((cell, x) => {
        const cellValue = this.field.getCell({ x, y });
        const cellDiv = createDomCell({
          id: this.getCellIdByCoords({ x, y }),
          cls: this.CLASS_CELL,
          bg: this.getBGByCellValue(cellValue),
          size: this.cellSizePx,
        });

        rowDiv.appendChild(cellDiv);
      });

      fieldDiv.appendChild(rowDiv);
    });

    placeholder.appendChild(fieldDiv);
  }

  private getBGByCellValue(value: CellItemValue): string {
    return {
      [`${NonSnakeCellItem.Empty}`]: 'white',
      [`${NonSnakeCellItem.Food}`]: 'green',
      [`${NonSnakeCellItem.Wall}`]: 'grey',
    }[`${value}`] || 'black';
  }

  private paintCellEl(coords: CoordsI, value: CellItemValue) {
    const el = this.getElByCoords(coords);
    if (!el) {
      throw Error(`There is no cell with these coords ${JSON.stringify(coords)}`);
    }
    el.style.background = this.getBGByCellValue(value);
  }
}
