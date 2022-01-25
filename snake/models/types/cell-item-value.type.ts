import { CellItem } from '../enums/cell-item.enum';

export type CellItemValue =
  CellItem.Empty     |
  CellItem.Snake     |
  CellItem.Food      |
  CellItem.Wall      |
  CellItem.SnakeHead |
  CellItem.SnakeTail;
