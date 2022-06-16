import { useEffect, useRef, useState } from "react";

export function TrainingCard({
  word,
  definition,
  data,
  isLast,
  nextOnClick,
  inputsNumber,
  inputOnChange,
  finishOnClick,
}) {
  const [isChecked, setIsChecked] = useState(false);
  const inputsContainer = useRef(null);

  const setInputColor = (i) => {
    if (isChecked) {
      if (data.letters[i].isRight) return "true";
      else return "false";
    }
    return "";
  };

  const setInputFocus = (e, i) => {
    if (i < inputsNumber - 1 && e.target.value !== "")
      inputsContainer.current.children[i + 1].focus();
  };

  const handleKeyPress = (e, i) => {
    switch (e.code) {
      case "Enter":
        if (isChecked && !isLast) nextOnClick();
        else if (isChecked && isLast) finishOnClick(e);
        else if (!isChecked) setIsChecked(true);
        break;
      case "ArrowLeft":
        if (i !== 0) inputsContainer.current.children[i - 1].focus();
        break;
      case "ArrowRight":
        if (i < inputsNumber - 1)
          inputsContainer.current.children[i + 1].focus();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setIsChecked(false);
    inputsContainer.current.children[0].focus();
  }, [data]);

  return (
    <div
      className="spell-check-card flex-item flex-item-768-1 flex flex-o-vertical flex-a-center 
        flex-j-center bg-prm p-50"
    >
      <div className="spell-check-card-definition text-s3">{definition}</div>
      <div className="flex flex-wrap m-t-30 m-ng-5" ref={inputsContainer}>
        {(function () {
          let inputs = [];

          for (let i = 0; i < inputsNumber; i++) {
            inputs.push(
              <input
                className="spell-check-input border-round-tiny text-align-center 
                  text-s6 m-5"
                data-is-right={setInputColor(i)}
                value={data.letters[i].value}
                onChange={(e) => {
                  inputOnChange(e, i);
                  setInputFocus(e, i);
                }}
                onKeyDown={(e) => handleKeyPress(e, i)}
                key={i}
                required
              />
            );
          }

          return inputs;
        })()}
      </div>
      <div className="p-v-10">{isChecked && `Word: ${word}`}</div>
      <div className="flex-item flex-item-768-1 p-t-30">
        {!isChecked && (
          <button
            className="flex-item flex-item-768-1"
            onClick={() => setIsChecked(true)}
          >
            Chceck
          </button>
        )}
        {isChecked && !isLast && (
          <button className="flex-item flex-item-768-1" onClick={nextOnClick}>
            Next
          </button>
        )}
        {isChecked && isLast && (
          <button
            className="flex-item flex-item-768-1"
            onClick={(e) => finishOnClick(e)}
          >
            Finish
          </button>
        )}
      </div>
    </div>
  );
}
