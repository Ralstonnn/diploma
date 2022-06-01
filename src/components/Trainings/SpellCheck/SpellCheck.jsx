import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingAnimation } from "../../LoadingAnimation/LoadingAnimation";
import { TrainingCard } from "./parts/TrainingCard";
import "./style.scss";

export function SpellCheck() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [inputData, setInputData] = useState({});

  useEffect(() => {
    fetch("/api/spell-check")
      .then((resp) => resp.json())
      .then((res) => {
        if (res.length === 0) {
          alert("There is no words to learn");
          return navigate("/training");
        }

        setData(
          res.map((item) => {
            item.letters = item.word.split("").map((letter) => {
              letter = {
                rigthLetter: letter,
                isAnsweredRight: false,
                value: "",
              };
              return letter;
            });

            return item;
          })
        );
        setIsLoading(false);
      });
  }, [navigate]);

  if (isLoading) return <LoadingAnimation />;

  // TODO: Take inputs to different component and set it once a card changes.
  // Make something like i made in dictionary
  return (
    <div className="spell-check-container flex-item flex flex-j-center">
      <TrainingCard
        word={data[0].word}
        definition={data[0].definition}
        setInputData={setInputData}
        inputData={inputData}
      />
    </div>
  );
}
