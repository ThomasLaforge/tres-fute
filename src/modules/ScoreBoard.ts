import { makeAutoObservable } from "mobx";
import { Power } from "./enums";

export const greenBoxes: {
  score: number;
  power?: Power;
  valueNeeded: number;
}[] = [
  { score: 1, valueNeeded: 1 },
  { score: 3, valueNeeded: 2 },
  { score: 6, valueNeeded: 3 },
  { score: 10, valueNeeded: 4, power: Power.FreeAction },
  { score: 15, valueNeeded: 5 },
  { score: 21, valueNeeded: 1, power: Power.BlueCheck },
  { score: 28, valueNeeded: 2, power: Power.Fox },
  { score: 36, valueNeeded: 3 },
  { score: 45, valueNeeded: 4, power: Power.PurpleSix },
  { score: 55, valueNeeded: 5, power: Power.ReRoll },
  { score: 66, valueNeeded: 6 }
];

const orangeSpecialBoxPositions: {
  position: number;
  multiplicator?: 2 | 3;
  power?: Power;
}[] = [
  { position: 2, power: Power.ReRoll },
  { position: 3, multiplicator: 2 },
  { position: 4, power: Power.YellowCheck },
  { position: 5, power: Power.FreeAction },
  { position: 6, multiplicator: 2 },
  { position: 7, power: Power.Fox },
  { position: 8, multiplicator: 2 },
  { position: 9, power: Power.PurpleSix },
  { position: 10, multiplicator: 3 }
];

export const purpleSpecialBoxPositions = [
  { position: 2, power: Power.ReRoll },
  { position: 3, power: Power.BlueCheck },
  { position: 4, power: Power.FreeAction },
  { position: 5, power: Power.YellowCheck },
  { position: 6, power: Power.Fox },
  { position: 7, power: Power.ReRoll },
  { position: 8, power: Power.GreenCheck },
  { position: 9, power: Power.OrangeSix },
  { position: 10, power: Power.FreeAction }
];

const yellowMatrix: (number | null)[][] = [
  [3, 6, 5, null],
  [2, 1, null, 5],
  [1, null, 2, 4],
  [null, 3, 4, 6]
];

const yellowColumnScores = [10, 14, 16, 20];
export const yellowRowPower = [
  Power.BlueCheck,
  Power.OrangeFour,
  Power.GreenCheck,
  Power.Fox,
  Power.FreeAction
];

export class ScoreBoard {
  constructor(
    public greenValue = 0,
    public orangeValues: number[] = [],
    public purpleValues: number[] = [],
    public yellowValues = yellowMatrix.slice(),
    public blueValues: number[] = [],
    public nbReRollDone = 0,
    public nbFreeActionDone = 0,
    public nbTurnCompleted = 0
  ) {
    makeAutoObservable(this);
  }

  validateGreenValue(value: number) {
    if (value < greenBoxes[this.greenValue].valueNeeded) {
      throw new Error("Green value too low");
    } else {
      this.greenValue++;
    }
  }

  addOrangeValue(value: number) {
    this.orangeValues = [...this.orangeValues, value];
  }

  addPurpleValue(value: number) {
    if (this.purpleValues.length === 10) {
      throw new Error("Purple values already completed");
    } else if (this.purpleValues.length === 0) {
      this.purpleValues = [value];
    } else if (
      value <
        this.purpleValues[this.purpleValues.length - 1] &&
      this.purpleValues[this.purpleValues.length - 1] !== 6
    ) {
      throw new Error("Purple value too low");
    } else {
      this.purpleValues = [...this.purpleValues, value];
    }
  }

  validateBlueValue(value: number) {
    if (this.blueValues.includes(value)) {
      throw new Error("Blue value already used");
    } else {
      this.blueValues = [...this.blueValues, value];
    }
  }

  validateYellowValue(
    value: number,
    row: number,
    column: number
  ) {
    if (this.yellowValues[row][column] === null) {
      throw new Error("Yellow value already used");
    } else if (this.yellowValues[row][column] !== value) {
      throw new Error(
        "Wrong yellow value at this position"
      );
    } else {
      this.yellowValues[row][column] = null;
    }
  }

