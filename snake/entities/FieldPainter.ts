import { Field } from './Field';
import { CoordsI } from '../models/interfaces/coords.interface';
import { Snake } from './Snake';
import { CellItemValue } from '../models/types/cell-item-value.type';
import { NonSnakeCellItem } from '../models/enums/non-snake-cell-value.enum';

export class FieldPainter {
  cellSizePx: number = 35;
  field: Field = new Field();
  snake: Snake = new Snake(this.field);

  init(selector: string) {
    this.paint(selector);

    this.field.onUpdate = (updates) => {
      updates.forEach(({ x, y, value }) => {
        this.paintCellEl({ x, y }, value);
      });
    }

    setTimeout(() => {
      this.snake.move('right');
    }, 1000);

    setTimeout(() => {
      this.snake.move('right');

    }, 2000)
    setTimeout(() => {
      this.snake.move('right');
    }, 3000)

    setTimeout(() => {
      this.snake.move('right');
    }, 4000)
  }

  private getElByCoords({ x, y }: CoordsI): HTMLElement | null {
    return document.querySelector(`#cell-${y}_${x}`);
  }

  private paint(selector: string) {
    const placeholder = document.querySelector(selector);
    const fieldDiv = document.createElement('div');
    fieldDiv.style.display = 'flex';
    fieldDiv.style.flexDirection = 'column';

    this.field.cells.forEach((row, y) => {
      const rowDiv = document.createElement('div');
      rowDiv.style.display = 'flex';

      row.forEach((cell, x) => {
        const cellEl = document.createElement('div') as HTMLDivElement;
        const cellValue = this.field.getCell({ x, y });

        cellEl.style.width = `${this.cellSizePx}px`;
        cellEl.style.height = `${this.cellSizePx}px`;
        cellEl.style.border = '1px black solid';
        cellEl.style.background = this.getBGByCellValue(cellValue);

        cellEl.id = `cell-${y}_${x}`;
        cellEl.classList.add('snake__cell')

        rowDiv.appendChild(cellEl);
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
