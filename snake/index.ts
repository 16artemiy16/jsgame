import { FieldPainter } from './entities/FieldPainter';

export const injectGame = (selector: string) => {
  const painter = new FieldPainter();

  painter.init(selector);
};