  get nbReRoll() {
    // 1 cause at first turn it gives a free action
    let nbReRoll = 1;

    if (this.nbTurnCompleted > 2) {
      nbReRoll++;
    }

    if (
      this.blueValues.includes(5) &&
      this.blueValues.includes(9)
    ) {
      nbReRoll++;
    }

    if (this.greenValue >= 10) {
      nbReRoll++;
    }

    if (this.orangeValues.length >= 3) {
      nbReRoll++;
    }

    if (this.purpleValues.length >= 3) {
      nbReRoll++;
    }

    if (this.purpleValues.length >= 8) {
      nbReRoll++;
    }

    return nbReRoll;
  }

  get nbFreeAction() {
    let nbFreeAction = 0;

    if (this.nbTurnCompleted > 1) {
      nbFreeAction++;
    }

    if (this.greenValue >= 4) {
      nbFreeAction++;
    }

    if (this.orangeValues.length >= 6) {
      nbFreeAction++;
    }

    if (this.purpleValues.length >= 5) {
      nbFreeAction++;
    }

    if (this.purpleValues.length >= 11) {
      nbFreeAction++;
    }

    if (
      this.blueValues.includes(4) &&
      this.blueValues.includes(8) &&
      this.blueValues.includes(12)
    ) {
      nbFreeAction++;
    }

    if (
      this.yellowValues[0][0] === null &&
      this.yellowValues[1][1] === null &&
      this.yellowValues[2][2] === null &&
      this.yellowValues[3][3] === null
    ) {
      nbFreeAction++;
    }

    return nbFreeAction;
  }

  get greenScore() {
    if (this.greenValue === 0) {
      return 0;
    }
    return greenBoxes[this.greenValue - 1].score;
  }

  get orangeScore() {
    return this.orangeValues.reduce((acc, value, pos) => {
      const specialBox = orangeSpecialBoxPositions.find(
        (specialBox) =>
          specialBox.position === pos &&
          specialBox.multiplicator
      );
      if (specialBox && specialBox.multiplicator) {
        return acc + value * specialBox.multiplicator;
      }
      return acc + value;
    }, 0);
  }

  get purpleScore() {
    return this.purpleValues.reduce(
      (acc, value) => acc + value,
      0
    );
  }

  get blueScore() {
    const position = this.blueValues.length;
    if (position === 0) {
      return 0;
    }
    let score = 1;
    for (let i = 1; i < position; i++) {
      score += i;
    }
    return score;
  }

  get yellowScore() {
    let score = 0;
    for (let i = 0; i < this.yellowValues[0].length; i++) {
      let j = 0;
      while (
        j < this.yellowValues.length &&
        this.yellowValues[j][i] === null
      ) {
        j++;
      }
      console.log(j, this.yellowValues.length, i);
      if (j === this.yellowValues.length) {
        score += yellowColumnScores[i];
      }
    }
    return score;
  }

  get nbFoxes() {
    let nb = 0;

    if (this.greenValue >= 7) {
      nb++;
    }

    if (this.orangeValues.length >= 8) {
      console.log("orangeValues");
      nb++;
    }

    if (this.purpleValues.length >= 7) {
      console.log("purpleValues");
      nb++;
    }

    let i = 0;
    while (
      i < this.yellowValues[0].length &&
      this.yellowValues[this.yellowValues.length - 1][i] ===
        null
    ) {
      i++;
    }
    if (i === this.yellowValues[0].length) {
      console.log("yellowValues");
      nb++;
    }

    if (
      this.blueValues.includes(9) &&
      this.blueValues.includes(10) &&
      this.blueValues.includes(11) &&
      this.blueValues.includes(12)
    ) {
      nb++;
    }

    return nb;
  }

  get foxScore() {
    const smallestScore = Math.min(
      this.greenScore,
      this.orangeScore,
      this.purpleScore,
      this.blueScore,
      this.yellowScore
    );

    return smallestScore * this.nbFoxes;
  }

  get scoreTotal() {
    return (
      this.yellowScore +
      this.blueScore +
      this.greenScore +
      this.orangeScore +
      this.purpleScore +
      this.foxScore
    );
  }
}
