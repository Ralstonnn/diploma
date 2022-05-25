import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingAnimation } from "../../LoadingAnimation/LoadingAnimation";
import { SpellCheckCard } from "./parts/SpellCheckCard";
import "./style.scss";

export function SpellCheck() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [wordsDefs, setWordsDefs] = useState([]);
  const [wordInputs, setWordInputs] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/spell-check")
      .then((resp) => resp.json())
      .then((data) => {
        if (data.length === 0) {
          alert("There is no words to learn");
          return navigate("/training");
        }

        // let inputs = {};

        // data.forEach((element) => {
        //   inputs[element.word] = [];
        //   element.word.split("").forEach((letter, index) => {

        //     inputs[element.word].push(
        //       <input
        //         className="spell-check-card-input"
        //         key={index}
        //         data-letter={letter}
        //         required
        //       />
        //     );
        //   });
        // });

        // setWordInputs(inputs);
        setWordsDefs(data);
        setIsLoading(false);

        console.log("in page use effect");
      });
  }, []);

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="spell-check-container flex-item flex flex-j-center">
      <SpellCheckCard
        word={wordsDefs[index].word}
        definition={wordsDefs[index].definition}
        increaseIndex={() => setIndex(index + 1)}
      />
    </div>
  );
}
