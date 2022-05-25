import { useState, useEffect } from "react";
import { CloseButton } from "../CloseBtn/CloseBtn";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";
import "./style.scss";

// TODO: Make cards clickable

export function Dictionary() {
  const [items, setItems] = useState(<LoadingAnimation />);
  const [showWordCard, setShowWordCard] = useState(false);

  const fetchWords = () => {
    fetch("/api/get-words")
      .then((resp) => resp.json())
      .then((data) => {
        let tempArr = [];

        data.forEach((item, i) => {
          tempArr.push(
            <Item
              word={item.word}
              definition={item.definition}
              showWordCard={() => setShowWordCard(true)}
              key={i}
            />
          );
        });

        setItems(tempArr);
      });
  };

  useEffect(() => {
    fetchWords();
  }, []);

  return (
    <div
      className="component-dictionary flex-item flex 
    flex-o-vertical flex-a-center"
    >
      {items}

      {showWordCard && <WordCard hideWordCard={() => setShowWordCard(false)} />}
    </div>
  );
}

function Item({ word, definition, showWordCard }) {
  const postHandler = () => {
    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word,
        definition,
      }),
    };

    fetch("/api/delete-word", formData);
  };

  return (
    <div
      className="dictionary-item flex flex-j-space-between flex-a-center 
      border-round-tiny bg-prm bg-prm-b-hover text-color-main-d p-20"
      onClick={showWordCard}
    >
      <div className="m-r-20">
        <h4>Word: {word}</h4>
        <div className="m-t-10">Definition: {definition}</div>
      </div>
      <form onSubmit={postHandler}>
        <button
          className="dictionary-delete-btn bg-prm-d bg-prm-b-hover 
          text-color-main-b text-color-main-d-hover"
          type="submit"
        >
          Delete
        </button>
      </form>
    </div>
  );
}

function WordCard({ word, definition, hideWordCard }) {
  const postHandler = (e) => {
    hideWordCard();
  };

  return (
    <div className="word-card-container flex flex-a-center flex-j-center">
      <div className="word-card-background"></div>

      <form
        onSubmit={postHandler}
        className="word-card bg-prm flex flex-o-vertical flex-a-center 
        flex-j-space-evenly p-relative p-50 "
      >
        <CloseButton callback={hideWordCard} />
        <input type="text" value={"asdfasdf"} />
        <textarea>asdf</textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
