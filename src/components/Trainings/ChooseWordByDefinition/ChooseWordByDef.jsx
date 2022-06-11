import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingAnimation } from "../../LoadingAnimation/LoadingAnimation";
import { ChooseDefinitionCard } from "./parts/TrainingCard";
import "./style.scss";

export function ChooseWordByDef() {
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const getRandomWords = (dictionary, placeholderDictionary, rightWord) => {
    let result = [];
    let randomWords = [];
    let randNum = null;
    let isRightDefIn = false;

    if (!placeholderDictionary) {
      for (let i = 0; i < 3; ) {
        randNum = Math.floor(Math.random() * dictionary.length);

        if (
          dictionary[randNum].word === rightWord ||
          randomWords.includes(dictionary[randNum].word)
        )
          continue;

        randomWords.push(dictionary[randNum].word);
        i++;
      }
    } else {
      for (let i = 0; i < 3; ) {
        randNum = Math.floor(Math.random() * placeholderDictionary.length);

        if (
          placeholderDictionary[randNum].word === rightWord ||
          randomWords.includes(placeholderDictionary[randNum].word)
        )
          continue;

        randomWords.push(placeholderDictionary[randNum].word);
        i++;
      }
    }

    randNum = Math.floor(Math.random() * 4);

    randomWords.forEach((item, i) => {
      if (randNum === i) {
        result.push(rightWord);
        isRightDefIn = true;
      }
      result.push(item);
    });

    if (!isRightDefIn) result.push(rightWord);
    return result;
  };

  const finishTraining = useCallback(() => {
    setIsLoading(true);

    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: data.dictionary,
      }),
    };

    navigate("/training");
    fetch("/api/choose-word-by-definition-finish-training", formData)
      .then((resp) => resp.json())
      .then((res) => {
        if (res.response === "y") {
          setIsLoading(false);
          navigate("/training");
        }
      });
  }, [data, navigate]);

  const rightCallback = useCallback(() => {
    let tempArr = data;
    tempArr.dictionary[index] = {
      ...tempArr.dictionary[index],
      isAnsweredRight: true,
    };
    setData(tempArr);

    if (index === data.dictionary.length - 1) finishTraining();
    setIndex(index + 1);
  }, [index, data, finishTraining]);

  const wrongCallback = useCallback(() => {
    if (index === data.dictionary.length - 1) finishTraining();
    setIndex(index + 1);
  }, [index, finishTraining, data]);

  useEffect(() => {
    fetch("/api/choose-word-by-definition")
      .then((resp) => resp.json())
      .then((res) => {
        if (res.dictionary.length === 0) {
          alert("There is no words to learn");
          return navigate("/training");
        }

        setData({
          dictionary: res.dictionary.map((item) => {
            return {
              ...item,
              isAnsweredRight: false,
              randomWords: getRandomWords(
                res.dictionary,
                res.placeholderDictionary ? res.placeholderDictionary : null,
                item.word
              ),
            };
          }),
        });

        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingAnimation />;

  return (
    <div
      className="choose-definition-container flex-item flex-item-1 flex 
        flex-a-center flex-j-center"
    >
      <ChooseDefinitionCard
        word={data.dictionary[index].word}
        definition={data.dictionary[index].definition}
        randomWords={data.dictionary[index].randomWords}
        rightCallback={rightCallback}
        wrongCallback={wrongCallback}
      />
    </div>
  );
}
