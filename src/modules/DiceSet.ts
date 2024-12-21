export class DiceSet {
  constructor(
    public dices = new Array(6).fill(0),
    public usedIndexes: number[] = []
  ) {
    this.roll();
  }

  roll() {
    this.dices = this.dices.map(
      () => Math.floor(Math.random() * 6) + 1
    );
  }

  get currentDices(): (number | null)[] {
    return this.dices.map((dice, index) => {
      return this.usedIndexes.includes(index) ? null : dice;
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
