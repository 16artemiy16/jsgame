import { Field } from './Field';
import { Snake } from './Snake';
import { DirectionOption } from '../models/types/direction-option.type';
import { Direction } from '../models/enums/direction.enum';
import { Painter } from './Painter';

export class GameHandler {
  field: Field | undefined;
  snake: Snake | undefined;
  painter: Painter | undefined;

  direction: DirectionOption = Direction.Right;
  stepIntervalMS: number = 500;
  gameInterval: number | null = null;

  private _initEntities() {
    this.field = new Field();
    this.snake = new Snake(this.field);
    this.painter = new Painter(this.field);
  }

  private _startInterval() {
    this.gameInterval = setInterval(() => {
      try {
        this.snake.move(this.direction);
      } catch (err) {
        if (err.isGameOver) {
          this.painter.paintGameOver(err.message);
          clearInterval(this.gameInterval);
        }
      }
    }, this.stepIntervalMS) as unknown as number;
  }

  private _watchChangeDirection() {
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

  init(selector: string) {
    this._initEntities();
    this.painter.init(selector);
    this._startInterval();
    this._watchChangeDirection();
  }
}
