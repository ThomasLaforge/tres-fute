import { makeAutoObservable } from "mobx";
import { Power } from "../enums";

const NB_YELLOW_COLUMNS = 5;

// const yellowTopRowPowers = [
//   null,
//   Power.FitNumber,
//   Power.GreyCheck,
//   Power.GreenCheck,
//   Power.Fox
// ];

// const yellowMiddleRowPowers = [
//   Power.ReRoll,
//   Power.PinkCheck,
//   Power.BlueCheck,
//   Power.FreeAction,
//   Power.YellowCheck
// ];

const yellowColumnScores = [10, 10, 15, 15, 20];

interface IBlueCheck {
  blueValue: number;
  whiteValue: number;
}

// const bluePowers = [
//   Power.GreenCheck,
//   Power.PinkCheck,
//   Power.YellowCheck,
//   Power.FreeAction,
//   Power.GreyCheck,
//   Power.Fox,
//   Power.ReRoll
// ];

enum GreyColor {
  White = "white",
  LightGrey = "lightgrey",
  DarkGrey = "darkgrey"
}

interface IGreyPosition {
  rowIndex: number;
  columnIndex: number;
}

interface IGreyBox {
  parts: IGreyPosition[];
  color: GreyColor;
  power?: Power;
}

const greyColumnScores = [1, 2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11];
const greyZones: IGreyBox[] = [
  {
    parts: [{ rowIndex: 0, columnIndex: 0 }],
    color: GreyColor.LightGrey,
    power: Power.FitNumber
  },
  {
    parts: [
      { rowIndex: 1, columnIndex: 0 },
      { rowIndex: 2, columnIndex: 0 },
      { rowIndex: 3, columnIndex: 0 },
      { rowIndex: 2, columnIndex: 1 }
    ],
    color: GreyColor.LightGrey,
    power: Power.ReRoll
  },
  {
    parts: [
      { rowIndex: 0, columnIndex: 1 },
      { rowIndex: 1, columnIndex: 1 },
      { rowIndex: 0, columnIndex: 2 },
      { rowIndex: 1, columnIndex: 2 },
      { rowIndex: 2, columnIndex: 2 }
    ],
    color: GreyColor.White
  },
  {
    parts: [
      { rowIndex: 3, columnIndex: 1 },
      { rowIndex: 3, columnIndex: 2 }
    ],
    color: GreyColor.DarkGrey
  },
  {
    parts: [
      { rowIndex: 0, columnIndex: 3 },
      { rowIndex: 0, columnIndex: 4 },
      { rowIndex: 0, columnIndex: 5 },
      { rowIndex: 0, columnIndex: 6 },
      { rowIndex: 1, columnIndex: 6 }
    ],
    color: GreyColor.LightGrey,
    power: Power.GreenCheck
  },
  {
    parts: [
      { rowIndex: 1, columnIndex: 3 },
      { rowIndex: 1, columnIndex: 4 },
      { rowIndex: 1, columnIndex: 5 },
      { rowIndex: 2, columnIndex: 5 },
      { rowIndex: 3, columnIndex: 4 },
      { rowIndex: 3, columnIndex: 5 }
    ],
    color: GreyColor.DarkGrey,
    power: Power.FitNumber
  },
  {
    parts: [
      { rowIndex: 2, columnIndex: 3 },
      { rowIndex: 2, columnIndex: 4 },
      { rowIndex: 3, columnIndex: 3 }
    ],
    color: GreyColor.LightGrey,
    power: Power.PinkCheck
  },
  {
    parts: [
      { rowIndex: 2, columnIndex: 6 },
      { rowIndex: 3, columnIndex: 6 }
    ],
    color: GreyColor.White
  },
  {
    parts: [
      { rowIndex: 0, columnIndex: 7 },
      { rowIndex: 0, columnIndex: 8 },
      { rowIndex: 1, columnIndex: 7 },
      { rowIndex: 1, columnIndex: 8 },
      { rowIndex: 1, columnIndex: 9 }
    ],
    color: GreyColor.White,
    power: Power.ReRoll
  },
  {
    parts: [
      { rowIndex: 2, columnIndex: 7 },
      { rowIndex: 2, columnIndex: 8 },
      { rowIndex: 3, columnIndex: 7 },
      { rowIndex: 3, columnIndex: 8 }
    ],
    color: GreyColor.DarkGrey,
    power: Power.FreeAction
  },
  {
    parts: [
      { rowIndex: 0, columnIndex: 9 },
      { rowIndex: 0, columnIndex: 10 },
      { rowIndex: 1, columnIndex: 10 },
      { rowIndex: 2, columnIndex: 9 },
      { rowIndex: 2, columnIndex: 10 },
      { rowIndex: 3, columnIndex: 9 }
    ],
    color: GreyColor.LightGrey,
    power: Power.FitNumber
  },
  {
    parts: [
      { rowIndex: 0, columnIndex: 11 },
      { rowIndex: 1, columnIndex: 11 }
    ],
    color: GreyColor.DarkGrey
  },
  {
    parts: [
      { rowIndex: 2, columnIndex: 11 },
      { rowIndex: 3, columnIndex: 10 },
      { rowIndex: 3, columnIndex: 11 }
    ],
    color: GreyColor.White,
    power: Power.YellowCheck
  },
  {
    parts: [
      { rowIndex: 0, columnIndex: 12 },
      { rowIndex: 0, columnIndex: 13 },
      { rowIndex: 1, columnIndex: 12 },
      { rowIndex: 2, columnIndex: 12 },
      { rowIndex: 3, columnIndex: 12 }
    ],
    color: GreyColor.LightGrey,
    power: Power.FitNumber
  },
  {
    parts: [
      { rowIndex: 1, columnIndex: 13 },
      { rowIndex: 2, columnIndex: 13 },
      { rowIndex: 2, columnIndex: 14 },
      { rowIndex: 3, columnIndex: 13 }
    ],
    color: GreyColor.White,
    power: Power.BlueCheck
  },
  {
    parts: [
      { rowIndex: 0, columnIndex: 14 },
      { rowIndex: 0, columnIndex: 15 },
      { rowIndex: 1, columnIndex: 14 },
      { rowIndex: 1, columnIndex: 15 },
      { rowIndex: 2, columnIndex: 15 },
      { rowIndex: 3, columnIndex: 15 }
    ],
    color: GreyColor.DarkGrey,
    power: Power.GreenCheck
  },
  {
    parts: [{ rowIndex: 3, columnIndex: 14 }],
    color: GreyColor.LightGrey,
    power: Power.FitNumber
  }
];

