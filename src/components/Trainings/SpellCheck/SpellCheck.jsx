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
                isRight: false,
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

  const inputOnChange = (e, i) => {
    let tempArr = [...data];
    let value = e.target.value[e.target.value.length - 1];

    tempArr[index].letters[i].value = value ? value : "";

    if (value) {
      tempArr[index].letters[i].isRight =
        value.toLowerCase() ===
        tempArr[index].letters[i].rigthLetter.toLowerCase();
    } else {
      tempArr[index].letters[i].isRight = false;
    }

    setData(tempArr);
  };

  const finishOnClick = (e) => {
    e.preventDefault();

    let result = [];
    let tempArr = [...data];

    tempArr.forEach((item) => {
      let isAnsweredRight = true;
      item.letters.forEach((letter) => {
        if (isAnsweredRight) isAnsweredRight = letter.isRight;
      });

      result.push({
        word: item.word,
        definition: item.definition,
        isAnsweredRight: isAnsweredRight,
      });
    });

    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ result }),
    };

    fetch("/api/finish-spell-check-training", formData)
      .then((resp) => resp.json())
      .then((res) => {
        if (res.response === "y") navigate("/training");
      });
  };

  if (isLoading) return <LoadingAnimation />;

  return (
    <div className="spell-check-container flex-item flex flex-j-center">
      <TrainingCard
        word={data[index].word}
        definition={data[index].definition}
        data={data[index]}
        isLast={index === data.length - 1}
        nextOnClick={() => setIndex(index + 1)}
        inputsNumber={data[index].letters.length}
        inputOnChange={(e, i) => inputOnChange(e, i)}
        finishOnClick={(e) => finishOnClick(e)}
      />
    </div>
  );
}
