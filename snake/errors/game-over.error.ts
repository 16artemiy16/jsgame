export class GameOverError extends Error {
  isGameOver: boolean = true;

  constructor(message) {
    super(message);
  }
}
