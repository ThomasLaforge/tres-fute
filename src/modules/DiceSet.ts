import { makeAutoObservable } from "mobx";

export class DiceSet {
  constructor(
    public dices = new Array(6).fill(0),
    public keptIndexes: number[] = [],
    public removedIndexes: number[] = []
  ) {
    this.roll();
    makeAutoObservable(this);
  }

  reset() {
    this.dices = new Array(6).fill(0);
    this.keptIndexes = [];
    this.removedIndexes = [];
    this.roll();
  }

  roll() {
    this.dices = this.currentDices.map((d) =>
      d === null ? null : Math.floor(Math.random() * 6) + 1
    );
  }

  removeDice(index: number) {
    this.removedIndexes.push(index);
  }

  keepDice(index: number) {
    this.keptIndexes.push(index);
  }

  get removedDices() {
    return this.removedIndexes.map(
      (index) => this.dices[index]
    );
  }

  get keptDices() {
    return this.keptIndexes.map(
      (index) => this.dices[index]
    );
  }

  get currentDices(): (number | null)[] {
    return this.dices.map((dice, index) => {
      return this.keptIndexes.includes(index) ||
        this.removedDices.includes(index)
        ? null
        : dice;
    });
  }

  get purpleDice() {
    return this.dices[0];
  }
  get yellowDice() {
    return this.dices[1];
  }
  get whiteDice() {
    return this.dices[2];
  }
  get blueDice() {
    return this.dices[3];
  }
  get greenDice() {
    return this.dices[4];
  }
  get orangeDice() {
    return this.dices[5];
  }
}
