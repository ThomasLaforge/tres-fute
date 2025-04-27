import { DiceSet } from "./DiceSet";
import { ScoreBoard } from "./ScoreBoards/TresFute";

export class Game {
  constructor(
    public scoreBoard = new ScoreBoard(),
    public round = 0,
    public diceSet = new DiceSet()
  ) {
    this.roll();
  }

  roll() {
    this.diceSet.roll();
  }
}
