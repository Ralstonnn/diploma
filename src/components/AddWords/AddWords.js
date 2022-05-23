import { useState } from "react";
import "./style.scss";

export function AddWords({ closeBtnClick }) {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");

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
        }
      });
  };

  return (
    <div
      className="component-add-words flex-item flex 
                flex-j-center flex-a-center"
    >
      <div className="add-word-bg"></div>
      <form
        onSubmit={postHandler}
        className="flex flex-o-vertical p-40 border-round-tiny 
                  border-color-main-sd m-b-100 bg-prm"
      >
        <div className="addWords-close-btn" onClick={closeBtnClick}></div>
        <input
          className="add-word-word-input border-round-tiny"
          type="text"
          placeholder="Enter word"
          required
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <textarea
          className="add-word-definition-input m-t-20 border-round-tiny"
          placeholder="Enter definition"
          required
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
        <button
          className="m-t-20 bg-prm-d bg-prm-b-hover text-color-main-b 
                    text-color-main-d-hover"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}
