import { Field } from './Field';
import { CellItemValue } from '../models/types/cell-item-value.type';
import { CellItem } from '../models/enums/cell-item.enum';

export class FieldPainter {
  cellSizePx: number = 50;
  field: Field = new Field();

  // TODO: think may it be optimized with using fragments
  paint(selector: string) {
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

  getBGByCellValue(value: CellItemValue): string {
    return {
      [`${CellItem.Empty}`]: 'white',
      [`${CellItem.Snake}`]: 'grey',
      [`${CellItem.Food}`]: 'green',
      [`${CellItem.Wall}`]: 'black',
    }[`${value}`];
  }
}
