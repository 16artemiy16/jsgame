import { Field } from './Field';

export class FieldPainter {
  cellSizePx: number = 50;
  field: Field = new Field();

  paint(selector: string) {
    const placeholder = document.querySelector(selector);
    const fieldFragment = document.createElement('div');
    fieldFragment.style.display = 'flex';

    this.field.cells.forEach((row, rowNumber) => {
      const rowDiv = document.createElement('div');
      rowDiv.style.display = 'flex';
      rowDiv.style.flexDirection = 'column';

      row.forEach((cell, cellNumber) => {
        const cellEl = document.createElement('div') as HTMLDivElement;
        cellEl.style.width = `${this.cellSizePx}px`;
        cellEl.style.height = `${this.cellSizePx}px`;
        cellEl.style.border = '1px black solid';
        cellEl.id = `cell-${rowNumber}_${cellNumber}`;
        rowDiv.appendChild(cellEl);
      });

      fieldFragment.appendChild(rowDiv);
    });

    placeholder.appendChild(fieldFragment);
  }
}
