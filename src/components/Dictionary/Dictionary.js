import { useState, useEffect } from "react";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";
import "./style.scss";

export function Dictionary() {
  const [items, setItems] = useState(<LoadingAnimation />);

  const fetchWords = () => {
    fetch("/api/get-words")
      .then((resp) => resp.json())
      .then((data) => {
        let tempArr = [];

        data.forEach((item, i) => {
          tempArr.push(
            <Item word={item.word} definition={item.definition} key={i} />
          );
        });

        setItems(tempArr);
      });
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <div className="flex-item flex flex-o-vertical flex-a-center component-dictionary">
      {items}
    </div>
  );
}

function Item({ word, definition }) {
  const postHandler = () => {
    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word,
        definition,
      }),
    };

    fetch("/api/delete-word", formData)
      .then((resp) => resp.json())
      .then((data) => {});
  };

  return (
    <div className="flex flex-j-space-between border-round-tiny bg-main-sd text-color-main-b p-20 dictionary-item">
      <div>
        <h2>Word: {word}</h2>
        <div className="m-t-10">Definition: {definition}</div>
      </div>
      <form onSubmit={postHandler}>
        <button
          className="btn-hover-ntr-sd text-color-hover-main-b"
          type="submit"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
