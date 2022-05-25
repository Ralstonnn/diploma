import { useCallback, useEffect, useState } from "react";

export function SpellCheckCard({ word, definition, increaseIndex }) {
  const [inputs, setInputs] = useState([]);
  const [inputsState, setInputsState] = useState({});
  // const [inputValues, setInputValues] = useState([]);

  const test = useCallback(() => {
    let inputsTemp = [];
    let inputsStateTemp = [];

    word.split("").forEach((letter, index) => {
      inputsTemp.push(
        <input
          className="spell-check-card-input m-5"
          onChange={(e) => {
            setInputsState(() => {
              let temp = inputsState;
              temp[index] = letter;
            });
          }}
          key={index}
          data-letter={letter}
          required
        />
      );

      inputsStateTemp.push(false);
    });

    setInputsState(inputsStateTemp);
    setInputs(inputsTemp);
  }, [word]);

  useEffect(() => {
    test();
  }, [test]);

  return (
    <div
      className="spell-check-card flex flex-o-vertical 
        felx-a-center flex-j-center bg-prm p-40"
    >
      <div className="text-s3">{definition}</div>
      <div>{inputs}</div>
      <div></div>
    </div>
  );
}
