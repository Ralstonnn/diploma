import { useState, useEffect } from "react";
import { LoadingAnimation } from "../LoadingAnimation/LoadingAnimation";
import { WordCard } from "./parts/WordCard";
import { Item } from "./parts/Item";
import "./style.scss";

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
