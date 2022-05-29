import { useState, useEffect } from "react";
import { CloseButton } from "../CloseBtn/CloseBtn";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";
import "./style.scss";

// TODO: Make cards clickable

export function Dictionary() {
  const [data, setData] = useState([]);
  const [showWordCard, setShowWordCard] = useState(false);
  const [cardConfig, setCardConfig] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const onWordCardSubmit = (e) => {
    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...cardConfig }),
    };

    fetch("/api/update-word", formData);
  };

  useEffect(() => {
    fetch("/api/get-words")
      .then((resp) => resp.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingAnimation />;

  return (
    <div
      className="component-dictionary flex-item flex 
    flex-o-vertical flex-a-center"
    >
      {data.map((item, i) => {
        return (
          <Item
            word={item.word}
            definition={item.definition}
            showWordCard={() => setShowWordCard(true)}
            setCardConfig={(word, definition) => {
              setCardConfig({
                word,
                definition,
                wordToChange: word,
                definitionToChange: definition,
              });
            }}
            key={i}
          />
        );
      })}

      {showWordCard && (
        <WordCard
          word={cardConfig.word}
          definition={cardConfig.definition}
          hideWordCard={() => setShowWordCard(false)}
          wordOnChange={(word) => setCardConfig({ ...cardConfig, word: word })}
          definitionOnChange={(definition) =>
            setCardConfig({ ...cardConfig, definition: definition })
          }
          onWordCardSubmit={onWordCardSubmit}
        />
      )}
    </div>
  );
}

function Item({ word, definition, showWordCard, setCardConfig }) {
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
      onClick={() => {
        showWordCard();
        setCardConfig(word, definition);
      }}
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

// TODO: Find out how to change card config!!!
function WordCard({
  word,
  definition,
  hideWordCard,
  wordOnChange,
  definitionOnChange,
  onWordCardSubmit,
}) {
  return (
    <div className="word-card-container flex flex-a-center flex-j-center">
      <div className="word-card-background"></div>

      <form
        onSubmit={(e) => {
          onWordCardSubmit(e);
          hideWordCard();
        }}
        className="word-card bg-prm flex flex-o-vertical flex-a-center 
        flex-j-space-evenly p-relative p-50 "
      >
        <CloseButton callback={hideWordCard} />
        <input
          type="text"
          value={word}
          onChange={(e) => wordOnChange(e.target.value)}
        />
        <textarea
          value={definition}
          onChange={(e) => definitionOnChange(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
