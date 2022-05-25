import { useCallback, useEffect, useState } from "react";
import { LoadingAnimation } from "../../LoadingAnimation/LoadingAnimation";
import "./style.scss";

export function ChooseWordByDef() {
  const [isLoading, setIsLoading] = useState(true);
  const [wordsDefs, setWordsDefs] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/choose-word-by-definition")
      .then((resp) => resp.json())
      .then((data) => {
        setWordsDefs(data);
        setIsLoading(false);
      });
  }, []);

  // TODO: Make definitions not to repeat
  const randomDefs = useCallback(() => {
    let result = [];
    let rightDefSet = false;

    for (let i = 0; i < 3; ) {
      let randNum = Math.floor(Math.random() * wordsDefs.length);
      if (randNum === index && !rightDefSet) {
        result.push(wordsDefs[randNum].definition);
        rightDefSet = true;
        console.log("added");
      } else if (randNum === index && rightDefSet) {
        continue;
      }
      result.push(wordsDefs[randNum].definition);
      i++;
    }

    return result;
  }, [wordsDefs, index]);

  if (isLoading) return <LoadingAnimation />;

  return (
    <div
      className="choose-definition-container flex-item flex flex-a-center 
        flex-j-center"
    >
      <ChooseDefinitionCard
        word={wordsDefs[index].word}
        definition={wordsDefs[index].definition}
        randomDefs={randomDefs(index)}
      />
    </div>
  );
}

function ChooseDefinitionCard({ word, definition, randomDefs }) {
  useEffect(() => {
    console.log(randomDefs);
  }, []);

  return (
    <div
      className="choose-definition flex flex-a-center 
        flex-j-space-evenly p-50"
    >
      <div>
        <div className="text-s3">{word}</div>
      </div>
      <div className="flex flex-o-vertical">
        {randomDefs.map((def, i) => (
          <button
            className="m-t-10"
            onClick={(e) => {
              if (e.target.innerHTML === definition) console.log("true");
            }}
            key={i}
          >
            {def}
          </button>
        ))}
      </div>
    </div>
  );
}
