import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrainingCard } from "../../TrainingCard";
import { LoadingAnimation } from "../../LoadingAnimation/LoadingAnimation";
import { SetDateToRepeat } from "../../../Functions/LearningCurve";

export function LearnWords() {
  const navigate = useNavigate();
  const [wordsDefs, setWordsDefs] = useState(null);
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/learn-words")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length === 0) {
          alert("There is no words to learn");
          return navigate("/training");
        }

        setWordsDefs(data);
        setWord(data[index].word);
        setDefinition(data[index].definition);
        setIsLoading(false);
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

  const finishCallback = () => {
    let result = SetDateToRepeat(wordsDefs);

    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        result,
      }),
    };

    fetch("/api/finish-training", formData)
      .then((res) => res.json())
      .then((data) => {
        if (data.response === "y") navigate("/training");
      });
  };

  if (isLoading) return <LoadingAnimation />;
  return (
    <div className="flex flex-a-center flex-item m-t-20">
      <TrainingCard
        word={word}
        definition={definition}
        prevCallback={clickPrev}
        nextCallback={clickNext}
        finishCallback={finishCallback}
        index={index}
        maxIndex={wordsDefs.length - 1}
      />
    </div>
  );
}
