import { GameHandler } from './entities/GameHandler';

export const injectGame = (selector: string) => {
  const painter = new GameHandler();

  painter.init(selector);
};
