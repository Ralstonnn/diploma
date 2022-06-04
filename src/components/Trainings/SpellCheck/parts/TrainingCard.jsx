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

  const changeInputFocus = (i) => {
    if (i < inputsNumber - 1) {
      inputsContainer.current.children[i + 1].focus();
    }
  };

  useEffect(() => {
    setIsChecked(false);
  }, [data]);

  return (
    <div
      className="spell-check-card flex flex-o-vertical flex-a-center 
        flex-j-center bg-prm p-50"
    >
      <div className="text-s3">{definition}</div>
      <div className="flex flex-j-space-evenly m-t-30" ref={inputsContainer}>
        {(function () {
          let inputs = [];

          for (let i = 0; i < inputsNumber; i++) {
            inputs.push(
              <input
                className="spell-check-input border-round-tiny text-align-center 
                  ind-none text-s5"
                data-is-right={setInputColor(i)}
                value={data.letters[i].value}
                onChange={(e) => {
                  changeInputFocus(i);
                  inputOnChange(e, i);
                }}
                key={i}
                required
              />
            );
          }

          return inputs;
        })()}
      </div>
      <div className="p-v-10">{isChecked && `Word ${word}`}</div>
      <div className="p-t-30">
        {!isChecked && (
          <button onClick={() => setIsChecked(true)}>Chceck</button>
        )}
        {isChecked && !isLast && <button onClick={nextOnClick}>Next</button>}
        {isChecked && isLast && (
          <button onClick={(e) => finishOnClick(e)}>Finish</button>
        )}
      </div>
    </div>
  );
}
