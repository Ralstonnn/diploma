import React, { useEffect, useState } from "react";
import { TrainingCard } from "../../TrainingCard";

export function LearnWords() {
  const [wordsDefs, setWordsDefs] = useState(null);
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/get-data")
      .then((resp) => resp.json())
      .then((data) => {
        setWordsDefs(data);
        setWord(data[index].word);
        setDefinition(data[index].definition);
      });
  }, []);

  const clickNext = () => {
    if (index < wordsDefs.length - 1) {
      setWord(wordsDefs[index + 1].word);
      setDefinition(wordsDefs[index + 1].definition);
      setIndex(index + 1);
    }
  };

  const clickPrev = () => {
    if (index > 0) {
      setWord(wordsDefs[index - 1].word);
      setDefinition(wordsDefs[index - 1].definition);
      setIndex(index - 1);
    }
  };

  // TODO: Create callback to finish a training
  const finishCallback = () => {
    fetch("/api/finish-training");
  };

  return (
    <div className="container-1344 flex flex-a-center">
      {word === "" ? (
        ""
      ) : (
        <TrainingCard
          word={word}
          definition={definition}
          prevCallback={clickPrev}
          nextCallback={clickNext}
          finishCallback={finishCallback}
          index={index}
          maxIndex={wordsDefs.length - 1}
        />
      )}
    </div>
  );
}
