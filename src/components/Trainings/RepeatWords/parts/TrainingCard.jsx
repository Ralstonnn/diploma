import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingAnimation } from "../../../LoadingAnimation/LoadingAnimation";
import { repeatCoefficient } from "../../../../globalVariables";

export function TrainingCardRepeatWords({
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
  const [buttons, setButtons] = useState();

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

  const clickShowAnswer = useCallback(() => {
    setButtons(
      <div className="flex-item flex-item-1 flex flex-wrap flex-j-space-between m-t-30">
        <button
          className="flex-item flex-item-768-1 bg-prm-d bg-prm-b-hover 
        text-color-main-b text-color-main-d-hover"
          onClick={clickAgain}
        >
          Again
        </button>
        <button
          className="flex-item flex-item-768-1 bg-prm-d bg-prm-b-hover 
        text-color-main-b text-color-main-d-hover m-768-t-10"
          onClick={clickHard}
        >
          Hard
        </button>
        <button
          className="flex-item flex-item-768-1 bg-prm-d bg-prm-b-hover 
        text-color-main-b text-color-main-d-hover m-768-t-10"
          onClick={clickEasy}
        >
          Easy
        </button>
      </div>
    );

    setShowAnswer(true);
  }, [clickAgain, clickEasy, clickHard]);

  useEffect(() => {
    setShowAnswer(false);

    setButtons(
      <div className="flex flex-item flex-j-center m-t-30 ">
        <button
          onClick={() => clickShowAnswer()}
          className="bg-prm-d bg-prm-b-hover text-color-main-b text-color-main-d-hover"
        >
          Show Answer
        </button>
      </div>
    );
  }, [index, word, definition, clickShowAnswer]);

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="flex flex-j-center flex-item flex-item-1">
      <div className="flex flex-o-vertical flex-a-center flex-j-space-between training-card p-50 p-768-25 bg-prm">
        <div className="training-card-word text-s2">{word}</div>
        {showAnswer && (
          <div className="training-card-definition flex flex-grow-1 m-t-30 text-s4">
            {definition}
          </div>
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
