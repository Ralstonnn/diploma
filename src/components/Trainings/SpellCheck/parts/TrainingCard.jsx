import { useEffect, useState } from "react";

// TODO: make inupts change focus on input
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

  const setInputColor = (i) => {
    if (isChecked) {
      if (data.letters[i].isRight) return "true";
      else return "false";
    }
    return "";
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
      <div className="flex flex-j-space-evenly m-t-30">
        {(function () {
          let inputs = [];

          for (let i = 0; i < inputsNumber; i++) {
            inputs.push(
              <input
                className="spell-check-input border-round-tiny text-align-center 
                  ind-none text-s5"
                data-is-right={setInputColor(i)}
                value={data.letters[i].value}
                onChange={(e) => inputOnChange(e, i)}
                key={i}
                required
              />
            );
          }

          return inputs;
        })()}
      </div>
      {isChecked && <div className="p-t-20">Word: {word}</div>}
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