const nbWhiteBoxes = greyZones.filter(
  (zone) => zone.color === GreyColor.White
).length;
const nbLightGreyBoxes = greyZones.filter(
  (zone) => zone.color === GreyColor.LightGrey
).length;
const nbDarkGreyBoxes = greyZones.filter(
  (zone) => zone.color === GreyColor.DarkGrey
).length;

const GREEN_DOUBLE_START_INDEX = 3;
const greenPowers = [
  Power.ReRoll,
  Power.BlueCheck,
  Power.FitNumber,
  Power.YellowCheck,
  Power.GreyCheck,
  Power.FreeAction,
  Power.PinkCheck,
  Power.BlueCheck,
  Power.YellowCheck,
  Power.Fox,
  Power.FreeAction
];

const pinkScores = [2, 4, 6, 9, 12, 15, 19, 23, 27, 32, 37, 42];

export class ScoreBoard {
  constructor(
    public greenValues: [number[], number[]] = [[], []],
    public yellowValues: [number[], number[], number[]] = [[], [], []],
    public pinkValues: number[] = [],
    public greyZones: IGreyBox[] = [],
    public blueChecks: IBlueCheck[] = [],
    public nbReRollDone = 0,
    public nbFreeActionDone = 0,
    public nbFitNumbersDone = 0,
    public nbTurnCompleted = 0
  ) {
    makeAutoObservable(this);
  }

