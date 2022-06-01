import { useState } from "react";

export function TrainingCard({ word, definition, setInputData, inputData }) {
  const [data, setData] = useState({
    word,
    definition,
    inputs: word.split("").map((letter) => {
      return {
        rightLetter: letter,
        inputValue: "",
        isRight: false,
      };
    }),
  });
  const [isChecked, setIsChecked] = useState(false);

  const inputOnChange = (e, letter, i) => {
    let tempArr = { ...data };
    let value = e.target.value[e.target.value.length - 1];

    tempArr.inputs[i].inputValue = value ? value : "";
    tempArr.inputs[i].isRight = value === letter;

    setData(tempArr);
  };

  const setInputColor = (i) => {
    if (isChecked) {
      if (data.inputs[i].isRight) return "true";
      else return "false";
    }
    return "";
  };

  const clickNext = () => {};

  return (
    <div
      className="spell-check-card flex flex-o-vertical flex-a-center 
        flex-j-center bg-prm p-50"
    >
      <div className="text-s3">{definition}</div>
      <div className="flex flex-j-space-evenly m-t-30">
        {word.split("").map((letter, i) => (
          <input
            className="spell-check-input border-round-tiny text-align-center 
                ind-none text-s5"
            data-is-right={setInputColor(i)}
            value={data.inputs[i].inputValue}
            onChange={(e) => inputOnChange(e, letter, i)}
            key={i}
            required
          />
        ))}
      </div>
      <div className="p-t-30">
        {!isChecked && (
          <button onClick={() => setIsChecked(true)}>Chceck</button>
        )}
      </div>
    </div>
  );
}
