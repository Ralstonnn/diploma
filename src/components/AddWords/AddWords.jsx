import { useEffect, useRef, useState } from "react";
import { CloseButton } from "../CloseBtn/CloseBtn";
import { disableScroll, enableScroll } from "../../Functions/scrollFunctions";
import { setOffsetY } from "../../Functions/setOffsets";
import "./style.scss";

export function AddWords({ closeBtnClick, forceUpdate }) {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const addWordsContainer = useRef(null);

  const postHandler = (e) => {
    e.preventDefault();

    const formData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        word,
        definition,
      }),
    };

    fetch("api/add-words", formData)
      .then((res) => res.json())
      .then((data) => {
        if (data.response === "y") {
          setWord("");
          setDefinition("");

          if (data.response === "y") alert("Word added");
          forceUpdate();
        }
      });
  };

  useEffect(() => {
    setOffsetY(addWordsContainer.current);
    disableScroll();
  }, []);

  return (
    <div
      className="component-add-words flex-item flex-item-1 flex 
        flex-j-center flex-a-center"
      ref={addWordsContainer}
    >
      <div className="add-word-bg"></div>
      <form
        onSubmit={postHandler}
        className="flex flex-o-vertical flex-a-center p-40 border-round-tiny 
          border-color-main-sd m-b-100 bg-prm"
      >
        <CloseButton
          callback={() => {
            enableScroll();
            closeBtnClick();
          }}
        />
        <input
          className="add-word-word-input flex-item flex-item-1 border-round-tiny"
          type="text"
          placeholder="Enter word"
          required
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <textarea
          className="add-word-definition-input flex-item flex-item-1 
            m-t-20 border-round-tiny"
          placeholder="Enter definition"
          required
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
        <button
          className="flex-item flex-item-1 m-t-20 bg-prm-d bg-prm-b-hover 
            text-color-main-b text-color-main-d-hover"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}
