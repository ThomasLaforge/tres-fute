import { useEffect, useState } from "react";
import "./App.css";
import {
  greenBoxes,
  ScoreBoard
} from "./modules/ScoreBoard";
import { observer } from "mobx-react-lite";

const scoreBoard = new ScoreBoard();

// const scoreBoard = new ScoreBoard(
//   2,
//   [4, 2, 4, 6, 6, 5, 5, 4],
//   [2, 4, 6, 5, 6, 6, 6, 6],
//   [
//     [null, null, null, null],
//     [null, null, null, null],
//     [1, null, null, null],
//     [null, null, null, null]
//   ],
//   [3, 4, 5, 7, 8, 11, 12],
//   2,
//   5,
//   6
// );

// const scoreBoard = new ScoreBoard(
//   7,
//   [6, 3, 6, 6, 5, 4, 6, 2],
//   [6, 6, 4, 6, 6, 6, 2],
//   [
//     [3, null, null, null],
//     [null, null, null, null],
//     [1, null, null, 4],
//     [null, null, null, null]
//   ],
//   [2, 3, 6, 10],
//   4,
//   4,
//   6
// );

console.log(
  "scoreBoard",
  scoreBoard.yellowScore,
  scoreBoard.blueScore,
  scoreBoard.greenScore,
  scoreBoard.orangeScore,
  scoreBoard.purpleScore,
  scoreBoard.foxScore,
  scoreBoard.nbFoxes,
  scoreBoard.nbFreeAction,
  scoreBoard.nbReRoll,
  scoreBoard.nbTurnCompleted,
  scoreBoard.scoreTotal
);

const App = observer(
  ({ scoreBoard }: { scoreBoard: ScoreBoard }) => {
    const [orangeNextValue, setOrangeNextValue] =
      useState(1);
    const [selectedOrangeIndex, setSelectedOrangeIndex] =
      useState(0);
    const [selectedPurpleIndex, setSelectedPurpleIndex] =
      useState(0);
    const [purpleNextValue, setPurpleNextValue] =
      useState(1);

    useEffect(() => {
      console.log("orange value", orangeNextValue);
    }, [orangeNextValue]);

    return (
      <>
        <h1>Score: {scoreBoard.scoreTotal}</h1>
        <div className="board">
          <div className="turns">
            {new Array(6).fill(0).map((_, index) => (
              <div
                key={index}
                className="turn"
                onClick={() => {
                  if (
                    scoreBoard.nbTurnCompleted ===
                    index + 1
                  ) {
                    scoreBoard.nbTurnCompleted = 0;
                  } else {
                    scoreBoard.nbTurnCompleted = index + 1;
                  }
                }}
              >
                {scoreBoard.nbTurnCompleted > index && (
                  <div className="turn-completed">X</div>
                )}
              </div>
            ))}
          </div>
          <div className="rerolls">
            {new Array(scoreBoard.nbReRoll)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="reroll"
                  onClick={() => {
                    if (
                      scoreBoard.nbReRollDone ===
                      index + 1
                    ) {
                      scoreBoard.nbReRollDone = 0;
                    } else {
                      scoreBoard.nbReRollDone = index + 1;
                    }
                  }}
                >
                  {scoreBoard.nbReRollDone > index && (
                    <div className="reroll-completed">
                      X
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="free-actions">
            {new Array(scoreBoard.nbFreeAction)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="free-action"
                  onClick={() => {
                    if (
                      scoreBoard.nbFreeActionDone ===
                      index + 1
                    ) {
                      scoreBoard.nbFreeActionDone = 0;
                    } else {
                      scoreBoard.nbFreeActionDone =
                        index + 1;
                    }
                  }}
                >
                  {scoreBoard.nbFreeActionDone > index && (
                    <div className="free-action-completed">
                      X
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="yellows">
            {scoreBoard.yellowValues.flatMap((line, i) =>
              line.map((_, j) => (
                <div
                  key={i}
                  className="yellow"
                  onClick={() => {
                    if (
                      scoreBoard.yellowValues.length -
                        j -
                        1 !==
                      i
                    ) {
                      if (
                        scoreBoard.yellowValues[i][j] ===
                        null
                      ) {
                        scoreBoard.yellowValues[i][j] = 1;
                      } else {
                        scoreBoard.yellowValues[i][j] =
                          null;
                      }
                    }
                  }}
                >
                  {scoreBoard.yellowValues[i][j] === null &&
                    scoreBoard.yellowValues.length -
                      j -
                      1 !==
                      i && (
                      <div className="yellow-completed">
                        X
                      </div>
                    )}
                </div>
              ))
            )}
          </div>
          <div className="greens">
            {greenBoxes.map((_, index) => (
              <div
                key={index}
                className="green"
                onClick={() => {
                  if (scoreBoard.greenValue === index + 1) {
                    scoreBoard.greenValue = 0;
                  } else {
                    scoreBoard.greenValue = index + 1;
                  }
                }}
              >
                {scoreBoard.greenValue > index && (
                  <div className="green-completed">X</div>
                )}
              </div>
            ))}
          </div>
          <div className="oranges">
            {new Array(11).fill(0).map((_, i) => (
              <div key={i} className="orange">
                {selectedOrangeIndex === i ? (
                  <>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={orangeNextValue}
                      onChange={(event) => {
                        event.stopPropagation();
                        console.log(
                          "event",
                          parseInt(event.target.value)
                        );
                        setOrangeNextValue(
                          parseInt(event.target.value)
                        );
                      }}
                    />
                    <button
                      onClick={() => {
                        scoreBoard.orangeValues[i] =
                          orangeNextValue;
                        setOrangeNextValue(1);
                        setSelectedOrangeIndex(
                          scoreBoard.orangeValues.length
                        );
                      }}
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <div
                    className="orange-completed"
                    onClick={() => {
                      if (
                        i <= scoreBoard.orangeValues.length
                      ) {
                        setSelectedOrangeIndex(i);
                        setOrangeNextValue(
                          scoreBoard.orangeValues[i]
                        );
                      }
                    }}
                  >
                    {scoreBoard.orangeValues[i]}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="purples">
            {new Array(11).fill(0).map((_, i) => (
              <div key={i} className="purple">
                {selectedPurpleIndex === i ? (
                  <>
                    <input
                      type="number"
                      min={1}
                      max={6}
                      value={purpleNextValue}
                      onChange={(event) => {
                        event.stopPropagation();
                        console.log(
                          "event",
                          parseInt(event.target.value)
                        );
                        setPurpleNextValue(
                          parseInt(event.target.value)
                        );
                      }}
                    />
                    <button
                      onClick={() => {
                        scoreBoard.purpleValues[i] =
                          purpleNextValue;
                        setPurpleNextValue(1);
                        setSelectedPurpleIndex(
                          scoreBoard.purpleValues.length
                        );
                      }}
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <div
                    className="purple-completed"
                    onClick={() => {
                      if (
                        i <= scoreBoard.purpleValues.length
                      ) {
                        setSelectedPurpleIndex(i);
                        setPurpleNextValue(
                          scoreBoard.purpleValues[i]
                        );
                      }
                    }}
                  >
                    {scoreBoard.purpleValues[i]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
);

export default function ObservedApp() {
  return <App scoreBoard={scoreBoard} />;
}
