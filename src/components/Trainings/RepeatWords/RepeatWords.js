import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TrainingCardRepeatWords } from "../../TrainingCards";
import { LoadingAnimation } from "../../LoadingAnimation/LoadingAnimation";
import { SetDateToRepeat } from "../../../Functions/LearningCurve";

// TODO: Make training to repeat words
export function RepeatWords() {
  const navigate = useNavigate();
  const [wordsDefs, setWordsDefs] = useState(null);
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [repeatCounter, setRepeatCounter] = useState(0);

  useEffect(() => {
    fetch("/api/repeat-words")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length === 0) {
          alert("There is no words to repeat");
          return navigate("/training");
        }

        setWordsDefs(data);
        setWord(data[index].word);
        setDefinition(data[index].definition);
        setRepeatCounter(data[index].repeat_counter);
        setIsLoading(false);
      });
  }, []);

  const clickNext = () => {
    if (index < wordsDefs.length - 1) {
      setWord(wordsDefs[index + 1].word);
      setRepeatCounter(wordsDefs[index + 1].repeat_counter);
      setDefinition(wordsDefs[index + 1].definition);
      setIndex(index + 1);
    }
  };

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="flex flex-a-center flex-item m-t-20">
      <TrainingCardRepeatWords
        word={word}
        definition={definition}
        nextCallback={clickNext}
        repeatCounter={repeatCounter}
        index={index}
        maxIndex={wordsDefs.length - 1}
      />
    </div>
  );
}
