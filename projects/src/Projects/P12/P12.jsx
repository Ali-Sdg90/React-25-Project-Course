import React, { useEffect, useState } from "react";
import Style from "./P12.module.css";

const P12 = () => {
    const [isPlayerX, setIsPlayerX] = useState(false);
    const [gameBoxes, setGameBoxes] = useState(
        Array(3).fill(Array(3).fill(null))
    );
    const [endGame, setEndGame] = useState({
        isGameOver: false,
        endGameText: "",
    });

    const clickBox = (row, column) => {
        console.log(row, column);

        setGameBoxes((prevState) => {
            const newMap = JSON.parse(JSON.stringify(prevState));

            newMap[row][column] = isPlayerX;

            return newMap;
        });

        setIsPlayerX(!isPlayerX);
    };

    const endGameFunc = (i) => {
        if (i !== "Draw") {
            setEndGame({
                isGameOver: true,
                endGameText: `${!!i ? "O" : "X"} Won!`,
            });
        } else {
            setEndGame({
                isGameOver: true,
                endGameText: `Draw!`,
            });
        }
    };

    const endGameChecker = () => {
        let score = 0;
        for (let i = 0; i < 2; i++) {
            gameBoxes.map((row, rowIndex) => {
                score = 0;
                row.map((_, columnIndex) => {
                    if (gameBoxes[rowIndex][columnIndex] === !!i) {
                        score++;
                    }

                    if (score === 3) {
                        endGameFunc(i);
                    }
                });

                score = 0;
                row.map((_, columnIndex) => {
                    if (gameBoxes[columnIndex][rowIndex] === !!i) {
                        score++;
                    }

                    if (score === 3) {
                        endGameFunc(i);
                    }
                });

                score = 0;
                row.map((_, columnIndex) => {
                    if (gameBoxes[columnIndex][columnIndex] === !!i) {
                        score++;
                    }

                    if (score === 3) {
                        endGameFunc(i);
                    }
                });

                score = 0;
                row.map((_, columnIndex) => {
                    if (gameBoxes[2 - columnIndex][columnIndex] === !!i) {
                        score++;
                    }

                    if (score === 3) {
                        endGameFunc(i);
                    }
                });
            });
        }

        score = 9;
        gameBoxes.map((row, rowIndex) => {
            row.map((_, columnIndex) => {
                if (gameBoxes[rowIndex][columnIndex] !== null) {
                    score--;
                }

                if (score === 0) {
                    endGameFunc("Draw");
                }
            });
        });
    };

    useEffect(() => {
        endGameChecker();
    }, [gameBoxes]);

    return (
        <div className={Style.container}>
            {/* <div className={Style.row}>
                <div onClick={() => clickBox(0, 0)}>
                    {gameBoxes[0][0] != null && (gameBoxes[0][0] ? "O" : "X")}
                </div>
                <div onClick={() => clickBox(0, 1)}>{() => boxIcon(1, 2)}</div>
                <div onClick={() => clickBox(0, 2)}>{() => boxIcon(1, 3)}</div>
            </div>
            <div className={Style.row}>
                <div onClick={() => clickBox(1, 0)}>{() => boxIcon(2, 1)}</div>
                <div onClick={() => clickBox(1, 1)}>{() => boxIcon(2, 2)}</div>
                <div onClick={() => clickBox(1, 2)}>{() => boxIcon(2, 3)}</div>
            </div>
            <div className={Style.row}>
                <div onClick={() => clickBox(2, 0)}>{() => boxIcon(3, 1)}</div>
                <div onClick={() => clickBox(2, 1)}>{() => boxIcon(3, 2)}</div>
                <div onClick={() => clickBox(2, 2)}>{() => boxIcon(3, 3)}</div>
            </div> */}
            <h1>- Tic Tac Toe -</h1>

            <div className={Style.gameBox}>
                {gameBoxes.map((row, rowIndex) => {
                    return (
                        <div className={Style.row} key={rowIndex}>
                            {row.map((_, columnIndex) => (
                                <div
                                    key={columnIndex}
                                    onClick={() =>
                                        gameBoxes[rowIndex][columnIndex] ===
                                            null &&
                                        !endGame.isGameOver &&
                                        clickBox(rowIndex, columnIndex)
                                    }
                                    className={
                                        gameBoxes[rowIndex][columnIndex] ===
                                            null && !endGame.isGameOver
                                            ? Style.activeBox
                                            : ""
                                    }
                                >
                                    {gameBoxes[rowIndex][columnIndex] != null &&
                                        (gameBoxes[rowIndex][columnIndex]
                                            ? "O"
                                            : "X")}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
            {endGame.isGameOver && (
                <>
                    <h2>{endGame.endGameText}</h2>
                    <button
                        onClick={() => {
                            setGameBoxes(Array(3).fill(Array(3).fill(null)));
                            setEndGame({
                                isGameOver: false,
                                endGameText: "",
                            });
                            setIsPlayerX(false);
                        }}
                    >
                        Reset Game
                    </button>
                </>
            )}
        </div>
    );
};

export default P12;
