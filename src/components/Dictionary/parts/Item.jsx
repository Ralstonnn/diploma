export function Item({ word, definition, showWordCard, setCardConfig }) {
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

    fetch("/api/delete-word", formData)
      .then((resp) => resp.json())
      .then((res) => {
        if (res.response === "y") alert("word deleted");
      });
  };

  return (
    <div
      className="dictionary-item flex-item flex-item-768-1 flex flex-j-space-between 
        flex-a-center flex-768-wrap border-round-tiny bg-prm text-color-main-d"
    >
      <div
        className="dictionary-item-content flex-item flex-item-1 
          bg-prm-b-hover p-20"
        onClick={() => {
          showWordCard();
          setCardConfig(word, definition);
        }}
      >
        <div className="flex-item flex-item-768-1 text-768-align-center text-s4">
          {word}
        </div>
        <div
          className="dictionary-item-definition m-t-10 m-768-t-30 
            text-768-align-center text-s5"
        >
          {definition}
        </div>
      </div>
      <form
        onSubmit={(e) => postHandler(e)}
        className="flex-item flex-item-768-1 flex flex-768-j-center p-20"
      >
        <button
          className="dictionary-delete-btn flex-item flex-item-768-1 bg-prm-d 
            bg-prm-b-hover text-color-main-b text-color-main-d-hover"
          type="submit"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
