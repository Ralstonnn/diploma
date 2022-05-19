import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingAnimation } from "./LoadingAnimation/LoadingAnimation";
import { repeatCoefficient } from "../globalVariables";

// TODO: Refactor training card the way that it'll be base for all the others trainings
function TrainingCardLearnWords({
  word,
  definition,
  prevCallback,
  nextCallback,
  finishCallback,
  index,
  maxIndex,
}) {
  return (
    <div className="flex flex-j-center flex-item">
      <div className="flex flex-o-vertical flex-a-center flex-j-space-between training-card p-50">
        <div className="h1">{word}</div>
        <div className="flex flex-grow-1 m-t-30 definition">{definition}</div>
        <div className="flex flex-item flex-j-space-between m-t-30">
          {index > 0 && <button onClick={prevCallback}>Previous</button>}
          <div className="flex-item"></div>
          {index < maxIndex && <button onClick={nextCallback}>Next</button>}
          {index === maxIndex && (
            <button onClick={finishCallback}>Finish</button>
          )}
        </div>
      </div>
    </div>
  );
}

function TrainingCardRepeatWords({
  word,
  definition,
  nextCallback,
  index,
  maxIndex,
  repeatCounter,
}) {
  const navigate = useNavigate();
  const [showAnswer, setShowAnswer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttons, setButtons] = useState(
    <div className="flex flex-item flex-j-center m-t-30">
      <button
        onClick={() => {
          setShowAnswer(true);
        }}
      >
        Show Answer
      </button>
    </div>
  );

  const clickAgain = useCallback(() => {
    setIsLoading(true);

    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word,
        definition,
      }),
    };

    fetch("/api/set-to-learn", formData)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.response === "y") {
          nextCallback();
          if (index === maxIndex) navigate("/training");
          setIsLoading(false);
        }
      });
  }, [index, maxIndex, definition, navigate, nextCallback, word]);

  const clickHard = useCallback(() => {
    setIsLoading(true);
    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word,
        definition,
        date: SetDate(repeatCounter),
      }),
    };

    fetch("/api/set-reprat-date", formData)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.response === "y") {
          nextCallback();
          if (index === maxIndex) navigate("/training");
          setIsLoading(false);
        }
      });
  }, [
    index,
    maxIndex,
    definition,
    navigate,
    nextCallback,
    word,
    repeatCounter,
  ]);

  const clickEasy = useCallback(() => {
    setIsLoading(true);

    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word,
        definition,
        date: SetDate(repeatCounter, true),
        increaseRepeatCounter: true,
      }),
    };

    fetch("/api/set-reprat-date", formData)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.response === "y") {
          nextCallback();
          if (index === maxIndex) navigate("/training");
          setIsLoading(false);
        }
      });
  }, [
    index,
    maxIndex,
    definition,
    navigate,
    nextCallback,
    word,
    repeatCounter,
  ]);

  useEffect(() => {
    if (showAnswer) {
      setButtons(
        <div className="flex flex-item flex-j-space-between m-t-30">
          <button className="bg-btn-r" onClick={clickAgain}>
            Again
          </button>
          <button className="bg-btn-y" onClick={clickHard}>
            Hard
          </button>
          <button className="bg-btn-g" onClick={clickEasy}>
            Easy
          </button>
        </div>
      );
    }
  }, [showAnswer, clickAgain, clickHard, clickEasy]);

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="flex flex-j-center flex-item">
      <div className="flex flex-o-vertical flex-a-center flex-j-space-between training-card p-50">
        <div className="h1">{word}</div>
        {showAnswer && (
          <div className="flex flex-grow-1 m-t-30 definition">{definition}</div>
        )}
        {buttons}
      </div>
    </div>
  );
}

function SetDate(repeatCounter, easy = false) {
  let today = new Date();
  if (easy)
    return `${today.getFullYear()}-${today.getMonth() + 1}-${
      today.getDate() + repeatCounter * repeatCoefficient
    }`;
  return `${today.getFullYear()}-${today.getMonth() + 1}-${
    today.getDate() + 1
  }`;
}

export { TrainingCardLearnWords, TrainingCardRepeatWords };
