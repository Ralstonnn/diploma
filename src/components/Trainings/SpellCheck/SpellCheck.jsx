import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingAnimation } from "../../LoadingAnimation/LoadingAnimation";
import { SpellCheckCard } from "./parts/TrainingCard";
import "./style.scss";

export function SpellCheck() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);

  const test = (i) => {
    return data[index].lettest[i].value;
  };

  const inputOnChange = (inputIndex, value) => {
    let tempArr = data;
    tempArr[index].letters[inputIndex].value = value;
    console.log(tempArr);
    setData(tempArr);
  };

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

  return (
    <div className="spell-check-container flex-item flex flex-j-center">
      {/* <SpellCheckCard /> */}
      {/* <button onClick={test}> test</button> */}
      {/* <br /> */}
      {console.log("redrawn")}
      {data[0].letters.map((letter, i) => (
        <input
          value={data[0].letters[i].value}
          onChange={(e) => inputOnChange(i, e.target.value)}
          key={i}
          style={{ border: "1px solid black", marginLeft: "20px" }}
        />
      ))}
    </div>
  );
}
