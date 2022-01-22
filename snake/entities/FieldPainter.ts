import { Field } from './Field';
import { CellItemValue } from '../models/types/cell-item-value.type';
import { CellItem } from '../models/enums/cell-item.enum';
import { CoordsI } from '../models/interfaces/coords.interface';

export class FieldPainter {
  cellSizePx: number = 35;
  field: Field = new Field();

  init(selector: string) {
    this.paint(selector);

    this.field.onUpdate = (updates) => {
      updates.forEach(({ x, y, value }) => {
        this.paintCellEl({ x, y }, value);
      });
    }

    setTimeout(() => {
      this.field.updateCells([
        { x: 0, y: 0, value: CellItem.Snake },
        { x: 3, y: 0, value: CellItem.Empty },
      ]);
    }, 1000);
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
      [`${CellItem.Empty}`]: 'white',
      [`${CellItem.Snake}`]: 'grey',
      [`${CellItem.Food}`]: 'green',
      [`${CellItem.Wall}`]: 'black',
    }[`${value}`];
  }

  private paintCellEl(coords: CoordsI, value: CellItemValue) {
    const el = this.getElByCoords(coords);
    if (!el) {
      throw Error(`There is no cell with these coords ${JSON.stringify(coords)}`);
    }
    el.style.background = this.getBGByCellValue(value);
  }
}