  addGreenValue(value: number, rowIndex: number) {
    this.greenValues[rowIndex].push(value);
  }

  addYellowValue(value: number, rowIndex: number) {
    if (this.yellowValues[rowIndex].length >= NB_YELLOW_COLUMNS) {
      throw new Error("This row is already full");
    }
    if (
      rowIndex === 0 &&
      this.yellowValues[rowIndex][this.yellowValues[rowIndex].length - 1] >=
        value
    ) {
      throw new Error("This value is too low for first row");
    }
    this.yellowValues[rowIndex].push(value);
  }

  addPinkValue(value: number) {
    const newValues = [...this.pinkValues, value];
    if (value === 3 && newValues.length < pinkScores.length) {
      newValues.push(3);
    }
    this.pinkValues = newValues.slice();
  }

  validateBlueValue(checkPosition: IBlueCheck) {
    if (
      this.blueChecks.find(
        (check) =>
          check.blueValue === checkPosition.blueValue &&
          check.whiteValue === checkPosition.whiteValue
      )
    ) {
      throw new Error("Blue value already used");
    } else {
      this.blueChecks.push(checkPosition);
    }
  }

  validateGreyZone(rowIndex: number, columnIndex: number) {
    const greyBox = greyZones.find((zone) =>
      zone.parts.some(
        (part) => part.rowIndex === rowIndex && part.columnIndex === columnIndex
      )
    );
    if (!greyBox) {
      throw new Error("Invalid grey zone");
    }
    const greyBoxInAlreadyDone = this.greyZones.find((zone) =>
      zone.parts.some(
        (part) => part.rowIndex === rowIndex && part.columnIndex === columnIndex
      )
    );
    if (greyBoxInAlreadyDone) {
      throw new Error("Grey zone already done");
    } else {
      this.greyZones.push(greyBox);
    }
  }

  get nbReRoll() {
    // 1 cause at first turn it gives a free action
    let nbReRoll = 1;

    const nbReRollFromGreys = this.greyZones.filter(
      (zone) => zone.power === Power.ReRoll
    ).length;
    nbReRoll += nbReRollFromGreys;

    if (this.yellowValues[1].length > 0) {
      nbReRoll++;
    }

    if (this.greenValues[1].length > 0) {
      nbReRoll++;
    }

    if (
      this.pinkValues.length >= 5 &&
      (this.pinkValues[4] === 5 || this.pinkValues[4] === 6)
    ) {
      nbReRoll++;
    }

    const nbBlueChecksInDiagonal = this.blueChecks.filter(
      (check) => check.blueValue === check.whiteValue
    ).length;
    if (nbBlueChecksInDiagonal >= 2) {
      nbReRoll++;
    }

    return nbReRoll;
  }

  get nbFreeAction() {
    let nbFreeAction = 0;

    if (this.nbTurnCompleted >= 1) {
      nbFreeAction++;
    }

    if (this.yellowValues[1].length >= 4) {
      nbFreeAction++;
    }

    const nbBlueChecksInFourthRow = this.blueChecks.filter(
      (check) => check.blueValue === 4
    ).length;
    if (nbBlueChecksInFourthRow >= 2) {
      nbFreeAction++;
    }

    const nbGreyZonesWithFreeAction = this.greyZones.filter(
      (zone) => zone.power === Power.FreeAction
    ).length;
    nbFreeAction += nbGreyZonesWithFreeAction;

    const nbLowGreenValues = this.greenValues[1].length;
    if (nbLowGreenValues >= 6) {
      nbFreeAction++;
    }
    if (nbLowGreenValues === greenPowers.length) {
      nbFreeAction++;
    }

    if (
      this.pinkValues.length >= 4 &&
      (this.pinkValues[3] === 5 || this.pinkValues[3] === 6)
    ) {
      nbFreeAction++;
    }

    return nbFreeAction;
  }

