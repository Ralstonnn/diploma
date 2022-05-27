import { useCallback, useEffect, useState } from "react";
import { LoadingAnimation } from "../../LoadingAnimation/LoadingAnimation";
import "./style.scss";

export function ChooseWordByDef() {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [trainingCards, setTrainingCards] = useState([]);

  // TODO: Make definitions not to repeat
  const getRandomWords = () => {
    let result = [];
    let randomWords = [];
    let randNum = null;
    let isRightDefIn = false;

    for (let i = 0; i < 3; ) {
      randNum = Math.floor(Math.random() * data.length);

      if (randNum === index || randomWords.includes(data[randNum].word))
        continue;

      randomWords.push(data[randNum].word);
      i++;
    }

    randNum = Math.floor(Math.random() * 4);

    randomWords.forEach((item, i) => {
      if (randNum === i) {
        result.push(data[index].word);
        isRightDefIn = true;
      }
      result.push(item);
    });

    if (!isRightDefIn) result.push(data[index].word);
    return result;
  };

  const rightCallback = useCallback(() => {
    let tempArr = data;
    console.log({ ...tempArr[index] });
    tempArr[index] = { ...tempArr[index], isAnsweredRight: true };
    setData(tempArr);
    setIndex(index + 1);
  }, [index, data]);

  const wrongCallback = useCallback(() => {
    setIndex(index + 1);
  }, [index]);

  useEffect(() => {
    fetch("/api/choose-word-by-definition")
      .then((resp) => resp.json())
      .then((res) => {
        setData(
          res.map((item, i) => {
            return {
              ...item,
              isAnsweredRight: false,
            };
          })
        );
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingAnimation />;

  return (
    <div
      className="choose-definition-container flex-item flex flex-a-center 
        flex-j-center"
    >
      <ChooseDefinitionCard
        word={data[index].word}
        definition={data[index].definition}
        getRandomWords={getRandomWords()}
        rightCallback={rightCallback}
        wrongCallback={wrongCallback}
      />
    </div>
  );
}

function ChooseDefinitionCard({
  word,
  definition,
  getRandomWords,
  rightCallback,
  wrongCallback,
}) {
  return (
    <div
      className="choose-definition flex flex-a-center 
        flex-j-space-evenly p-50"
    >
      <div>
        <div className="text-s3">{definition}</div>
      </div>
      <div className="flex flex-o-vertical m-l-20">
        {getRandomWords.map((def, i) => (
          <button
            className="flex-item m-t-10"
            onClick={(e) => {
              if (e.target.innerHTML === word) rightCallback();
              else wrongCallback();
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
