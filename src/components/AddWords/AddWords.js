import { useState } from "react";
import "./style.scss";

export function AddWords() {
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

          if (data.value === "add") alert("Word added");
          else if (data.value === "update") alert("Word updated");
        }
      });
  };

  return (
    <div className="flex-item flex flex-j-center component-add-words">
      <form
        onSubmit={postHandler}
        className="flex flex-o-vertical p-40 border-round-tiny border-color-main-sd"
      >
        <input
          className="border-round-tiny"
          type="text"
          placeholder="Enter word"
          required
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <textarea
          className="m-t-20 border-round-tiny"
          placeholder="Enter definition"
          required
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
        />
        <button className="m-t-20 border-round-tiny" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}
