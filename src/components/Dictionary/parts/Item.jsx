export function Item({ word, definition, showWordCard, setCardConfig }) {
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
      border-round-tiny bg-prm text-color-main-d"
    >
      <div
        className="dictionary-item-content flex-item bg-prm-b-hover p-20"
        onClick={() => {
          showWordCard();
          setCardConfig(word, definition);
        }}
      >
        <h4>Word: {word}</h4>
        <div className="m-t-10">Definition: {definition}</div>
      </div>
      <form onSubmit={postHandler} className="p-20">
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