  get greenScore() {
    let score = 0;
    const nGreenValuesToConsider = Math.min(
      this.greenValues[0].length,
      this.greenValues[1].length
    );
    for (let i = 0; i < nGreenValuesToConsider; i++) {
      let scoreToAdd = this.greenValues[0][i] + this.greenValues[1][i];
      if (i >= GREEN_DOUBLE_START_INDEX) {
        scoreToAdd *= 2;
      }
      score += scoreToAdd;
    }
    return score;
  }

  get pinkScore() {
    const scoreFromPosition =
      this.pinkValues.length > 0 ? pinkScores[this.pinkValues.length - 1] : 0;
    const scoreFromValues = this.pinkValues.reduce((acc, value) => {
      if (value === 2) {
        return acc + 2;
      }
      if (value === 4) {
        return acc + 4;
      }
      if (value === 6) {
        return acc + 3;
      }
      return acc;
    }, 0);
    return scoreFromPosition + scoreFromValues;
  }

  get blueScore() {
    let score = 0;

    for (let i = 1; i < 6; i++) {
      const columnChecks = this.blueChecks.filter(
        (check) => check.whiteValue === i
      );
      if (columnChecks.length >= 2) {
        score += 6 + i;
      }
    }

    const nbAntiDiagonalChecks = this.blueChecks.filter(
      (check) => check.blueValue === 6 - check.whiteValue + 1
    ).length;
    if (nbAntiDiagonalChecks >= 2) {
      score += 6;
    }

    return score;
  }

  get yellowScore() {
    const nbYellowValuesToConsider = Math.min(
      this.yellowValues[0].length,
      this.yellowValues[1].length,
      this.yellowValues[2].length
    );

    let score = 0;
    for (let i = 0; i < nbYellowValuesToConsider; i++) {
      score += yellowColumnScores[i];
    }

    this.yellowValues[1].forEach((value) => {
      score -= value;
    });
    this.yellowValues[2].forEach((value) => {
      score += value;
    });

    return score;
  }

  get greyColumnValues() {
    const columnValues: number[] = [];

    for (let i = 0; i < 16; i++) {
      columnValues[i] = 0;
    }

    this.greyZones.forEach((zone) => {
      zone.parts.forEach((part) => {
        columnValues[part.columnIndex]++;
      });
    });

    return columnValues;
  }

  get greyScore() {
    return this.greyColumnValues.reduce((score, value, index) => {
      if (value === 4) {
        return score + greyColumnScores[index];
      }
      return score;
    });
  }

  get nbFoxes() {
    let nb = 0;

    if (this.pinkValues.length >= 8) {
      nb++;
    }

    if (this.greenValues[1].length >= 10) {
      nb++;
    }

    if (this.yellowValues[0].length >= 5) {
      nb++;
    }

    if (this.blueChecks.filter((check) => check.blueValue === 6).length >= 2) {
      nb++;
    }

    const nbWhiteBoxesDone = this.greyZones.filter(
      (zone) => zone.color === GreyColor.White
    ).length;
    if (nbWhiteBoxesDone === nbWhiteBoxes) {
      nb++;
    }
    const nbLightGreyBoxesDone = this.greyZones.filter(
      (zone) => zone.color === GreyColor.LightGrey
    ).length;
    if (nbLightGreyBoxesDone === nbLightGreyBoxes) {
      nb++;
    }
    const nbDarkGreyBoxesDone = this.greyZones.filter(
      (zone) => zone.color === GreyColor.DarkGrey
    ).length;
    if (nbDarkGreyBoxesDone === nbDarkGreyBoxes) {
      nb++;
    }

    return nb;
  }

  get foxScore() {
    const smallestScore = Math.min(
      this.greenScore,
      this.pinkScore,
      this.greyScore,
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
      this.pinkScore +
      this.greyScore +
      this.foxScore
    );
  }
}
