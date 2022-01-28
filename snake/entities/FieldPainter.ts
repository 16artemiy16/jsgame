import { Field } from './Field';
import { CoordsI } from '../models/interfaces/coords.interface';
import { Snake } from './Snake';
import { CellItemValue } from '../models/types/cell-item-value.type';
import { NonSnakeCellItem } from '../models/enums/non-snake-cell-value.enum';
import { Direction } from '../models/enums/direction.enum';
import { DirectionOption } from '../models/types/direction-option.type';

export class FieldPainter {
  cellSizePx: number = 35;

  field: Field = new Field();
  snake: Snake = new Snake(this.field);

  direction: DirectionOption = Direction.Right;
  stepIntervalMS: number = 500;
  gameInterval: number | null = null;

  init(selector: string) {
    this.paint(selector);

    this.field.onUpdate = (updates) => {
      updates.forEach(({ x, y, value }) => {
        this.paintCellEl({ x, y }, value);
      });
    }

    this.watchDirectionKeys();


    this.gameInterval = setInterval(() => {
      try {
        this.snake.move(this.direction);
      } catch (err) {
        if (err.isGameOver) {
          this.paintGameOver(err.message);
          clearInterval(this.gameInterval);
        }
      }
    }, this.stepIntervalMS) as unknown as number;
  }

  private watchDirectionKeys() {
    document.addEventListener('keydown', (e) => {
      const newDirection = {
        ArrowRight: Direction.Right,
        ArrowLeft: Direction.Left,
        ArrowUp: Direction.Top,
        ArrowDown: Direction.Bottom,
      }[e.key];
      if (newDirection) {
        this.direction = newDirection;
      }
    });
  }

  private getElByCoords({ x, y }: CoordsI): HTMLElement | null {
    return document.querySelector(`#cell-${y}_${x}`);
  }

  private paintGameOver(message: string) {
    const field = document.querySelector('.snake-game__field') as HTMLDivElement;
    field.style.opacity = '.5';

    const textDiv = document.createElement('div');
    textDiv.style.position = 'absolute';
    textDiv.style.top = '0';
    textDiv.style.left = '0';
    textDiv.style.bottom = '0';
    textDiv.style.right = '0';
    textDiv.style.display = 'flex';
    textDiv.style.alignItems = 'center';
    textDiv.style.justifyContent = 'center';
    textDiv.style.fontSize = '1.5em';
    textDiv.style.textAlign = 'center';
    textDiv.style.fontWeight = 'bold';
    textDiv.textContent = message;

    document
      .querySelectorAll('.snake-game__row')
      .forEach((el) => (el as HTMLElement).style.opacity = '.5');

    field.appendChild(textDiv);
  }

  private paint(selector: string) {
    const placeholder = document.querySelector(selector);
    const fieldDiv = document.createElement('div');
    fieldDiv.classList.add('snake-game__field')
    fieldDiv.style.display = 'flex';
    fieldDiv.style.flexDirection = 'column';
    fieldDiv.style.position = 'relative';

    this.field.cells.forEach((row, y) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('snake-game__row');
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
